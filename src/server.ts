import fastify from "fastify";
import cors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";

import { VehicleRoutes } from "./routes/vehicles/vehicle.routes";
import { errorHandler } from "./error-handler";

import { env } from "./env";

export const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(cors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
});

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.setErrorHandler(errorHandler);

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Vehicle API",
      description: "API for vehicle management",
      version: "1.0.0",
    },
  },
  transform: jsonSchemaTransform,
});
app.register(fastifySwaggerUi, {
  routePrefix: "/docs",
});

app.register(VehicleRoutes, { prefix: "/vehicles" });

app.listen({ port: env.PORT, host: "0.0.0.0" }).then(() => {
  console.log(`Server running on port ${env.PORT}`);
});
