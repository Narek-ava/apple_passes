export type PaginationResult = {
  offset: number;
  limit: number;
  totalCount: number;
};

export type SearchResult<T> = {
  results: T[];
  pagination: PaginationResult;
};
