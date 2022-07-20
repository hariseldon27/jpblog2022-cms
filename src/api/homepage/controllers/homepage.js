'use strict';
/**
 *  homepage controller
 */

// const { createCoreController } = require('@strapi/strapi').factories;

// // module.exports = createCoreController('api::homepage.homepage');


const { createCoreController } = require('@strapi/strapi').factories;


const { isEmpty, merge } = require("lodash/fp");

const getModelPopulationAttributes = (model) => {
  if (model.uid === "plugin::upload.file") {
    const { related, ...attributes } = model.attributes;
    // console.log('****attr: ', attributes)
    return attributes;
  }

  return model.attributes;
};

const getFullPopulateObject = (modelUid, maxDepth = 20) => {
  if (maxDepth <= 1) {
    return true;
  }
  if (modelUid === "admin::user") {
    return undefined;
  }

  const populate = {};
  const model = strapi.getModel(modelUid);
  for (const [key, value] of Object.entries(
    getModelPopulationAttributes(model)

  )) {
    if (value) {
      if (value.type === "component") {
        console.log('+++++COMPONENT++++')
        console.log(`====VALUE: `, value)
        populate[key] = getFullPopulateObject(value.component, maxDepth - 1);
        console.log(`component!!!POPULATE!!!!`, populate)
      } else if (value.type === "dynamiczone") {
        console.log('*****DYNAMIC*****')
        console.log(`====VALUE: `, value)
        const dynamicPopulate = value.components.reduce((prev, cur) => {
          const curPopulate = getFullPopulateObject(cur, maxDepth - 1);
          return curPopulate === true ? prev : merge(prev, curPopulate);
        }, {});
        populate[key] = isEmpty(dynamicPopulate) ? true : dynamicPopulate;
        console.log(`dynamic!!!POPULATE!!!!`, populate)
        
      } else if (value.type === "relation") {
        console.log('<<<<<RELATION>>>>>')
        console.log(`====VALUE: `, value)
        const relationPopulate = getFullPopulateObject(
          value.target,
          maxDepth - 1
        );
        if (relationPopulate) {
            console.log(`relationshipPopulate: `, relationPopulate)
          populate[key] = relationPopulate;
        }
        console.log(`!!!POPULATE!!!!`, populate)

      } else if (value.type === "media") {
        console.log('>>>>>MEDIA<<<<<<')
        console.log(value)
        populate[key] = true;
        console.log(`media!!!POPULATE!!!!`, populate)

      }
    }
  }
  console.log(`populate obj: `, populate)
  return isEmpty(populate) ? true : { populate };
};

const modelUid = "api::homepage.homepage";

module.exports = createCoreController(modelUid, ({ strapi }) =>  ({

        async full(ctx) {
            
            const { query } = ctx;
            console.log(`ctx: `, ctx)
            const { results, meta } = await strapi.service(modelUid).find({
              ...getFullPopulateObject(modelUid),
              ...query,
            });
            console.log('*********************')
            console.log('modelUid: ', modelUid)
            console.log('query: ', query)
            console.log(`meta: `, meta)
            console.log(`results: `, results)
            console.log('*********************')

            const sanitizedEntities = await this.sanitizeOutput(results, ctx);
        
            return {
              data: sanitizedEntities,
              meta,
            };
        },
        async tryme(ctx) {
            const { query } = ctx;

            const entity = await strapi.entityService.findMany('api::homepage.homepage', {
                populate: {
                    top_landing: {
                        populate: '*'
                    },
                    homepage_body: {
                        populate: '*'
                        // populate: {
                        //     hero: {
                        //         populate: '*'
                        //     },
                        //     image_collection: {
                        //         populate: '*'
                        //     },
                        //     rich_text: {
                        //         populate: '*'
                        //     }
                        // }
                    },
                    },
                },
            );
            const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
    
            return this.transformResponse(sanitizedEntity);
        }
}
)
)

