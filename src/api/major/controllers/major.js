'use strict';

/**
 * major controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::major.major', ({strapi}) => {
    return {
        async findBySlug(ctx) {
            // thanks to the custom route we have now a slug variable
            // instead of the default id
            const { slug } = ctx.params;
            const { populate } = ctx.query;
            const entity = await strapi.db.query('api::major.major').findOne({
                where: { slug },
                populate: populate === "*" ? true : {}
            });
            const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

            return this.transformResponse(sanitizedEntity);
        }
    };
});
