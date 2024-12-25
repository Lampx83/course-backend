module.exports = {
  routes: [
    // {
    //  method: 'GET',
    //  path: '/edtech-lab-seminar',
    //  handler: 'edtech-lab-seminar.exampleAction',
    //  config: {
    //    policies: [],
    //    middlewares: [],
    //  },
    // },
    {
     method: 'GET',
     path: '/edtech-lab-seminars',
     handler: 'edtech-lab-seminar.find',
     config: {
       policies: [],
       middlewares: [],
     },
    },
  ],
};
