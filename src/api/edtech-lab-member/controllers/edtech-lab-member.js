'use strict';

/**
 * A set of functions called "actions" for `edtech-lab-member`
 */

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
    let { limit, next } = ctx.query;
    limit = parseInt(limit || 10);
    const databaseId = process.env.NOTION_DATABASE_EDTECHLAB_MEMBER || "842a693cfed348bd8178a4daa8cf8392";

    const res = await getDatabase({
      databaseId,
      limit,
      next,
    });

    res.results = res?.results?.map(item => ({
      id: item.id,
      ...item.properties,
    }));

    return res;
  }
};
