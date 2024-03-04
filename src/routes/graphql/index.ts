import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { validate, parse, graphql } from 'graphql';
import { schema } from './types/schema.js';
import depthLimit from 'graphql-depth-limit';
import { usersDataLoader } from './dataloader.js';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const errArr = validate(schema, parse(req.body.query), [depthLimit(5)]);
      if (errArr.length > 0) return { errors: errArr };
      const { prisma } = fastify;
      return await graphql({
        schema,
        source: req.body.query,
        variableValues: req.body.variables,
        contextValue: { prisma, loaders: { usersDataLoader: usersDataLoader(prisma) } },
      });
    },
  });
};

export default plugin;
