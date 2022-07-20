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
        populate[key] = getFullPopulateObject(value.component, maxDepth - 1);
      } else if (value.type === "dynamiczone") {
        console.log('*****DYNAMIC*****')
        const dynamicPopulate = value.components.reduce((prev, cur) => {
          const curPopulate = getFullPopulateObject(cur, maxDepth - 1);
          return curPopulate === true ? prev : merge(prev, curPopulate);
        }, {});
        populate[key] = isEmpty(dynamicPopulate) ? true : dynamicPopulate;
      } else if (value.type === "relation") {
        console.log('<<<<<RELATION>>>>>')
        
        const relationPopulate = getFullPopulateObject(
          value.target,
          maxDepth - 1
        );
        if (relationPopulate) {
          populate[key] = relationPopulate;
        }
      } else if (value.type === "media") {
        console.log('>>>>>MEDIA<<<<<<')
        // console.log(value.type)
        populate[key] = true;
      }
    }
  }
  return isEmpty(populate) ? true : { populate };
};

const modelUid = "api::homepage.homepage";

module.exports = createCoreController(modelUid, ({ strapi }) =>  ({

        // async customAction(ctx) {
            
        //     try {
        //         ctx.body = 'ok hello'
        //     } catch(err) {
        //         ctx.body = err
        //     }
        // },

        // async full(ctx) {

        //    const { data, meta } = await super.find(ctx)

        //    meta.foo = 'sheesh'
        //    return {data: data, ctx: ctx.request.query}
        //   },

          async find(ctx) {
            
            const { query } = ctx;
        
            const { results, meta } = await strapi.service(modelUid).find({
              ...getFullPopulateObject(modelUid),
              ...query,
            });
        
            const sanitizedEntities = await this.sanitizeOutput(results, ctx);
        
            return {
              data: sanitizedEntities,
              meta,
            };
          },
        
    })
)

