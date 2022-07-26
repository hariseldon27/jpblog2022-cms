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

        const query = {
            filters: { page_name },
            ...ctx.query,
        };

        const pageFind = await strapi.entityService.findMany("api::landing-page.landing-page", query);
        
 
        const returnQuery = {
            populate: {
                page_hero: {
                    populate: {
                        image: true
                    }
                },
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

        const sanitizedReturn = await this.sanitizeOutput(returnPage);

        return this.transformResponse(returnPage);
    },
}));