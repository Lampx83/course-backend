module.exports = {
  routes: [
    {
     method: 'GET',
     path: '/search',
     handler: 'search.search',
     config: {
       policies: [],
       middlewares: [],
     },
    },
    {
      method: 'POST',
      path: '/search/reindex',
      handler: 'search.reindex',
      config: {
        policies: [],
        middlewares: [],
      },
    }
  ],
};