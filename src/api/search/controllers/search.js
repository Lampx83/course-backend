'use strict';

/**
 * A set of functions called "actions" for `search`
 */
const {ELSATICSEARCH_INDEXES} = require("../../../../constants/elasticsearch");
const {createIndex, createSubjectQuery, createCurriculumQuery, createMajorQuery, createFacultyQuery, createSchoolQuery} = require("../../../utils/elasticsearch.service");
const subjectMapping = require("../../../mapping/subject.json");
const curriculumMapping = require("../../../mapping/curriculum.json");
const facultyMapping = require("../../../mapping/faculty.json");
const majorMapping = require("../../../mapping/major.json");
const schoolMapping = require("../../../mapping/school.json");

const {esClient} = require("../../../helpers/elasticsearch");

module.exports = {
  search: async (ctx) => {
    try {
      const { q, start, size } = ctx.query;
      let res = [];
      
      const curriculums = await esClient.search({
        index: ELSATICSEARCH_INDEXES.curricula,
        body: createCurriculumQuery({q, start, size})
      });
      res = res.concat(curriculums?.body?.hits?.hits?.map(hit => ({
        type: "curriculum",
        ...hit._source
      })) || []);
      
      if (res.length >= size) {
        return res;
      }
      
      const majors = await esClient.search({
        index: ELSATICSEARCH_INDEXES.majors,
        body: createMajorQuery({q, start, size: size - res.length})
      });
      res = res.concat(majors?.body?.hits?.hits?.map(hit => ({
        type: "major",
        ...hit._source
      })) || []);
      if (res.length >= size) {
        return res;
      }
      
      const subjects = await esClient.search({
        index: ELSATICSEARCH_INDEXES.subjects,
        body: createSubjectQuery({q, start, size: size - res.length})
      });
      res = res.concat(subjects?.body?.hits?.hits?.map(hit => ({
        type: "subject",
        ...hit._source
      })) || []);
      if (res.length >= size) {
        return res;
      }
      
      const faculties = await esClient.search({
        index: ELSATICSEARCH_INDEXES.faculties,
        body: createFacultyQuery({q, start, size: size - res.length})
      });
      res = res.concat(faculties?.body?.hits?.hits?.map(hit => ({
        type: "faculty",
        ...hit._source
      })) || []);
      if (res.length >= size) {
        return res;
      }
      
      const schools = await esClient.search({
        index: ELSATICSEARCH_INDEXES.schools,
        body: createSchoolQuery({q, start, size: size - res.length})
      });
      res = res.concat(schools?.body?.hits?.hits?.map(hit => ({
        type: "school",
        ...hit._source
      })) || []);
      
      return res;
    } catch (err) {
      return err;
    }
  },
  reindex: async (ctx) => {
    try {
      const { batchSize, isUpdate } = ctx.request.body;
      const schoolsData = await strapi.services["api::search.search"].getSchoolsIndex({batchSize});
      const facultiesData = await strapi.services["api::search.search"].getFacultiesIndex({batchSize});
      const majorsData = await strapi.services["api::search.search"].getMajorsIndex({batchSize});
      const curriculaData = await strapi.services["api::search.search"].getCurriculaIndex({batchSize});
      const subjectsData = await strapi.services["api::search.search"].getSubjectsIndex({batchSize});
      
      const schoolIndex = await createIndex({
        index: ELSATICSEARCH_INDEXES.schools,
        data: schoolsData,
        body: schoolMapping,
        isUpdate
      });

      const facultyIndex = await createIndex({
        index: ELSATICSEARCH_INDEXES.faculties,
        data: facultiesData,
        body: facultyMapping,
        isUpdate
      });

      const majorIndex = await createIndex({
        index: ELSATICSEARCH_INDEXES.majors,
        data: majorsData,
        body: majorMapping,
        isUpdate
      });

      const curriculumIndex = await createIndex({
        index: ELSATICSEARCH_INDEXES.curricula,
        data: curriculaData,
        body: curriculumMapping,
        isUpdate
      });
      
      const subjectIndex = await createIndex({
        index: ELSATICSEARCH_INDEXES.subjects,
        data: subjectsData,
        body: subjectMapping,
        isUpdate
      });
      
      return {
        schoolIndex,
        facultyIndex,
        majorIndex,
        curriculumIndex,
        subjectIndex
      }
      
    } catch (err) {
      return err;
    }
  }
};
