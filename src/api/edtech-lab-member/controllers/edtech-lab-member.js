'use strict';

const {getDatabase} = require("../../../utils/notionRequest");
/**
 * edtech-lab-member controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::edtech-lab-member.edtech-lab-member', ({ strapi }) => ({
  async find(ctx) {
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
}));
