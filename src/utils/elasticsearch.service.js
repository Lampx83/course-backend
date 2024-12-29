const {esClient} = require("../helpers/elasticsearch");
const {addMust, addShould} = require("./elasticsearch");
const {addSort} = require("../helpers/notion");

const create = async (index = "", id = "", body = {}) => {
  try {
    const createToElastic = await esClient.index({
      index,
      id,
      body,
    });

    return createToElastic;
  } catch (e) {
    console.error(`ES create exception ${index} --- ${id} --- ${body} ---- ${e.stack}`);
  }
}

const update = async (index = "", id = "", body) => {
  try {
    const updateElastic = await esClient.index({
      index,
      id,
      refresh: true,
      body,
    });
    return updateElastic;
  } catch (e) {
    console.error(`ES update exception  ${e.stack}`);
  }
}

const deleteById = async (index = "", id = "") => {
  try {
    const deleteToElastic = await esClient.delete({
      index,
      id
    });

    return deleteToElastic;
  } catch (e) {
    console.error('ES deleteById exception: ' + id, e.stack);
  }
}

const count = async (index = "", query) => {
  try {
    const countBody = await esClient.count({
      index,
      body: {
        query,
      },
    });

    return countBody?.body?.count || 0;
  } catch (e) {
    console.error('ES deleteById exception: ' + index, e.stack);
  }
}

const createIndex = async ({index = "", data = [], body = {}, isUpdate = false}) => {

  const BATCH_SIZE = 500;

  let checkIndexExist = await esClient.indices.exists({index});
  //reindex == true => delete index
  if (!isUpdate && checkIndexExist?.body) {
    await esClient.indices.delete({index});
    checkIndexExist = null;
    console.log(`Index ${index} deleted`);
  }

  if (!checkIndexExist?.body || isUpdate) {
    try {
      if (!isUpdate)
        await esClient.indices.create({
          index,
          body
        });

      if (data && data.length === 0) {
        console.log(`No data found for ${index} index`);
        return;
      }

      //split data by batch size
      const batches = [];
      for (let i = 0; i < data.length; i += BATCH_SIZE) {
        batches.push(data.slice(i, i + BATCH_SIZE));
      }
      for (const batch of batches) {
        const operations = batch.flatMap((doc) => {
          return [
            {index: {_index: index, _id: doc.id}},
            doc
          ]
        });

        const bulkResponse = (await esClient.bulk({
          refresh: true,
          body: operations
        })).body;
        if (bulkResponse.errors) {
          const erroredDocuments = [];
          bulkResponse?.items.forEach((action, i) => {
            const operation = Object.keys(action)[0];
            if (action[operation].error) {
              erroredDocuments.push({
                status: action[operation].status,
                error: action[operation].error,
                operation: operations[i * 2],
                document: operations[i * 2 + 1],
                categories: operations[i * 2 + 1].categories
              });
            }
          });
          console.error(`Bulk indexing ${index} errors:`, erroredDocuments || bulkResponse);
        }
        console.log(`Index ${index} created with ${batch.length} documents`);
      }

      return {
        status: true,
        message: `Index ${index} created with ${data.length}`
      }
    } catch (e) {
      console.error(`Error create index ${index}`, e.stack);
    }
  }
}

const createSubjectQuery = ({
  q = "",
  size = 10,
  start = 0,
  locale = "vi"
}) => {
  const esQuery = {
    from: start || 0,
    size: size || 10,
  };

  addMust(esQuery, {
    "term": {
      "locale": locale
    }
  });

  addMust(esQuery, {
    "query_string": {
      "query": `*${q}*`,
      "default_operator": "AND",
      "fields": ["name", "subjectCode"]
    }
  });
  esQuery.sort = {
    "_script": {
      "type": "number",
      "script": {
        "source": "params['_source']['curriculums'] != null ? params['_source']['curriculums'].length : 0",
        "lang": "painless"
      },
      "order": "desc"
    }
  };
  return esQuery;
}

const createSchoolQuery = ({
  q = "",
  size = 10,
  start = 0,
  locale = "vi"
}) => {
  const esQuery = {
    from: start || 0,
    size: size || 10,
  };

  addMust(esQuery, {
    "term": {
      "locale": locale
    }
  });

  addMust(esQuery, {
    "query_string": {
      "query": `*${q}*`,
      "default_operator": "AND",
      "fields": ["name", "schoolCode"]
    }
  });

  esQuery.sort = [{
    "name.keyword": {
      "order": "asc"
    }
  }]
  return esQuery;
}

const createFacultyQuery = ({
  q = "",
  size = 10,
  start = 0,
  locale = "vi"
}) => {
  const esQuery = {
    from: start || 0,
    size: size || 10,
  };

  addMust(esQuery, {
    "term": {
      "locale": locale
    }
  });

  addMust(esQuery, {
    "query_string": {
      "query": `*${q}*`,
      "default_operator": "AND",
      "fields": ["name", "facultyCode"]
    }
  });
  esQuery.sort = [{
    "name.keyword": {
      "order": "asc"
    }
  }]
  return esQuery;
}

const createMajorQuery = ({
  q = "",
  size = 10,
  start = 0,
  locale = "vi"
}) => {
  const esQuery = {
    from: start || 0,
    size: size || 10,
  };

  addMust(esQuery, {
    "term": {
      "locale": locale
    }
  });

  addShould(esQuery, {
    "query_string": {
      "query": `*${q}*`,
      "default_operator": "AND",
      "fields": ["name", "majorCode^2", "admissionCode^3"]
    },
  });

  esQuery.query.bool.minimum_should_match = 1;

  esQuery.sort = [
    {
      "_score": {
        "order": "desc"
      }
    },
    {
      "admissionCode.keyword": {
        "order": "asc"
      }
    },
  ]
  return esQuery;
}

const createCurriculumQuery = ({
  q = "",
  size = 10,
  start = 0,
  locale = "vi"
}) => {
  const esQuery = {
    from: start || 0,
    size: size || 10,
  };

  addMust(esQuery, {
    "term": {
      "locale": locale
    }
  });

  addMust(esQuery, {
    "query_string": {
      "query": `*${q}*`,
      "default_operator": "AND",
      "fields": ["name", "curriculumCode"]
    }
  });
  esQuery.sort = [{
    "name.keyword": {
      "order": "asc"
    }
  }]
  return esQuery;
}

module.exports = {
  create,
  update,
  deleteById,
  count,
  createIndex,
  createSubjectQuery,
  createSchoolQuery,
  createFacultyQuery,
  createMajorQuery,
  createCurriculumQuery
}
