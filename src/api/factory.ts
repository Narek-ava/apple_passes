import express from "express";
import bodyParser from "body-parser";

import { MongoClient } from "mongodb";
import { createApplicationLogger } from "../logger/factory";
import { createErrorHandler, notFoundHandler } from "./middlewares/errors";
import { createApplePassHandler } from "./handlers/apple/createApplePassHandler";
import { CreateApplePassUsecase } from "../app/usecases/apple/CreateApplePassUsecase";
import { ApplePassValidator } from "../app/services/validators/ApplePassValidator";
import { MongoDbApplePassMapper } from "../app/repositories/mongodb/mappers/apple/MongoDbApplePassMapper";
import { MongoDbApplePassRepository } from "../app/repositories/mongodb/apple/MongoDbApplePassRepository";
import { defaultGenerateUniqueId } from "../app/models/common";
import { updateApplePassHandler } from "./handlers/apple/updateApplePassHandler";
import { UpdateApplePassUsecase } from "../app/usecases/apple/UpdateApplePassUsecase";
import { downloadApplePassHandler } from "./handlers/apple/downloadApplePassHandler";
import { DownloadApplePassUsecase } from "../app/usecases/apple/DownloadApplePassUsecase";
import { PassService } from "../app/services/apple/PassService";
import { CreateSubscribedDeviceUsecase } from "../app/usecases/apple/CreateSubscribedDeviceUsecase";
import { MongoDbSubscribedDeviceRepository } from "../app/repositories/mongodb/apple/MongoDbSubscribedDeviceRepository";
import { MongoDbSubscribedDeviceMapper } from "../app/repositories/mongodb/mappers/apple/MongoDbSubscribedDeviceMapper";
import { createSubscribedDeviceHandler } from "./handlers/apple/createSubscribedDeviceHandler";
import { deleteSubscribedDeviceHandler } from "./handlers/apple/deleteSubscribedDeviceHandler";
import { DeleteSubscribedDeviceUsecase } from "../app/usecases/apple/DeleteSubscribedDeviceUsecase";
import { getUpdatedPassesHandler } from "./handlers/apple/getUpdatedPassesHandler";
import { GetUpdatedPassesUsecase } from "../app/usecases/apple/GetUpdatedPassesUsecase";
import { logHandler } from "./handlers/apple/logHandler";
import { wrapAsync } from "./lib/async";
import { authorizationMiddleware } from "./middlewares/security";
import { createOrUpdateApplePassHandler } from "./handlers/apple/createOrUpdateApplePassHandler";

export function create(config) {
  const logger = createApplicationLogger(config.loggerOptions);

  const mongodbClient = new MongoClient(config.storages.mongodb.dsn, {
    connectTimeoutMS: config.storages.mongodb.connectionTimeoutMs,
    socketTimeoutMS: config.storages.mongodb.socketTimeoutMS,
  });
  const db = mongodbClient.db(config.storages.mongodb.database);

  const app = express();
  app.disable("x-powered-by");

  app.use(bodyParser.json());

  const applePassService = new PassService(config);
  const applePassValidator = new ApplePassValidator();

  const applePassMapper = new MongoDbApplePassMapper();
  const applePassRepository = new MongoDbApplePassRepository(
    db,
    applePassMapper
  );

  const subscribedDeviceMapper = new MongoDbSubscribedDeviceMapper();
  const subscribedDeviceRepository = new MongoDbSubscribedDeviceRepository(
    db,
    subscribedDeviceMapper
  );

  const createApplePassUsecase = new CreateApplePassUsecase(
    applePassValidator,
    defaultGenerateUniqueId,
    applePassRepository
  );

  const updateApplePassUsecase = new UpdateApplePassUsecase(
    applePassValidator,
    applePassRepository,
    subscribedDeviceRepository,
    config
  );

  const downloadApplePassUsecase = new DownloadApplePassUsecase(
    applePassRepository,
    applePassService,
    config
  );

  const createSubscribedDeviceUsecase = new CreateSubscribedDeviceUsecase(
    defaultGenerateUniqueId,
    subscribedDeviceRepository,
    applePassRepository
  );

  const deleteSubscribedDeviceUsecase = new DeleteSubscribedDeviceUsecase(
    subscribedDeviceRepository,
    applePassRepository
  );

  const getUpdatedPassesUsecase = new GetUpdatedPassesUsecase(
    subscribedDeviceRepository,
    applePassRepository
  );

  const checkAuthorizationMiddleware = wrapAsync(
    authorizationMiddleware(config.security.tokenSecret)
  );

  app.post(
    "/apple/v1/passes",
    checkAuthorizationMiddleware,
    createApplePassHandler(createApplePassUsecase, applePassService)
  );

  app.put(
    "/apple/v1/passes/:id",
    checkAuthorizationMiddleware,
    updateApplePassHandler(updateApplePassUsecase)
  );

  app.post(
    "/apple/v1/passes/createOrUpdate",
    checkAuthorizationMiddleware,
    createOrUpdateApplePassHandler(
      createApplePassUsecase,
      updateApplePassUsecase,
      applePassRepository,
      applePassService
    )
  );

  app.get(
    "/apple/v1/passes/:passTypeIdentifier/:id",
    downloadApplePassHandler(downloadApplePassUsecase)
  );

  app.post(
    "/apple/v1/devices/:deviceLibraryIdentifier/registrations/:passTypeIdentifier/:passId",
    createSubscribedDeviceHandler(createSubscribedDeviceUsecase)
  );

  app.delete(
    "/apple/v1/devices/:deviceLibraryIdentifier/registrations/:passTypeIdentifier/:passId",
    deleteSubscribedDeviceHandler(deleteSubscribedDeviceUsecase)
  );

  app.get(
    "/apple/v1/devices/:deviceLibraryIdentifier/registrations/:passTypeIdentifier",
    getUpdatedPassesHandler(getUpdatedPassesUsecase)
  );

  //todo
  app.post("/apple/v1/log", logHandler(logger));

  // Обработчики ошибок должны быть в конце списка!
  app.use(notFoundHandler);
  app.use(createErrorHandler(logger));

  return {
    logger,
    app,
    mongodbClient,
  };
}
