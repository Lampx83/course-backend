'use strict';

/**
 * search service
 */

module.exports = () => ({
  getSubjectsIndex: async ({batchSize = 500}) => {
    let arr = [];

    async function getByLocale(locale) {
      let isNext = true;
      let page = 1;
      while (isNext) {
        const res = await strapi.services['api::curriculum-subject.curriculum-subject'].find({
          pagination: { page, pageSize: batchSize },
          populate: {
            "curriculum_curriculum_subjects": {
              populate: "curriculum_curriculum"
            },
            "curriculum_faculties": "*",
          },
          locale,
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
    }

    await getByLocale("vi");
    await getByLocale("en");

    return arr;
  },
  getSchoolsIndex: async ({batchSize = 500}) => {
    let arr = [];

    async function getByLocale(locale) {
      let isNext = true;
      let page = 1;
      while (isNext) {
        const res = await strapi.services['api::curriculum-school.curriculum-school'].find({
          pagination: {page, pageSize: batchSize},
          locale
        });
        arr = arr.concat(res.results);
        isNext = res.pagination.page < res.pagination.pageCount;
        page++;
      }
    }

    await getByLocale("vi");
    await getByLocale("en");

    return arr;
  },
  getFacultiesIndex: async ({batchSize = 500}) => {
    let arr = [];

    async function getByLocale(locale) {
      let isNext = true;
      let page = 1;
      while (isNext) {
        const res = await strapi.services['api::curriculum-faculty.curriculum-faculty'].find({
          pagination: {page, pageSize: batchSize},
          populate: {
            "curriculum_school": "*"
          },
          locale
        });

        for (const item of res.results) {
          item.school = item.curriculum_school;
          delete item?.curriculum_school;
        }

        arr = arr.concat(res.results);
        isNext = res.pagination.page < res.pagination.pageCount;
        page++;
      }
    }

    await getByLocale("vi");
    await getByLocale("en");

    return arr;
  },
  getMajorsIndex: async ({batchSize = 500}) => {
    let arr = [];

    async function getByLocale(locale) {
      let isNext = true;
      let page = 1;
      while (isNext) {
        const res = await strapi.services['api::curriculum-major.curriculum-major'].find({
          pagination: {page, pageSize: batchSize},
          populate: {
            "curriculum_faculty": "*",
            "curriculum_school": "*",
            "localizations": "*",
            "curriculum_curricula": "*"
          },
          locale
        });

        for (const item of res.results) {
          const curricula = item.curriculum_curricula.sort((a, b) => b.year.localeCompare(a.year));
          item.altLink = curricula[0]?.altLink;
        }

        arr = arr.concat(res.results);
        isNext = res.pagination.page < res.pagination.pageCount;
        page++;
      }
    }

    await getByLocale("vi");
    await getByLocale("en");

    return arr;
  },
  getCurriculumsIndex: async ({batchSize = 500}) => {
    let arr = [];

    async function getByLocale(locale) {
      let isNext = true;
      let page = 1;
      while (isNext) {
        const res = await strapi.services['api::curriculum-curriculum.curriculum-curriculum'].find({
          pagination: {page, pageSize: batchSize},
          populate: {
            "curriculum_major": "*"
          },
          locale
        });

        for (const item of res.results) {
          item.major = item.curriculum_major;
          delete item?.curriculum_major;
        }

        arr = arr.concat(res.results);
        isNext = res.pagination.page < res.pagination.pageCount;
        page++;
      }
    }

    await getByLocale("vi");
    await getByLocale("en");

    return arr;
  },
});
