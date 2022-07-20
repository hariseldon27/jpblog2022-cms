module.exports = {
    routes: [
        {
            method: 'GET',
            path: '/homepage/full',
            handler: 'homepage.full',
            config: {
                // middlewares: [
                //     'api::homepage.homepage-full'
                // ],
                auth: false
            }
        },
        {
            method: 'GET',
            path: '/homepage/tryme',
            handler: 'homepage.tryme',
            config: {
                auth: false,
            },
        }
        
    ]
}