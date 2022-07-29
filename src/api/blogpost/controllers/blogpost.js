
// custom below
// 'use strict';

// /**
//  *  blogpost controller
//  */

// const { createCoreController } = require('@strapi/strapi').factories;

// module.exports = createCoreController('api::blogpost.blogpost');

/**
 *  custom landing-page controller
 */

 const { createCoreController } = require("@strapi/strapi").factories;

 module.exports = createCoreController("api::blogpost.blogpost", ({ strapi }) => ({
 
     async findOne(ctx) {
        console.log(ctx.params)
         const { post_slug } = ctx.params
 
         const query = {
             filters: { post_slug },
             ...ctx.query,
         };
 
        //  console.log(query)
         const postFind = await strapi.entityService.findMany("api::blogpost.blogpost", query);
         
  
         const returnQuery = {
             populate: {
                 page_body: {
                     populate: {
                         source: true,
                         image: true,
                     }
                 },
                 featured_image: {
                    populate: {
                        formats: true,
                    }
                 },
                 tags: {
                     populate: {
                         tag: true,
                     },
                 }
             },
         }
 
         const returnPost = await strapi.entityService.findOne("api::blogpost.blogpost", postFind[0].id, returnQuery)
 
        //  const sanitizedReturn = await this.sanitizeOutput(returnPage);
 
         return this.transformResponse(returnPost);
     },
 }));