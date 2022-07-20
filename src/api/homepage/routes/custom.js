module.exports = {
    routes: [
        {
            method: 'GET',
            path: '/homepage/full',
            handler: 'homepage.find',
            config: {
                // middlewares: [
                //     'api::homepage.homepage-full'
                // ],
                auth: false
            }
        },
        
    ]
}