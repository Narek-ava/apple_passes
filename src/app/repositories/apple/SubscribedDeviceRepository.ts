import { Optional, UniqueId } from "../../models/common";
import { SubscribedDevice } from "../../models/apple/SubscribedDevice";
import { SubscribedDeviceFilter } from "../filters/apple/SubscribedDeviceFilter";
import { Pagination } from "../Pagination";
import { SearchResult } from "../SearchResult";

export interface SubscribedDeviceRepository {
  search(
    filter: SubscribedDeviceFilter,
    pagination?: Pagination
  ): Promise<SearchResult<SubscribedDevice>>;

  get(id: UniqueId): Promise<Optional<SubscribedDevice>>;

  create(subscribedDevice: SubscribedDevice): Promise<void>;

  delete(id: UniqueId): Promise<void>;
}
