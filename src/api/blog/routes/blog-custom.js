
module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/blogs/slug/:slug',
      handler: 'blog.findBySlug',
    }
  ]
}