'use strict';

const {addAndFilter, addSort, createSelectFilter, createMultiSelectFilter, createDateFilter, createStatusFilter} = require("../../../helpers/notion");
const {getDatabase} = require("../../../utils/notionRequest");
/**
 * lecturer-research controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::lecturer-research.lecturer-research', ({ strapi }) => ({
  async find(ctx) {
    let { name, type, language, fAuthor, cAuthor, oAuthor, status, date, before, after, limit, next, sortBy, sortValue} = ctx.query;
    limit = parseInt(limit || 10);
    const databaseId = process.env.NOTION_DATABASE_LECTURER_RESEARCH || "13f4b65d1cba808e962ac6c2dceb8b78";

    let body = {};
    if (name) {
      addAndFilter(body, {
        property: "Name",
        title: {
          contains: name
        }
      })
    }
    if (type) {
      addAndFilter(body, createSelectFilter({
        key: "Type",
        value: type
      }))
    }
    if (language) {
      addAndFilter(body, createSelectFilter({
        key: "Language",
        value: language
      }))
    }
    if (fAuthor) {
      addAndFilter(body, createSelectFilter({
        key: "F Author",
        value: fAuthor,
      }))
    }
    if (cAuthor) {
      addAndFilter(body, createSelectFilter({
        key: "C Author",
        value: cAuthor
      }))
    }
    if (oAuthor) {
      addAndFilter(body, createMultiSelectFilter({
        key: "O Author",
        value: oAuthor
      }))
    }
    if (status) {
      addAndFilter(body, createStatusFilter({
        key: "Status",
        value: status
      }))
    }
    if (date) {
      addAndFilter(body, createDateFilter({
        key: "Date",
        value: date
      }))
    }
    if (before) {
      addAndFilter(body, createDateFilter({
        key: "Date",
        value: before,
        operation: "before"
      }))
    }
    if (after) {
      addAndFilter(body, createDateFilter({
        key: "Date",
        value: after,
        operation: "after"
      }))
    }

    // if (sortBy && sortValue) {
      addSort(body, {
        property: sortBy || "Date",
        direction: sortValue || "descending"
      })
    // }

    const res = await getDatabase({
      databaseId,
      next,
      limit,
      body
    })
    res.results = res.results.map((item) => {
      return {
        id: item.id,
        ...item.properties
      }
    });
    return res;
  }
}));
