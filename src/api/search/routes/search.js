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
    },
    {
      method: 'GET',
      path: '/search/curriculum',
      handler: 'search.searchCurriculum',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/search/major',
      handler: 'search.searchMajor',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
