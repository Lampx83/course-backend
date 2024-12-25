'use strict';

/**
 * A set of functions called "actions" for `edtech-lab-seminar`
 */

const {addAndFilter, createCheckBoxFilter} = require("../../../helpers/notion");
const {getDatabase} = require("../../../utils/notionRequest");
module.exports = {
  // exampleAction: async (ctx, next) => {
  //   try {
  //     ctx.body = 'ok';
  //   } catch (err) {
  //     ctx.body = err;
  //   }
  // }
  find: async (ctx) => {
    let { isDone, limit, next } = ctx.query;
    limit = parseInt(limit || 10);
    const databaseId = process.env.NOTION_DATABASE_EDTECHLAB_SEMINAR || "4424447a2e9045edb8b11ce958965519";

    let body = {};
    if (isDone) {
      addAndFilter(body, createCheckBoxFilter({
        key: "Done",
        value: isDone === "true",
      }));
    }

    const res = await getDatabase({
      databaseId,
      limit,
      next,
      body
    });

    res.results = res?.results?.map(item => ({
      id: item.id,
      ...item.properties,
    }));

    return res;
  }
};
