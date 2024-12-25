module.exports = {
  routes: [
    // {
    //  method: 'GET',
    //  path: '/thesis',
    //  handler: 'thesis.exampleAction',
    //  config: {
    //    policies: [],
    //    middlewares: [],
    //  },
    // },
    {
     method: 'GET',
     path: '/theses',
     handler: 'thesis.find',
     config: {
       policies: [],
       middlewares: [],
     },
    },
  ],
};
