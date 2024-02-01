export type SortingDirection = "asc" | "desc";

export type Sorting<F> = Readonly<{
  field: F;
  direction?: SortingDirection;
}>;
