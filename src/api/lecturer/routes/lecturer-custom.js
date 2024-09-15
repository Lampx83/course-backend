module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/lecturers/slugs/:slug',
      handler: 'lecturer.findBySlug',
    }
  ]
}