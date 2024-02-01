import { DateTime, Optional, UniqueId } from "../../models/common";
import { ApplePass } from "../../models/apple/ApplePass";
import { ApplePassFilter } from "../filters/apple/ApplePassFilter";
import { Pagination } from "../Pagination";
import { SearchResult } from "../SearchResult";

export interface ApplePassRepository {
  search(
    filter: ApplePassFilter,
    pagination?: Pagination
  ): Promise<SearchResult<ApplePass>>;

  get(id: UniqueId): Promise<Optional<ApplePass>>;

  create(applePass: ApplePass): Promise<void>;

  update(applePass: ApplePass, lastUpdatedAt?: DateTime): Promise<void>;
}
