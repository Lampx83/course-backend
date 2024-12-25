'use strict';

/**
 * search service
 */

module.exports = () => ({
  getSubjectsIndex: async ({batchSize = 500}) => {
    let isNext = true;
    let page = 1;
    let arr = [];
    while (isNext) {
      const res = await strapi.services['api::curriculum-subject.curriculum-subject'].find({
        pagination: { page, pageSize: batchSize },
        populate: {
          "curriculum_curriculum_subjects": {
            populate: "curriculum_curriculum"
          },
          "curriculum_faculties": "*",
        }
      });
      for (const item of res.results) {
        item.curriculums = item.curriculum_curriculum_subjects.map((curriculum) => curriculum.curriculum_curriculum);
        item.faculties = item.curriculum_faculties;
        delete item?.curriculum_curriculum_subjects;
        delete item?.curriculum_faculties;
      }
      arr = arr.concat(res.results);
      isNext = res.pagination.page < res.pagination.pageCount;
      page++;
    }
    return arr;
  },
  getCurriculaIndex: async ({batchSize = 500}) => {
    let isNext = true;
    let page = 1;
    let arr = [];
    while (isNext) {
      const res = await strapi.services['api::curriculum-curriculum.curriculum-curriculum'].find({
        pagination: { page, pageSize: batchSize },
        populate: {
          "curriculum_major": "*"
        }
      });
      
      for (const item of res.results) {
        item.major = item.curriculum_major;
        delete item?.curriculum_major;
      }
      
      arr = arr.concat(res.results);
      isNext = res.pagination.page < res.pagination.pageCount;
      page++;
    }
    return arr;
  },
  getSchoolsIndex: async ({batchSize = 500}) => {
    let isNext = true;
    let page = 1;
    let arr = [];
    while (isNext) {
      const res = await strapi.services['api::curriculum-school.curriculum-school'].find({
        pagination: { page, pageSize: batchSize },
      });
      arr = arr.concat(res.results);
      isNext = res.pagination.page < res.pagination.pageCount;
      page++;
    }
    return arr;
  },
  getFacultiesIndex: async ({batchSize = 500}) => {
    let isNext = true;
    let page = 1;
    let arr = [];
    while (isNext) {
      const res = await strapi.services['api::curriculum-faculty.curriculum-faculty'].find({
        pagination: { page, pageSize: batchSize },
        populate: {
          "curriculum_school": "*"
        }
      });
      
      for (const item of res.results) {
        item.school = item.curriculum_school;
        delete item?.curriculum_school;
      }
      
      arr = arr.concat(res.results);
      isNext = res.pagination.page < res.pagination.pageCount;
      page++;
    }
    return arr;
  },
  getMajorsIndex: async ({batchSize = 500}) => {
    let isNext = true;
    let page = 1;
    let arr = [];
    while (isNext) {
      const res = await strapi.services['api::curriculum-major.curriculum-major'].find({
        pagination: { page, pageSize: batchSize },
        populate: {
          "curriculum_faculty": "*",
          "curriculum_school": "*"
        }
      });
      arr = arr.concat(res.results);
      isNext = res.pagination.page < res.pagination.pageCount;
      page++;
    }
    return arr;
  },
  
});
