'use strict';
const {getDatabase} = require("../../../utils/notionRequest");
const {addAndFilter, addSubFilter, addSort} = require("../../../helpers/notion");
/**
 * alumni-list controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::alumni-list.alumni-list', ({strapi}) => ({
    async find(ctx) {
        let {next, limit, ten, khoa, namTotNghiep, nganhDaoTao, sortBy, sortValue} = ctx.query;
        limit = parseInt(limit || 10);

        const databaseId = process.env.NOTION_DATABASE_ALUMNI || "17631ae5fcee49fb820711d5dafcd474";

        let body = {};
        if (ten) {
            body = addSubFilter({
                body,
                subFilter: {
                  or: [
                      {
                          property: "ho",
                          rich_text: {
                              contains: ten
                          }
                      },
                      {
                          property: "ten",
                          rich_text: {
                              contains: ten
                          }
                      },
                      {
                          property: "ho",
                          rich_text: {
                              starts_with: ten
                          }
                      },
                      {
                          property: "ten",
                          rich_text: {
                              starts_with: ten
                          }
                      },
                      {
                          property: "ho",
                          rich_text: {
                              ends_with: ten
                          }
                      },
                      {
                          property: "ten",
                          rich_text: {
                              ends_with: ten
                          }
                      },
                      {
                          property: "ho",
                          rich_text: {
                              equals: ten
                          }
                      },
                      {
                          property: "ten",
                          rich_text: {
                              equals: ten
                          }
                      },
                  ]
                },
                parent: "and"
            });
        }
        if (khoa) {
            addAndFilter(body, {
                property: "khoa",
                rich_text: {
                    equals: khoa
                }
            });
        }
        if (namTotNghiep) {
            addAndFilter(body, {
                property: "namTotNghiep",
                rich_text: {
                    equals: namTotNghiep
                }
            });
        }
        if (nganhDaoTao) {
            addAndFilter(body, {
                property: "nganhDaoTao",
                rich_text: {
                    equals: nganhDaoTao
                }
            });
        }

        if (sortBy && sortValue) {
            addSort(body, {
                property: sortBy,
                direction: sortValue
            })
        }

        const res = await getDatabase({databaseId, next, limit, body});
        res.results = res?.results?.map(item => ({
            id: item.id,
            ...item.properties
        }));
        return res;
    }
}));
