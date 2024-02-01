import { Optional, UniqueId } from "../../../models/common";
import { Pagination } from "../../Pagination";
import { Db, FindOptions } from "mongodb";
import { createFilter } from "../filterFactory";
import { SearchResult } from "../../SearchResult";
import { SubscribedDeviceRepository } from "../../apple/SubscribedDeviceRepository";
import { SubscribedDeviceFilter } from "../../filters/apple/SubscribedDeviceFilter";
import { SubscribedDevice } from "../../../models/apple/SubscribedDevice";
import { MongoDbSubscribedDeviceMapper } from "../mappers/apple/MongoDbSubscribedDeviceMapper";
import { createFindOptions } from "../mappers/findOptionsFactory";
import { NotFoundError } from "../../../errors/NotFoundError";

export class MongoDbSubscribedDeviceRepository
  implements SubscribedDeviceRepository
{
  constructor(private db: Db, private mapper: MongoDbSubscribedDeviceMapper) {}

  async search(
    filter: SubscribedDeviceFilter,
    pagination?: Pagination
  ): Promise<SearchResult<SubscribedDevice>> {
    const collection = this.db.collection("subscribedDevice");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: any = {};
    if (filter.ids !== undefined) {
      query["_id"] = {
        $in: filter.ids,
      };
    }

    if (filter.deviceLibraryIdentifiers !== undefined) {
      query["deviceLibraryIdentifier"] = {
        $in: filter.deviceLibraryIdentifiers,
      };
    }

    if (filter.passIds !== undefined) {
      query["passId"] = {
        $in: filter.passIds,
      };
    }

    if (filter.pushTokens !== undefined) {
      query["pushToken"] = {
        $in: filter.pushTokens,
      };
    }

    const queryPagination = pagination ?? new Pagination();
    const options: FindOptions = createFindOptions({
      pagination,
    });

    const results: SubscribedDevice[] = [];
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

  async get(id: UniqueId): Promise<Optional<SubscribedDevice>> {
    const searchResult = await this.search(
      { ids: [id] },
      Pagination.createSingleResult()
    );

    return searchResult?.results[0];
  }

  async create(subscribedDevice: SubscribedDevice): Promise<void> {
    const collection = this.db.collection("subscribedDevice");

    await collection.insertOne(this.mapper.toDB(subscribedDevice));
  }

  async delete(id: UniqueId): Promise<void> {
    const collection = this.db.collection("subscribedDevice");

    const deleteResult = await collection.deleteOne(createFilter(id));

    if (deleteResult?.deletedCount === 1) {
      return;
    }

    throw new NotFoundError();
  }
}
