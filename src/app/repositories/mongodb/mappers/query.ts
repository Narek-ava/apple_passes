export function prepareSearchQuery(query: string) {
  if (query.indexOf("%") === -1) {
    return query;
  }

  return {
    $regex: new RegExp(`^${query.replace(/%/g, ".*")}$`, "i"),
  };
}
