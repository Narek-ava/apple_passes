"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongodb_1 = require("mongodb");
const factory_1 = require("../logger/factory");
const errors_1 = require("./middlewares/errors");
const createApplePassHandler_1 = require("./handlers/apple/createApplePassHandler");
const CreateApplePassUsecase_1 = require("../app/usecases/apple/CreateApplePassUsecase");
const ApplePassValidator_1 = require("../app/services/validators/ApplePassValidator");
const MongoDbApplePassMapper_1 = require("../app/repositories/mongodb/mappers/apple/MongoDbApplePassMapper");
const MongoDbApplePassRepository_1 = require("../app/repositories/mongodb/apple/MongoDbApplePassRepository");
const common_1 = require("../app/models/common");
const updateApplePassHandler_1 = require("./handlers/apple/updateApplePassHandler");
const UpdateApplePassUsecase_1 = require("../app/usecases/apple/UpdateApplePassUsecase");
const downloadApplePassHandler_1 = require("./handlers/apple/downloadApplePassHandler");
const DownloadApplePassUsecase_1 = require("../app/usecases/apple/DownloadApplePassUsecase");
const PassService_1 = require("../app/services/apple/PassService");
const CreateSubscribedDeviceUsecase_1 = require("../app/usecases/apple/CreateSubscribedDeviceUsecase");
const MongoDbSubscribedDeviceRepository_1 = require("../app/repositories/mongodb/apple/MongoDbSubscribedDeviceRepository");
const MongoDbSubscribedDeviceMapper_1 = require("../app/repositories/mongodb/mappers/apple/MongoDbSubscribedDeviceMapper");
const createSubscribedDeviceHandler_1 = require("./handlers/apple/createSubscribedDeviceHandler");
const deleteSubscribedDeviceHandler_1 = require("./handlers/apple/deleteSubscribedDeviceHandler");
const DeleteSubscribedDeviceUsecase_1 = require("../app/usecases/apple/DeleteSubscribedDeviceUsecase");
const getUpdatedPassesHandler_1 = require("./handlers/apple/getUpdatedPassesHandler");
const GetUpdatedPassesUsecase_1 = require("../app/usecases/apple/GetUpdatedPassesUsecase");
const logHandler_1 = require("./handlers/apple/logHandler");
const async_1 = require("./lib/async");
const security_1 = require("./middlewares/security");
const createOrUpdateApplePassHandler_1 = require("./handlers/apple/createOrUpdateApplePassHandler");
function create(config) {
    const logger = (0, factory_1.createApplicationLogger)(config.loggerOptions);
    const mongodbClient = new mongodb_1.MongoClient(config.storages.mongodb.dsn, {
        connectTimeoutMS: config.storages.mongodb.connectionTimeoutMs,
        socketTimeoutMS: config.storages.mongodb.socketTimeoutMS,
    });
    const db = mongodbClient.db(config.storages.mongodb.database);
    const app = (0, express_1.default)();
    app.disable("x-powered-by");
    app.use(body_parser_1.default.json());
    const applePassService = new PassService_1.PassService(config);
    const applePassValidator = new ApplePassValidator_1.ApplePassValidator();
    const applePassMapper = new MongoDbApplePassMapper_1.MongoDbApplePassMapper();
    const applePassRepository = new MongoDbApplePassRepository_1.MongoDbApplePassRepository(db, applePassMapper);
    const subscribedDeviceMapper = new MongoDbSubscribedDeviceMapper_1.MongoDbSubscribedDeviceMapper();
    const subscribedDeviceRepository = new MongoDbSubscribedDeviceRepository_1.MongoDbSubscribedDeviceRepository(db, subscribedDeviceMapper);
    const createApplePassUsecase = new CreateApplePassUsecase_1.CreateApplePassUsecase(applePassValidator, common_1.defaultGenerateUniqueId, applePassRepository);
    const updateApplePassUsecase = new UpdateApplePassUsecase_1.UpdateApplePassUsecase(applePassValidator, applePassRepository, subscribedDeviceRepository, config);
    const downloadApplePassUsecase = new DownloadApplePassUsecase_1.DownloadApplePassUsecase(applePassRepository, applePassService, config);
    const createSubscribedDeviceUsecase = new CreateSubscribedDeviceUsecase_1.CreateSubscribedDeviceUsecase(common_1.defaultGenerateUniqueId, subscribedDeviceRepository, applePassRepository);
    const deleteSubscribedDeviceUsecase = new DeleteSubscribedDeviceUsecase_1.DeleteSubscribedDeviceUsecase(subscribedDeviceRepository, applePassRepository);
    const getUpdatedPassesUsecase = new GetUpdatedPassesUsecase_1.GetUpdatedPassesUsecase(subscribedDeviceRepository, applePassRepository);
    const checkAuthorizationMiddleware = (0, async_1.wrapAsync)((0, security_1.authorizationMiddleware)(config.security.tokenSecret));
    app.post("/apple/v1/passes", checkAuthorizationMiddleware, (0, createApplePassHandler_1.createApplePassHandler)(createApplePassUsecase, applePassService));
    app.put("/apple/v1/passes/:id", checkAuthorizationMiddleware, (0, updateApplePassHandler_1.updateApplePassHandler)(updateApplePassUsecase));
    app.post("/apple/v1/passes/createOrUpdate", checkAuthorizationMiddleware, (0, createOrUpdateApplePassHandler_1.createOrUpdateApplePassHandler)(createApplePassUsecase, updateApplePassUsecase, applePassRepository, applePassService));
    app.get("/apple/v1/passes/:passTypeIdentifier/:id", (0, downloadApplePassHandler_1.downloadApplePassHandler)(downloadApplePassUsecase));
    app.post("/apple/v1/devices/:deviceLibraryIdentifier/registrations/:passTypeIdentifier/:passId", (0, createSubscribedDeviceHandler_1.createSubscribedDeviceHandler)(createSubscribedDeviceUsecase));
    app.delete("/apple/v1/devices/:deviceLibraryIdentifier/registrations/:passTypeIdentifier/:passId", (0, deleteSubscribedDeviceHandler_1.deleteSubscribedDeviceHandler)(deleteSubscribedDeviceUsecase));
    app.get("/apple/v1/devices/:deviceLibraryIdentifier/registrations/:passTypeIdentifier", (0, getUpdatedPassesHandler_1.getUpdatedPassesHandler)(getUpdatedPassesUsecase));
    //todo
    app.post("/apple/v1/log", (0, logHandler_1.logHandler)(logger));
    // Обработчики ошибок должны быть в конце списка!
    app.use(errors_1.notFoundHandler);
    app.use((0, errors_1.createErrorHandler)(logger));
    return {
        logger,
        app,
        mongodbClient,
    };
}
exports.create = create;
//# sourceMappingURL=factory.js.map