'use strict';

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {
    if (strapi.plugin('documentation')) {
      const override = {
        paths: {
          '/blogs/slug/{slug}': {
            get: {
              tags: ['Blog'],
              summary: 'Retrieve a blog by slug',
              parameters: [
                {
                  in: 'path',
                  name: 'slug',
                  required: true,
                  schema: {
                    type: 'string',
                  },
                },
              ],
              responses: {
                200: {
                  description: 'Successful response',
                  content: {
                    'application/json': {
                      schema: {
                        $ref: '#/components/schemas/Blog',
                      },
                    },
                  },
                },
              },
            },
          },
          '/majors/slug/{slug}': {
            get: {
              tags: ['Major'],
              summary: 'Retrieve a major by slug',
              parameters: [
                {
                  in: 'path',
                  name: 'slug',
                  required: true,
                  schema: {
                    type: 'string',
                  },
                },
              ],
              responses: {
                200: {
                  description: 'Successful response',
                  content: {
                    'application/json': {
                      schema: {
                        $ref: '#/components/schemas/Major',
                      },
                    },
                  },
                },
              },
            },
          },

        }
      }

      strapi
        .plugin('documentation')
        .service('override')
        .registerOverride(override)
    }
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/*{ strapi }*/) {},
};
