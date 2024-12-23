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

const createSelectFilter = ({ key, value, operation = "equals" }) => {
  return {
    property: key,
    select: {
      [operation]: value,
    },
  };
};

const createMultiSelectFilter = ({ key, value, operation = "contains" }) => {
  return {
    property: key,
    multi_select: {
      [operation]: value,
    },
  };
};

const createDateFilter = ({ key, value, operation = "equals" }) => {
  return {
    property: key,
    date: {
      [operation]: value,
    },
  };
};

const createStatusFilter = ({ key, value, operation = "equals" }) => {
  return {
    property: key,
    status: {
      [operation]: value,
    },
  };
}

const createCheckBoxFilter = ({ key, value }) => {
  return {
    property: key,
    checkbox: {
      equals: value,
    }
  }
}

module.exports = {
    addFilter,
    addAndFilter,
    addOrFilter,
    addSubFilter,
    addSort,
    createSelectFilter,
    createMultiSelectFilter,
    createDateFilter,
    createStatusFilter,
    createCheckBoxFilter
}