module.exports = {
  routes: [
    // {
    //  method: 'GET',
    //  path: '/alumni-list',
    //  handler: 'alumni-list.exampleAction',
    //  config: {
    //    policies: [],
    //    middlewares: [],
    //  },
    // },
    {
      method: 'GET',
      path: '/alumni-lists',
      handler: 'alumni-list.find',
      config: {
       policies: [],
       middlewares: [],
      },
    }
  ],
};
