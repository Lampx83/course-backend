const  parseFieldFilters = (filters) => {
    /**
     * Parse field filter: field1:value1,field2:value2,field3>a,field4<=a,field5<b
     * @param {string} filters - string represent filters
     * @return {Array} - elastic search must filter
     */
    const esFilters = [];
    const tokens = filters.split(',');

    tokens.forEach(token => {
        const keyValue = token.split(':');
        if (keyValue.length === 2) {
            esFilters.push({
                term: {
                    [keyValue[0]]: keyValue[1]
                }
            });
        }
    });

    return esFilters;
}

const  addBoolQuery = (query) => {
    if (!query.query) {
        query.query = {};
    }
    if (!query.query.bool) {
        query.query.bool = {};
    }
}

const  addQueryLogic = (query, subquery, queryLogic) => {
    /**
     * @param {Object} query - original query
     * @param {Object} subquery - sub query
     * @param {string} queryLogic - must, filter, should or must_not
     */
    if (!['must', 'filter', 'should', 'must_not'].includes(queryLogic)) {
        return;
    }

    addBoolQuery(query);

    if (!query.query.bool[queryLogic]) {
        query.query.bool[queryLogic] = [subquery];
    } else {
        if (!Array.isArray(query.query.bool[queryLogic])) {
            query.query.bool[queryLogic] = [query.query.bool[queryLogic]];
        }
        query.query.bool[queryLogic].push(subquery);
    }
}

//Add filter into bool query Elasticsearch
const  addFilter = (query, subquery) => {
    addQueryLogic(query, subquery, 'filter');
}

//Add must into bool query Elasticsearch
const  addMust = (query, subquery) => {
    addQueryLogic(query, subquery, 'must');
}

const  addShould = (query, subquery) => {
    addQueryLogic(query, subquery, 'should');
}

const  addMustNot = (query, subquery) => {
    addQueryLogic(query, subquery, 'must_not');
}

module.exports = {
    parseFieldFilters,
    addFilter,
    addMust,
    addShould,
    addMustNot
}