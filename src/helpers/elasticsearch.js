const {Client} = require('@elastic/elasticsearch');

const esClient = new Client({
  node: process.env.ES_NODE_URL || "http://localhost:9200",
  auth: {
    username: process.env.ES_AUTH_USERNAME || "",
    password: process.env.ES_AUTH_PASSWORD || "",
  }
});

const testConnection = async () => {
  try {
    const response = await esClient.ping();
    console.log('Elasticsearch cluster is up:', response);
  } catch (error) {
    console.error('Elasticsearch cluster is down:', error);
  } finally {
    if (esClient) {
      await esClient.close();
    }
  }
};

module.exports = {
  testConnection,
  esClient
};