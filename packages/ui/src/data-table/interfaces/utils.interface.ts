// https://stackoverflow.com/a/58436959

/**
 * Tipo auxiliar para verificar si un tipo es un objeto simple (no nativo)
 */
// biome-ignore lint/complexity/noBannedTypes: Function type is necessary for accurate object type differentiation
type IsSimpleObject<T> = T extends Date | Function | Error | RegExp
  ? false
  : T extends object
    ? true
    : false;

/**
 * `KeysPaths` is a utility type that recursively constructs a union of all possible
 * key paths in a given object type `T`. Each key path is represented as a string
 * with dot notation.
 *
 * @example
 * type Example = { a: { b: { c: number } } };
 * type Result = KeysPaths<Example>; // "a" | "a.b" | "a.b.c"
 */
export type KeysPaths<T> = T extends object
  ? IsSimpleObject<T> extends true
    ? {
        [K in keyof T]-?: `${Exclude<K, symbol>}${
          | ""
          | `.${KeysPaths<NonNullable<T[K]>>}`}`;
      }[keyof T]
    : never
  : never;

/**
 * `KeysLeaves` is a utility type that recursively constructs a union of all possible
 * key paths in a given object type `T` that lead to a leaf node (non-object value).
 * Each key path is represented as a string with dot notation.
 *
 * @example
 * type Example = { a: { b: { c: number }, d: string } };
 * type Result = KeysLeaves<Example>; // "a.b.c" | "a.d"
 */
export type KeysLeaves<T> = T extends object
  ? IsSimpleObject<T> extends true
    ? {
        [K in keyof T]-?: `${Exclude<K, symbol>}${KeysLeaves<
          NonNullable<T[K]>
        > extends never
          ? ""
          : `.${KeysLeaves<NonNullable<T[K]>>}`}`;
      }[keyof T]
    : never
  : never;
