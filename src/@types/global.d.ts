declare type StringfyKeys<T> = T extends Object ? `${keyof T}` : never

declare type PageParams<P> = {
  params: P
}

declare type PageSearchParams = {
  searchParams: { [key: string]: string | string[] | undefined }
}

declare type PageParamsWithSearch<P> = PageParams<P> & PageSearchParams

declare type Path<T> = T extends object
  ? {
      [K in keyof T]: `${Exclude<K, symbol>}${'' | `.${Path<T[K]>}`}`
    }[keyof T]
  : never

declare type Leaves<T> = T extends object
  ? {
      [K in keyof T]: `${Exclude<K, symbol>}${Leaves<T[K]> extends never
        ? ''
        : `.${Leaves<T[K]>}`}`
    }[keyof T]
  : never
