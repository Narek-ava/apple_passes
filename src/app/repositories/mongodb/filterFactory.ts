/* eslint-disable @typescript-eslint/no-explicit-any */

import { DateTime, UniqueId } from "../../models/common";

export function createFilter(id: UniqueId, lastUpdatedAt?: DateTime): any {
  const query: any = { _id: id };
  if (lastUpdatedAt !== undefined) {
    query["audit.updatedAt"] = new Date(lastUpdatedAt);
  }

  return query;
}
