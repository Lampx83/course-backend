'use strict';

/**
 * curriculum-curriculum controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::curriculum-curriculum.curriculum-curriculum', ({strapi}) => ({
  async getYears(ctx) {
    return await strapi.services['api::curriculum-curriculum.curriculum-curriculum'].getYears(ctx.query);
  },
  async getKnowledgeBlocks(ctx) {
    return await strapi.services['api::curriculum-curriculum.curriculum-curriculum'].getKnowledgeBlocks(ctx.query);
  }
}));
