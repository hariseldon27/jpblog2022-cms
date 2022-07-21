'use strict';
/**
 *  homepage controller
 */

// const { createCoreController } = require('@strapi/strapi').factories;

// // module.exports = createCoreController('api::homepage.homepage');


const { createCoreController } = require('@strapi/strapi').factories;


const modelUid = "api::homepage.homepage";

// declarations for the gimme function
// see @urbandale's post for context: https://forum.strapi.io/t/strapi-v4-populate-media-and-dynamiczones-from-components/12670/26
const components = {
    Image: true, // get data for media item field called "Image"
    articles: {
        populate: {
            articles: {
                populate: {
                    display_text: true,
                    blogpost: true,
                }
            },
        },
    homepage_body: {
        populate: {
            hero: {
                title: true
            }
        }
    }
    },
  }

module.exports = createCoreController(modelUid, ({ strapi }) =>  ({

        async full(ctx) {
            const { data, meta } = await super.find(ctx);
            const model = strapi.getModel(modelUid)
            // some more logic
            console.log('************')
            // console.log(model.attributes.top_landing)
            console.log(ctx.response)
            console.log('************')
            const sanitizedEntity = await this.sanitizeOutput(data, ctx);
            // console.log('************')
            // console.log(sanitizedEntity)
            // console.log('************')
            return this.transformResponse(sanitizedEntity);
            // return { data };

        },

        async tryme(ctx) {
            const { query } = ctx;

            const entity = await strapi.entityService.findMany('api::homepage.homepage', {
                populate: {
                    // >>notes: this is working nicely, keep following the QS examples in docs
                    //top landing works enough - again, can't get the blogpost relationship
                    top_landing: {
                        populate: {
                            // image: {
                            //     populate: {
                            //         formats: true
                            //     }
                            // },
                            component: {
                                populate: {
                                    blogpost: {
                                        populate: {
                                            title: true
                                        }
                                    }
                                }
                            }
                        }
                    },
                    //body works - but toooo much data
                    // homepage_body: {
                    //     populate: '*'
                    // },
                    // we are stuck on the 'articles' array - how do we get the associated blogpost?

                    articles: {
                        populate: {
                            article_entry: {
                                populate: {
                                    display_text: false,
                                    blogpost: true,
                                }
                            },
                        },

                    },
                }
            },);
            const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
    
            return this.transformResponse(sanitizedEntity);
        },
        ///from strapi forum
        async gimme(ctx) {
            // console.log(ctx.query.populate)
            // overwrite default populate=* functionality
            if (ctx.query.populate === '*') {
                console.log('yep')
              const entity = await strapi.entityService.findMany(modelUid, {
                ...ctx.query,
                populate: components,
              })
              const sanitizedEntity = await this.sanitizeOutput(entity, ctx)
      
              return this.transformResponse(sanitizedEntity)
            }
            // maintain default functionality for all other request
            return super.find(ctx)
          },
}
)
)

