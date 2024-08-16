export type OneOf<T, U> = ({ [K in keyof T]?: T[K] } & U) | ({ [K in keyof U]?: U[K] } & T) extends infer O
    ? { [K in keyof O]: O[K] }
    : never;