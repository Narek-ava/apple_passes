"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDbApplePassRepository = void 0;
const Pagination_1 = require("../../Pagination");
const NewChangesFoundError_1 = require("../../../errors/NewChangesFoundError");
const filterFactory_1 = require("../filterFactory");
const findOptionsFactory_1 = require("../mappers/findOptionsFactory");
class MongoDbApplePassRepository {
    constructor(db, mapper) {
        this.db = db;
        this.mapper = mapper;
    }
    search(filter, pagination) {
        return __awaiter(this, void 0, void 0, function* () {
            const collection = this.db.collection("applePasses");
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const query = {};
            if (filter.ids !== undefined) {
                query["_id"] = {
                    $in: filter.ids,
                };
            }
            if (filter.lastUpdatedAt !== undefined) {
                query["lastUpdatedAt"] = {
                    $gt: filter.lastUpdatedAt,
                };
            }
            const queryPagination = pagination !== null && pagination !== void 0 ? pagination : new Pagination_1.Pagination();
            const options = (0, findOptionsFactory_1.createFindOptions)({
                pagination,
            });
            const results = [];
            const cursor = yield collection.find(query, options);
            yield cursor.forEach((data) => {
                results.push(this.mapper.fromDB(data));
            });
            const totalCount = yield collection.countDocuments(query);
            return {
                results,
                pagination: {
                    offset: queryPagination.offset,
                    limit: queryPagination.limit,
                    totalCount,
                },
            };
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const searchResult = yield this.search({ ids: [id] }, Pagination_1.Pagination.createSingleResult());
            return searchResult === null || searchResult === void 0 ? void 0 : searchResult.results[0];
        });
    }
    create(applePass) {
        return __awaiter(this, void 0, void 0, function* () {
            const collection = this.db.collection("applePasses");
            yield collection.insertOne(this.mapper.toDB(applePass));
        });
    }
    update(applePass, lastUpdatedAt) {
        return __awaiter(this, void 0, void 0, function* () {
            const collection = this.db.collection("applePasses");
            const data = this.mapper.toDB(applePass);
            delete data._id;
            const updateResult = yield collection.replaceOne((0, filterFactory_1.createFilter)(applePass.id, lastUpdatedAt), data);
            if ((updateResult === null || updateResult === void 0 ? void 0 : updateResult.modifiedCount) === 1) {
                return;
            }
            throw new NewChangesFoundError_1.NewChangesFoundError();
        });
    }
}
exports.MongoDbApplePassRepository = MongoDbApplePassRepository;
//# sourceMappingURL=MongoDbApplePassRepository.js.map