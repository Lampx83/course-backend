module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/curriculum-curricula/years',
      handler: 'curriculum-curriculum.getYears',
    },
    {
      method: 'GET',
      path: '/curriculum-curricula/knowledge-blocks',
      handler: 'curriculum-curriculum.getKnowledgeBlocks',
    }
  ]
}
