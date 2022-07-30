
// custom below
// 'use strict';

// /**
//  *  blogpost controller
//  */

// const { createCoreController } = require('@strapi/strapi').factories;

// module.exports = createCoreController('api::blogpost.blogpost');

/**
 *  custom blogpost controller
 */

 const { createCoreController } = require("@strapi/strapi").factories;

 module.exports = createCoreController("api::blogpost.blogpost", ({ strapi }) => ({
 
     async findOne(ctx) {
        // console.log(ctx.params)
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
                 },
                 id: true,
                 meta: true,
             },
         }
 
         const returnPost = await strapi.entityService.findOne("api::blogpost.blogpost", postFind[0].id, returnQuery)
 
        //  const sanitizedReturn = await this.sanitizeOutput(returnPage); // this strips out all the related data - need to find and correct in santizer

        const prevEntryArr = await strapi.entityService.findMany('api::blogpost.blogpost', {
            sort: {
                publishedAt: 'asc'
            },
            filters: {
              publishedAt: {
                $lt: returnPost.publishedAt,
              },
            },
          })
        const nextEntryArr = await strapi.entityService.findMany('api::blogpost.blogpost', {
            sort: {
                publishedAt: 'asc'
            },
            filters: {
              publishedAt: {
                $gt: returnPost.publishedAt,
              },
            },
          })

        //   const paginationQuery = {
        //     populate: {
        //         featured_image: {
        //             populate: {
        //                 formats: true
        //             }
        //         }
        //     }
        //   }

          const prevEntry = prevEntryArr.length > 0 ? await strapi.entityService.findOne('api::blogpost.blogpost', prevEntryArr[0].id) : null
          const nextEntry = nextEntryArr.length > 0 ? await strapi.entityService.findOne('api::blogpost.blogpost', nextEntryArr[0].id) : null

          const pagination = {
            prevPost: prevEntry,
            nextPost: nextEntry,

          }
         return this.transformResponse(returnPost, pagination);
     },
 }));