import z from "zod";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

export const subscribeToEventRoute: FastifyPluginAsyncZod = async (app) => {
  app.post(
    "/subscriptions",
    {
      schema: {
        summary: "Subscribe to an event",
        tags: ["subscription"],
        description: "Subscribe to an event by providing your name and email",
        body: z.object({
          name: z.string(),
          email: z.string().email(),
        }),
        response: {
          201: z.object({
            name: z.string(),
            email: z.string().email(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { name, email } = request.body;
      return reply.status(201).send({ name, email });
    }
  );
}