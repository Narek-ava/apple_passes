import { ApplePassRepository } from "../../apple/ApplePassRepository";
import { ApplePass } from "../../../models/apple/ApplePass";
import { DateTime, Optional, UniqueId } from "../../../models/common";
import { Pagination } from "../../Pagination";
import { Db, FindOptions } from "mongodb";
import { MongoDbApplePassMapper } from "../mappers/apple/MongoDbApplePassMapper";
import { NewChangesFoundError } from "../../../errors/NewChangesFoundError";
import { createFilter } from "../filterFactory";
import { SearchResult } from "../../SearchResult";
import { ApplePassFilter } from "../../filters/apple/ApplePassFilter";
import { createFindOptions } from "../mappers/findOptionsFactory";

export class MongoDbApplePassRepository implements ApplePassRepository {
  constructor(private db: Db, private mapper: MongoDbApplePassMapper) {}

  async search(
    filter: ApplePassFilter,
    pagination?: Pagination
  ): Promise<SearchResult<ApplePass>> {
    const collection = this.db.collection("applePasses");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: any = {};
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

    const queryPagination = pagination ?? new Pagination();
    const options: FindOptions = createFindOptions({
      pagination,
    });

    const results: ApplePass[] = [];
    const cursor = await collection.find(query, options);
    await cursor.forEach((data) => {
      results.push(this.mapper.fromDB(data));
    });

    const totalCount: number = await collection.countDocuments(query);

    return {
      results,
      pagination: {
        offset: queryPagination.offset,
        limit: queryPagination.limit,
        totalCount,
      },
    };
  }

  async get(id: UniqueId): Promise<Optional<ApplePass>> {
    const searchResult = await this.search(
      { ids: [id] },
      Pagination.createSingleResult()
    );

    return searchResult?.results[0];
  }

  async create(applePass: ApplePass): Promise<void> {
    const collection = this.db.collection("applePasses");

    await collection.insertOne(this.mapper.toDB(applePass));
  }

  async update(applePass: ApplePass, lastUpdatedAt?: DateTime): Promise<void> {
    const collection = this.db.collection("applePasses");

    const data = this.mapper.toDB(applePass);
    delete data._id;

    const updateResult = await collection.replaceOne(
      createFilter(applePass.id, lastUpdatedAt),
      data
    );

    if (updateResult?.modifiedCount === 1) {
      return;
    }

    throw new NewChangesFoundError();
  }
}
