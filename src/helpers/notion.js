const addFilter = (body) => {
    if (!body.filter) {
        body.filter = {};
    }
}

const addAndFilter = (body, filter) => {
    addFilter(body);
    if (!body.filter.and) {
        body.filter.and = [];
    }
    body.filter.and = [...body.filter.and, filter];
}

const addOrFilter = (body, filter) => {
    addFilter(body);
    if (!body.filter.or) {
        body.filter.or = [];
    }
    if (typeof filter === 'object' && filter.length > 0) {
        body.filter.or = [...body.filter.or, ...filter];
        return;
    }
    body.filter.or = [...body.filter.or, filter];
}

const addSubFilter = ({body, parent, subFilter}) => {
    addFilter(body)
    if (!body.filter[parent]) {
        body.filter[parent] = [];
    }
    body.filter[parent].push(subFilter);
    return body;
}

const addSort = (body, sort) => {
    if (!body.sorts) {
        body.sorts = [];
    }
    body.sorts.push(sort);
}

module.exports = {
    addFilter,
    addAndFilter,
    addOrFilter,
    addSubFilter,
    addSort
}