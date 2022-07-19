'use strict';
/**
 *  homepage controller
 */

// const { createCoreController } = require('@strapi/strapi').factories;

// // module.exports = createCoreController('api::homepage.homepage');


const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::homepage.homepage', ({ strapi }) =>  ({

        async customAction(ctx) {
            
            try {
                ctx.body = 'ok hello'
            } catch(err) {
                ctx.body = err
            }
        },

        async full(ctx) {
           const query = { ...ctx.query }
           const { data, meta } = await super.find(ctx)

           meta.foo = 'sheesh'
           return {data: data, meta: meta, stuff: ctx.body}
          },

        
    })
)

