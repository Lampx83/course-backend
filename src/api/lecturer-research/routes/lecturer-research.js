module.exports = {
  routes: [
    // {
    //  method: 'GET',
    //  path: '/lecturer-research',
    //  handler: 'lecturer-research.exampleAction',
    //  config: {
    //    policies: [],
    //    middlewares: [],
    //  },µ
    // },
    {
     method: 'GET',
     path: '/lecturer-researches',
     handler: 'lecturer-research.find',
     config: {
       policies: [],
       middlewares: [],
     },
    },
  ],
};
