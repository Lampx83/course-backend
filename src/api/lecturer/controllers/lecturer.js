'use strict';

/**
 * lecturer controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::lecturer.lecturer', ({strapi}) => ({
  async findBySlug(ctx) {
    // thanks to the custom route we have now a slug variable
    // instead of the default id
    const { slug } = ctx.params;
    const { populate } = ctx.query;
    const entity = await strapi.db.query('api::lecturer.lecturer').findOne({
      where: { slug },
      populate: populate === "*" ? true : {}
    });
    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

    return this.transformResponse(sanitizedEntity);
  }
}));
