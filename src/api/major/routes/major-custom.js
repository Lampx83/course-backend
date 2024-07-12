
module.exports = {
    routes: [
        {
            method: 'GET',
            path: '/majors/slug/:slug',
            handler: 'major.findBySlug',
        }
    ]
}