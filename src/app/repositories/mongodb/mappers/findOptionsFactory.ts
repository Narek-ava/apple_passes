import { Pagination } from "../../Pagination";
import { Sorting } from "../../Sorting";
import { FindOptions } from "mongodb";

export function createFindOptions<T>(query: {
  pagination?: Pagination;
  sorting?: Sorting<T>;
}) {
  const options: FindOptions = {};
  if (query.pagination !== undefined) {
    options.skip = query.pagination.offset;
    options.limit = query.pagination.limit;
  }

  if (query.sorting !== undefined) {
    options.sort = {
      [query.sorting.field as string]:
        query.sorting.direction === "asc" ? 1 : -1,
    };
  }

  return options;
}
