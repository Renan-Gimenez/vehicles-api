import { z } from "zod";
import { type Vehicle, vehicleSchema } from "../types/vehicle";
import { prisma } from "./prisma";
import { CustomError } from "../erros/custom-error";

export const getVehicles = async () => {
  const data = await prisma.vehicle.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
};

export const getVehicleById = async (id: string) => {
  const data = await prisma.vehicle.findUnique({
    where: {
      id,
    },
  });

  if (!data) {
    throw new CustomError("Vehicle not found", 404);
  }

  return data;
};

export const createVehicle = async (vehicle: Vehicle) => {
  const data = await prisma.vehicle.create({
    data: {
      ...vehicle,
    },
  });

  return data;
};

const partialVehicleSchema = vehicleSchema.partial();
type VehicleUpdate = z.infer<typeof partialVehicleSchema>;

export const updateVehicleById = async (id: string, vehicle: VehicleUpdate) => {
  const data = await prisma.vehicle.update({
    where: {
      id,
    },
    data: {
      ...vehicle,
    },
  });

  return data;
};

export const deleteVehicleById = async (id: string) => {
  await prisma.vehicle.delete({
    where: {
      id,
    },
  });
};
