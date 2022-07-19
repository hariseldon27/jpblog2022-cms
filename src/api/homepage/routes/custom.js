module.exports = {
    routes: [
        {
            method: 'GET',
            path: '/homepage/full',
            handler: 'homepage.full',
            config: {
                auth: false
            }
        },
        
    ]
}