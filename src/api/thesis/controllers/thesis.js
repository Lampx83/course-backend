'use strict';

const {addSubFilter, addAndFilter, addSort} = require("../../../helpers/notion");
const {getDatabase} = require("../../../utils/notionRequest");
/**
 * thesis controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::thesis.thesis', ({ strapi }) => ({
    async find(ctx) {
        let { tenChuyenDe, hoTenSV, GVHD, nam, limit, next, sortBy, sortValue} = ctx.query;
        limit = parseInt(limit || 10);
        const databaseId = process.env.NOTION_DATABASE_THESIS || "7369fd8f7d454fa88eb0ba1a476dcd28";

        let body = {};
        if (tenChuyenDe) {
            addAndFilter(body, {
                property: "tenChuyenDe",
                title: {
                    contains: tenChuyenDe
                }
            })
        }
        if (hoTenSV) {
            addAndFilter(body, {
                property: "hoTenSV",
                rich_text: {
                    contains: hoTenSV
                }
            })
        }
        if (GVHD) {
            addAndFilter(body, {
                property: "GVHD",
                rich_text: {
                    contains: GVHD
                }
            })
        }
        if (nam) {
            addAndFilter(body, {
                property: "nam",
                rich_text: {
                    equals: nam
                }
            })
        }

        if (sortBy && sortValue) {
            addSort(body, {
                property: sortBy,
                direction: sortValue
            })
        }

        const res = await getDatabase({
            databaseId,
            next,
            limit,
            body
        })
        res.results = res.results.map((item) => {
            return {
                id: item.id,
                ...item.properties
            }
        });
        return res;
    }
}));