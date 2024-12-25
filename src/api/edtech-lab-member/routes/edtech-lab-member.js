module.exports = {
  routes: [
    // {
    //  method: 'GET',
    //  path: '/edtech-lab-member',
    //  handler: 'edtech-lab-member.exampleAction',
    //  config: {
    //    policies: [],
    //    middlewares: [],
    //  },
    // },
    {
     method: 'GET',
     path: '/edtech-lab-members',
     handler: 'edtech-lab-member.find',
     config: {
       policies: [],
       middlewares: [],
     },
    },
  ],
};
