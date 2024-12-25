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
                        $ref: '#/components/schemas/Lecturer',
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
          '/lecturer-researches': {
            get: {
              tags: ['Lecturer-Research'],
              summary: 'Retrieve a list of lecturer research entries',
              parameters: [
                {
                  in: 'query',
                  name: 'name',
                  schema: {
                    type: 'string',
                  },
                  description: 'Filter by name containing this string',
                },
                {
                  in: 'query',
                  name: 'type',
                  schema: {
                    type: 'string',
                    enum: ['International Journal', 'National Conference', 'International Conference', 'National Journal']
                  },
                  description: 'Filter by Type',
                },
                {
                  in: 'query',
                  name: 'language',
                  schema: {
                    type: 'string',
                    enum: ['Vietnamese', 'English']
                  },
                  description: 'Filter by language',
                },
                {
                  in: 'query',
                  name: 'fAuthor',
                  schema: {
                    type: 'string',
                  },
                  description: 'Filter by first author',
                },
                {
                  in: 'query',
                  name: 'cAuthor',
                  schema: {
                    type: 'string',
                  },
                  description: 'Filter by corresponding author',
                },
                {
                  in: 'query',
                  name: 'oAuthor',
                  schema: {
                    type: 'string',
                  },
                  description: 'Filter by other authors (comma-separated values)',
                },
                {
                  in: 'query',
                  name: 'status',
                  schema: {
                    type: 'string',
                    enum: ['Resubmiting', 'Not Started', 'In Progress', 'Under Review', 'Canceled', 'Done']
                  },
                  description: 'Filter by status (e.g., Published, Draft)',
                },
                {
                  in: 'query',
                  name: 'date',
                  schema: {
                    type: 'string',
                    format: 'date',
                  },
                  description: 'Filter by specific date (ISO 8601 format)',
                },
                {
                  in: 'query',
                  name: 'before',
                  schema: {
                    type: 'string',
                    format: 'date',
                  },
                  description: 'Filter by entries before this date (ISO 8601 format)',
                },
                {
                  in: 'query',
                  name: 'after',
                  schema: {
                    type: 'string',
                    format: 'date',
                  },
                  description: 'Filter by entries after this date (ISO 8601 format)',
                },
                {
                  in: 'query',
                  name: 'limit',
                  schema: {
                    type: 'integer',
                    default: 10,
                  },
                  description: 'Number of results to return (default: 10)',
                },
                {
                  in: 'query',
                  name: 'next',
                  schema: {
                    type: 'string',
                  },
                  description: 'Cursor for pagination',
                },
                {
                  in: 'query',
                  name: 'sortBy',
                  schema: {
                    type: 'string',
                    default: 'Date',
                    enum: ['Name', 'Date', 'Type', 'Language'],
                  },
                  description: 'Field to sort results by (default: Date)',
                },
                {
                  in: 'query',
                  name: 'sortValue',
                  schema: {
                    type: 'string',
                    default: 'descending',
                    enum: ['ascending', 'descending'],
                  },
                  description: 'Sort direction (default: descending)',
                },
              ],
              responses: {
                200: {
                  description: 'Successful response with a list of lecturer research entries',
                  content: {
                    'application/json': {
                      schema: {
                        type: 'object',
                        properties: {
                          results: {
                            type: 'array',
                            items: {
                              type: 'object',
                              properties: {
                                id: {
                                  type: 'string',
                                  description: 'Unique identifier for the entry',
                                },
                                Name: {
                                  type: 'string',
                                  description: 'Title of the research',
                                },
                                Type: {
                                  type: 'string',
                                  description: 'Type of research (e.g., Journal, Conference)',
                                },
                                Language: {
                                  type: 'string',
                                  description: 'Language of the research',
                                },
                                Date: {
                                  type: 'string',
                                  format: 'date',
                                  description: 'Date of publication',
                                },
                                Status: {
                                  type: 'string',
                                  description: 'Status of the research',
                                },
                                Authors: {
                                  type: 'array',
                                  items: {
                                    type: 'string',
                                  },
                                  description: 'List of authors',
                                },
                              },
                            },
                          },
                          nextCursor: {
                            type: 'string',
                            description: 'Cursor for the next page of results',
                          },
                        },
                      },
                    },
                  },
                },
                400: {
                  description: 'Invalid query parameters',
                  content: {
                    'application/json': {
                      schema: {
                        type: 'object',
                        properties: {
                          error: {
                            type: 'string',
                            example: 'Invalid date format',
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          '/edtech-lab-seminars': {
            get: {
              tags: ['Edtech-Lab-Seminar'],
              summary: 'Retrieve a list of edtech lab seminars',
              parameters: [
                {
                  in: 'query',
                  name: 'isDone',
                  schema: {
                    type: 'boolean',
                  }
                },
                {
                  in: 'query',
                  name: 'limit',
                  schema: {
                    type: 'integer',
                    default: 10,
                  },
                  description: 'Number of results to return (default: 10)',
                },
                {
                  in: 'query',
                  name: 'next',
                  schema: {
                    type: 'string',
                  },
                  description: 'Cursor for pagination',
                }
              ],
              responses: {
                200: {
                  description: 'Successful response with a list of edtech lab seminars',
                  content: {
                    'application/json': {
                      schema: {
                        type: 'object',
                        properties: {
                          results: {
                            type: 'array',
                          }
                        }
                      }
                    }
                  }
                },
                400: {
                  description: 'Invalid query parameters',
                  content: {
                    'application/json': {
                      schema: {
                        type: 'object',
                        properties: {
                          error: {
                            type: 'string',
                            example: 'Invalid date format',
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          '/edtech-lab-members': {
            get: {
              tags: ['Edtech-Lab-Member'],
              summary: 'Retrieve a list of edtech lab members',
              parameters: [
                {
                  in: 'query',
                  name: 'limit',
                  schema: {
                    type: 'integer',
                    default: 10,
                  },
                  description: 'Number of results to return (default: 10)',
                },
                {
                  in: 'query',
                  name: 'next',
                  schema: {
                    type: 'string',
                  },
                  description: 'Cursor for pagination',
                }
              ],
              responses: {
                200: {
                  description: 'Successful response with a list of edtech lab members',
                  content: {
                    'application/json': {
                      schema: {
                        type: 'object',
                        properties: {
                          results: {
                            type: 'array',
                          }
                        }
                      }
                    }
                  }
                },
                400: {
                  description: 'Invalid query parameters',
                  content: {
                    'application/json': {
                      schema: {
                        type: 'object',
                        properties: {
                          error: {
                            type: 'string',
                            example: 'Invalid date format',
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
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
