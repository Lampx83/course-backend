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
          '/lecturers/slug/{slug}': {
            get: {
              tags: ['Lecturer'],
              summary: 'Retrieve a lecturer info by slug',
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
                        $ref: '#/components/schemas/lecturer',
                      },
                    },
                  },
                },
              },
            },
          },
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
          '/alumni-lists': {
            get: {
              tags: ['Alumni-list'],
              summary: 'Retrieve alumni lists',
              parameters: [
                {
                  in: 'query',
                  name: 'limit',
                  schema: {
                      type: 'integer',
                  },
                },
                {
                  in: 'query',
                  name: 'ten',
                  schema: {
                      type: 'string',
                  },
                },
                {
                  in: 'query',
                  name: 'khoa',
                  schema: {
                      type: 'string',
                  },
                },
                {
                  in: 'query',
                  name: 'namTotNghiep',
                  schema: {
                      type: 'string',
                  },
                },
                {
                  in: 'query',
                  name: 'nganhDaoTao',
                  schema: {
                      type: 'string',
                  },
                },
                {
                  in: 'query',
                  name: 'next',
                  schema: {
                      type: 'string',
                  },
                },
                {
                  in: 'query',
                  name: 'sortBy',
                  schema: {
                    type: 'enum',
                    enum: ['ho', 'ten', 'khoa', 'namTotNghiep', 'nganhDaoTao'],
                  },
                },
                {
                  in: 'query',
                  name: 'sortValue',
                  schema: {
                    type: 'enum',
                    enum: ['ascending', 'descending'],
                  },
                },
              ],
              responses: {
                200: {
                  description: 'Successful response',
                  content: {
                    'application/json': {
                      schema: {
                        type: Object
                      },
                    },
                  },
                },
              },
            },
          },
          '/alumni-lists/{id}': {
            get: {},
            put: {},
            delete: {}
          },
          '/theses': {
            get: {
              tags: ['Thesis'],
              summary: 'Retrieve theses',
              parameters: [
                {
                  in: 'query',
                  name: 'limit',
                  schema: {
                      type: 'integer',
                  },
                },
                {
                  in: 'query',
                  name: 'tenChuyenDe',
                  schema: {
                      type: 'string',
                  },
                },
                {
                  in: 'query',
                  name: 'hoTenSV',
                  schema: {
                      type: 'string',
                  },
                },
                {
                  in: 'query',
                  name: 'GVHD',
                  schema: {
                      type: 'string',
                  },
                },
                {
                  in: 'query',
                  name: 'nam',
                  schema: {
                      type: 'string',
                  },
                },
                {
                  in: 'query',
                  name: 'next',
                  schema: {
                      type: 'string',
                  },
                },
                {
                  in: 'query',
                  name: 'sortBy',
                  schema: {
                    type: 'enum',
                    enum: ['tenChuyenDe', 'hoTenSV', 'GVHD', 'nam'],
                  },
                },
                {
                  in: 'query',
                  name: 'sortValue',
                  schema: {
                    type: 'enum',
                    enum: ['ascending', 'descending'],
                  },
                },
              ],
              responses: {
                200: {
                  description: 'Successful response',
                  content: {
                    'application/json': {
                      schema: {
                        type: Object
                      },
                    },
                  },
                },
              },
            },
          },
          '/theses/{id}': {
            get: {},
            put: {},
            delete: {}
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
