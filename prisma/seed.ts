import { prisma } from "../src/services/prisma";

const main = async () => {
  const vehicles = await Promise.all([
    prisma.vehicle.upsert({
      where: { placa: "JHY-2741" },
      update: {},
      create: {
        placa: "JHY-2741",
        chassi: "9BWZZZ377VT004123",
        renavam: "07483920561",
        modelo: "Corolla",
        marca: "Toyota",
        ano: 2018,
      },
    }),
    prisma.vehicle.upsert({
      where: { placa: "QNZ-8392" },
      update: {},
      create: {
        placa: "QNZ-8392",
        chassi: "8AGH43TRZP1928374",
        renavam: "53827164983",
        modelo: "Onix",
        marca: "Chevrolet",
        ano: 2020,
      },
    }),
    prisma.vehicle.upsert({
      where: { placa: "BKP-1945" },
      update: {},
      create: {
        placa: "BKP-1945",
        chassi: "93HFZ3540EZ112395",
        renavam: "87841293655",
        modelo: "HB20",
        marca: "Hyundai",
        ano: 2022,
      },
    }),
    prisma.vehicle.upsert({
      where: { placa: "TXL-5531" },
      update: {},
      create: {
        placa: "TXL-5531",
        chassi: "2HGCM82633A778899",
        renavam: "11329847609",
        modelo: "Civic",
        marca: "Honda",
        ano: 2017,
      },
    }),
    prisma.vehicle.upsert({
      where: { placa: "MGK-4823" },
      update: {},
      create: {
        placa: "MGK-4823",
        chassi: "WVWZZZ1JZXW005432",
        renavam: "60198273421",
        modelo: "Golf",
        marca: "Volkswagen",
        ano: 2016,
      },
    }),
    prisma.vehicle.upsert({
      where: { placa: "RDV-7164" },
      update: {},
      create: {
        placa: "RDV-7164",
        chassi: "1HGCM82633A234567",
        renavam: "90843716544",
        modelo: "Fusion",
        marca: "Ford",
        ano: 2015,
      },
    }),

    // Novos registros
    prisma.vehicle.upsert({
      where: { placa: "GHP-2419" },
      update: {},
      create: {
        placa: "GHP-2419",
        chassi: "9FBZZZ87ZRT345876",
        renavam: "12345678901",
        modelo: "Uno",
        marca: "Fiat",
        ano: 2014,
      },
    }),
    prisma.vehicle.upsert({
      where: { placa: "LWK-0938" },
      update: {},
      create: {
        placa: "LWK-0938",
        chassi: "3VWFE21C04M000123",
        renavam: "45678901234",
        modelo: "Jetta",
        marca: "Volkswagen",
        ano: 2021,
      },
    }),
    prisma.vehicle.upsert({
      where: { placa: "XPD-6842" },
      update: {},
      create: {
        placa: "XPD-6842",
        chassi: "1FTFW1ET1EFA12345",
        renavam: "23456789012",
        modelo: "Ranger",
        marca: "Ford",
        ano: 2019,
      },
    }),
    prisma.vehicle.upsert({
      where: { placa: "NKL-5390" },
      update: {},
      create: {
        placa: "NKL-5390",
        chassi: "5NMS3CAD7LH123456",
        renavam: "98765432100",
        modelo: "Santa Fe",
        marca: "Hyundai",
        ano: 2020,
      },
    }),
    prisma.vehicle.upsert({
      where: { placa: "TYZ-1102" },
      update: {},
      create: {
        placa: "TYZ-1102",
        chassi: "JHMGE8H52DC123456",
        renavam: "32109876543",
        modelo: "Fit",
        marca: "Honda",
        ano: 2018,
      },
    }),
    prisma.vehicle.upsert({
      where: { placa: "FQC-3765" },
      update: {},
      create: {
        placa: "FQC-3765",
        chassi: "2C4RDGBG4ER123456",
        renavam: "19283746501",
        modelo: "Caravan",
        marca: "Dodge",
        ano: 2015,
      },
    }),
    prisma.vehicle.upsert({
      where: { placa: "JDM-8246" },
      update: {},
      create: {
        placa: "JDM-8246",
        chassi: "4T1BF1FK7GU123456",
        renavam: "84736291028",
        modelo: "Camry",
        marca: "Toyota",
        ano: 2016,
      },
    }),
    prisma.vehicle.upsert({
      where: { placa: "WVB-7349" },
      update: {},
      create: {
        placa: "WVB-7349",
        chassi: "1G1ZT51896F123456",
        renavam: "47382910456",
        modelo: "Malibu",
        marca: "Chevrolet",
        ano: 2017,
      },
    }),
    prisma.vehicle.upsert({
      where: { placa: "CVR-5032" },
      update: {},
      create: {
        placa: "CVR-5032",
        chassi: "JN8AS5MT4CW123456",
        renavam: "56283910472",
        modelo: "X-Trail",
        marca: "Nissan",
        ano: 2019,
      },
    }),
    prisma.vehicle.upsert({
      where: { placa: "BKL-3728" },
      update: {},
      create: {
        placa: "BKL-3728",
        chassi: "1HGCM82633A765432",
        renavam: "76543219876",
        modelo: "Accord",
        marca: "Honda",
        ano: 2013,
      },
    }),
  ]);

  console.log("Seeded vehicles:", vehicles);
};

const runSeed = async () => {
  try {
    await main();
    console.log("Database has been seeded");
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
};

runSeed();
