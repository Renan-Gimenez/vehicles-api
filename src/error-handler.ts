import { FastifyInstance } from "fastify";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";

import { CustomError } from "./erros/custom-error";

type FastifyErrorHandler = FastifyInstance["errorHandler"];

const code = {
  400: "BAD_REQUEST",
  401: "UNAUTHORIZED",
  403: "FORBIDDEN",
  404: "NOT_FOUND",
  409: "CONFLICT",
  500: "INTERNAL_SERVER_ERROR",
  VALIDATION: "VALIDATION_ERROR",
};

export const errorHandler: FastifyErrorHandler = (error, req, res) => {
  console.log(error);

  if (error.validation) {
    const details = error.validation.map((err) => ({
      field: err.instancePath.replace("/", ""),
      message: err.message,
    }));

    res.status(400).send({
      error: {
        code: code.VALIDATION,
        message: "Invalid input",
        details,
      },
    });
    return;
  }

  if (error instanceof ZodError) {
    res.status(400).send({
      message: "ERRO DO ZOD",
    });
    return;
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    let statusCode;
    let errorCode;
    let message;

    switch (error.code) {
      case "P2002":
        statusCode = 409;
        errorCode = code[409];
        message =
          "Unique constraint failed. A record with this value already exists.";
        break;
      case "P2025":
        statusCode = 404;
        errorCode = code[404];
        message = "Record not found.";
        break;
      default:
        statusCode = 400;
        errorCode = code[400];
        message = "Prisma error: " + error.message;
        break;
    }

    res.status(statusCode).send({
      error: {
        code: errorCode,
        message,
        meta: error.meta,
      },
    });
    return;
  }

  if (error instanceof CustomError) {
    const errorCode =
      code[error.statusCode as keyof typeof code] ?? "UNKNOWN_ERROR";

    res.status(error.statusCode || 400).send({
      message: error.message,
      code: errorCode,
    });
    return;
  }

  res.status(500).send({
    code: code[500],
    message: "Erro Interno no servidor",
  });
};
