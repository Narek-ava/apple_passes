export type TransformedMap<K, T> = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  [key: K]: T;
};

export type TransformFunction<K, T> = (value: T) => TransformedMap<K, T>;

export function transformArrayToMap<K, T>(
  values: T[],
  transformFunction: TransformFunction<K, T>
): TransformedMap<K, T> {
  return Object.assign({}, ...values.map((value) => transformFunction(value)));
}
