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
      const { q, start = 0, size = 10, locale = "vi" } = ctx.query;
      let res = [];

      const majors = await esClient.search({
        index: ELSATICSEARCH_INDEXES.majors,
        body: createMajorQuery({q, start, size: size - res.length, locale})
      });

      res = res.concat(majors?.body?.hits?.hits?.map(hit => ({
        type: "major",
        ...hit._source
      })) || []);
      if (res.length >= size) {
        return res;
      }

      const schools = await esClient.search({
        index: ELSATICSEARCH_INDEXES.schools,
        body: createSchoolQuery({q, start, size: size - res.length, locale})
      });
      res = res.concat(schools?.body?.hits?.hits?.map(hit => ({
        type: "school",
        ...hit._source
      })) || []);
      if (res.length >= size) {
        return res;
      }

      const faculties = await esClient.search({
        index: ELSATICSEARCH_INDEXES.faculties,
        body: createFacultyQuery({q, start, size: size - res.length, locale})
      });
      res = res.concat(faculties?.body?.hits?.hits?.map(hit => ({
        type: "faculty",
        ...hit._source
      })) || []);
      if (res.length >= size) {
        return res;
      }

      const subjects = await esClient.search({
        index: ELSATICSEARCH_INDEXES.subjects,
        body: createSubjectQuery({q, start, size: size - res.length, locale})
      });
      res = res.concat(subjects?.body?.hits?.hits?.map(hit => ({
        type: "subject",
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
      const curriculumsData = await strapi.services["api::search.search"].getCurriculumsIndex({batchSize});
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

      const subjectIndex = await createIndex({
        index: ELSATICSEARCH_INDEXES.subjects,
        data: subjectsData,
        body: subjectMapping,
        isUpdate
      });

      const curriculumIndex = await createIndex({
        index: ELSATICSEARCH_INDEXES.curriculums,
        data: curriculumsData,
        body: curriculumMapping,
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
  },
  searchCurriculum: async (ctx) => {
    const {q, start = 0, size = 10, locale = "vi"} = ctx.query;
    const res = await esClient.search({
      index: ELSATICSEARCH_INDEXES.curriculums,
      body: createCurriculumQuery({q, start, size, locale})
    });
    return res.body.hits.hits.map(hit => hit._source);
  },
  searchMajor: async (ctx) => {
    const {q, start = 0, size = 10, locale = "vi"} = ctx.query;
    const res = await esClient.search({
      index: ELSATICSEARCH_INDEXES.majors,
      body: createMajorQuery({q, start, size, locale})
    });
    return res.body.hits.hits.map(hit => hit._source);
  },
  searchSubject: async (ctx) => {
    const {q, year, start = 0, size = 10, locale = "vi"} = ctx.query;
    const res = await esClient.search({
      index: ELSATICSEARCH_INDEXES.subjects,
      body: createSubjectQuery({q, start, size, locale}, year)
    });
    return res.body.hits.hits.map(hit => hit._source);
  }
};
