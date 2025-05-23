import { prisma } from "../../services/prisma";
import {
  getVehicles,
  getVehicleById,
  createVehicle,
  updateVehicleById,
  deleteVehicleById,
} from "../../services/vehicle.services";
import { CustomError } from "../../erros/custom-error";

// Mock do cliente Prisma
jest.mock("../../services/prisma", () => ({
  prisma: {
    vehicle: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

// Converter o mock do Prisma para o tipo correto
const mockPrismaVehicle = prisma.vehicle as jest.MockedObject<
  typeof prisma.vehicle
>;

describe("Vehicle Services - Unit Tests", () => {
  // Limpar os mocks antes de cada teste
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getVehicles", () => {
    it("should return a list of vehicles", async () => {
      // Definir o valor de retorno para o mock do findMany
      const mockVehicles = [
        {
          id: "1",
          placa: "ABC1234",
          chassi: "CHASSI1",
          renavam: "RENAVAM1",
          modelo: "MODELO1",
          marca: "MARCA1",
          ano: 2020,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "2",
          placa: "DEF5678",
          chassi: "CHASSI2",
          renavam: "RENAVAM2",
          modelo: "MODELO2",
          marca: "MARCA2",
          ano: 2021,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      mockPrismaVehicle.findMany.mockResolvedValue(mockVehicles);

      const result = await getVehicles();

      expect(result).toEqual(mockVehicles);
      expect(mockPrismaVehicle.findMany).toHaveBeenCalledTimes(1);
      expect(mockPrismaVehicle.findMany).toHaveBeenCalledWith({
        orderBy: {
          createdAt: "desc",
        },
      });
    });

    it("should return an empty list if no vehicles are found", async () => {
      mockPrismaVehicle.findMany.mockResolvedValue([]);

      const result = await getVehicles();

      expect(result).toEqual([]);
      expect(mockPrismaVehicle.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe("getVehicleById", () => {
    it("should return a vehicle if found", async () => {
      const mockVehicle = {
        id: "1",
        placa: "ABC1234",
        chassi: "CHASSI1",
        renavam: "RENAVAM1",
        modelo: "MODELO1",
        marca: "MARCA1",
        ano: 2020,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      mockPrismaVehicle.findUnique.mockResolvedValue(mockVehicle);

      const result = await getVehicleById("1");

      expect(result).toEqual(mockVehicle);
      expect(mockPrismaVehicle.findUnique).toHaveBeenCalledTimes(1);
      expect(mockPrismaVehicle.findUnique).toHaveBeenCalledWith({
        where: {
          id: "1",
        },
      });
    });

    it("should throw CustomError with status 404 if vehicle is not found", async () => {
      mockPrismaVehicle.findUnique.mockResolvedValue(null);

      await expect(getVehicleById("non-existent-id")).rejects.toThrow(
        new CustomError("Vehicle not found", 404)
      );
      expect(mockPrismaVehicle.findUnique).toHaveBeenCalledTimes(1);
      expect(mockPrismaVehicle.findUnique).toHaveBeenCalledWith({
        where: {
          id: "non-existent-id",
        },
      });
    });
  });

  describe("createVehicle", () => {
    it("should create a new vehicle", async () => {
      const newVehicleData = {
        placa: "ABC1234",
        chassi: "CHASSI1",
        renavam: "RENAVAM1",
        modelo: "MODELO1",
        marca: "MARCA1",
        ano: 2020,
      };
      const createdVehicle = {
        id: "new-id",
        ...newVehicleData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      mockPrismaVehicle.create.mockResolvedValue(createdVehicle);

      const result = await createVehicle(newVehicleData as any);

      expect(result).toEqual(createdVehicle);
      expect(mockPrismaVehicle.create).toHaveBeenCalledTimes(1);
      expect(mockPrismaVehicle.create).toHaveBeenCalledWith({
        data: {
          ...newVehicleData,
        },
      });
    });
  });

  describe("updateVehicleById", () => {
    it("should update an existing vehicle", async () => {
      const updatedData = { modelo: "MODELO_ATUALIZADO" };
      const existingVehicle = {
        id: "1",
        placa: "ABC1234",
        chassi: "CHASSI1",
        renavam: "RENAVAM1",
        modelo: "MODELO1",
        marca: "MARCA1",
        ano: 2020,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const updatedVehicle = {
        ...existingVehicle,
        ...updatedData,
        updatedAt: new Date(),
      };

      // Mockamos findUnique primeiro para simular a verificação de existência (embora a lógica de verificação esteja na rota, é bom testar o update diretamente também)
      mockPrismaVehicle.findUnique.mockResolvedValue(existingVehicle);
      mockPrismaVehicle.update.mockResolvedValue(updatedVehicle);

      const result = await updateVehicleById("1", updatedData);

      expect(result).toEqual(updatedVehicle);
      expect(mockPrismaVehicle.update).toHaveBeenCalledTimes(1);
      expect(mockPrismaVehicle.update).toHaveBeenCalledWith({
        where: {
          id: "1",
        },
        data: {
          ...updatedData,
        },
      });
    });

    // Note: The "vehicle not found" case for update is handled in the route handler.
    // Unit tests for the service focus on the service's direct responsibility.
  });

  describe("deleteVehicleById", () => {
    it("should delete a vehicle", async () => {
      // Mockamos findUnique primeiro para simular a verificação de existência (embora a lógica de verificação esteja na rota)
      const existingVehicle = {
        id: "1",
        placa: "ABC1234",
        chassi: "CHASSI1",
        renavam: "RENAVAM1",
        modelo: "MODELO1",
        marca: "MARCA1",
        ano: 2020,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      mockPrismaVehicle.findUnique.mockResolvedValue(existingVehicle);
      mockPrismaVehicle.delete.mockResolvedValue(existingVehicle); // Return the deleted object

      await deleteVehicleById("1");

      expect(mockPrismaVehicle.delete).toHaveBeenCalledTimes(1);
      expect(mockPrismaVehicle.delete).toHaveBeenCalledWith({
        where: {
          id: "1",
        },
      });
    });

    // Note: The "vehicle not found" case for delete is handled in the route handler.
    // Unit tests for the service focus on the service's direct responsibility.
  });
});
