import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { vehicleSchema } from "../../types/vehicle";
import { z } from "zod";

import {
  createVehicle,
  deleteVehicleById,
  getVehicleById,
  getVehicles,
  updateVehicleById,
} from "../../services/vehicle.services";

import { CustomError } from "../../erros/custom-error";

export const VehicleRoutes: FastifyPluginAsyncZod = async (app) => {
  app.get(
    "/",
    {
      schema: {
        tags: ["vehicles"],
      },
    },
    async (req, res) => {
      const data = await getVehicles();

      res.send(data);
    }
  );

  app.get(
    "/:id",
    {
      schema: {
        tags: ["vehicles"],
        params: z.object({
          id: z.string().uuid(),
        }),
      },
    },
    async (req, res) => {
      const { id } = req.params;

      const data = await getVehicleById(id);

      if (!data) {
        throw new CustomError("Vehicle not found", 404);
      }

      res.send(data);
    }
  );

  app.post(
    "/",
    {
      schema: {
        tags: ["vehicles"],
        body: vehicleSchema,
      },
    },
    async (req, res) => {
      const { placa, chassi, renavam, modelo, marca, ano } = req.body;

      const data = await createVehicle({
        placa,
        chassi,
        renavam,
        modelo,
        marca,
        ano,
      });

      res.status(201).send(data);
    }
  );

  app.put(
    "/:id",
    {
      schema: {
        tags: ["vehicles"],
        params: z.object({
          id: z.string().uuid(),
        }),
        body: vehicleSchema.partial(),
      },
    },
    async (req, res) => {
      const { id } = req.params;

      const exists = await getVehicleById(id);

      if (!exists) {
        throw new CustomError("Vehicle not found", 404);
      }

      const data = await updateVehicleById(id, req.body);

      res.status(201).send(data);
    }
  );

  app.delete(
    "/:id",
    {
      schema: {
        tags: ["vehicles"],
        params: z.object({
          id: z.string().uuid(),
        }),
        response: {
          204: {},
        },
      },
    },
    async (req, res) => {
      const { id } = req.params;

      const exists = await getVehicleById(id);

      if (!exists) {
        throw new CustomError("Vehicle not found", 404);
      }

      await deleteVehicleById(id);

      res.status(204).send();
    }
  );
};
