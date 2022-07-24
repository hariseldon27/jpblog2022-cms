// 'use strict';

// /**
//  *  landing-page controller
//  */

// const { createCoreController } = require('@strapi/strapi').factories;

// module.exports = createCoreController('api::landing-page.landing-page');

"use strict";

/**
 *  custom landing-page controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::landing-page.landing-page", ({ strapi }) => ({

    async findOne(ctx) {
        const { page_name } = ctx.params
        // console.log(ctx)
        // console.log(ctx.params.id)
        const query = {
            filters: { page_name },
            ...ctx.query,
        };
        // console.log(query)
        const pageFind = await strapi.entityService.findMany("api::landing-page.landing-page", query);
        
 
        const returnQuery = {
            populate: {
                page_body: {
                    populate: {
                        source: true,
                        image: true,
                    }
                },
                blogposts: {
                    populate: {
                        title: true,
                        featured_image: true,
                        // authors: true, // i want this, but we need to figure out how to sanitize properly
                        tags: true,
                    },
                }
            },
            // ...ctx.query
        }

        const returnPage = await strapi.entityService.findOne("api::landing-page.landing-page", pageFind[0].id, returnQuery)
        // console.log('VVVVVVVVVV')
        // console.log('VV RAW  VV')
        // console.log(returnPage)
        // console.log('^^^^^^^^^^^^^^^^')

        const sanitizedReturn = await this.sanitizeOutput(returnPage);

        // console.log('VVVVVVVVVVVVVVVV')
        // console.log('VV SANITIZED  VV')
        // console.log(sanitizedEntity)
        // console.log('^^^^^^^^^^^^^^^^')


        return this.transformResponse(returnPage);
    },
}));