// const notionAxios = require('../../customConfig/notion.js');
const {Client} = require("@notionhq/client");
const notion = new Client({auth: process.env.NOTION_TOKEN || "secret_LC9bGNPWbPfaQwRcxXsnBFwDdNQBHFC2K9XgkFjOS9B"});

const getDatabase = async ({databaseId, limit = 100, next = undefined, body = {}}) => {
    const database = {
        databaseId,
    };

    //get infor of database
    const response = await notion.databases.retrieve({database_id: databaseId});
    database.object = response?.object;
    database.created_time = response?.created_time;
    database.last_edited_time = response?.last_edited_time;
    database.title = response?.title[0].plain_text;
    database.description = response?.description;
    database.properties = response?.properties;
    database.parent = response?.parent;


    // query database's records
    if (limit < 0) {
        throw new Error('limit must be greater than 0');
    }

    let allPages = [];

    let startCursor = next;
    while (allPages.length < limit) {

        const responsePages = await notion.databases.query({
            database_id: databaseId,
            start_cursor: startCursor,
            page_size: limit,
            ...body
        });

        database.object = responsePages.object;

        allPages = [...allPages, ...responsePages.results];
        if (responsePages.has_more === true) {
            startCursor = responsePages.next_cursor;
            delete responsePages.results;
            database.next_cursor = responsePages.next_cursor;
            database.has_more = responsePages.has_more;
        } else {
            break;
        }
    }

    database.results = allPages;

    return database;
};

module.exports = {
    getDatabase
}