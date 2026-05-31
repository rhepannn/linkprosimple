
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model ReferralCode
 * 
 */
export type ReferralCode = $Result.DefaultSelection<Prisma.$ReferralCodePayload>
/**
 * Model Booking
 * 
 */
export type Booking = $Result.DefaultSelection<Prisma.$BookingPayload>
/**
 * Model Category
 * 
 */
export type Category = $Result.DefaultSelection<Prisma.$CategoryPayload>
/**
 * Model Product
 * 
 */
export type Product = $Result.DefaultSelection<Prisma.$ProductPayload>
/**
 * Model ReferralUsage
 * 
 */
export type ReferralUsage = $Result.DefaultSelection<Prisma.$ReferralUsagePayload>
/**
 * Model TransactionItem
 * 
 */
export type TransactionItem = $Result.DefaultSelection<Prisma.$TransactionItemPayload>
/**
 * Model Transaction
 * 
 */
export type Transaction = $Result.DefaultSelection<Prisma.$TransactionPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model GalleryPhoto
 * 
 */
export type GalleryPhoto = $Result.DefaultSelection<Prisma.$GalleryPhotoPayload>
/**
 * Model SiteSetting
 * 
 */
export type SiteSetting = $Result.DefaultSelection<Prisma.$SiteSettingPayload>
/**
 * Model AffiliatePost
 * 
 */
export type AffiliatePost = $Result.DefaultSelection<Prisma.$AffiliatePostPayload>
/**
 * Model AffiliateCommission
 * 
 */
export type AffiliateCommission = $Result.DefaultSelection<Prisma.$AffiliateCommissionPayload>
/**
 * Model AffiliateApplication
 * 
 */
export type AffiliateApplication = $Result.DefaultSelection<Prisma.$AffiliateApplicationPayload>
/**
 * Model AffiliateLead
 * 
 */
export type AffiliateLead = $Result.DefaultSelection<Prisma.$AffiliateLeadPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  ADMIN: 'ADMIN',
  SNAPPER: 'SNAPPER'
};

export type Role = (typeof Role)[keyof typeof Role]


export const TransactionStatus: {
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED'
};

export type TransactionStatus = (typeof TransactionStatus)[keyof typeof TransactionStatus]


export const PaymentMethod: {
  CASH: 'CASH',
  TRANSFER: 'TRANSFER',
  QRIS: 'QRIS',
  EWALLET: 'EWALLET'
};

export type PaymentMethod = (typeof PaymentMethod)[keyof typeof PaymentMethod]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type TransactionStatus = $Enums.TransactionStatus

export const TransactionStatus: typeof $Enums.TransactionStatus

export type PaymentMethod = $Enums.PaymentMethod

export const PaymentMethod: typeof $Enums.PaymentMethod

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more ReferralCodes
 * const referralCodes = await prisma.referralCode.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more ReferralCodes
   * const referralCodes = await prisma.referralCode.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.referralCode`: Exposes CRUD operations for the **ReferralCode** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ReferralCodes
    * const referralCodes = await prisma.referralCode.findMany()
    * ```
    */
  get referralCode(): Prisma.ReferralCodeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.booking`: Exposes CRUD operations for the **Booking** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Bookings
    * const bookings = await prisma.booking.findMany()
    * ```
    */
  get booking(): Prisma.BookingDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.category`: Exposes CRUD operations for the **Category** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Categories
    * const categories = await prisma.category.findMany()
    * ```
    */
  get category(): Prisma.CategoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.product`: Exposes CRUD operations for the **Product** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Products
    * const products = await prisma.product.findMany()
    * ```
    */
  get product(): Prisma.ProductDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.referralUsage`: Exposes CRUD operations for the **ReferralUsage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ReferralUsages
    * const referralUsages = await prisma.referralUsage.findMany()
    * ```
    */
  get referralUsage(): Prisma.ReferralUsageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.transactionItem`: Exposes CRUD operations for the **TransactionItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TransactionItems
    * const transactionItems = await prisma.transactionItem.findMany()
    * ```
    */
  get transactionItem(): Prisma.TransactionItemDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.transaction`: Exposes CRUD operations for the **Transaction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Transactions
    * const transactions = await prisma.transaction.findMany()
    * ```
    */
  get transaction(): Prisma.TransactionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.galleryPhoto`: Exposes CRUD operations for the **GalleryPhoto** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GalleryPhotos
    * const galleryPhotos = await prisma.galleryPhoto.findMany()
    * ```
    */
  get galleryPhoto(): Prisma.GalleryPhotoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.siteSetting`: Exposes CRUD operations for the **SiteSetting** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SiteSettings
    * const siteSettings = await prisma.siteSetting.findMany()
    * ```
    */
  get siteSetting(): Prisma.SiteSettingDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.affiliatePost`: Exposes CRUD operations for the **AffiliatePost** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AffiliatePosts
    * const affiliatePosts = await prisma.affiliatePost.findMany()
    * ```
    */
  get affiliatePost(): Prisma.AffiliatePostDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.affiliateCommission`: Exposes CRUD operations for the **AffiliateCommission** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AffiliateCommissions
    * const affiliateCommissions = await prisma.affiliateCommission.findMany()
    * ```
    */
  get affiliateCommission(): Prisma.AffiliateCommissionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.affiliateApplication`: Exposes CRUD operations for the **AffiliateApplication** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AffiliateApplications
    * const affiliateApplications = await prisma.affiliateApplication.findMany()
    * ```
    */
  get affiliateApplication(): Prisma.AffiliateApplicationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.affiliateLead`: Exposes CRUD operations for the **AffiliateLead** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AffiliateLeads
    * const affiliateLeads = await prisma.affiliateLead.findMany()
    * ```
    */
  get affiliateLead(): Prisma.AffiliateLeadDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    ReferralCode: 'ReferralCode',
    Booking: 'Booking',
    Category: 'Category',
    Product: 'Product',
    ReferralUsage: 'ReferralUsage',
    TransactionItem: 'TransactionItem',
    Transaction: 'Transaction',
    User: 'User',
    GalleryPhoto: 'GalleryPhoto',
    SiteSetting: 'SiteSetting',
    AffiliatePost: 'AffiliatePost',
    AffiliateCommission: 'AffiliateCommission',
    AffiliateApplication: 'AffiliateApplication',
    AffiliateLead: 'AffiliateLead'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "referralCode" | "booking" | "category" | "product" | "referralUsage" | "transactionItem" | "transaction" | "user" | "galleryPhoto" | "siteSetting" | "affiliatePost" | "affiliateCommission" | "affiliateApplication" | "affiliateLead"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      ReferralCode: {
        payload: Prisma.$ReferralCodePayload<ExtArgs>
        fields: Prisma.ReferralCodeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReferralCodeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReferralCodePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReferralCodeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReferralCodePayload>
          }
          findFirst: {
            args: Prisma.ReferralCodeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReferralCodePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReferralCodeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReferralCodePayload>
          }
          findMany: {
            args: Prisma.ReferralCodeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReferralCodePayload>[]
          }
          create: {
            args: Prisma.ReferralCodeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReferralCodePayload>
          }
          createMany: {
            args: Prisma.ReferralCodeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ReferralCodeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReferralCodePayload>[]
          }
          delete: {
            args: Prisma.ReferralCodeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReferralCodePayload>
          }
          update: {
            args: Prisma.ReferralCodeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReferralCodePayload>
          }
          deleteMany: {
            args: Prisma.ReferralCodeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ReferralCodeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ReferralCodeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReferralCodePayload>[]
          }
          upsert: {
            args: Prisma.ReferralCodeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReferralCodePayload>
          }
          aggregate: {
            args: Prisma.ReferralCodeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReferralCode>
          }
          groupBy: {
            args: Prisma.ReferralCodeGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReferralCodeGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReferralCodeCountArgs<ExtArgs>
            result: $Utils.Optional<ReferralCodeCountAggregateOutputType> | number
          }
        }
      }
      Booking: {
        payload: Prisma.$BookingPayload<ExtArgs>
        fields: Prisma.BookingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BookingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BookingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>
          }
          findFirst: {
            args: Prisma.BookingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BookingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>
          }
          findMany: {
            args: Prisma.BookingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>[]
          }
          create: {
            args: Prisma.BookingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>
          }
          createMany: {
            args: Prisma.BookingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BookingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>[]
          }
          delete: {
            args: Prisma.BookingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>
          }
          update: {
            args: Prisma.BookingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>
          }
          deleteMany: {
            args: Prisma.BookingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BookingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BookingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>[]
          }
          upsert: {
            args: Prisma.BookingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>
          }
          aggregate: {
            args: Prisma.BookingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBooking>
          }
          groupBy: {
            args: Prisma.BookingGroupByArgs<ExtArgs>
            result: $Utils.Optional<BookingGroupByOutputType>[]
          }
          count: {
            args: Prisma.BookingCountArgs<ExtArgs>
            result: $Utils.Optional<BookingCountAggregateOutputType> | number
          }
        }
      }
      Category: {
        payload: Prisma.$CategoryPayload<ExtArgs>
        fields: Prisma.CategoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CategoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CategoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          findFirst: {
            args: Prisma.CategoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CategoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          findMany: {
            args: Prisma.CategoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          create: {
            args: Prisma.CategoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          createMany: {
            args: Prisma.CategoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CategoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          delete: {
            args: Prisma.CategoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          update: {
            args: Prisma.CategoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          deleteMany: {
            args: Prisma.CategoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CategoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CategoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          upsert: {
            args: Prisma.CategoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          aggregate: {
            args: Prisma.CategoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCategory>
          }
          groupBy: {
            args: Prisma.CategoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<CategoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.CategoryCountArgs<ExtArgs>
            result: $Utils.Optional<CategoryCountAggregateOutputType> | number
          }
        }
      }
      Product: {
        payload: Prisma.$ProductPayload<ExtArgs>
        fields: Prisma.ProductFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findFirst: {
            args: Prisma.ProductFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findMany: {
            args: Prisma.ProductFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          create: {
            args: Prisma.ProductCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          createMany: {
            args: Prisma.ProductCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProductCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          delete: {
            args: Prisma.ProductDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          update: {
            args: Prisma.ProductUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          deleteMany: {
            args: Prisma.ProductDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProductUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          upsert: {
            args: Prisma.ProductUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          aggregate: {
            args: Prisma.ProductAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProduct>
          }
          groupBy: {
            args: Prisma.ProductGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductCountArgs<ExtArgs>
            result: $Utils.Optional<ProductCountAggregateOutputType> | number
          }
        }
      }
      ReferralUsage: {
        payload: Prisma.$ReferralUsagePayload<ExtArgs>
        fields: Prisma.ReferralUsageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReferralUsageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReferralUsagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReferralUsageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReferralUsagePayload>
          }
          findFirst: {
            args: Prisma.ReferralUsageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReferralUsagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReferralUsageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReferralUsagePayload>
          }
          findMany: {
            args: Prisma.ReferralUsageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReferralUsagePayload>[]
          }
          create: {
            args: Prisma.ReferralUsageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReferralUsagePayload>
          }
          createMany: {
            args: Prisma.ReferralUsageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ReferralUsageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReferralUsagePayload>[]
          }
          delete: {
            args: Prisma.ReferralUsageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReferralUsagePayload>
          }
          update: {
            args: Prisma.ReferralUsageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReferralUsagePayload>
          }
          deleteMany: {
            args: Prisma.ReferralUsageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ReferralUsageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ReferralUsageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReferralUsagePayload>[]
          }
          upsert: {
            args: Prisma.ReferralUsageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReferralUsagePayload>
          }
          aggregate: {
            args: Prisma.ReferralUsageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReferralUsage>
          }
          groupBy: {
            args: Prisma.ReferralUsageGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReferralUsageGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReferralUsageCountArgs<ExtArgs>
            result: $Utils.Optional<ReferralUsageCountAggregateOutputType> | number
          }
        }
      }
      TransactionItem: {
        payload: Prisma.$TransactionItemPayload<ExtArgs>
        fields: Prisma.TransactionItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TransactionItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TransactionItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionItemPayload>
          }
          findFirst: {
            args: Prisma.TransactionItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TransactionItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionItemPayload>
          }
          findMany: {
            args: Prisma.TransactionItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionItemPayload>[]
          }
          create: {
            args: Prisma.TransactionItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionItemPayload>
          }
          createMany: {
            args: Prisma.TransactionItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TransactionItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionItemPayload>[]
          }
          delete: {
            args: Prisma.TransactionItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionItemPayload>
          }
          update: {
            args: Prisma.TransactionItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionItemPayload>
          }
          deleteMany: {
            args: Prisma.TransactionItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TransactionItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TransactionItemUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionItemPayload>[]
          }
          upsert: {
            args: Prisma.TransactionItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionItemPayload>
          }
          aggregate: {
            args: Prisma.TransactionItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTransactionItem>
          }
          groupBy: {
            args: Prisma.TransactionItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<TransactionItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.TransactionItemCountArgs<ExtArgs>
            result: $Utils.Optional<TransactionItemCountAggregateOutputType> | number
          }
        }
      }
      Transaction: {
        payload: Prisma.$TransactionPayload<ExtArgs>
        fields: Prisma.TransactionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TransactionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TransactionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          findFirst: {
            args: Prisma.TransactionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TransactionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          findMany: {
            args: Prisma.TransactionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>[]
          }
          create: {
            args: Prisma.TransactionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          createMany: {
            args: Prisma.TransactionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TransactionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>[]
          }
          delete: {
            args: Prisma.TransactionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          update: {
            args: Prisma.TransactionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          deleteMany: {
            args: Prisma.TransactionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TransactionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TransactionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>[]
          }
          upsert: {
            args: Prisma.TransactionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          aggregate: {
            args: Prisma.TransactionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTransaction>
          }
          groupBy: {
            args: Prisma.TransactionGroupByArgs<ExtArgs>
            result: $Utils.Optional<TransactionGroupByOutputType>[]
          }
          count: {
            args: Prisma.TransactionCountArgs<ExtArgs>
            result: $Utils.Optional<TransactionCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      GalleryPhoto: {
        payload: Prisma.$GalleryPhotoPayload<ExtArgs>
        fields: Prisma.GalleryPhotoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GalleryPhotoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GalleryPhotoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GalleryPhotoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GalleryPhotoPayload>
          }
          findFirst: {
            args: Prisma.GalleryPhotoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GalleryPhotoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GalleryPhotoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GalleryPhotoPayload>
          }
          findMany: {
            args: Prisma.GalleryPhotoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GalleryPhotoPayload>[]
          }
          create: {
            args: Prisma.GalleryPhotoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GalleryPhotoPayload>
          }
          createMany: {
            args: Prisma.GalleryPhotoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GalleryPhotoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GalleryPhotoPayload>[]
          }
          delete: {
            args: Prisma.GalleryPhotoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GalleryPhotoPayload>
          }
          update: {
            args: Prisma.GalleryPhotoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GalleryPhotoPayload>
          }
          deleteMany: {
            args: Prisma.GalleryPhotoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GalleryPhotoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GalleryPhotoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GalleryPhotoPayload>[]
          }
          upsert: {
            args: Prisma.GalleryPhotoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GalleryPhotoPayload>
          }
          aggregate: {
            args: Prisma.GalleryPhotoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGalleryPhoto>
          }
          groupBy: {
            args: Prisma.GalleryPhotoGroupByArgs<ExtArgs>
            result: $Utils.Optional<GalleryPhotoGroupByOutputType>[]
          }
          count: {
            args: Prisma.GalleryPhotoCountArgs<ExtArgs>
            result: $Utils.Optional<GalleryPhotoCountAggregateOutputType> | number
          }
        }
      }
      SiteSetting: {
        payload: Prisma.$SiteSettingPayload<ExtArgs>
        fields: Prisma.SiteSettingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SiteSettingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteSettingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SiteSettingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteSettingPayload>
          }
          findFirst: {
            args: Prisma.SiteSettingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteSettingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SiteSettingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteSettingPayload>
          }
          findMany: {
            args: Prisma.SiteSettingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteSettingPayload>[]
          }
          create: {
            args: Prisma.SiteSettingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteSettingPayload>
          }
          createMany: {
            args: Prisma.SiteSettingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SiteSettingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteSettingPayload>[]
          }
          delete: {
            args: Prisma.SiteSettingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteSettingPayload>
          }
          update: {
            args: Prisma.SiteSettingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteSettingPayload>
          }
          deleteMany: {
            args: Prisma.SiteSettingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SiteSettingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SiteSettingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteSettingPayload>[]
          }
          upsert: {
            args: Prisma.SiteSettingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteSettingPayload>
          }
          aggregate: {
            args: Prisma.SiteSettingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSiteSetting>
          }
          groupBy: {
            args: Prisma.SiteSettingGroupByArgs<ExtArgs>
            result: $Utils.Optional<SiteSettingGroupByOutputType>[]
          }
          count: {
            args: Prisma.SiteSettingCountArgs<ExtArgs>
            result: $Utils.Optional<SiteSettingCountAggregateOutputType> | number
          }
        }
      }
      AffiliatePost: {
        payload: Prisma.$AffiliatePostPayload<ExtArgs>
        fields: Prisma.AffiliatePostFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AffiliatePostFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliatePostPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AffiliatePostFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliatePostPayload>
          }
          findFirst: {
            args: Prisma.AffiliatePostFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliatePostPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AffiliatePostFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliatePostPayload>
          }
          findMany: {
            args: Prisma.AffiliatePostFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliatePostPayload>[]
          }
          create: {
            args: Prisma.AffiliatePostCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliatePostPayload>
          }
          createMany: {
            args: Prisma.AffiliatePostCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AffiliatePostCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliatePostPayload>[]
          }
          delete: {
            args: Prisma.AffiliatePostDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliatePostPayload>
          }
          update: {
            args: Prisma.AffiliatePostUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliatePostPayload>
          }
          deleteMany: {
            args: Prisma.AffiliatePostDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AffiliatePostUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AffiliatePostUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliatePostPayload>[]
          }
          upsert: {
            args: Prisma.AffiliatePostUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliatePostPayload>
          }
          aggregate: {
            args: Prisma.AffiliatePostAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAffiliatePost>
          }
          groupBy: {
            args: Prisma.AffiliatePostGroupByArgs<ExtArgs>
            result: $Utils.Optional<AffiliatePostGroupByOutputType>[]
          }
          count: {
            args: Prisma.AffiliatePostCountArgs<ExtArgs>
            result: $Utils.Optional<AffiliatePostCountAggregateOutputType> | number
          }
        }
      }
      AffiliateCommission: {
        payload: Prisma.$AffiliateCommissionPayload<ExtArgs>
        fields: Prisma.AffiliateCommissionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AffiliateCommissionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliateCommissionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AffiliateCommissionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliateCommissionPayload>
          }
          findFirst: {
            args: Prisma.AffiliateCommissionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliateCommissionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AffiliateCommissionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliateCommissionPayload>
          }
          findMany: {
            args: Prisma.AffiliateCommissionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliateCommissionPayload>[]
          }
          create: {
            args: Prisma.AffiliateCommissionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliateCommissionPayload>
          }
          createMany: {
            args: Prisma.AffiliateCommissionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AffiliateCommissionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliateCommissionPayload>[]
          }
          delete: {
            args: Prisma.AffiliateCommissionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliateCommissionPayload>
          }
          update: {
            args: Prisma.AffiliateCommissionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliateCommissionPayload>
          }
          deleteMany: {
            args: Prisma.AffiliateCommissionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AffiliateCommissionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AffiliateCommissionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliateCommissionPayload>[]
          }
          upsert: {
            args: Prisma.AffiliateCommissionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliateCommissionPayload>
          }
          aggregate: {
            args: Prisma.AffiliateCommissionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAffiliateCommission>
          }
          groupBy: {
            args: Prisma.AffiliateCommissionGroupByArgs<ExtArgs>
            result: $Utils.Optional<AffiliateCommissionGroupByOutputType>[]
          }
          count: {
            args: Prisma.AffiliateCommissionCountArgs<ExtArgs>
            result: $Utils.Optional<AffiliateCommissionCountAggregateOutputType> | number
          }
        }
      }
      AffiliateApplication: {
        payload: Prisma.$AffiliateApplicationPayload<ExtArgs>
        fields: Prisma.AffiliateApplicationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AffiliateApplicationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliateApplicationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AffiliateApplicationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliateApplicationPayload>
          }
          findFirst: {
            args: Prisma.AffiliateApplicationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliateApplicationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AffiliateApplicationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliateApplicationPayload>
          }
          findMany: {
            args: Prisma.AffiliateApplicationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliateApplicationPayload>[]
          }
          create: {
            args: Prisma.AffiliateApplicationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliateApplicationPayload>
          }
          createMany: {
            args: Prisma.AffiliateApplicationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AffiliateApplicationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliateApplicationPayload>[]
          }
          delete: {
            args: Prisma.AffiliateApplicationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliateApplicationPayload>
          }
          update: {
            args: Prisma.AffiliateApplicationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliateApplicationPayload>
          }
          deleteMany: {
            args: Prisma.AffiliateApplicationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AffiliateApplicationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AffiliateApplicationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliateApplicationPayload>[]
          }
          upsert: {
            args: Prisma.AffiliateApplicationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliateApplicationPayload>
          }
          aggregate: {
            args: Prisma.AffiliateApplicationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAffiliateApplication>
          }
          groupBy: {
            args: Prisma.AffiliateApplicationGroupByArgs<ExtArgs>
            result: $Utils.Optional<AffiliateApplicationGroupByOutputType>[]
          }
          count: {
            args: Prisma.AffiliateApplicationCountArgs<ExtArgs>
            result: $Utils.Optional<AffiliateApplicationCountAggregateOutputType> | number
          }
        }
      }
      AffiliateLead: {
        payload: Prisma.$AffiliateLeadPayload<ExtArgs>
        fields: Prisma.AffiliateLeadFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AffiliateLeadFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliateLeadPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AffiliateLeadFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliateLeadPayload>
          }
          findFirst: {
            args: Prisma.AffiliateLeadFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliateLeadPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AffiliateLeadFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliateLeadPayload>
          }
          findMany: {
            args: Prisma.AffiliateLeadFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliateLeadPayload>[]
          }
          create: {
            args: Prisma.AffiliateLeadCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliateLeadPayload>
          }
          createMany: {
            args: Prisma.AffiliateLeadCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AffiliateLeadCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliateLeadPayload>[]
          }
          delete: {
            args: Prisma.AffiliateLeadDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliateLeadPayload>
          }
          update: {
            args: Prisma.AffiliateLeadUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliateLeadPayload>
          }
          deleteMany: {
            args: Prisma.AffiliateLeadDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AffiliateLeadUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AffiliateLeadUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliateLeadPayload>[]
          }
          upsert: {
            args: Prisma.AffiliateLeadUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliateLeadPayload>
          }
          aggregate: {
            args: Prisma.AffiliateLeadAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAffiliateLead>
          }
          groupBy: {
            args: Prisma.AffiliateLeadGroupByArgs<ExtArgs>
            result: $Utils.Optional<AffiliateLeadGroupByOutputType>[]
          }
          count: {
            args: Prisma.AffiliateLeadCountArgs<ExtArgs>
            result: $Utils.Optional<AffiliateLeadCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    referralCode?: ReferralCodeOmit
    booking?: BookingOmit
    category?: CategoryOmit
    product?: ProductOmit
    referralUsage?: ReferralUsageOmit
    transactionItem?: TransactionItemOmit
    transaction?: TransactionOmit
    user?: UserOmit
    galleryPhoto?: GalleryPhotoOmit
    siteSetting?: SiteSettingOmit
    affiliatePost?: AffiliatePostOmit
    affiliateCommission?: AffiliateCommissionOmit
    affiliateApplication?: AffiliateApplicationOmit
    affiliateLead?: AffiliateLeadOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type ReferralCodeCountOutputType
   */

  export type ReferralCodeCountOutputType = {
    referral_usages: number
    transactions: number
  }

  export type ReferralCodeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    referral_usages?: boolean | ReferralCodeCountOutputTypeCountReferral_usagesArgs
    transactions?: boolean | ReferralCodeCountOutputTypeCountTransactionsArgs
  }

  // Custom InputTypes
  /**
   * ReferralCodeCountOutputType without action
   */
  export type ReferralCodeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReferralCodeCountOutputType
     */
    select?: ReferralCodeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ReferralCodeCountOutputType without action
   */
  export type ReferralCodeCountOutputTypeCountReferral_usagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReferralUsageWhereInput
  }

  /**
   * ReferralCodeCountOutputType without action
   */
  export type ReferralCodeCountOutputTypeCountTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionWhereInput
  }


  /**
   * Count Type BookingCountOutputType
   */

  export type BookingCountOutputType = {
    commissions: number
  }

  export type BookingCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    commissions?: boolean | BookingCountOutputTypeCountCommissionsArgs
  }

  // Custom InputTypes
  /**
   * BookingCountOutputType without action
   */
  export type BookingCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookingCountOutputType
     */
    select?: BookingCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BookingCountOutputType without action
   */
  export type BookingCountOutputTypeCountCommissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AffiliateCommissionWhereInput
  }


  /**
   * Count Type CategoryCountOutputType
   */

  export type CategoryCountOutputType = {
    products: number
  }

  export type CategoryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    products?: boolean | CategoryCountOutputTypeCountProductsArgs
  }

  // Custom InputTypes
  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryCountOutputType
     */
    select?: CategoryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeCountProductsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductWhereInput
  }


  /**
   * Count Type ProductCountOutputType
   */

  export type ProductCountOutputType = {
    transaction_items: number
  }

  export type ProductCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    transaction_items?: boolean | ProductCountOutputTypeCountTransaction_itemsArgs
  }

  // Custom InputTypes
  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductCountOutputType
     */
    select?: ProductCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountTransaction_itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionItemWhereInput
  }


  /**
   * Count Type TransactionCountOutputType
   */

  export type TransactionCountOutputType = {
    items: number
  }

  export type TransactionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    items?: boolean | TransactionCountOutputTypeCountItemsArgs
  }

  // Custom InputTypes
  /**
   * TransactionCountOutputType without action
   */
  export type TransactionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransactionCountOutputType
     */
    select?: TransactionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TransactionCountOutputType without action
   */
  export type TransactionCountOutputTypeCountItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionItemWhereInput
  }


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    referral_usages: number
    transactions: number
    commissions: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    referral_usages?: boolean | UserCountOutputTypeCountReferral_usagesArgs
    transactions?: boolean | UserCountOutputTypeCountTransactionsArgs
    commissions?: boolean | UserCountOutputTypeCountCommissionsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountReferral_usagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReferralUsageWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCommissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AffiliateCommissionWhereInput
  }


  /**
   * Models
   */

  /**
   * Model ReferralCode
   */

  export type AggregateReferralCode = {
    _count: ReferralCodeCountAggregateOutputType | null
    _avg: ReferralCodeAvgAggregateOutputType | null
    _sum: ReferralCodeSumAggregateOutputType | null
    _min: ReferralCodeMinAggregateOutputType | null
    _max: ReferralCodeMaxAggregateOutputType | null
  }

  export type ReferralCodeAvgAggregateOutputType = {
    discountPct: number | null
    maxDiscountAmount: number | null
    feePercentage: number | null
    usageLimit: number | null
    usageCount: number | null
  }

  export type ReferralCodeSumAggregateOutputType = {
    discountPct: number | null
    maxDiscountAmount: number | null
    feePercentage: number | null
    usageLimit: number | null
    usageCount: number | null
  }

  export type ReferralCodeMinAggregateOutputType = {
    id: string | null
    code: string | null
    marketerName: string | null
    discountPct: number | null
    maxDiscountAmount: number | null
    feePercentage: number | null
    bankName: string | null
    bankAccount: string | null
    expiryDate: Date | null
    usageLimit: number | null
    usageCount: number | null
    isActive: boolean | null
    ownerId: string | null
    targetProductId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ReferralCodeMaxAggregateOutputType = {
    id: string | null
    code: string | null
    marketerName: string | null
    discountPct: number | null
    maxDiscountAmount: number | null
    feePercentage: number | null
    bankName: string | null
    bankAccount: string | null
    expiryDate: Date | null
    usageLimit: number | null
    usageCount: number | null
    isActive: boolean | null
    ownerId: string | null
    targetProductId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ReferralCodeCountAggregateOutputType = {
    id: number
    code: number
    marketerName: number
    discountPct: number
    maxDiscountAmount: number
    feePercentage: number
    bankName: number
    bankAccount: number
    expiryDate: number
    usageLimit: number
    usageCount: number
    isActive: number
    ownerId: number
    targetProductId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ReferralCodeAvgAggregateInputType = {
    discountPct?: true
    maxDiscountAmount?: true
    feePercentage?: true
    usageLimit?: true
    usageCount?: true
  }

  export type ReferralCodeSumAggregateInputType = {
    discountPct?: true
    maxDiscountAmount?: true
    feePercentage?: true
    usageLimit?: true
    usageCount?: true
  }

  export type ReferralCodeMinAggregateInputType = {
    id?: true
    code?: true
    marketerName?: true
    discountPct?: true
    maxDiscountAmount?: true
    feePercentage?: true
    bankName?: true
    bankAccount?: true
    expiryDate?: true
    usageLimit?: true
    usageCount?: true
    isActive?: true
    ownerId?: true
    targetProductId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ReferralCodeMaxAggregateInputType = {
    id?: true
    code?: true
    marketerName?: true
    discountPct?: true
    maxDiscountAmount?: true
    feePercentage?: true
    bankName?: true
    bankAccount?: true
    expiryDate?: true
    usageLimit?: true
    usageCount?: true
    isActive?: true
    ownerId?: true
    targetProductId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ReferralCodeCountAggregateInputType = {
    id?: true
    code?: true
    marketerName?: true
    discountPct?: true
    maxDiscountAmount?: true
    feePercentage?: true
    bankName?: true
    bankAccount?: true
    expiryDate?: true
    usageLimit?: true
    usageCount?: true
    isActive?: true
    ownerId?: true
    targetProductId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ReferralCodeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ReferralCode to aggregate.
     */
    where?: ReferralCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReferralCodes to fetch.
     */
    orderBy?: ReferralCodeOrderByWithRelationInput | ReferralCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReferralCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReferralCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReferralCodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ReferralCodes
    **/
    _count?: true | ReferralCodeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ReferralCodeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ReferralCodeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReferralCodeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReferralCodeMaxAggregateInputType
  }

  export type GetReferralCodeAggregateType<T extends ReferralCodeAggregateArgs> = {
        [P in keyof T & keyof AggregateReferralCode]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReferralCode[P]>
      : GetScalarType<T[P], AggregateReferralCode[P]>
  }




  export type ReferralCodeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReferralCodeWhereInput
    orderBy?: ReferralCodeOrderByWithAggregationInput | ReferralCodeOrderByWithAggregationInput[]
    by: ReferralCodeScalarFieldEnum[] | ReferralCodeScalarFieldEnum
    having?: ReferralCodeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReferralCodeCountAggregateInputType | true
    _avg?: ReferralCodeAvgAggregateInputType
    _sum?: ReferralCodeSumAggregateInputType
    _min?: ReferralCodeMinAggregateInputType
    _max?: ReferralCodeMaxAggregateInputType
  }

  export type ReferralCodeGroupByOutputType = {
    id: string
    code: string
    marketerName: string
    discountPct: number
    maxDiscountAmount: number
    feePercentage: number
    bankName: string | null
    bankAccount: string | null
    expiryDate: Date | null
    usageLimit: number | null
    usageCount: number
    isActive: boolean
    ownerId: string | null
    targetProductId: string | null
    createdAt: Date
    updatedAt: Date
    _count: ReferralCodeCountAggregateOutputType | null
    _avg: ReferralCodeAvgAggregateOutputType | null
    _sum: ReferralCodeSumAggregateOutputType | null
    _min: ReferralCodeMinAggregateOutputType | null
    _max: ReferralCodeMaxAggregateOutputType | null
  }

  type GetReferralCodeGroupByPayload<T extends ReferralCodeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReferralCodeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReferralCodeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReferralCodeGroupByOutputType[P]>
            : GetScalarType<T[P], ReferralCodeGroupByOutputType[P]>
        }
      >
    >


  export type ReferralCodeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    marketerName?: boolean
    discountPct?: boolean
    maxDiscountAmount?: boolean
    feePercentage?: boolean
    bankName?: boolean
    bankAccount?: boolean
    expiryDate?: boolean
    usageLimit?: boolean
    usageCount?: boolean
    isActive?: boolean
    ownerId?: boolean
    targetProductId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    owner?: boolean | ReferralCode$ownerArgs<ExtArgs>
    referral_usages?: boolean | ReferralCode$referral_usagesArgs<ExtArgs>
    transactions?: boolean | ReferralCode$transactionsArgs<ExtArgs>
    _count?: boolean | ReferralCodeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["referralCode"]>

  export type ReferralCodeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    marketerName?: boolean
    discountPct?: boolean
    maxDiscountAmount?: boolean
    feePercentage?: boolean
    bankName?: boolean
    bankAccount?: boolean
    expiryDate?: boolean
    usageLimit?: boolean
    usageCount?: boolean
    isActive?: boolean
    ownerId?: boolean
    targetProductId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    owner?: boolean | ReferralCode$ownerArgs<ExtArgs>
  }, ExtArgs["result"]["referralCode"]>

  export type ReferralCodeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    marketerName?: boolean
    discountPct?: boolean
    maxDiscountAmount?: boolean
    feePercentage?: boolean
    bankName?: boolean
    bankAccount?: boolean
    expiryDate?: boolean
    usageLimit?: boolean
    usageCount?: boolean
    isActive?: boolean
    ownerId?: boolean
    targetProductId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    owner?: boolean | ReferralCode$ownerArgs<ExtArgs>
  }, ExtArgs["result"]["referralCode"]>

  export type ReferralCodeSelectScalar = {
    id?: boolean
    code?: boolean
    marketerName?: boolean
    discountPct?: boolean
    maxDiscountAmount?: boolean
    feePercentage?: boolean
    bankName?: boolean
    bankAccount?: boolean
    expiryDate?: boolean
    usageLimit?: boolean
    usageCount?: boolean
    isActive?: boolean
    ownerId?: boolean
    targetProductId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ReferralCodeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "code" | "marketerName" | "discountPct" | "maxDiscountAmount" | "feePercentage" | "bankName" | "bankAccount" | "expiryDate" | "usageLimit" | "usageCount" | "isActive" | "ownerId" | "targetProductId" | "createdAt" | "updatedAt", ExtArgs["result"]["referralCode"]>
  export type ReferralCodeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | ReferralCode$ownerArgs<ExtArgs>
    referral_usages?: boolean | ReferralCode$referral_usagesArgs<ExtArgs>
    transactions?: boolean | ReferralCode$transactionsArgs<ExtArgs>
    _count?: boolean | ReferralCodeCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ReferralCodeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | ReferralCode$ownerArgs<ExtArgs>
  }
  export type ReferralCodeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | ReferralCode$ownerArgs<ExtArgs>
  }

  export type $ReferralCodePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ReferralCode"
    objects: {
      owner: Prisma.$UserPayload<ExtArgs> | null
      referral_usages: Prisma.$ReferralUsagePayload<ExtArgs>[]
      transactions: Prisma.$TransactionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      code: string
      marketerName: string
      discountPct: number
      maxDiscountAmount: number
      feePercentage: number
      bankName: string | null
      bankAccount: string | null
      expiryDate: Date | null
      usageLimit: number | null
      usageCount: number
      isActive: boolean
      ownerId: string | null
      targetProductId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["referralCode"]>
    composites: {}
  }

  type ReferralCodeGetPayload<S extends boolean | null | undefined | ReferralCodeDefaultArgs> = $Result.GetResult<Prisma.$ReferralCodePayload, S>

  type ReferralCodeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ReferralCodeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ReferralCodeCountAggregateInputType | true
    }

  export interface ReferralCodeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ReferralCode'], meta: { name: 'ReferralCode' } }
    /**
     * Find zero or one ReferralCode that matches the filter.
     * @param {ReferralCodeFindUniqueArgs} args - Arguments to find a ReferralCode
     * @example
     * // Get one ReferralCode
     * const referralCode = await prisma.referralCode.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReferralCodeFindUniqueArgs>(args: SelectSubset<T, ReferralCodeFindUniqueArgs<ExtArgs>>): Prisma__ReferralCodeClient<$Result.GetResult<Prisma.$ReferralCodePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ReferralCode that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ReferralCodeFindUniqueOrThrowArgs} args - Arguments to find a ReferralCode
     * @example
     * // Get one ReferralCode
     * const referralCode = await prisma.referralCode.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReferralCodeFindUniqueOrThrowArgs>(args: SelectSubset<T, ReferralCodeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReferralCodeClient<$Result.GetResult<Prisma.$ReferralCodePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ReferralCode that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReferralCodeFindFirstArgs} args - Arguments to find a ReferralCode
     * @example
     * // Get one ReferralCode
     * const referralCode = await prisma.referralCode.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReferralCodeFindFirstArgs>(args?: SelectSubset<T, ReferralCodeFindFirstArgs<ExtArgs>>): Prisma__ReferralCodeClient<$Result.GetResult<Prisma.$ReferralCodePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ReferralCode that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReferralCodeFindFirstOrThrowArgs} args - Arguments to find a ReferralCode
     * @example
     * // Get one ReferralCode
     * const referralCode = await prisma.referralCode.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReferralCodeFindFirstOrThrowArgs>(args?: SelectSubset<T, ReferralCodeFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReferralCodeClient<$Result.GetResult<Prisma.$ReferralCodePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ReferralCodes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReferralCodeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ReferralCodes
     * const referralCodes = await prisma.referralCode.findMany()
     * 
     * // Get first 10 ReferralCodes
     * const referralCodes = await prisma.referralCode.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const referralCodeWithIdOnly = await prisma.referralCode.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ReferralCodeFindManyArgs>(args?: SelectSubset<T, ReferralCodeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReferralCodePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ReferralCode.
     * @param {ReferralCodeCreateArgs} args - Arguments to create a ReferralCode.
     * @example
     * // Create one ReferralCode
     * const ReferralCode = await prisma.referralCode.create({
     *   data: {
     *     // ... data to create a ReferralCode
     *   }
     * })
     * 
     */
    create<T extends ReferralCodeCreateArgs>(args: SelectSubset<T, ReferralCodeCreateArgs<ExtArgs>>): Prisma__ReferralCodeClient<$Result.GetResult<Prisma.$ReferralCodePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ReferralCodes.
     * @param {ReferralCodeCreateManyArgs} args - Arguments to create many ReferralCodes.
     * @example
     * // Create many ReferralCodes
     * const referralCode = await prisma.referralCode.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReferralCodeCreateManyArgs>(args?: SelectSubset<T, ReferralCodeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ReferralCodes and returns the data saved in the database.
     * @param {ReferralCodeCreateManyAndReturnArgs} args - Arguments to create many ReferralCodes.
     * @example
     * // Create many ReferralCodes
     * const referralCode = await prisma.referralCode.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ReferralCodes and only return the `id`
     * const referralCodeWithIdOnly = await prisma.referralCode.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ReferralCodeCreateManyAndReturnArgs>(args?: SelectSubset<T, ReferralCodeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReferralCodePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ReferralCode.
     * @param {ReferralCodeDeleteArgs} args - Arguments to delete one ReferralCode.
     * @example
     * // Delete one ReferralCode
     * const ReferralCode = await prisma.referralCode.delete({
     *   where: {
     *     // ... filter to delete one ReferralCode
     *   }
     * })
     * 
     */
    delete<T extends ReferralCodeDeleteArgs>(args: SelectSubset<T, ReferralCodeDeleteArgs<ExtArgs>>): Prisma__ReferralCodeClient<$Result.GetResult<Prisma.$ReferralCodePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ReferralCode.
     * @param {ReferralCodeUpdateArgs} args - Arguments to update one ReferralCode.
     * @example
     * // Update one ReferralCode
     * const referralCode = await prisma.referralCode.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReferralCodeUpdateArgs>(args: SelectSubset<T, ReferralCodeUpdateArgs<ExtArgs>>): Prisma__ReferralCodeClient<$Result.GetResult<Prisma.$ReferralCodePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ReferralCodes.
     * @param {ReferralCodeDeleteManyArgs} args - Arguments to filter ReferralCodes to delete.
     * @example
     * // Delete a few ReferralCodes
     * const { count } = await prisma.referralCode.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReferralCodeDeleteManyArgs>(args?: SelectSubset<T, ReferralCodeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ReferralCodes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReferralCodeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ReferralCodes
     * const referralCode = await prisma.referralCode.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReferralCodeUpdateManyArgs>(args: SelectSubset<T, ReferralCodeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ReferralCodes and returns the data updated in the database.
     * @param {ReferralCodeUpdateManyAndReturnArgs} args - Arguments to update many ReferralCodes.
     * @example
     * // Update many ReferralCodes
     * const referralCode = await prisma.referralCode.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ReferralCodes and only return the `id`
     * const referralCodeWithIdOnly = await prisma.referralCode.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ReferralCodeUpdateManyAndReturnArgs>(args: SelectSubset<T, ReferralCodeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReferralCodePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ReferralCode.
     * @param {ReferralCodeUpsertArgs} args - Arguments to update or create a ReferralCode.
     * @example
     * // Update or create a ReferralCode
     * const referralCode = await prisma.referralCode.upsert({
     *   create: {
     *     // ... data to create a ReferralCode
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ReferralCode we want to update
     *   }
     * })
     */
    upsert<T extends ReferralCodeUpsertArgs>(args: SelectSubset<T, ReferralCodeUpsertArgs<ExtArgs>>): Prisma__ReferralCodeClient<$Result.GetResult<Prisma.$ReferralCodePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ReferralCodes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReferralCodeCountArgs} args - Arguments to filter ReferralCodes to count.
     * @example
     * // Count the number of ReferralCodes
     * const count = await prisma.referralCode.count({
     *   where: {
     *     // ... the filter for the ReferralCodes we want to count
     *   }
     * })
    **/
    count<T extends ReferralCodeCountArgs>(
      args?: Subset<T, ReferralCodeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReferralCodeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ReferralCode.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReferralCodeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ReferralCodeAggregateArgs>(args: Subset<T, ReferralCodeAggregateArgs>): Prisma.PrismaPromise<GetReferralCodeAggregateType<T>>

    /**
     * Group by ReferralCode.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReferralCodeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ReferralCodeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReferralCodeGroupByArgs['orderBy'] }
        : { orderBy?: ReferralCodeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ReferralCodeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReferralCodeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ReferralCode model
   */
  readonly fields: ReferralCodeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ReferralCode.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReferralCodeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    owner<T extends ReferralCode$ownerArgs<ExtArgs> = {}>(args?: Subset<T, ReferralCode$ownerArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    referral_usages<T extends ReferralCode$referral_usagesArgs<ExtArgs> = {}>(args?: Subset<T, ReferralCode$referral_usagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReferralUsagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    transactions<T extends ReferralCode$transactionsArgs<ExtArgs> = {}>(args?: Subset<T, ReferralCode$transactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ReferralCode model
   */
  interface ReferralCodeFieldRefs {
    readonly id: FieldRef<"ReferralCode", 'String'>
    readonly code: FieldRef<"ReferralCode", 'String'>
    readonly marketerName: FieldRef<"ReferralCode", 'String'>
    readonly discountPct: FieldRef<"ReferralCode", 'Float'>
    readonly maxDiscountAmount: FieldRef<"ReferralCode", 'Float'>
    readonly feePercentage: FieldRef<"ReferralCode", 'Float'>
    readonly bankName: FieldRef<"ReferralCode", 'String'>
    readonly bankAccount: FieldRef<"ReferralCode", 'String'>
    readonly expiryDate: FieldRef<"ReferralCode", 'DateTime'>
    readonly usageLimit: FieldRef<"ReferralCode", 'Int'>
    readonly usageCount: FieldRef<"ReferralCode", 'Int'>
    readonly isActive: FieldRef<"ReferralCode", 'Boolean'>
    readonly ownerId: FieldRef<"ReferralCode", 'String'>
    readonly targetProductId: FieldRef<"ReferralCode", 'String'>
    readonly createdAt: FieldRef<"ReferralCode", 'DateTime'>
    readonly updatedAt: FieldRef<"ReferralCode", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ReferralCode findUnique
   */
  export type ReferralCodeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReferralCode
     */
    select?: ReferralCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReferralCode
     */
    omit?: ReferralCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralCodeInclude<ExtArgs> | null
    /**
     * Filter, which ReferralCode to fetch.
     */
    where: ReferralCodeWhereUniqueInput
  }

  /**
   * ReferralCode findUniqueOrThrow
   */
  export type ReferralCodeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReferralCode
     */
    select?: ReferralCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReferralCode
     */
    omit?: ReferralCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralCodeInclude<ExtArgs> | null
    /**
     * Filter, which ReferralCode to fetch.
     */
    where: ReferralCodeWhereUniqueInput
  }

  /**
   * ReferralCode findFirst
   */
  export type ReferralCodeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReferralCode
     */
    select?: ReferralCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReferralCode
     */
    omit?: ReferralCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralCodeInclude<ExtArgs> | null
    /**
     * Filter, which ReferralCode to fetch.
     */
    where?: ReferralCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReferralCodes to fetch.
     */
    orderBy?: ReferralCodeOrderByWithRelationInput | ReferralCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ReferralCodes.
     */
    cursor?: ReferralCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReferralCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReferralCodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ReferralCodes.
     */
    distinct?: ReferralCodeScalarFieldEnum | ReferralCodeScalarFieldEnum[]
  }

  /**
   * ReferralCode findFirstOrThrow
   */
  export type ReferralCodeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReferralCode
     */
    select?: ReferralCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReferralCode
     */
    omit?: ReferralCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralCodeInclude<ExtArgs> | null
    /**
     * Filter, which ReferralCode to fetch.
     */
    where?: ReferralCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReferralCodes to fetch.
     */
    orderBy?: ReferralCodeOrderByWithRelationInput | ReferralCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ReferralCodes.
     */
    cursor?: ReferralCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReferralCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReferralCodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ReferralCodes.
     */
    distinct?: ReferralCodeScalarFieldEnum | ReferralCodeScalarFieldEnum[]
  }

  /**
   * ReferralCode findMany
   */
  export type ReferralCodeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReferralCode
     */
    select?: ReferralCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReferralCode
     */
    omit?: ReferralCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralCodeInclude<ExtArgs> | null
    /**
     * Filter, which ReferralCodes to fetch.
     */
    where?: ReferralCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReferralCodes to fetch.
     */
    orderBy?: ReferralCodeOrderByWithRelationInput | ReferralCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ReferralCodes.
     */
    cursor?: ReferralCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReferralCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReferralCodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ReferralCodes.
     */
    distinct?: ReferralCodeScalarFieldEnum | ReferralCodeScalarFieldEnum[]
  }

  /**
   * ReferralCode create
   */
  export type ReferralCodeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReferralCode
     */
    select?: ReferralCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReferralCode
     */
    omit?: ReferralCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralCodeInclude<ExtArgs> | null
    /**
     * The data needed to create a ReferralCode.
     */
    data: XOR<ReferralCodeCreateInput, ReferralCodeUncheckedCreateInput>
  }

  /**
   * ReferralCode createMany
   */
  export type ReferralCodeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ReferralCodes.
     */
    data: ReferralCodeCreateManyInput | ReferralCodeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ReferralCode createManyAndReturn
   */
  export type ReferralCodeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReferralCode
     */
    select?: ReferralCodeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ReferralCode
     */
    omit?: ReferralCodeOmit<ExtArgs> | null
    /**
     * The data used to create many ReferralCodes.
     */
    data: ReferralCodeCreateManyInput | ReferralCodeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralCodeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ReferralCode update
   */
  export type ReferralCodeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReferralCode
     */
    select?: ReferralCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReferralCode
     */
    omit?: ReferralCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralCodeInclude<ExtArgs> | null
    /**
     * The data needed to update a ReferralCode.
     */
    data: XOR<ReferralCodeUpdateInput, ReferralCodeUncheckedUpdateInput>
    /**
     * Choose, which ReferralCode to update.
     */
    where: ReferralCodeWhereUniqueInput
  }

  /**
   * ReferralCode updateMany
   */
  export type ReferralCodeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ReferralCodes.
     */
    data: XOR<ReferralCodeUpdateManyMutationInput, ReferralCodeUncheckedUpdateManyInput>
    /**
     * Filter which ReferralCodes to update
     */
    where?: ReferralCodeWhereInput
    /**
     * Limit how many ReferralCodes to update.
     */
    limit?: number
  }

  /**
   * ReferralCode updateManyAndReturn
   */
  export type ReferralCodeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReferralCode
     */
    select?: ReferralCodeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ReferralCode
     */
    omit?: ReferralCodeOmit<ExtArgs> | null
    /**
     * The data used to update ReferralCodes.
     */
    data: XOR<ReferralCodeUpdateManyMutationInput, ReferralCodeUncheckedUpdateManyInput>
    /**
     * Filter which ReferralCodes to update
     */
    where?: ReferralCodeWhereInput
    /**
     * Limit how many ReferralCodes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralCodeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ReferralCode upsert
   */
  export type ReferralCodeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReferralCode
     */
    select?: ReferralCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReferralCode
     */
    omit?: ReferralCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralCodeInclude<ExtArgs> | null
    /**
     * The filter to search for the ReferralCode to update in case it exists.
     */
    where: ReferralCodeWhereUniqueInput
    /**
     * In case the ReferralCode found by the `where` argument doesn't exist, create a new ReferralCode with this data.
     */
    create: XOR<ReferralCodeCreateInput, ReferralCodeUncheckedCreateInput>
    /**
     * In case the ReferralCode was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReferralCodeUpdateInput, ReferralCodeUncheckedUpdateInput>
  }

  /**
   * ReferralCode delete
   */
  export type ReferralCodeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReferralCode
     */
    select?: ReferralCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReferralCode
     */
    omit?: ReferralCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralCodeInclude<ExtArgs> | null
    /**
     * Filter which ReferralCode to delete.
     */
    where: ReferralCodeWhereUniqueInput
  }

  /**
   * ReferralCode deleteMany
   */
  export type ReferralCodeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ReferralCodes to delete
     */
    where?: ReferralCodeWhereInput
    /**
     * Limit how many ReferralCodes to delete.
     */
    limit?: number
  }

  /**
   * ReferralCode.owner
   */
  export type ReferralCode$ownerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * ReferralCode.referral_usages
   */
  export type ReferralCode$referral_usagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReferralUsage
     */
    select?: ReferralUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReferralUsage
     */
    omit?: ReferralUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralUsageInclude<ExtArgs> | null
    where?: ReferralUsageWhereInput
    orderBy?: ReferralUsageOrderByWithRelationInput | ReferralUsageOrderByWithRelationInput[]
    cursor?: ReferralUsageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReferralUsageScalarFieldEnum | ReferralUsageScalarFieldEnum[]
  }

  /**
   * ReferralCode.transactions
   */
  export type ReferralCode$transactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    where?: TransactionWhereInput
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    cursor?: TransactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * ReferralCode without action
   */
  export type ReferralCodeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReferralCode
     */
    select?: ReferralCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReferralCode
     */
    omit?: ReferralCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralCodeInclude<ExtArgs> | null
  }


  /**
   * Model Booking
   */

  export type AggregateBooking = {
    _count: BookingCountAggregateOutputType | null
    _avg: BookingAvgAggregateOutputType | null
    _sum: BookingSumAggregateOutputType | null
    _min: BookingMinAggregateOutputType | null
    _max: BookingMaxAggregateOutputType | null
  }

  export type BookingAvgAggregateOutputType = {
    discountPct: number | null
    originalPrice: number | null
    finalPrice: number | null
  }

  export type BookingSumAggregateOutputType = {
    discountPct: number | null
    originalPrice: number | null
    finalPrice: number | null
  }

  export type BookingMinAggregateOutputType = {
    id: string | null
    invoiceNo: string | null
    packageId: string | null
    packageName: string | null
    customerName: string | null
    customerPhone: string | null
    sessionDate: string | null
    sessionTime: string | null
    notes: string | null
    referralCode: string | null
    discountPct: number | null
    originalPrice: number | null
    finalPrice: number | null
    paymentMethod: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BookingMaxAggregateOutputType = {
    id: string | null
    invoiceNo: string | null
    packageId: string | null
    packageName: string | null
    customerName: string | null
    customerPhone: string | null
    sessionDate: string | null
    sessionTime: string | null
    notes: string | null
    referralCode: string | null
    discountPct: number | null
    originalPrice: number | null
    finalPrice: number | null
    paymentMethod: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BookingCountAggregateOutputType = {
    id: number
    invoiceNo: number
    packageId: number
    packageName: number
    customerName: number
    customerPhone: number
    sessionDate: number
    sessionTime: number
    notes: number
    referralCode: number
    discountPct: number
    originalPrice: number
    finalPrice: number
    paymentMethod: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BookingAvgAggregateInputType = {
    discountPct?: true
    originalPrice?: true
    finalPrice?: true
  }

  export type BookingSumAggregateInputType = {
    discountPct?: true
    originalPrice?: true
    finalPrice?: true
  }

  export type BookingMinAggregateInputType = {
    id?: true
    invoiceNo?: true
    packageId?: true
    packageName?: true
    customerName?: true
    customerPhone?: true
    sessionDate?: true
    sessionTime?: true
    notes?: true
    referralCode?: true
    discountPct?: true
    originalPrice?: true
    finalPrice?: true
    paymentMethod?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BookingMaxAggregateInputType = {
    id?: true
    invoiceNo?: true
    packageId?: true
    packageName?: true
    customerName?: true
    customerPhone?: true
    sessionDate?: true
    sessionTime?: true
    notes?: true
    referralCode?: true
    discountPct?: true
    originalPrice?: true
    finalPrice?: true
    paymentMethod?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BookingCountAggregateInputType = {
    id?: true
    invoiceNo?: true
    packageId?: true
    packageName?: true
    customerName?: true
    customerPhone?: true
    sessionDate?: true
    sessionTime?: true
    notes?: true
    referralCode?: true
    discountPct?: true
    originalPrice?: true
    finalPrice?: true
    paymentMethod?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BookingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Booking to aggregate.
     */
    where?: BookingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bookings to fetch.
     */
    orderBy?: BookingOrderByWithRelationInput | BookingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BookingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bookings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Bookings
    **/
    _count?: true | BookingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BookingAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BookingSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BookingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BookingMaxAggregateInputType
  }

  export type GetBookingAggregateType<T extends BookingAggregateArgs> = {
        [P in keyof T & keyof AggregateBooking]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBooking[P]>
      : GetScalarType<T[P], AggregateBooking[P]>
  }




  export type BookingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookingWhereInput
    orderBy?: BookingOrderByWithAggregationInput | BookingOrderByWithAggregationInput[]
    by: BookingScalarFieldEnum[] | BookingScalarFieldEnum
    having?: BookingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BookingCountAggregateInputType | true
    _avg?: BookingAvgAggregateInputType
    _sum?: BookingSumAggregateInputType
    _min?: BookingMinAggregateInputType
    _max?: BookingMaxAggregateInputType
  }

  export type BookingGroupByOutputType = {
    id: string
    invoiceNo: string
    packageId: string
    packageName: string
    customerName: string
    customerPhone: string
    sessionDate: string
    sessionTime: string
    notes: string | null
    referralCode: string | null
    discountPct: number
    originalPrice: number
    finalPrice: number
    paymentMethod: string
    status: string
    createdAt: Date
    updatedAt: Date
    _count: BookingCountAggregateOutputType | null
    _avg: BookingAvgAggregateOutputType | null
    _sum: BookingSumAggregateOutputType | null
    _min: BookingMinAggregateOutputType | null
    _max: BookingMaxAggregateOutputType | null
  }

  type GetBookingGroupByPayload<T extends BookingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BookingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BookingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BookingGroupByOutputType[P]>
            : GetScalarType<T[P], BookingGroupByOutputType[P]>
        }
      >
    >


  export type BookingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    invoiceNo?: boolean
    packageId?: boolean
    packageName?: boolean
    customerName?: boolean
    customerPhone?: boolean
    sessionDate?: boolean
    sessionTime?: boolean
    notes?: boolean
    referralCode?: boolean
    discountPct?: boolean
    originalPrice?: boolean
    finalPrice?: boolean
    paymentMethod?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    commissions?: boolean | Booking$commissionsArgs<ExtArgs>
    _count?: boolean | BookingCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["booking"]>

  export type BookingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    invoiceNo?: boolean
    packageId?: boolean
    packageName?: boolean
    customerName?: boolean
    customerPhone?: boolean
    sessionDate?: boolean
    sessionTime?: boolean
    notes?: boolean
    referralCode?: boolean
    discountPct?: boolean
    originalPrice?: boolean
    finalPrice?: boolean
    paymentMethod?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["booking"]>

  export type BookingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    invoiceNo?: boolean
    packageId?: boolean
    packageName?: boolean
    customerName?: boolean
    customerPhone?: boolean
    sessionDate?: boolean
    sessionTime?: boolean
    notes?: boolean
    referralCode?: boolean
    discountPct?: boolean
    originalPrice?: boolean
    finalPrice?: boolean
    paymentMethod?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["booking"]>

  export type BookingSelectScalar = {
    id?: boolean
    invoiceNo?: boolean
    packageId?: boolean
    packageName?: boolean
    customerName?: boolean
    customerPhone?: boolean
    sessionDate?: boolean
    sessionTime?: boolean
    notes?: boolean
    referralCode?: boolean
    discountPct?: boolean
    originalPrice?: boolean
    finalPrice?: boolean
    paymentMethod?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type BookingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "invoiceNo" | "packageId" | "packageName" | "customerName" | "customerPhone" | "sessionDate" | "sessionTime" | "notes" | "referralCode" | "discountPct" | "originalPrice" | "finalPrice" | "paymentMethod" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["booking"]>
  export type BookingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    commissions?: boolean | Booking$commissionsArgs<ExtArgs>
    _count?: boolean | BookingCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type BookingIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type BookingIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $BookingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Booking"
    objects: {
      commissions: Prisma.$AffiliateCommissionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      invoiceNo: string
      packageId: string
      packageName: string
      customerName: string
      customerPhone: string
      sessionDate: string
      sessionTime: string
      notes: string | null
      referralCode: string | null
      discountPct: number
      originalPrice: number
      finalPrice: number
      paymentMethod: string
      status: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["booking"]>
    composites: {}
  }

  type BookingGetPayload<S extends boolean | null | undefined | BookingDefaultArgs> = $Result.GetResult<Prisma.$BookingPayload, S>

  type BookingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BookingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BookingCountAggregateInputType | true
    }

  export interface BookingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Booking'], meta: { name: 'Booking' } }
    /**
     * Find zero or one Booking that matches the filter.
     * @param {BookingFindUniqueArgs} args - Arguments to find a Booking
     * @example
     * // Get one Booking
     * const booking = await prisma.booking.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BookingFindUniqueArgs>(args: SelectSubset<T, BookingFindUniqueArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Booking that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BookingFindUniqueOrThrowArgs} args - Arguments to find a Booking
     * @example
     * // Get one Booking
     * const booking = await prisma.booking.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BookingFindUniqueOrThrowArgs>(args: SelectSubset<T, BookingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Booking that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingFindFirstArgs} args - Arguments to find a Booking
     * @example
     * // Get one Booking
     * const booking = await prisma.booking.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BookingFindFirstArgs>(args?: SelectSubset<T, BookingFindFirstArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Booking that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingFindFirstOrThrowArgs} args - Arguments to find a Booking
     * @example
     * // Get one Booking
     * const booking = await prisma.booking.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BookingFindFirstOrThrowArgs>(args?: SelectSubset<T, BookingFindFirstOrThrowArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Bookings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Bookings
     * const bookings = await prisma.booking.findMany()
     * 
     * // Get first 10 Bookings
     * const bookings = await prisma.booking.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const bookingWithIdOnly = await prisma.booking.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BookingFindManyArgs>(args?: SelectSubset<T, BookingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Booking.
     * @param {BookingCreateArgs} args - Arguments to create a Booking.
     * @example
     * // Create one Booking
     * const Booking = await prisma.booking.create({
     *   data: {
     *     // ... data to create a Booking
     *   }
     * })
     * 
     */
    create<T extends BookingCreateArgs>(args: SelectSubset<T, BookingCreateArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Bookings.
     * @param {BookingCreateManyArgs} args - Arguments to create many Bookings.
     * @example
     * // Create many Bookings
     * const booking = await prisma.booking.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BookingCreateManyArgs>(args?: SelectSubset<T, BookingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Bookings and returns the data saved in the database.
     * @param {BookingCreateManyAndReturnArgs} args - Arguments to create many Bookings.
     * @example
     * // Create many Bookings
     * const booking = await prisma.booking.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Bookings and only return the `id`
     * const bookingWithIdOnly = await prisma.booking.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BookingCreateManyAndReturnArgs>(args?: SelectSubset<T, BookingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Booking.
     * @param {BookingDeleteArgs} args - Arguments to delete one Booking.
     * @example
     * // Delete one Booking
     * const Booking = await prisma.booking.delete({
     *   where: {
     *     // ... filter to delete one Booking
     *   }
     * })
     * 
     */
    delete<T extends BookingDeleteArgs>(args: SelectSubset<T, BookingDeleteArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Booking.
     * @param {BookingUpdateArgs} args - Arguments to update one Booking.
     * @example
     * // Update one Booking
     * const booking = await prisma.booking.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BookingUpdateArgs>(args: SelectSubset<T, BookingUpdateArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Bookings.
     * @param {BookingDeleteManyArgs} args - Arguments to filter Bookings to delete.
     * @example
     * // Delete a few Bookings
     * const { count } = await prisma.booking.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BookingDeleteManyArgs>(args?: SelectSubset<T, BookingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bookings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Bookings
     * const booking = await prisma.booking.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BookingUpdateManyArgs>(args: SelectSubset<T, BookingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bookings and returns the data updated in the database.
     * @param {BookingUpdateManyAndReturnArgs} args - Arguments to update many Bookings.
     * @example
     * // Update many Bookings
     * const booking = await prisma.booking.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Bookings and only return the `id`
     * const bookingWithIdOnly = await prisma.booking.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BookingUpdateManyAndReturnArgs>(args: SelectSubset<T, BookingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Booking.
     * @param {BookingUpsertArgs} args - Arguments to update or create a Booking.
     * @example
     * // Update or create a Booking
     * const booking = await prisma.booking.upsert({
     *   create: {
     *     // ... data to create a Booking
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Booking we want to update
     *   }
     * })
     */
    upsert<T extends BookingUpsertArgs>(args: SelectSubset<T, BookingUpsertArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Bookings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingCountArgs} args - Arguments to filter Bookings to count.
     * @example
     * // Count the number of Bookings
     * const count = await prisma.booking.count({
     *   where: {
     *     // ... the filter for the Bookings we want to count
     *   }
     * })
    **/
    count<T extends BookingCountArgs>(
      args?: Subset<T, BookingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BookingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Booking.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BookingAggregateArgs>(args: Subset<T, BookingAggregateArgs>): Prisma.PrismaPromise<GetBookingAggregateType<T>>

    /**
     * Group by Booking.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BookingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BookingGroupByArgs['orderBy'] }
        : { orderBy?: BookingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BookingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBookingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Booking model
   */
  readonly fields: BookingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Booking.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BookingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    commissions<T extends Booking$commissionsArgs<ExtArgs> = {}>(args?: Subset<T, Booking$commissionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AffiliateCommissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Booking model
   */
  interface BookingFieldRefs {
    readonly id: FieldRef<"Booking", 'String'>
    readonly invoiceNo: FieldRef<"Booking", 'String'>
    readonly packageId: FieldRef<"Booking", 'String'>
    readonly packageName: FieldRef<"Booking", 'String'>
    readonly customerName: FieldRef<"Booking", 'String'>
    readonly customerPhone: FieldRef<"Booking", 'String'>
    readonly sessionDate: FieldRef<"Booking", 'String'>
    readonly sessionTime: FieldRef<"Booking", 'String'>
    readonly notes: FieldRef<"Booking", 'String'>
    readonly referralCode: FieldRef<"Booking", 'String'>
    readonly discountPct: FieldRef<"Booking", 'Float'>
    readonly originalPrice: FieldRef<"Booking", 'Float'>
    readonly finalPrice: FieldRef<"Booking", 'Float'>
    readonly paymentMethod: FieldRef<"Booking", 'String'>
    readonly status: FieldRef<"Booking", 'String'>
    readonly createdAt: FieldRef<"Booking", 'DateTime'>
    readonly updatedAt: FieldRef<"Booking", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Booking findUnique
   */
  export type BookingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter, which Booking to fetch.
     */
    where: BookingWhereUniqueInput
  }

  /**
   * Booking findUniqueOrThrow
   */
  export type BookingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter, which Booking to fetch.
     */
    where: BookingWhereUniqueInput
  }

  /**
   * Booking findFirst
   */
  export type BookingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter, which Booking to fetch.
     */
    where?: BookingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bookings to fetch.
     */
    orderBy?: BookingOrderByWithRelationInput | BookingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Bookings.
     */
    cursor?: BookingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bookings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Bookings.
     */
    distinct?: BookingScalarFieldEnum | BookingScalarFieldEnum[]
  }

  /**
   * Booking findFirstOrThrow
   */
  export type BookingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter, which Booking to fetch.
     */
    where?: BookingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bookings to fetch.
     */
    orderBy?: BookingOrderByWithRelationInput | BookingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Bookings.
     */
    cursor?: BookingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bookings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Bookings.
     */
    distinct?: BookingScalarFieldEnum | BookingScalarFieldEnum[]
  }

  /**
   * Booking findMany
   */
  export type BookingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter, which Bookings to fetch.
     */
    where?: BookingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bookings to fetch.
     */
    orderBy?: BookingOrderByWithRelationInput | BookingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Bookings.
     */
    cursor?: BookingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bookings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Bookings.
     */
    distinct?: BookingScalarFieldEnum | BookingScalarFieldEnum[]
  }

  /**
   * Booking create
   */
  export type BookingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * The data needed to create a Booking.
     */
    data: XOR<BookingCreateInput, BookingUncheckedCreateInput>
  }

  /**
   * Booking createMany
   */
  export type BookingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Bookings.
     */
    data: BookingCreateManyInput | BookingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Booking createManyAndReturn
   */
  export type BookingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * The data used to create many Bookings.
     */
    data: BookingCreateManyInput | BookingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Booking update
   */
  export type BookingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * The data needed to update a Booking.
     */
    data: XOR<BookingUpdateInput, BookingUncheckedUpdateInput>
    /**
     * Choose, which Booking to update.
     */
    where: BookingWhereUniqueInput
  }

  /**
   * Booking updateMany
   */
  export type BookingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Bookings.
     */
    data: XOR<BookingUpdateManyMutationInput, BookingUncheckedUpdateManyInput>
    /**
     * Filter which Bookings to update
     */
    where?: BookingWhereInput
    /**
     * Limit how many Bookings to update.
     */
    limit?: number
  }

  /**
   * Booking updateManyAndReturn
   */
  export type BookingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * The data used to update Bookings.
     */
    data: XOR<BookingUpdateManyMutationInput, BookingUncheckedUpdateManyInput>
    /**
     * Filter which Bookings to update
     */
    where?: BookingWhereInput
    /**
     * Limit how many Bookings to update.
     */
    limit?: number
  }

  /**
   * Booking upsert
   */
  export type BookingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * The filter to search for the Booking to update in case it exists.
     */
    where: BookingWhereUniqueInput
    /**
     * In case the Booking found by the `where` argument doesn't exist, create a new Booking with this data.
     */
    create: XOR<BookingCreateInput, BookingUncheckedCreateInput>
    /**
     * In case the Booking was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BookingUpdateInput, BookingUncheckedUpdateInput>
  }

  /**
   * Booking delete
   */
  export type BookingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter which Booking to delete.
     */
    where: BookingWhereUniqueInput
  }

  /**
   * Booking deleteMany
   */
  export type BookingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Bookings to delete
     */
    where?: BookingWhereInput
    /**
     * Limit how many Bookings to delete.
     */
    limit?: number
  }

  /**
   * Booking.commissions
   */
  export type Booking$commissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliateCommission
     */
    select?: AffiliateCommissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliateCommission
     */
    omit?: AffiliateCommissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffiliateCommissionInclude<ExtArgs> | null
    where?: AffiliateCommissionWhereInput
    orderBy?: AffiliateCommissionOrderByWithRelationInput | AffiliateCommissionOrderByWithRelationInput[]
    cursor?: AffiliateCommissionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AffiliateCommissionScalarFieldEnum | AffiliateCommissionScalarFieldEnum[]
  }

  /**
   * Booking without action
   */
  export type BookingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
  }


  /**
   * Model Category
   */

  export type AggregateCategory = {
    _count: CategoryCountAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  export type CategoryMinAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
  }

  export type CategoryMaxAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
  }

  export type CategoryCountAggregateOutputType = {
    id: number
    name: number
    slug: number
    _all: number
  }


  export type CategoryMinAggregateInputType = {
    id?: true
    name?: true
    slug?: true
  }

  export type CategoryMaxAggregateInputType = {
    id?: true
    name?: true
    slug?: true
  }

  export type CategoryCountAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    _all?: true
  }

  export type CategoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Category to aggregate.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Categories
    **/
    _count?: true | CategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CategoryMaxAggregateInputType
  }

  export type GetCategoryAggregateType<T extends CategoryAggregateArgs> = {
        [P in keyof T & keyof AggregateCategory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCategory[P]>
      : GetScalarType<T[P], AggregateCategory[P]>
  }




  export type CategoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoryWhereInput
    orderBy?: CategoryOrderByWithAggregationInput | CategoryOrderByWithAggregationInput[]
    by: CategoryScalarFieldEnum[] | CategoryScalarFieldEnum
    having?: CategoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CategoryCountAggregateInputType | true
    _min?: CategoryMinAggregateInputType
    _max?: CategoryMaxAggregateInputType
  }

  export type CategoryGroupByOutputType = {
    id: string
    name: string
    slug: string
    _count: CategoryCountAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  type GetCategoryGroupByPayload<T extends CategoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CategoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CategoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CategoryGroupByOutputType[P]>
            : GetScalarType<T[P], CategoryGroupByOutputType[P]>
        }
      >
    >


  export type CategorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    products?: boolean | Category$productsArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["category"]>

  export type CategorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
  }, ExtArgs["result"]["category"]>

  export type CategorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
  }, ExtArgs["result"]["category"]>

  export type CategorySelectScalar = {
    id?: boolean
    name?: boolean
    slug?: boolean
  }

  export type CategoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "slug", ExtArgs["result"]["category"]>
  export type CategoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    products?: boolean | Category$productsArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CategoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type CategoryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CategoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Category"
    objects: {
      products: Prisma.$ProductPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      slug: string
    }, ExtArgs["result"]["category"]>
    composites: {}
  }

  type CategoryGetPayload<S extends boolean | null | undefined | CategoryDefaultArgs> = $Result.GetResult<Prisma.$CategoryPayload, S>

  type CategoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CategoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CategoryCountAggregateInputType | true
    }

  export interface CategoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Category'], meta: { name: 'Category' } }
    /**
     * Find zero or one Category that matches the filter.
     * @param {CategoryFindUniqueArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CategoryFindUniqueArgs>(args: SelectSubset<T, CategoryFindUniqueArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Category that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CategoryFindUniqueOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CategoryFindUniqueOrThrowArgs>(args: SelectSubset<T, CategoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Category that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CategoryFindFirstArgs>(args?: SelectSubset<T, CategoryFindFirstArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Category that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CategoryFindFirstOrThrowArgs>(args?: SelectSubset<T, CategoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Categories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Categories
     * const categories = await prisma.category.findMany()
     * 
     * // Get first 10 Categories
     * const categories = await prisma.category.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const categoryWithIdOnly = await prisma.category.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CategoryFindManyArgs>(args?: SelectSubset<T, CategoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Category.
     * @param {CategoryCreateArgs} args - Arguments to create a Category.
     * @example
     * // Create one Category
     * const Category = await prisma.category.create({
     *   data: {
     *     // ... data to create a Category
     *   }
     * })
     * 
     */
    create<T extends CategoryCreateArgs>(args: SelectSubset<T, CategoryCreateArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Categories.
     * @param {CategoryCreateManyArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CategoryCreateManyArgs>(args?: SelectSubset<T, CategoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Categories and returns the data saved in the database.
     * @param {CategoryCreateManyAndReturnArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Categories and only return the `id`
     * const categoryWithIdOnly = await prisma.category.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CategoryCreateManyAndReturnArgs>(args?: SelectSubset<T, CategoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Category.
     * @param {CategoryDeleteArgs} args - Arguments to delete one Category.
     * @example
     * // Delete one Category
     * const Category = await prisma.category.delete({
     *   where: {
     *     // ... filter to delete one Category
     *   }
     * })
     * 
     */
    delete<T extends CategoryDeleteArgs>(args: SelectSubset<T, CategoryDeleteArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Category.
     * @param {CategoryUpdateArgs} args - Arguments to update one Category.
     * @example
     * // Update one Category
     * const category = await prisma.category.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CategoryUpdateArgs>(args: SelectSubset<T, CategoryUpdateArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Categories.
     * @param {CategoryDeleteManyArgs} args - Arguments to filter Categories to delete.
     * @example
     * // Delete a few Categories
     * const { count } = await prisma.category.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CategoryDeleteManyArgs>(args?: SelectSubset<T, CategoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Categories
     * const category = await prisma.category.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CategoryUpdateManyArgs>(args: SelectSubset<T, CategoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories and returns the data updated in the database.
     * @param {CategoryUpdateManyAndReturnArgs} args - Arguments to update many Categories.
     * @example
     * // Update many Categories
     * const category = await prisma.category.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Categories and only return the `id`
     * const categoryWithIdOnly = await prisma.category.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CategoryUpdateManyAndReturnArgs>(args: SelectSubset<T, CategoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Category.
     * @param {CategoryUpsertArgs} args - Arguments to update or create a Category.
     * @example
     * // Update or create a Category
     * const category = await prisma.category.upsert({
     *   create: {
     *     // ... data to create a Category
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Category we want to update
     *   }
     * })
     */
    upsert<T extends CategoryUpsertArgs>(args: SelectSubset<T, CategoryUpsertArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryCountArgs} args - Arguments to filter Categories to count.
     * @example
     * // Count the number of Categories
     * const count = await prisma.category.count({
     *   where: {
     *     // ... the filter for the Categories we want to count
     *   }
     * })
    **/
    count<T extends CategoryCountArgs>(
      args?: Subset<T, CategoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CategoryAggregateArgs>(args: Subset<T, CategoryAggregateArgs>): Prisma.PrismaPromise<GetCategoryAggregateType<T>>

    /**
     * Group by Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CategoryGroupByArgs['orderBy'] }
        : { orderBy?: CategoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Category model
   */
  readonly fields: CategoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Category.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CategoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    products<T extends Category$productsArgs<ExtArgs> = {}>(args?: Subset<T, Category$productsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Category model
   */
  interface CategoryFieldRefs {
    readonly id: FieldRef<"Category", 'String'>
    readonly name: FieldRef<"Category", 'String'>
    readonly slug: FieldRef<"Category", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Category findUnique
   */
  export type CategoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findUniqueOrThrow
   */
  export type CategoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findFirst
   */
  export type CategoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category findFirstOrThrow
   */
  export type CategoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category findMany
   */
  export type CategoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Categories to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category create
   */
  export type CategoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The data needed to create a Category.
     */
    data: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
  }

  /**
   * Category createMany
   */
  export type CategoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Categories.
     */
    data: CategoryCreateManyInput | CategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Category createManyAndReturn
   */
  export type CategoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * The data used to create many Categories.
     */
    data: CategoryCreateManyInput | CategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Category update
   */
  export type CategoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The data needed to update a Category.
     */
    data: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
    /**
     * Choose, which Category to update.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category updateMany
   */
  export type CategoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Categories.
     */
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyInput>
    /**
     * Filter which Categories to update
     */
    where?: CategoryWhereInput
    /**
     * Limit how many Categories to update.
     */
    limit?: number
  }

  /**
   * Category updateManyAndReturn
   */
  export type CategoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * The data used to update Categories.
     */
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyInput>
    /**
     * Filter which Categories to update
     */
    where?: CategoryWhereInput
    /**
     * Limit how many Categories to update.
     */
    limit?: number
  }

  /**
   * Category upsert
   */
  export type CategoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The filter to search for the Category to update in case it exists.
     */
    where: CategoryWhereUniqueInput
    /**
     * In case the Category found by the `where` argument doesn't exist, create a new Category with this data.
     */
    create: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
    /**
     * In case the Category was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
  }

  /**
   * Category delete
   */
  export type CategoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter which Category to delete.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category deleteMany
   */
  export type CategoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Categories to delete
     */
    where?: CategoryWhereInput
    /**
     * Limit how many Categories to delete.
     */
    limit?: number
  }

  /**
   * Category.products
   */
  export type Category$productsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    where?: ProductWhereInput
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    cursor?: ProductWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Category without action
   */
  export type CategoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
  }


  /**
   * Model Product
   */

  export type AggregateProduct = {
    _count: ProductCountAggregateOutputType | null
    _avg: ProductAvgAggregateOutputType | null
    _sum: ProductSumAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  export type ProductAvgAggregateOutputType = {
    price: number | null
    stock: number | null
    sortOrder: number | null
  }

  export type ProductSumAggregateOutputType = {
    price: number | null
    stock: number | null
    sortOrder: number | null
  }

  export type ProductMinAggregateOutputType = {
    id: string | null
    name: string | null
    sku: string | null
    price: number | null
    stock: number | null
    image: string | null
    duration: string | null
    photoCount: string | null
    isPopular: boolean | null
    sortOrder: number | null
    categoryId: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProductMaxAggregateOutputType = {
    id: string | null
    name: string | null
    sku: string | null
    price: number | null
    stock: number | null
    image: string | null
    duration: string | null
    photoCount: string | null
    isPopular: boolean | null
    sortOrder: number | null
    categoryId: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProductCountAggregateOutputType = {
    id: number
    name: number
    sku: number
    price: number
    stock: number
    image: number
    duration: number
    photoCount: number
    features: number
    isPopular: number
    sortOrder: number
    categoryId: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProductAvgAggregateInputType = {
    price?: true
    stock?: true
    sortOrder?: true
  }

  export type ProductSumAggregateInputType = {
    price?: true
    stock?: true
    sortOrder?: true
  }

  export type ProductMinAggregateInputType = {
    id?: true
    name?: true
    sku?: true
    price?: true
    stock?: true
    image?: true
    duration?: true
    photoCount?: true
    isPopular?: true
    sortOrder?: true
    categoryId?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProductMaxAggregateInputType = {
    id?: true
    name?: true
    sku?: true
    price?: true
    stock?: true
    image?: true
    duration?: true
    photoCount?: true
    isPopular?: true
    sortOrder?: true
    categoryId?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProductCountAggregateInputType = {
    id?: true
    name?: true
    sku?: true
    price?: true
    stock?: true
    image?: true
    duration?: true
    photoCount?: true
    features?: true
    isPopular?: true
    sortOrder?: true
    categoryId?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProductAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Product to aggregate.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Products
    **/
    _count?: true | ProductCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductMaxAggregateInputType
  }

  export type GetProductAggregateType<T extends ProductAggregateArgs> = {
        [P in keyof T & keyof AggregateProduct]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProduct[P]>
      : GetScalarType<T[P], AggregateProduct[P]>
  }




  export type ProductGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductWhereInput
    orderBy?: ProductOrderByWithAggregationInput | ProductOrderByWithAggregationInput[]
    by: ProductScalarFieldEnum[] | ProductScalarFieldEnum
    having?: ProductScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductCountAggregateInputType | true
    _avg?: ProductAvgAggregateInputType
    _sum?: ProductSumAggregateInputType
    _min?: ProductMinAggregateInputType
    _max?: ProductMaxAggregateInputType
  }

  export type ProductGroupByOutputType = {
    id: string
    name: string
    sku: string
    price: number
    stock: number
    image: string | null
    duration: string | null
    photoCount: string | null
    features: string[]
    isPopular: boolean
    sortOrder: number
    categoryId: string
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: ProductCountAggregateOutputType | null
    _avg: ProductAvgAggregateOutputType | null
    _sum: ProductSumAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  type GetProductGroupByPayload<T extends ProductGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductGroupByOutputType[P]>
            : GetScalarType<T[P], ProductGroupByOutputType[P]>
        }
      >
    >


  export type ProductSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    sku?: boolean
    price?: boolean
    stock?: boolean
    image?: boolean
    duration?: boolean
    photoCount?: boolean
    features?: boolean
    isPopular?: boolean
    sortOrder?: boolean
    categoryId?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    category?: boolean | CategoryDefaultArgs<ExtArgs>
    transaction_items?: boolean | Product$transaction_itemsArgs<ExtArgs>
    _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["product"]>

  export type ProductSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    sku?: boolean
    price?: boolean
    stock?: boolean
    image?: boolean
    duration?: boolean
    photoCount?: boolean
    features?: boolean
    isPopular?: boolean
    sortOrder?: boolean
    categoryId?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["product"]>

  export type ProductSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    sku?: boolean
    price?: boolean
    stock?: boolean
    image?: boolean
    duration?: boolean
    photoCount?: boolean
    features?: boolean
    isPopular?: boolean
    sortOrder?: boolean
    categoryId?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["product"]>

  export type ProductSelectScalar = {
    id?: boolean
    name?: boolean
    sku?: boolean
    price?: boolean
    stock?: boolean
    image?: boolean
    duration?: boolean
    photoCount?: boolean
    features?: boolean
    isPopular?: boolean
    sortOrder?: boolean
    categoryId?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProductOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "sku" | "price" | "stock" | "image" | "duration" | "photoCount" | "features" | "isPopular" | "sortOrder" | "categoryId" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["product"]>
  export type ProductInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | CategoryDefaultArgs<ExtArgs>
    transaction_items?: boolean | Product$transaction_itemsArgs<ExtArgs>
    _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProductIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }
  export type ProductIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }

  export type $ProductPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Product"
    objects: {
      category: Prisma.$CategoryPayload<ExtArgs>
      transaction_items: Prisma.$TransactionItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      sku: string
      price: number
      stock: number
      image: string | null
      duration: string | null
      photoCount: string | null
      features: string[]
      isPopular: boolean
      sortOrder: number
      categoryId: string
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["product"]>
    composites: {}
  }

  type ProductGetPayload<S extends boolean | null | undefined | ProductDefaultArgs> = $Result.GetResult<Prisma.$ProductPayload, S>

  type ProductCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProductFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProductCountAggregateInputType | true
    }

  export interface ProductDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Product'], meta: { name: 'Product' } }
    /**
     * Find zero or one Product that matches the filter.
     * @param {ProductFindUniqueArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductFindUniqueArgs>(args: SelectSubset<T, ProductFindUniqueArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Product that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProductFindUniqueOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Product that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductFindFirstArgs>(args?: SelectSubset<T, ProductFindFirstArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Product that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Products that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Products
     * const products = await prisma.product.findMany()
     * 
     * // Get first 10 Products
     * const products = await prisma.product.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productWithIdOnly = await prisma.product.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProductFindManyArgs>(args?: SelectSubset<T, ProductFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Product.
     * @param {ProductCreateArgs} args - Arguments to create a Product.
     * @example
     * // Create one Product
     * const Product = await prisma.product.create({
     *   data: {
     *     // ... data to create a Product
     *   }
     * })
     * 
     */
    create<T extends ProductCreateArgs>(args: SelectSubset<T, ProductCreateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Products.
     * @param {ProductCreateManyArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductCreateManyArgs>(args?: SelectSubset<T, ProductCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Products and returns the data saved in the database.
     * @param {ProductCreateManyAndReturnArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Products and only return the `id`
     * const productWithIdOnly = await prisma.product.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProductCreateManyAndReturnArgs>(args?: SelectSubset<T, ProductCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Product.
     * @param {ProductDeleteArgs} args - Arguments to delete one Product.
     * @example
     * // Delete one Product
     * const Product = await prisma.product.delete({
     *   where: {
     *     // ... filter to delete one Product
     *   }
     * })
     * 
     */
    delete<T extends ProductDeleteArgs>(args: SelectSubset<T, ProductDeleteArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Product.
     * @param {ProductUpdateArgs} args - Arguments to update one Product.
     * @example
     * // Update one Product
     * const product = await prisma.product.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductUpdateArgs>(args: SelectSubset<T, ProductUpdateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Products.
     * @param {ProductDeleteManyArgs} args - Arguments to filter Products to delete.
     * @example
     * // Delete a few Products
     * const { count } = await prisma.product.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductDeleteManyArgs>(args?: SelectSubset<T, ProductDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Products
     * const product = await prisma.product.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductUpdateManyArgs>(args: SelectSubset<T, ProductUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Products and returns the data updated in the database.
     * @param {ProductUpdateManyAndReturnArgs} args - Arguments to update many Products.
     * @example
     * // Update many Products
     * const product = await prisma.product.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Products and only return the `id`
     * const productWithIdOnly = await prisma.product.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProductUpdateManyAndReturnArgs>(args: SelectSubset<T, ProductUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Product.
     * @param {ProductUpsertArgs} args - Arguments to update or create a Product.
     * @example
     * // Update or create a Product
     * const product = await prisma.product.upsert({
     *   create: {
     *     // ... data to create a Product
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Product we want to update
     *   }
     * })
     */
    upsert<T extends ProductUpsertArgs>(args: SelectSubset<T, ProductUpsertArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCountArgs} args - Arguments to filter Products to count.
     * @example
     * // Count the number of Products
     * const count = await prisma.product.count({
     *   where: {
     *     // ... the filter for the Products we want to count
     *   }
     * })
    **/
    count<T extends ProductCountArgs>(
      args?: Subset<T, ProductCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProductAggregateArgs>(args: Subset<T, ProductAggregateArgs>): Prisma.PrismaPromise<GetProductAggregateType<T>>

    /**
     * Group by Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProductGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductGroupByArgs['orderBy'] }
        : { orderBy?: ProductGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProductGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Product model
   */
  readonly fields: ProductFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Product.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    category<T extends CategoryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CategoryDefaultArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    transaction_items<T extends Product$transaction_itemsArgs<ExtArgs> = {}>(args?: Subset<T, Product$transaction_itemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Product model
   */
  interface ProductFieldRefs {
    readonly id: FieldRef<"Product", 'String'>
    readonly name: FieldRef<"Product", 'String'>
    readonly sku: FieldRef<"Product", 'String'>
    readonly price: FieldRef<"Product", 'Float'>
    readonly stock: FieldRef<"Product", 'Int'>
    readonly image: FieldRef<"Product", 'String'>
    readonly duration: FieldRef<"Product", 'String'>
    readonly photoCount: FieldRef<"Product", 'String'>
    readonly features: FieldRef<"Product", 'String[]'>
    readonly isPopular: FieldRef<"Product", 'Boolean'>
    readonly sortOrder: FieldRef<"Product", 'Int'>
    readonly categoryId: FieldRef<"Product", 'String'>
    readonly isActive: FieldRef<"Product", 'Boolean'>
    readonly createdAt: FieldRef<"Product", 'DateTime'>
    readonly updatedAt: FieldRef<"Product", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Product findUnique
   */
  export type ProductFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findUniqueOrThrow
   */
  export type ProductFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findFirst
   */
  export type ProductFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findFirstOrThrow
   */
  export type ProductFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findMany
   */
  export type ProductFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Products to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product create
   */
  export type ProductCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The data needed to create a Product.
     */
    data: XOR<ProductCreateInput, ProductUncheckedCreateInput>
  }

  /**
   * Product createMany
   */
  export type ProductCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Product createManyAndReturn
   */
  export type ProductCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Product update
   */
  export type ProductUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The data needed to update a Product.
     */
    data: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
    /**
     * Choose, which Product to update.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product updateMany
   */
  export type ProductUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Products.
     */
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyInput>
    /**
     * Filter which Products to update
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to update.
     */
    limit?: number
  }

  /**
   * Product updateManyAndReturn
   */
  export type ProductUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * The data used to update Products.
     */
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyInput>
    /**
     * Filter which Products to update
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Product upsert
   */
  export type ProductUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The filter to search for the Product to update in case it exists.
     */
    where: ProductWhereUniqueInput
    /**
     * In case the Product found by the `where` argument doesn't exist, create a new Product with this data.
     */
    create: XOR<ProductCreateInput, ProductUncheckedCreateInput>
    /**
     * In case the Product was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
  }

  /**
   * Product delete
   */
  export type ProductDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter which Product to delete.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product deleteMany
   */
  export type ProductDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Products to delete
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to delete.
     */
    limit?: number
  }

  /**
   * Product.transaction_items
   */
  export type Product$transaction_itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransactionItem
     */
    select?: TransactionItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TransactionItem
     */
    omit?: TransactionItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionItemInclude<ExtArgs> | null
    where?: TransactionItemWhereInput
    orderBy?: TransactionItemOrderByWithRelationInput | TransactionItemOrderByWithRelationInput[]
    cursor?: TransactionItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TransactionItemScalarFieldEnum | TransactionItemScalarFieldEnum[]
  }

  /**
   * Product without action
   */
  export type ProductDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
  }


  /**
   * Model ReferralUsage
   */

  export type AggregateReferralUsage = {
    _count: ReferralUsageCountAggregateOutputType | null
    _min: ReferralUsageMinAggregateOutputType | null
    _max: ReferralUsageMaxAggregateOutputType | null
  }

  export type ReferralUsageMinAggregateOutputType = {
    id: string | null
    referralCodeId: string | null
    transactionId: string | null
    userId: string | null
    usedAt: Date | null
  }

  export type ReferralUsageMaxAggregateOutputType = {
    id: string | null
    referralCodeId: string | null
    transactionId: string | null
    userId: string | null
    usedAt: Date | null
  }

  export type ReferralUsageCountAggregateOutputType = {
    id: number
    referralCodeId: number
    transactionId: number
    userId: number
    usedAt: number
    _all: number
  }


  export type ReferralUsageMinAggregateInputType = {
    id?: true
    referralCodeId?: true
    transactionId?: true
    userId?: true
    usedAt?: true
  }

  export type ReferralUsageMaxAggregateInputType = {
    id?: true
    referralCodeId?: true
    transactionId?: true
    userId?: true
    usedAt?: true
  }

  export type ReferralUsageCountAggregateInputType = {
    id?: true
    referralCodeId?: true
    transactionId?: true
    userId?: true
    usedAt?: true
    _all?: true
  }

  export type ReferralUsageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ReferralUsage to aggregate.
     */
    where?: ReferralUsageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReferralUsages to fetch.
     */
    orderBy?: ReferralUsageOrderByWithRelationInput | ReferralUsageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReferralUsageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReferralUsages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReferralUsages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ReferralUsages
    **/
    _count?: true | ReferralUsageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReferralUsageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReferralUsageMaxAggregateInputType
  }

  export type GetReferralUsageAggregateType<T extends ReferralUsageAggregateArgs> = {
        [P in keyof T & keyof AggregateReferralUsage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReferralUsage[P]>
      : GetScalarType<T[P], AggregateReferralUsage[P]>
  }




  export type ReferralUsageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReferralUsageWhereInput
    orderBy?: ReferralUsageOrderByWithAggregationInput | ReferralUsageOrderByWithAggregationInput[]
    by: ReferralUsageScalarFieldEnum[] | ReferralUsageScalarFieldEnum
    having?: ReferralUsageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReferralUsageCountAggregateInputType | true
    _min?: ReferralUsageMinAggregateInputType
    _max?: ReferralUsageMaxAggregateInputType
  }

  export type ReferralUsageGroupByOutputType = {
    id: string
    referralCodeId: string
    transactionId: string
    userId: string
    usedAt: Date
    _count: ReferralUsageCountAggregateOutputType | null
    _min: ReferralUsageMinAggregateOutputType | null
    _max: ReferralUsageMaxAggregateOutputType | null
  }

  type GetReferralUsageGroupByPayload<T extends ReferralUsageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReferralUsageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReferralUsageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReferralUsageGroupByOutputType[P]>
            : GetScalarType<T[P], ReferralUsageGroupByOutputType[P]>
        }
      >
    >


  export type ReferralUsageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    referralCodeId?: boolean
    transactionId?: boolean
    userId?: boolean
    usedAt?: boolean
    referralCode?: boolean | ReferralCodeDefaultArgs<ExtArgs>
    transaction?: boolean | TransactionDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["referralUsage"]>

  export type ReferralUsageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    referralCodeId?: boolean
    transactionId?: boolean
    userId?: boolean
    usedAt?: boolean
    referralCode?: boolean | ReferralCodeDefaultArgs<ExtArgs>
    transaction?: boolean | TransactionDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["referralUsage"]>

  export type ReferralUsageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    referralCodeId?: boolean
    transactionId?: boolean
    userId?: boolean
    usedAt?: boolean
    referralCode?: boolean | ReferralCodeDefaultArgs<ExtArgs>
    transaction?: boolean | TransactionDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["referralUsage"]>

  export type ReferralUsageSelectScalar = {
    id?: boolean
    referralCodeId?: boolean
    transactionId?: boolean
    userId?: boolean
    usedAt?: boolean
  }

  export type ReferralUsageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "referralCodeId" | "transactionId" | "userId" | "usedAt", ExtArgs["result"]["referralUsage"]>
  export type ReferralUsageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    referralCode?: boolean | ReferralCodeDefaultArgs<ExtArgs>
    transaction?: boolean | TransactionDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ReferralUsageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    referralCode?: boolean | ReferralCodeDefaultArgs<ExtArgs>
    transaction?: boolean | TransactionDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ReferralUsageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    referralCode?: boolean | ReferralCodeDefaultArgs<ExtArgs>
    transaction?: boolean | TransactionDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ReferralUsagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ReferralUsage"
    objects: {
      referralCode: Prisma.$ReferralCodePayload<ExtArgs>
      transaction: Prisma.$TransactionPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      referralCodeId: string
      transactionId: string
      userId: string
      usedAt: Date
    }, ExtArgs["result"]["referralUsage"]>
    composites: {}
  }

  type ReferralUsageGetPayload<S extends boolean | null | undefined | ReferralUsageDefaultArgs> = $Result.GetResult<Prisma.$ReferralUsagePayload, S>

  type ReferralUsageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ReferralUsageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ReferralUsageCountAggregateInputType | true
    }

  export interface ReferralUsageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ReferralUsage'], meta: { name: 'ReferralUsage' } }
    /**
     * Find zero or one ReferralUsage that matches the filter.
     * @param {ReferralUsageFindUniqueArgs} args - Arguments to find a ReferralUsage
     * @example
     * // Get one ReferralUsage
     * const referralUsage = await prisma.referralUsage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReferralUsageFindUniqueArgs>(args: SelectSubset<T, ReferralUsageFindUniqueArgs<ExtArgs>>): Prisma__ReferralUsageClient<$Result.GetResult<Prisma.$ReferralUsagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ReferralUsage that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ReferralUsageFindUniqueOrThrowArgs} args - Arguments to find a ReferralUsage
     * @example
     * // Get one ReferralUsage
     * const referralUsage = await prisma.referralUsage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReferralUsageFindUniqueOrThrowArgs>(args: SelectSubset<T, ReferralUsageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReferralUsageClient<$Result.GetResult<Prisma.$ReferralUsagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ReferralUsage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReferralUsageFindFirstArgs} args - Arguments to find a ReferralUsage
     * @example
     * // Get one ReferralUsage
     * const referralUsage = await prisma.referralUsage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReferralUsageFindFirstArgs>(args?: SelectSubset<T, ReferralUsageFindFirstArgs<ExtArgs>>): Prisma__ReferralUsageClient<$Result.GetResult<Prisma.$ReferralUsagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ReferralUsage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReferralUsageFindFirstOrThrowArgs} args - Arguments to find a ReferralUsage
     * @example
     * // Get one ReferralUsage
     * const referralUsage = await prisma.referralUsage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReferralUsageFindFirstOrThrowArgs>(args?: SelectSubset<T, ReferralUsageFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReferralUsageClient<$Result.GetResult<Prisma.$ReferralUsagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ReferralUsages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReferralUsageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ReferralUsages
     * const referralUsages = await prisma.referralUsage.findMany()
     * 
     * // Get first 10 ReferralUsages
     * const referralUsages = await prisma.referralUsage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const referralUsageWithIdOnly = await prisma.referralUsage.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ReferralUsageFindManyArgs>(args?: SelectSubset<T, ReferralUsageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReferralUsagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ReferralUsage.
     * @param {ReferralUsageCreateArgs} args - Arguments to create a ReferralUsage.
     * @example
     * // Create one ReferralUsage
     * const ReferralUsage = await prisma.referralUsage.create({
     *   data: {
     *     // ... data to create a ReferralUsage
     *   }
     * })
     * 
     */
    create<T extends ReferralUsageCreateArgs>(args: SelectSubset<T, ReferralUsageCreateArgs<ExtArgs>>): Prisma__ReferralUsageClient<$Result.GetResult<Prisma.$ReferralUsagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ReferralUsages.
     * @param {ReferralUsageCreateManyArgs} args - Arguments to create many ReferralUsages.
     * @example
     * // Create many ReferralUsages
     * const referralUsage = await prisma.referralUsage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReferralUsageCreateManyArgs>(args?: SelectSubset<T, ReferralUsageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ReferralUsages and returns the data saved in the database.
     * @param {ReferralUsageCreateManyAndReturnArgs} args - Arguments to create many ReferralUsages.
     * @example
     * // Create many ReferralUsages
     * const referralUsage = await prisma.referralUsage.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ReferralUsages and only return the `id`
     * const referralUsageWithIdOnly = await prisma.referralUsage.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ReferralUsageCreateManyAndReturnArgs>(args?: SelectSubset<T, ReferralUsageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReferralUsagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ReferralUsage.
     * @param {ReferralUsageDeleteArgs} args - Arguments to delete one ReferralUsage.
     * @example
     * // Delete one ReferralUsage
     * const ReferralUsage = await prisma.referralUsage.delete({
     *   where: {
     *     // ... filter to delete one ReferralUsage
     *   }
     * })
     * 
     */
    delete<T extends ReferralUsageDeleteArgs>(args: SelectSubset<T, ReferralUsageDeleteArgs<ExtArgs>>): Prisma__ReferralUsageClient<$Result.GetResult<Prisma.$ReferralUsagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ReferralUsage.
     * @param {ReferralUsageUpdateArgs} args - Arguments to update one ReferralUsage.
     * @example
     * // Update one ReferralUsage
     * const referralUsage = await prisma.referralUsage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReferralUsageUpdateArgs>(args: SelectSubset<T, ReferralUsageUpdateArgs<ExtArgs>>): Prisma__ReferralUsageClient<$Result.GetResult<Prisma.$ReferralUsagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ReferralUsages.
     * @param {ReferralUsageDeleteManyArgs} args - Arguments to filter ReferralUsages to delete.
     * @example
     * // Delete a few ReferralUsages
     * const { count } = await prisma.referralUsage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReferralUsageDeleteManyArgs>(args?: SelectSubset<T, ReferralUsageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ReferralUsages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReferralUsageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ReferralUsages
     * const referralUsage = await prisma.referralUsage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReferralUsageUpdateManyArgs>(args: SelectSubset<T, ReferralUsageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ReferralUsages and returns the data updated in the database.
     * @param {ReferralUsageUpdateManyAndReturnArgs} args - Arguments to update many ReferralUsages.
     * @example
     * // Update many ReferralUsages
     * const referralUsage = await prisma.referralUsage.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ReferralUsages and only return the `id`
     * const referralUsageWithIdOnly = await prisma.referralUsage.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ReferralUsageUpdateManyAndReturnArgs>(args: SelectSubset<T, ReferralUsageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReferralUsagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ReferralUsage.
     * @param {ReferralUsageUpsertArgs} args - Arguments to update or create a ReferralUsage.
     * @example
     * // Update or create a ReferralUsage
     * const referralUsage = await prisma.referralUsage.upsert({
     *   create: {
     *     // ... data to create a ReferralUsage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ReferralUsage we want to update
     *   }
     * })
     */
    upsert<T extends ReferralUsageUpsertArgs>(args: SelectSubset<T, ReferralUsageUpsertArgs<ExtArgs>>): Prisma__ReferralUsageClient<$Result.GetResult<Prisma.$ReferralUsagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ReferralUsages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReferralUsageCountArgs} args - Arguments to filter ReferralUsages to count.
     * @example
     * // Count the number of ReferralUsages
     * const count = await prisma.referralUsage.count({
     *   where: {
     *     // ... the filter for the ReferralUsages we want to count
     *   }
     * })
    **/
    count<T extends ReferralUsageCountArgs>(
      args?: Subset<T, ReferralUsageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReferralUsageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ReferralUsage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReferralUsageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ReferralUsageAggregateArgs>(args: Subset<T, ReferralUsageAggregateArgs>): Prisma.PrismaPromise<GetReferralUsageAggregateType<T>>

    /**
     * Group by ReferralUsage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReferralUsageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ReferralUsageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReferralUsageGroupByArgs['orderBy'] }
        : { orderBy?: ReferralUsageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ReferralUsageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReferralUsageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ReferralUsage model
   */
  readonly fields: ReferralUsageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ReferralUsage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReferralUsageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    referralCode<T extends ReferralCodeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ReferralCodeDefaultArgs<ExtArgs>>): Prisma__ReferralCodeClient<$Result.GetResult<Prisma.$ReferralCodePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    transaction<T extends TransactionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TransactionDefaultArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ReferralUsage model
   */
  interface ReferralUsageFieldRefs {
    readonly id: FieldRef<"ReferralUsage", 'String'>
    readonly referralCodeId: FieldRef<"ReferralUsage", 'String'>
    readonly transactionId: FieldRef<"ReferralUsage", 'String'>
    readonly userId: FieldRef<"ReferralUsage", 'String'>
    readonly usedAt: FieldRef<"ReferralUsage", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ReferralUsage findUnique
   */
  export type ReferralUsageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReferralUsage
     */
    select?: ReferralUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReferralUsage
     */
    omit?: ReferralUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralUsageInclude<ExtArgs> | null
    /**
     * Filter, which ReferralUsage to fetch.
     */
    where: ReferralUsageWhereUniqueInput
  }

  /**
   * ReferralUsage findUniqueOrThrow
   */
  export type ReferralUsageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReferralUsage
     */
    select?: ReferralUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReferralUsage
     */
    omit?: ReferralUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralUsageInclude<ExtArgs> | null
    /**
     * Filter, which ReferralUsage to fetch.
     */
    where: ReferralUsageWhereUniqueInput
  }

  /**
   * ReferralUsage findFirst
   */
  export type ReferralUsageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReferralUsage
     */
    select?: ReferralUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReferralUsage
     */
    omit?: ReferralUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralUsageInclude<ExtArgs> | null
    /**
     * Filter, which ReferralUsage to fetch.
     */
    where?: ReferralUsageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReferralUsages to fetch.
     */
    orderBy?: ReferralUsageOrderByWithRelationInput | ReferralUsageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ReferralUsages.
     */
    cursor?: ReferralUsageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReferralUsages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReferralUsages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ReferralUsages.
     */
    distinct?: ReferralUsageScalarFieldEnum | ReferralUsageScalarFieldEnum[]
  }

  /**
   * ReferralUsage findFirstOrThrow
   */
  export type ReferralUsageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReferralUsage
     */
    select?: ReferralUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReferralUsage
     */
    omit?: ReferralUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralUsageInclude<ExtArgs> | null
    /**
     * Filter, which ReferralUsage to fetch.
     */
    where?: ReferralUsageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReferralUsages to fetch.
     */
    orderBy?: ReferralUsageOrderByWithRelationInput | ReferralUsageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ReferralUsages.
     */
    cursor?: ReferralUsageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReferralUsages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReferralUsages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ReferralUsages.
     */
    distinct?: ReferralUsageScalarFieldEnum | ReferralUsageScalarFieldEnum[]
  }

  /**
   * ReferralUsage findMany
   */
  export type ReferralUsageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReferralUsage
     */
    select?: ReferralUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReferralUsage
     */
    omit?: ReferralUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralUsageInclude<ExtArgs> | null
    /**
     * Filter, which ReferralUsages to fetch.
     */
    where?: ReferralUsageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReferralUsages to fetch.
     */
    orderBy?: ReferralUsageOrderByWithRelationInput | ReferralUsageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ReferralUsages.
     */
    cursor?: ReferralUsageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReferralUsages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReferralUsages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ReferralUsages.
     */
    distinct?: ReferralUsageScalarFieldEnum | ReferralUsageScalarFieldEnum[]
  }

  /**
   * ReferralUsage create
   */
  export type ReferralUsageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReferralUsage
     */
    select?: ReferralUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReferralUsage
     */
    omit?: ReferralUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralUsageInclude<ExtArgs> | null
    /**
     * The data needed to create a ReferralUsage.
     */
    data: XOR<ReferralUsageCreateInput, ReferralUsageUncheckedCreateInput>
  }

  /**
   * ReferralUsage createMany
   */
  export type ReferralUsageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ReferralUsages.
     */
    data: ReferralUsageCreateManyInput | ReferralUsageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ReferralUsage createManyAndReturn
   */
  export type ReferralUsageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReferralUsage
     */
    select?: ReferralUsageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ReferralUsage
     */
    omit?: ReferralUsageOmit<ExtArgs> | null
    /**
     * The data used to create many ReferralUsages.
     */
    data: ReferralUsageCreateManyInput | ReferralUsageCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralUsageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ReferralUsage update
   */
  export type ReferralUsageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReferralUsage
     */
    select?: ReferralUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReferralUsage
     */
    omit?: ReferralUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralUsageInclude<ExtArgs> | null
    /**
     * The data needed to update a ReferralUsage.
     */
    data: XOR<ReferralUsageUpdateInput, ReferralUsageUncheckedUpdateInput>
    /**
     * Choose, which ReferralUsage to update.
     */
    where: ReferralUsageWhereUniqueInput
  }

  /**
   * ReferralUsage updateMany
   */
  export type ReferralUsageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ReferralUsages.
     */
    data: XOR<ReferralUsageUpdateManyMutationInput, ReferralUsageUncheckedUpdateManyInput>
    /**
     * Filter which ReferralUsages to update
     */
    where?: ReferralUsageWhereInput
    /**
     * Limit how many ReferralUsages to update.
     */
    limit?: number
  }

  /**
   * ReferralUsage updateManyAndReturn
   */
  export type ReferralUsageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReferralUsage
     */
    select?: ReferralUsageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ReferralUsage
     */
    omit?: ReferralUsageOmit<ExtArgs> | null
    /**
     * The data used to update ReferralUsages.
     */
    data: XOR<ReferralUsageUpdateManyMutationInput, ReferralUsageUncheckedUpdateManyInput>
    /**
     * Filter which ReferralUsages to update
     */
    where?: ReferralUsageWhereInput
    /**
     * Limit how many ReferralUsages to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralUsageIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ReferralUsage upsert
   */
  export type ReferralUsageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReferralUsage
     */
    select?: ReferralUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReferralUsage
     */
    omit?: ReferralUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralUsageInclude<ExtArgs> | null
    /**
     * The filter to search for the ReferralUsage to update in case it exists.
     */
    where: ReferralUsageWhereUniqueInput
    /**
     * In case the ReferralUsage found by the `where` argument doesn't exist, create a new ReferralUsage with this data.
     */
    create: XOR<ReferralUsageCreateInput, ReferralUsageUncheckedCreateInput>
    /**
     * In case the ReferralUsage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReferralUsageUpdateInput, ReferralUsageUncheckedUpdateInput>
  }

  /**
   * ReferralUsage delete
   */
  export type ReferralUsageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReferralUsage
     */
    select?: ReferralUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReferralUsage
     */
    omit?: ReferralUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralUsageInclude<ExtArgs> | null
    /**
     * Filter which ReferralUsage to delete.
     */
    where: ReferralUsageWhereUniqueInput
  }

  /**
   * ReferralUsage deleteMany
   */
  export type ReferralUsageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ReferralUsages to delete
     */
    where?: ReferralUsageWhereInput
    /**
     * Limit how many ReferralUsages to delete.
     */
    limit?: number
  }

  /**
   * ReferralUsage without action
   */
  export type ReferralUsageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReferralUsage
     */
    select?: ReferralUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReferralUsage
     */
    omit?: ReferralUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralUsageInclude<ExtArgs> | null
  }


  /**
   * Model TransactionItem
   */

  export type AggregateTransactionItem = {
    _count: TransactionItemCountAggregateOutputType | null
    _avg: TransactionItemAvgAggregateOutputType | null
    _sum: TransactionItemSumAggregateOutputType | null
    _min: TransactionItemMinAggregateOutputType | null
    _max: TransactionItemMaxAggregateOutputType | null
  }

  export type TransactionItemAvgAggregateOutputType = {
    qty: number | null
    price: number | null
    subtotal: number | null
  }

  export type TransactionItemSumAggregateOutputType = {
    qty: number | null
    price: number | null
    subtotal: number | null
  }

  export type TransactionItemMinAggregateOutputType = {
    id: string | null
    transactionId: string | null
    productId: string | null
    qty: number | null
    price: number | null
    subtotal: number | null
  }

  export type TransactionItemMaxAggregateOutputType = {
    id: string | null
    transactionId: string | null
    productId: string | null
    qty: number | null
    price: number | null
    subtotal: number | null
  }

  export type TransactionItemCountAggregateOutputType = {
    id: number
    transactionId: number
    productId: number
    qty: number
    price: number
    subtotal: number
    _all: number
  }


  export type TransactionItemAvgAggregateInputType = {
    qty?: true
    price?: true
    subtotal?: true
  }

  export type TransactionItemSumAggregateInputType = {
    qty?: true
    price?: true
    subtotal?: true
  }

  export type TransactionItemMinAggregateInputType = {
    id?: true
    transactionId?: true
    productId?: true
    qty?: true
    price?: true
    subtotal?: true
  }

  export type TransactionItemMaxAggregateInputType = {
    id?: true
    transactionId?: true
    productId?: true
    qty?: true
    price?: true
    subtotal?: true
  }

  export type TransactionItemCountAggregateInputType = {
    id?: true
    transactionId?: true
    productId?: true
    qty?: true
    price?: true
    subtotal?: true
    _all?: true
  }

  export type TransactionItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TransactionItem to aggregate.
     */
    where?: TransactionItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TransactionItems to fetch.
     */
    orderBy?: TransactionItemOrderByWithRelationInput | TransactionItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TransactionItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TransactionItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TransactionItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TransactionItems
    **/
    _count?: true | TransactionItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TransactionItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TransactionItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TransactionItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TransactionItemMaxAggregateInputType
  }

  export type GetTransactionItemAggregateType<T extends TransactionItemAggregateArgs> = {
        [P in keyof T & keyof AggregateTransactionItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTransactionItem[P]>
      : GetScalarType<T[P], AggregateTransactionItem[P]>
  }




  export type TransactionItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionItemWhereInput
    orderBy?: TransactionItemOrderByWithAggregationInput | TransactionItemOrderByWithAggregationInput[]
    by: TransactionItemScalarFieldEnum[] | TransactionItemScalarFieldEnum
    having?: TransactionItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TransactionItemCountAggregateInputType | true
    _avg?: TransactionItemAvgAggregateInputType
    _sum?: TransactionItemSumAggregateInputType
    _min?: TransactionItemMinAggregateInputType
    _max?: TransactionItemMaxAggregateInputType
  }

  export type TransactionItemGroupByOutputType = {
    id: string
    transactionId: string
    productId: string
    qty: number
    price: number
    subtotal: number
    _count: TransactionItemCountAggregateOutputType | null
    _avg: TransactionItemAvgAggregateOutputType | null
    _sum: TransactionItemSumAggregateOutputType | null
    _min: TransactionItemMinAggregateOutputType | null
    _max: TransactionItemMaxAggregateOutputType | null
  }

  type GetTransactionItemGroupByPayload<T extends TransactionItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TransactionItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TransactionItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TransactionItemGroupByOutputType[P]>
            : GetScalarType<T[P], TransactionItemGroupByOutputType[P]>
        }
      >
    >


  export type TransactionItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    transactionId?: boolean
    productId?: boolean
    qty?: boolean
    price?: boolean
    subtotal?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
    transaction?: boolean | TransactionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["transactionItem"]>

  export type TransactionItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    transactionId?: boolean
    productId?: boolean
    qty?: boolean
    price?: boolean
    subtotal?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
    transaction?: boolean | TransactionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["transactionItem"]>

  export type TransactionItemSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    transactionId?: boolean
    productId?: boolean
    qty?: boolean
    price?: boolean
    subtotal?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
    transaction?: boolean | TransactionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["transactionItem"]>

  export type TransactionItemSelectScalar = {
    id?: boolean
    transactionId?: boolean
    productId?: boolean
    qty?: boolean
    price?: boolean
    subtotal?: boolean
  }

  export type TransactionItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "transactionId" | "productId" | "qty" | "price" | "subtotal", ExtArgs["result"]["transactionItem"]>
  export type TransactionItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
    transaction?: boolean | TransactionDefaultArgs<ExtArgs>
  }
  export type TransactionItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
    transaction?: boolean | TransactionDefaultArgs<ExtArgs>
  }
  export type TransactionItemIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
    transaction?: boolean | TransactionDefaultArgs<ExtArgs>
  }

  export type $TransactionItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TransactionItem"
    objects: {
      product: Prisma.$ProductPayload<ExtArgs>
      transaction: Prisma.$TransactionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      transactionId: string
      productId: string
      qty: number
      price: number
      subtotal: number
    }, ExtArgs["result"]["transactionItem"]>
    composites: {}
  }

  type TransactionItemGetPayload<S extends boolean | null | undefined | TransactionItemDefaultArgs> = $Result.GetResult<Prisma.$TransactionItemPayload, S>

  type TransactionItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TransactionItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TransactionItemCountAggregateInputType | true
    }

  export interface TransactionItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TransactionItem'], meta: { name: 'TransactionItem' } }
    /**
     * Find zero or one TransactionItem that matches the filter.
     * @param {TransactionItemFindUniqueArgs} args - Arguments to find a TransactionItem
     * @example
     * // Get one TransactionItem
     * const transactionItem = await prisma.transactionItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TransactionItemFindUniqueArgs>(args: SelectSubset<T, TransactionItemFindUniqueArgs<ExtArgs>>): Prisma__TransactionItemClient<$Result.GetResult<Prisma.$TransactionItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TransactionItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TransactionItemFindUniqueOrThrowArgs} args - Arguments to find a TransactionItem
     * @example
     * // Get one TransactionItem
     * const transactionItem = await prisma.transactionItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TransactionItemFindUniqueOrThrowArgs>(args: SelectSubset<T, TransactionItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TransactionItemClient<$Result.GetResult<Prisma.$TransactionItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TransactionItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionItemFindFirstArgs} args - Arguments to find a TransactionItem
     * @example
     * // Get one TransactionItem
     * const transactionItem = await prisma.transactionItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TransactionItemFindFirstArgs>(args?: SelectSubset<T, TransactionItemFindFirstArgs<ExtArgs>>): Prisma__TransactionItemClient<$Result.GetResult<Prisma.$TransactionItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TransactionItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionItemFindFirstOrThrowArgs} args - Arguments to find a TransactionItem
     * @example
     * // Get one TransactionItem
     * const transactionItem = await prisma.transactionItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TransactionItemFindFirstOrThrowArgs>(args?: SelectSubset<T, TransactionItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__TransactionItemClient<$Result.GetResult<Prisma.$TransactionItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TransactionItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TransactionItems
     * const transactionItems = await prisma.transactionItem.findMany()
     * 
     * // Get first 10 TransactionItems
     * const transactionItems = await prisma.transactionItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const transactionItemWithIdOnly = await prisma.transactionItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TransactionItemFindManyArgs>(args?: SelectSubset<T, TransactionItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TransactionItem.
     * @param {TransactionItemCreateArgs} args - Arguments to create a TransactionItem.
     * @example
     * // Create one TransactionItem
     * const TransactionItem = await prisma.transactionItem.create({
     *   data: {
     *     // ... data to create a TransactionItem
     *   }
     * })
     * 
     */
    create<T extends TransactionItemCreateArgs>(args: SelectSubset<T, TransactionItemCreateArgs<ExtArgs>>): Prisma__TransactionItemClient<$Result.GetResult<Prisma.$TransactionItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TransactionItems.
     * @param {TransactionItemCreateManyArgs} args - Arguments to create many TransactionItems.
     * @example
     * // Create many TransactionItems
     * const transactionItem = await prisma.transactionItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TransactionItemCreateManyArgs>(args?: SelectSubset<T, TransactionItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TransactionItems and returns the data saved in the database.
     * @param {TransactionItemCreateManyAndReturnArgs} args - Arguments to create many TransactionItems.
     * @example
     * // Create many TransactionItems
     * const transactionItem = await prisma.transactionItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TransactionItems and only return the `id`
     * const transactionItemWithIdOnly = await prisma.transactionItem.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TransactionItemCreateManyAndReturnArgs>(args?: SelectSubset<T, TransactionItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TransactionItem.
     * @param {TransactionItemDeleteArgs} args - Arguments to delete one TransactionItem.
     * @example
     * // Delete one TransactionItem
     * const TransactionItem = await prisma.transactionItem.delete({
     *   where: {
     *     // ... filter to delete one TransactionItem
     *   }
     * })
     * 
     */
    delete<T extends TransactionItemDeleteArgs>(args: SelectSubset<T, TransactionItemDeleteArgs<ExtArgs>>): Prisma__TransactionItemClient<$Result.GetResult<Prisma.$TransactionItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TransactionItem.
     * @param {TransactionItemUpdateArgs} args - Arguments to update one TransactionItem.
     * @example
     * // Update one TransactionItem
     * const transactionItem = await prisma.transactionItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TransactionItemUpdateArgs>(args: SelectSubset<T, TransactionItemUpdateArgs<ExtArgs>>): Prisma__TransactionItemClient<$Result.GetResult<Prisma.$TransactionItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TransactionItems.
     * @param {TransactionItemDeleteManyArgs} args - Arguments to filter TransactionItems to delete.
     * @example
     * // Delete a few TransactionItems
     * const { count } = await prisma.transactionItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TransactionItemDeleteManyArgs>(args?: SelectSubset<T, TransactionItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TransactionItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TransactionItems
     * const transactionItem = await prisma.transactionItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TransactionItemUpdateManyArgs>(args: SelectSubset<T, TransactionItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TransactionItems and returns the data updated in the database.
     * @param {TransactionItemUpdateManyAndReturnArgs} args - Arguments to update many TransactionItems.
     * @example
     * // Update many TransactionItems
     * const transactionItem = await prisma.transactionItem.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TransactionItems and only return the `id`
     * const transactionItemWithIdOnly = await prisma.transactionItem.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TransactionItemUpdateManyAndReturnArgs>(args: SelectSubset<T, TransactionItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TransactionItem.
     * @param {TransactionItemUpsertArgs} args - Arguments to update or create a TransactionItem.
     * @example
     * // Update or create a TransactionItem
     * const transactionItem = await prisma.transactionItem.upsert({
     *   create: {
     *     // ... data to create a TransactionItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TransactionItem we want to update
     *   }
     * })
     */
    upsert<T extends TransactionItemUpsertArgs>(args: SelectSubset<T, TransactionItemUpsertArgs<ExtArgs>>): Prisma__TransactionItemClient<$Result.GetResult<Prisma.$TransactionItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TransactionItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionItemCountArgs} args - Arguments to filter TransactionItems to count.
     * @example
     * // Count the number of TransactionItems
     * const count = await prisma.transactionItem.count({
     *   where: {
     *     // ... the filter for the TransactionItems we want to count
     *   }
     * })
    **/
    count<T extends TransactionItemCountArgs>(
      args?: Subset<T, TransactionItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TransactionItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TransactionItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TransactionItemAggregateArgs>(args: Subset<T, TransactionItemAggregateArgs>): Prisma.PrismaPromise<GetTransactionItemAggregateType<T>>

    /**
     * Group by TransactionItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TransactionItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TransactionItemGroupByArgs['orderBy'] }
        : { orderBy?: TransactionItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TransactionItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTransactionItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TransactionItem model
   */
  readonly fields: TransactionItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TransactionItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TransactionItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    product<T extends ProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductDefaultArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    transaction<T extends TransactionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TransactionDefaultArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TransactionItem model
   */
  interface TransactionItemFieldRefs {
    readonly id: FieldRef<"TransactionItem", 'String'>
    readonly transactionId: FieldRef<"TransactionItem", 'String'>
    readonly productId: FieldRef<"TransactionItem", 'String'>
    readonly qty: FieldRef<"TransactionItem", 'Int'>
    readonly price: FieldRef<"TransactionItem", 'Float'>
    readonly subtotal: FieldRef<"TransactionItem", 'Float'>
  }
    

  // Custom InputTypes
  /**
   * TransactionItem findUnique
   */
  export type TransactionItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransactionItem
     */
    select?: TransactionItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TransactionItem
     */
    omit?: TransactionItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionItemInclude<ExtArgs> | null
    /**
     * Filter, which TransactionItem to fetch.
     */
    where: TransactionItemWhereUniqueInput
  }

  /**
   * TransactionItem findUniqueOrThrow
   */
  export type TransactionItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransactionItem
     */
    select?: TransactionItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TransactionItem
     */
    omit?: TransactionItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionItemInclude<ExtArgs> | null
    /**
     * Filter, which TransactionItem to fetch.
     */
    where: TransactionItemWhereUniqueInput
  }

  /**
   * TransactionItem findFirst
   */
  export type TransactionItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransactionItem
     */
    select?: TransactionItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TransactionItem
     */
    omit?: TransactionItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionItemInclude<ExtArgs> | null
    /**
     * Filter, which TransactionItem to fetch.
     */
    where?: TransactionItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TransactionItems to fetch.
     */
    orderBy?: TransactionItemOrderByWithRelationInput | TransactionItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TransactionItems.
     */
    cursor?: TransactionItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TransactionItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TransactionItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TransactionItems.
     */
    distinct?: TransactionItemScalarFieldEnum | TransactionItemScalarFieldEnum[]
  }

  /**
   * TransactionItem findFirstOrThrow
   */
  export type TransactionItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransactionItem
     */
    select?: TransactionItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TransactionItem
     */
    omit?: TransactionItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionItemInclude<ExtArgs> | null
    /**
     * Filter, which TransactionItem to fetch.
     */
    where?: TransactionItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TransactionItems to fetch.
     */
    orderBy?: TransactionItemOrderByWithRelationInput | TransactionItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TransactionItems.
     */
    cursor?: TransactionItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TransactionItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TransactionItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TransactionItems.
     */
    distinct?: TransactionItemScalarFieldEnum | TransactionItemScalarFieldEnum[]
  }

  /**
   * TransactionItem findMany
   */
  export type TransactionItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransactionItem
     */
    select?: TransactionItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TransactionItem
     */
    omit?: TransactionItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionItemInclude<ExtArgs> | null
    /**
     * Filter, which TransactionItems to fetch.
     */
    where?: TransactionItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TransactionItems to fetch.
     */
    orderBy?: TransactionItemOrderByWithRelationInput | TransactionItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TransactionItems.
     */
    cursor?: TransactionItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TransactionItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TransactionItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TransactionItems.
     */
    distinct?: TransactionItemScalarFieldEnum | TransactionItemScalarFieldEnum[]
  }

  /**
   * TransactionItem create
   */
  export type TransactionItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransactionItem
     */
    select?: TransactionItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TransactionItem
     */
    omit?: TransactionItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionItemInclude<ExtArgs> | null
    /**
     * The data needed to create a TransactionItem.
     */
    data: XOR<TransactionItemCreateInput, TransactionItemUncheckedCreateInput>
  }

  /**
   * TransactionItem createMany
   */
  export type TransactionItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TransactionItems.
     */
    data: TransactionItemCreateManyInput | TransactionItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TransactionItem createManyAndReturn
   */
  export type TransactionItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransactionItem
     */
    select?: TransactionItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TransactionItem
     */
    omit?: TransactionItemOmit<ExtArgs> | null
    /**
     * The data used to create many TransactionItems.
     */
    data: TransactionItemCreateManyInput | TransactionItemCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionItemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TransactionItem update
   */
  export type TransactionItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransactionItem
     */
    select?: TransactionItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TransactionItem
     */
    omit?: TransactionItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionItemInclude<ExtArgs> | null
    /**
     * The data needed to update a TransactionItem.
     */
    data: XOR<TransactionItemUpdateInput, TransactionItemUncheckedUpdateInput>
    /**
     * Choose, which TransactionItem to update.
     */
    where: TransactionItemWhereUniqueInput
  }

  /**
   * TransactionItem updateMany
   */
  export type TransactionItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TransactionItems.
     */
    data: XOR<TransactionItemUpdateManyMutationInput, TransactionItemUncheckedUpdateManyInput>
    /**
     * Filter which TransactionItems to update
     */
    where?: TransactionItemWhereInput
    /**
     * Limit how many TransactionItems to update.
     */
    limit?: number
  }

  /**
   * TransactionItem updateManyAndReturn
   */
  export type TransactionItemUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransactionItem
     */
    select?: TransactionItemSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TransactionItem
     */
    omit?: TransactionItemOmit<ExtArgs> | null
    /**
     * The data used to update TransactionItems.
     */
    data: XOR<TransactionItemUpdateManyMutationInput, TransactionItemUncheckedUpdateManyInput>
    /**
     * Filter which TransactionItems to update
     */
    where?: TransactionItemWhereInput
    /**
     * Limit how many TransactionItems to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionItemIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TransactionItem upsert
   */
  export type TransactionItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransactionItem
     */
    select?: TransactionItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TransactionItem
     */
    omit?: TransactionItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionItemInclude<ExtArgs> | null
    /**
     * The filter to search for the TransactionItem to update in case it exists.
     */
    where: TransactionItemWhereUniqueInput
    /**
     * In case the TransactionItem found by the `where` argument doesn't exist, create a new TransactionItem with this data.
     */
    create: XOR<TransactionItemCreateInput, TransactionItemUncheckedCreateInput>
    /**
     * In case the TransactionItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TransactionItemUpdateInput, TransactionItemUncheckedUpdateInput>
  }

  /**
   * TransactionItem delete
   */
  export type TransactionItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransactionItem
     */
    select?: TransactionItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TransactionItem
     */
    omit?: TransactionItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionItemInclude<ExtArgs> | null
    /**
     * Filter which TransactionItem to delete.
     */
    where: TransactionItemWhereUniqueInput
  }

  /**
   * TransactionItem deleteMany
   */
  export type TransactionItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TransactionItems to delete
     */
    where?: TransactionItemWhereInput
    /**
     * Limit how many TransactionItems to delete.
     */
    limit?: number
  }

  /**
   * TransactionItem without action
   */
  export type TransactionItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransactionItem
     */
    select?: TransactionItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TransactionItem
     */
    omit?: TransactionItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionItemInclude<ExtArgs> | null
  }


  /**
   * Model Transaction
   */

  export type AggregateTransaction = {
    _count: TransactionCountAggregateOutputType | null
    _avg: TransactionAvgAggregateOutputType | null
    _sum: TransactionSumAggregateOutputType | null
    _min: TransactionMinAggregateOutputType | null
    _max: TransactionMaxAggregateOutputType | null
  }

  export type TransactionAvgAggregateOutputType = {
    total: number | null
    tax: number | null
    discount: number | null
  }

  export type TransactionSumAggregateOutputType = {
    total: number | null
    tax: number | null
    discount: number | null
  }

  export type TransactionMinAggregateOutputType = {
    id: string | null
    invoiceNumber: string | null
    cashierId: string | null
    total: number | null
    tax: number | null
    discount: number | null
    paymentMethod: $Enums.PaymentMethod | null
    referralCodeId: string | null
    status: $Enums.TransactionStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TransactionMaxAggregateOutputType = {
    id: string | null
    invoiceNumber: string | null
    cashierId: string | null
    total: number | null
    tax: number | null
    discount: number | null
    paymentMethod: $Enums.PaymentMethod | null
    referralCodeId: string | null
    status: $Enums.TransactionStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TransactionCountAggregateOutputType = {
    id: number
    invoiceNumber: number
    cashierId: number
    total: number
    tax: number
    discount: number
    paymentMethod: number
    referralCodeId: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TransactionAvgAggregateInputType = {
    total?: true
    tax?: true
    discount?: true
  }

  export type TransactionSumAggregateInputType = {
    total?: true
    tax?: true
    discount?: true
  }

  export type TransactionMinAggregateInputType = {
    id?: true
    invoiceNumber?: true
    cashierId?: true
    total?: true
    tax?: true
    discount?: true
    paymentMethod?: true
    referralCodeId?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TransactionMaxAggregateInputType = {
    id?: true
    invoiceNumber?: true
    cashierId?: true
    total?: true
    tax?: true
    discount?: true
    paymentMethod?: true
    referralCodeId?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TransactionCountAggregateInputType = {
    id?: true
    invoiceNumber?: true
    cashierId?: true
    total?: true
    tax?: true
    discount?: true
    paymentMethod?: true
    referralCodeId?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TransactionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Transaction to aggregate.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Transactions
    **/
    _count?: true | TransactionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TransactionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TransactionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TransactionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TransactionMaxAggregateInputType
  }

  export type GetTransactionAggregateType<T extends TransactionAggregateArgs> = {
        [P in keyof T & keyof AggregateTransaction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTransaction[P]>
      : GetScalarType<T[P], AggregateTransaction[P]>
  }




  export type TransactionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionWhereInput
    orderBy?: TransactionOrderByWithAggregationInput | TransactionOrderByWithAggregationInput[]
    by: TransactionScalarFieldEnum[] | TransactionScalarFieldEnum
    having?: TransactionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TransactionCountAggregateInputType | true
    _avg?: TransactionAvgAggregateInputType
    _sum?: TransactionSumAggregateInputType
    _min?: TransactionMinAggregateInputType
    _max?: TransactionMaxAggregateInputType
  }

  export type TransactionGroupByOutputType = {
    id: string
    invoiceNumber: string
    cashierId: string
    total: number
    tax: number
    discount: number
    paymentMethod: $Enums.PaymentMethod
    referralCodeId: string | null
    status: $Enums.TransactionStatus
    createdAt: Date
    updatedAt: Date
    _count: TransactionCountAggregateOutputType | null
    _avg: TransactionAvgAggregateOutputType | null
    _sum: TransactionSumAggregateOutputType | null
    _min: TransactionMinAggregateOutputType | null
    _max: TransactionMaxAggregateOutputType | null
  }

  type GetTransactionGroupByPayload<T extends TransactionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TransactionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TransactionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TransactionGroupByOutputType[P]>
            : GetScalarType<T[P], TransactionGroupByOutputType[P]>
        }
      >
    >


  export type TransactionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    invoiceNumber?: boolean
    cashierId?: boolean
    total?: boolean
    tax?: boolean
    discount?: boolean
    paymentMethod?: boolean
    referralCodeId?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    referralUsage?: boolean | Transaction$referralUsageArgs<ExtArgs>
    items?: boolean | Transaction$itemsArgs<ExtArgs>
    cashier?: boolean | UserDefaultArgs<ExtArgs>
    referralCode?: boolean | Transaction$referralCodeArgs<ExtArgs>
    _count?: boolean | TransactionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["transaction"]>

  export type TransactionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    invoiceNumber?: boolean
    cashierId?: boolean
    total?: boolean
    tax?: boolean
    discount?: boolean
    paymentMethod?: boolean
    referralCodeId?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    cashier?: boolean | UserDefaultArgs<ExtArgs>
    referralCode?: boolean | Transaction$referralCodeArgs<ExtArgs>
  }, ExtArgs["result"]["transaction"]>

  export type TransactionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    invoiceNumber?: boolean
    cashierId?: boolean
    total?: boolean
    tax?: boolean
    discount?: boolean
    paymentMethod?: boolean
    referralCodeId?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    cashier?: boolean | UserDefaultArgs<ExtArgs>
    referralCode?: boolean | Transaction$referralCodeArgs<ExtArgs>
  }, ExtArgs["result"]["transaction"]>

  export type TransactionSelectScalar = {
    id?: boolean
    invoiceNumber?: boolean
    cashierId?: boolean
    total?: boolean
    tax?: boolean
    discount?: boolean
    paymentMethod?: boolean
    referralCodeId?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TransactionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "invoiceNumber" | "cashierId" | "total" | "tax" | "discount" | "paymentMethod" | "referralCodeId" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["transaction"]>
  export type TransactionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    referralUsage?: boolean | Transaction$referralUsageArgs<ExtArgs>
    items?: boolean | Transaction$itemsArgs<ExtArgs>
    cashier?: boolean | UserDefaultArgs<ExtArgs>
    referralCode?: boolean | Transaction$referralCodeArgs<ExtArgs>
    _count?: boolean | TransactionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TransactionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cashier?: boolean | UserDefaultArgs<ExtArgs>
    referralCode?: boolean | Transaction$referralCodeArgs<ExtArgs>
  }
  export type TransactionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cashier?: boolean | UserDefaultArgs<ExtArgs>
    referralCode?: boolean | Transaction$referralCodeArgs<ExtArgs>
  }

  export type $TransactionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Transaction"
    objects: {
      referralUsage: Prisma.$ReferralUsagePayload<ExtArgs> | null
      items: Prisma.$TransactionItemPayload<ExtArgs>[]
      cashier: Prisma.$UserPayload<ExtArgs>
      referralCode: Prisma.$ReferralCodePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      invoiceNumber: string
      cashierId: string
      total: number
      tax: number
      discount: number
      paymentMethod: $Enums.PaymentMethod
      referralCodeId: string | null
      status: $Enums.TransactionStatus
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["transaction"]>
    composites: {}
  }

  type TransactionGetPayload<S extends boolean | null | undefined | TransactionDefaultArgs> = $Result.GetResult<Prisma.$TransactionPayload, S>

  type TransactionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TransactionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TransactionCountAggregateInputType | true
    }

  export interface TransactionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Transaction'], meta: { name: 'Transaction' } }
    /**
     * Find zero or one Transaction that matches the filter.
     * @param {TransactionFindUniqueArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TransactionFindUniqueArgs>(args: SelectSubset<T, TransactionFindUniqueArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Transaction that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TransactionFindUniqueOrThrowArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TransactionFindUniqueOrThrowArgs>(args: SelectSubset<T, TransactionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Transaction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindFirstArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TransactionFindFirstArgs>(args?: SelectSubset<T, TransactionFindFirstArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Transaction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindFirstOrThrowArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TransactionFindFirstOrThrowArgs>(args?: SelectSubset<T, TransactionFindFirstOrThrowArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Transactions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Transactions
     * const transactions = await prisma.transaction.findMany()
     * 
     * // Get first 10 Transactions
     * const transactions = await prisma.transaction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const transactionWithIdOnly = await prisma.transaction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TransactionFindManyArgs>(args?: SelectSubset<T, TransactionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Transaction.
     * @param {TransactionCreateArgs} args - Arguments to create a Transaction.
     * @example
     * // Create one Transaction
     * const Transaction = await prisma.transaction.create({
     *   data: {
     *     // ... data to create a Transaction
     *   }
     * })
     * 
     */
    create<T extends TransactionCreateArgs>(args: SelectSubset<T, TransactionCreateArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Transactions.
     * @param {TransactionCreateManyArgs} args - Arguments to create many Transactions.
     * @example
     * // Create many Transactions
     * const transaction = await prisma.transaction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TransactionCreateManyArgs>(args?: SelectSubset<T, TransactionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Transactions and returns the data saved in the database.
     * @param {TransactionCreateManyAndReturnArgs} args - Arguments to create many Transactions.
     * @example
     * // Create many Transactions
     * const transaction = await prisma.transaction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Transactions and only return the `id`
     * const transactionWithIdOnly = await prisma.transaction.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TransactionCreateManyAndReturnArgs>(args?: SelectSubset<T, TransactionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Transaction.
     * @param {TransactionDeleteArgs} args - Arguments to delete one Transaction.
     * @example
     * // Delete one Transaction
     * const Transaction = await prisma.transaction.delete({
     *   where: {
     *     // ... filter to delete one Transaction
     *   }
     * })
     * 
     */
    delete<T extends TransactionDeleteArgs>(args: SelectSubset<T, TransactionDeleteArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Transaction.
     * @param {TransactionUpdateArgs} args - Arguments to update one Transaction.
     * @example
     * // Update one Transaction
     * const transaction = await prisma.transaction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TransactionUpdateArgs>(args: SelectSubset<T, TransactionUpdateArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Transactions.
     * @param {TransactionDeleteManyArgs} args - Arguments to filter Transactions to delete.
     * @example
     * // Delete a few Transactions
     * const { count } = await prisma.transaction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TransactionDeleteManyArgs>(args?: SelectSubset<T, TransactionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Transactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Transactions
     * const transaction = await prisma.transaction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TransactionUpdateManyArgs>(args: SelectSubset<T, TransactionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Transactions and returns the data updated in the database.
     * @param {TransactionUpdateManyAndReturnArgs} args - Arguments to update many Transactions.
     * @example
     * // Update many Transactions
     * const transaction = await prisma.transaction.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Transactions and only return the `id`
     * const transactionWithIdOnly = await prisma.transaction.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TransactionUpdateManyAndReturnArgs>(args: SelectSubset<T, TransactionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Transaction.
     * @param {TransactionUpsertArgs} args - Arguments to update or create a Transaction.
     * @example
     * // Update or create a Transaction
     * const transaction = await prisma.transaction.upsert({
     *   create: {
     *     // ... data to create a Transaction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Transaction we want to update
     *   }
     * })
     */
    upsert<T extends TransactionUpsertArgs>(args: SelectSubset<T, TransactionUpsertArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Transactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionCountArgs} args - Arguments to filter Transactions to count.
     * @example
     * // Count the number of Transactions
     * const count = await prisma.transaction.count({
     *   where: {
     *     // ... the filter for the Transactions we want to count
     *   }
     * })
    **/
    count<T extends TransactionCountArgs>(
      args?: Subset<T, TransactionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TransactionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Transaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TransactionAggregateArgs>(args: Subset<T, TransactionAggregateArgs>): Prisma.PrismaPromise<GetTransactionAggregateType<T>>

    /**
     * Group by Transaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TransactionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TransactionGroupByArgs['orderBy'] }
        : { orderBy?: TransactionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TransactionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTransactionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Transaction model
   */
  readonly fields: TransactionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Transaction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TransactionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    referralUsage<T extends Transaction$referralUsageArgs<ExtArgs> = {}>(args?: Subset<T, Transaction$referralUsageArgs<ExtArgs>>): Prisma__ReferralUsageClient<$Result.GetResult<Prisma.$ReferralUsagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    items<T extends Transaction$itemsArgs<ExtArgs> = {}>(args?: Subset<T, Transaction$itemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    cashier<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    referralCode<T extends Transaction$referralCodeArgs<ExtArgs> = {}>(args?: Subset<T, Transaction$referralCodeArgs<ExtArgs>>): Prisma__ReferralCodeClient<$Result.GetResult<Prisma.$ReferralCodePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Transaction model
   */
  interface TransactionFieldRefs {
    readonly id: FieldRef<"Transaction", 'String'>
    readonly invoiceNumber: FieldRef<"Transaction", 'String'>
    readonly cashierId: FieldRef<"Transaction", 'String'>
    readonly total: FieldRef<"Transaction", 'Float'>
    readonly tax: FieldRef<"Transaction", 'Float'>
    readonly discount: FieldRef<"Transaction", 'Float'>
    readonly paymentMethod: FieldRef<"Transaction", 'PaymentMethod'>
    readonly referralCodeId: FieldRef<"Transaction", 'String'>
    readonly status: FieldRef<"Transaction", 'TransactionStatus'>
    readonly createdAt: FieldRef<"Transaction", 'DateTime'>
    readonly updatedAt: FieldRef<"Transaction", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Transaction findUnique
   */
  export type TransactionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction findUniqueOrThrow
   */
  export type TransactionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction findFirst
   */
  export type TransactionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transactions.
     */
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Transaction findFirstOrThrow
   */
  export type TransactionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transactions.
     */
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Transaction findMany
   */
  export type TransactionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transactions to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transactions.
     */
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Transaction create
   */
  export type TransactionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * The data needed to create a Transaction.
     */
    data: XOR<TransactionCreateInput, TransactionUncheckedCreateInput>
  }

  /**
   * Transaction createMany
   */
  export type TransactionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Transactions.
     */
    data: TransactionCreateManyInput | TransactionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Transaction createManyAndReturn
   */
  export type TransactionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * The data used to create many Transactions.
     */
    data: TransactionCreateManyInput | TransactionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Transaction update
   */
  export type TransactionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * The data needed to update a Transaction.
     */
    data: XOR<TransactionUpdateInput, TransactionUncheckedUpdateInput>
    /**
     * Choose, which Transaction to update.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction updateMany
   */
  export type TransactionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Transactions.
     */
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyInput>
    /**
     * Filter which Transactions to update
     */
    where?: TransactionWhereInput
    /**
     * Limit how many Transactions to update.
     */
    limit?: number
  }

  /**
   * Transaction updateManyAndReturn
   */
  export type TransactionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * The data used to update Transactions.
     */
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyInput>
    /**
     * Filter which Transactions to update
     */
    where?: TransactionWhereInput
    /**
     * Limit how many Transactions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Transaction upsert
   */
  export type TransactionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * The filter to search for the Transaction to update in case it exists.
     */
    where: TransactionWhereUniqueInput
    /**
     * In case the Transaction found by the `where` argument doesn't exist, create a new Transaction with this data.
     */
    create: XOR<TransactionCreateInput, TransactionUncheckedCreateInput>
    /**
     * In case the Transaction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TransactionUpdateInput, TransactionUncheckedUpdateInput>
  }

  /**
   * Transaction delete
   */
  export type TransactionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter which Transaction to delete.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction deleteMany
   */
  export type TransactionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Transactions to delete
     */
    where?: TransactionWhereInput
    /**
     * Limit how many Transactions to delete.
     */
    limit?: number
  }

  /**
   * Transaction.referralUsage
   */
  export type Transaction$referralUsageArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReferralUsage
     */
    select?: ReferralUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReferralUsage
     */
    omit?: ReferralUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralUsageInclude<ExtArgs> | null
    where?: ReferralUsageWhereInput
  }

  /**
   * Transaction.items
   */
  export type Transaction$itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransactionItem
     */
    select?: TransactionItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TransactionItem
     */
    omit?: TransactionItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionItemInclude<ExtArgs> | null
    where?: TransactionItemWhereInput
    orderBy?: TransactionItemOrderByWithRelationInput | TransactionItemOrderByWithRelationInput[]
    cursor?: TransactionItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TransactionItemScalarFieldEnum | TransactionItemScalarFieldEnum[]
  }

  /**
   * Transaction.referralCode
   */
  export type Transaction$referralCodeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReferralCode
     */
    select?: ReferralCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReferralCode
     */
    omit?: ReferralCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralCodeInclude<ExtArgs> | null
    where?: ReferralCodeWhereInput
  }

  /**
   * Transaction without action
   */
  export type TransactionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    password: string | null
    role: $Enums.Role | null
    phone: string | null
    bankName: string | null
    bankAccount: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    password: string | null
    role: $Enums.Role | null
    phone: string | null
    bankName: string | null
    bankAccount: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    password: number
    role: number
    phone: number
    bankName: number
    bankAccount: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    role?: true
    phone?: true
    bankName?: true
    bankAccount?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    role?: true
    phone?: true
    bankName?: true
    bankAccount?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    role?: true
    phone?: true
    bankName?: true
    bankAccount?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string
    email: string
    password: string
    role: $Enums.Role
    phone: string | null
    bankName: string | null
    bankAccount: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    phone?: boolean
    bankName?: boolean
    bankAccount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    referral_usages?: boolean | User$referral_usagesArgs<ExtArgs>
    transactions?: boolean | User$transactionsArgs<ExtArgs>
    referralCode?: boolean | User$referralCodeArgs<ExtArgs>
    commissions?: boolean | User$commissionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    phone?: boolean
    bankName?: boolean
    bankAccount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    phone?: boolean
    bankName?: boolean
    bankAccount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    phone?: boolean
    bankName?: boolean
    bankAccount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "password" | "role" | "phone" | "bankName" | "bankAccount" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    referral_usages?: boolean | User$referral_usagesArgs<ExtArgs>
    transactions?: boolean | User$transactionsArgs<ExtArgs>
    referralCode?: boolean | User$referralCodeArgs<ExtArgs>
    commissions?: boolean | User$commissionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      referral_usages: Prisma.$ReferralUsagePayload<ExtArgs>[]
      transactions: Prisma.$TransactionPayload<ExtArgs>[]
      referralCode: Prisma.$ReferralCodePayload<ExtArgs> | null
      commissions: Prisma.$AffiliateCommissionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string
      password: string
      role: $Enums.Role
      phone: string | null
      bankName: string | null
      bankAccount: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    referral_usages<T extends User$referral_usagesArgs<ExtArgs> = {}>(args?: Subset<T, User$referral_usagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReferralUsagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    transactions<T extends User$transactionsArgs<ExtArgs> = {}>(args?: Subset<T, User$transactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    referralCode<T extends User$referralCodeArgs<ExtArgs> = {}>(args?: Subset<T, User$referralCodeArgs<ExtArgs>>): Prisma__ReferralCodeClient<$Result.GetResult<Prisma.$ReferralCodePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    commissions<T extends User$commissionsArgs<ExtArgs> = {}>(args?: Subset<T, User$commissionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AffiliateCommissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly phone: FieldRef<"User", 'String'>
    readonly bankName: FieldRef<"User", 'String'>
    readonly bankAccount: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.referral_usages
   */
  export type User$referral_usagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReferralUsage
     */
    select?: ReferralUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReferralUsage
     */
    omit?: ReferralUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralUsageInclude<ExtArgs> | null
    where?: ReferralUsageWhereInput
    orderBy?: ReferralUsageOrderByWithRelationInput | ReferralUsageOrderByWithRelationInput[]
    cursor?: ReferralUsageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReferralUsageScalarFieldEnum | ReferralUsageScalarFieldEnum[]
  }

  /**
   * User.transactions
   */
  export type User$transactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    where?: TransactionWhereInput
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    cursor?: TransactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * User.referralCode
   */
  export type User$referralCodeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReferralCode
     */
    select?: ReferralCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReferralCode
     */
    omit?: ReferralCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralCodeInclude<ExtArgs> | null
    where?: ReferralCodeWhereInput
  }

  /**
   * User.commissions
   */
  export type User$commissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliateCommission
     */
    select?: AffiliateCommissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliateCommission
     */
    omit?: AffiliateCommissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffiliateCommissionInclude<ExtArgs> | null
    where?: AffiliateCommissionWhereInput
    orderBy?: AffiliateCommissionOrderByWithRelationInput | AffiliateCommissionOrderByWithRelationInput[]
    cursor?: AffiliateCommissionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AffiliateCommissionScalarFieldEnum | AffiliateCommissionScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model GalleryPhoto
   */

  export type AggregateGalleryPhoto = {
    _count: GalleryPhotoCountAggregateOutputType | null
    _avg: GalleryPhotoAvgAggregateOutputType | null
    _sum: GalleryPhotoSumAggregateOutputType | null
    _min: GalleryPhotoMinAggregateOutputType | null
    _max: GalleryPhotoMaxAggregateOutputType | null
  }

  export type GalleryPhotoAvgAggregateOutputType = {
    width: number | null
    height: number | null
    sortOrder: number | null
  }

  export type GalleryPhotoSumAggregateOutputType = {
    width: number | null
    height: number | null
    sortOrder: number | null
  }

  export type GalleryPhotoMinAggregateOutputType = {
    id: string | null
    src: string | null
    alt: string | null
    width: number | null
    height: number | null
    category: string | null
    isFeatured: boolean | null
    isHero: boolean | null
    sortOrder: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type GalleryPhotoMaxAggregateOutputType = {
    id: string | null
    src: string | null
    alt: string | null
    width: number | null
    height: number | null
    category: string | null
    isFeatured: boolean | null
    isHero: boolean | null
    sortOrder: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type GalleryPhotoCountAggregateOutputType = {
    id: number
    src: number
    alt: number
    width: number
    height: number
    category: number
    isFeatured: number
    isHero: number
    sortOrder: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type GalleryPhotoAvgAggregateInputType = {
    width?: true
    height?: true
    sortOrder?: true
  }

  export type GalleryPhotoSumAggregateInputType = {
    width?: true
    height?: true
    sortOrder?: true
  }

  export type GalleryPhotoMinAggregateInputType = {
    id?: true
    src?: true
    alt?: true
    width?: true
    height?: true
    category?: true
    isFeatured?: true
    isHero?: true
    sortOrder?: true
    createdAt?: true
    updatedAt?: true
  }

  export type GalleryPhotoMaxAggregateInputType = {
    id?: true
    src?: true
    alt?: true
    width?: true
    height?: true
    category?: true
    isFeatured?: true
    isHero?: true
    sortOrder?: true
    createdAt?: true
    updatedAt?: true
  }

  export type GalleryPhotoCountAggregateInputType = {
    id?: true
    src?: true
    alt?: true
    width?: true
    height?: true
    category?: true
    isFeatured?: true
    isHero?: true
    sortOrder?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type GalleryPhotoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GalleryPhoto to aggregate.
     */
    where?: GalleryPhotoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GalleryPhotos to fetch.
     */
    orderBy?: GalleryPhotoOrderByWithRelationInput | GalleryPhotoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GalleryPhotoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GalleryPhotos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GalleryPhotos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GalleryPhotos
    **/
    _count?: true | GalleryPhotoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GalleryPhotoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GalleryPhotoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GalleryPhotoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GalleryPhotoMaxAggregateInputType
  }

  export type GetGalleryPhotoAggregateType<T extends GalleryPhotoAggregateArgs> = {
        [P in keyof T & keyof AggregateGalleryPhoto]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGalleryPhoto[P]>
      : GetScalarType<T[P], AggregateGalleryPhoto[P]>
  }




  export type GalleryPhotoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GalleryPhotoWhereInput
    orderBy?: GalleryPhotoOrderByWithAggregationInput | GalleryPhotoOrderByWithAggregationInput[]
    by: GalleryPhotoScalarFieldEnum[] | GalleryPhotoScalarFieldEnum
    having?: GalleryPhotoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GalleryPhotoCountAggregateInputType | true
    _avg?: GalleryPhotoAvgAggregateInputType
    _sum?: GalleryPhotoSumAggregateInputType
    _min?: GalleryPhotoMinAggregateInputType
    _max?: GalleryPhotoMaxAggregateInputType
  }

  export type GalleryPhotoGroupByOutputType = {
    id: string
    src: string
    alt: string
    width: number
    height: number
    category: string
    isFeatured: boolean
    isHero: boolean
    sortOrder: number
    createdAt: Date
    updatedAt: Date
    _count: GalleryPhotoCountAggregateOutputType | null
    _avg: GalleryPhotoAvgAggregateOutputType | null
    _sum: GalleryPhotoSumAggregateOutputType | null
    _min: GalleryPhotoMinAggregateOutputType | null
    _max: GalleryPhotoMaxAggregateOutputType | null
  }

  type GetGalleryPhotoGroupByPayload<T extends GalleryPhotoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GalleryPhotoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GalleryPhotoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GalleryPhotoGroupByOutputType[P]>
            : GetScalarType<T[P], GalleryPhotoGroupByOutputType[P]>
        }
      >
    >


  export type GalleryPhotoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    src?: boolean
    alt?: boolean
    width?: boolean
    height?: boolean
    category?: boolean
    isFeatured?: boolean
    isHero?: boolean
    sortOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["galleryPhoto"]>

  export type GalleryPhotoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    src?: boolean
    alt?: boolean
    width?: boolean
    height?: boolean
    category?: boolean
    isFeatured?: boolean
    isHero?: boolean
    sortOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["galleryPhoto"]>

  export type GalleryPhotoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    src?: boolean
    alt?: boolean
    width?: boolean
    height?: boolean
    category?: boolean
    isFeatured?: boolean
    isHero?: boolean
    sortOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["galleryPhoto"]>

  export type GalleryPhotoSelectScalar = {
    id?: boolean
    src?: boolean
    alt?: boolean
    width?: boolean
    height?: boolean
    category?: boolean
    isFeatured?: boolean
    isHero?: boolean
    sortOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type GalleryPhotoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "src" | "alt" | "width" | "height" | "category" | "isFeatured" | "isHero" | "sortOrder" | "createdAt" | "updatedAt", ExtArgs["result"]["galleryPhoto"]>

  export type $GalleryPhotoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GalleryPhoto"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      src: string
      alt: string
      width: number
      height: number
      category: string
      isFeatured: boolean
      isHero: boolean
      sortOrder: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["galleryPhoto"]>
    composites: {}
  }

  type GalleryPhotoGetPayload<S extends boolean | null | undefined | GalleryPhotoDefaultArgs> = $Result.GetResult<Prisma.$GalleryPhotoPayload, S>

  type GalleryPhotoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GalleryPhotoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GalleryPhotoCountAggregateInputType | true
    }

  export interface GalleryPhotoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GalleryPhoto'], meta: { name: 'GalleryPhoto' } }
    /**
     * Find zero or one GalleryPhoto that matches the filter.
     * @param {GalleryPhotoFindUniqueArgs} args - Arguments to find a GalleryPhoto
     * @example
     * // Get one GalleryPhoto
     * const galleryPhoto = await prisma.galleryPhoto.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GalleryPhotoFindUniqueArgs>(args: SelectSubset<T, GalleryPhotoFindUniqueArgs<ExtArgs>>): Prisma__GalleryPhotoClient<$Result.GetResult<Prisma.$GalleryPhotoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one GalleryPhoto that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GalleryPhotoFindUniqueOrThrowArgs} args - Arguments to find a GalleryPhoto
     * @example
     * // Get one GalleryPhoto
     * const galleryPhoto = await prisma.galleryPhoto.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GalleryPhotoFindUniqueOrThrowArgs>(args: SelectSubset<T, GalleryPhotoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GalleryPhotoClient<$Result.GetResult<Prisma.$GalleryPhotoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GalleryPhoto that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GalleryPhotoFindFirstArgs} args - Arguments to find a GalleryPhoto
     * @example
     * // Get one GalleryPhoto
     * const galleryPhoto = await prisma.galleryPhoto.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GalleryPhotoFindFirstArgs>(args?: SelectSubset<T, GalleryPhotoFindFirstArgs<ExtArgs>>): Prisma__GalleryPhotoClient<$Result.GetResult<Prisma.$GalleryPhotoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GalleryPhoto that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GalleryPhotoFindFirstOrThrowArgs} args - Arguments to find a GalleryPhoto
     * @example
     * // Get one GalleryPhoto
     * const galleryPhoto = await prisma.galleryPhoto.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GalleryPhotoFindFirstOrThrowArgs>(args?: SelectSubset<T, GalleryPhotoFindFirstOrThrowArgs<ExtArgs>>): Prisma__GalleryPhotoClient<$Result.GetResult<Prisma.$GalleryPhotoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more GalleryPhotos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GalleryPhotoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GalleryPhotos
     * const galleryPhotos = await prisma.galleryPhoto.findMany()
     * 
     * // Get first 10 GalleryPhotos
     * const galleryPhotos = await prisma.galleryPhoto.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const galleryPhotoWithIdOnly = await prisma.galleryPhoto.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GalleryPhotoFindManyArgs>(args?: SelectSubset<T, GalleryPhotoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GalleryPhotoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a GalleryPhoto.
     * @param {GalleryPhotoCreateArgs} args - Arguments to create a GalleryPhoto.
     * @example
     * // Create one GalleryPhoto
     * const GalleryPhoto = await prisma.galleryPhoto.create({
     *   data: {
     *     // ... data to create a GalleryPhoto
     *   }
     * })
     * 
     */
    create<T extends GalleryPhotoCreateArgs>(args: SelectSubset<T, GalleryPhotoCreateArgs<ExtArgs>>): Prisma__GalleryPhotoClient<$Result.GetResult<Prisma.$GalleryPhotoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many GalleryPhotos.
     * @param {GalleryPhotoCreateManyArgs} args - Arguments to create many GalleryPhotos.
     * @example
     * // Create many GalleryPhotos
     * const galleryPhoto = await prisma.galleryPhoto.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GalleryPhotoCreateManyArgs>(args?: SelectSubset<T, GalleryPhotoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many GalleryPhotos and returns the data saved in the database.
     * @param {GalleryPhotoCreateManyAndReturnArgs} args - Arguments to create many GalleryPhotos.
     * @example
     * // Create many GalleryPhotos
     * const galleryPhoto = await prisma.galleryPhoto.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many GalleryPhotos and only return the `id`
     * const galleryPhotoWithIdOnly = await prisma.galleryPhoto.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GalleryPhotoCreateManyAndReturnArgs>(args?: SelectSubset<T, GalleryPhotoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GalleryPhotoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a GalleryPhoto.
     * @param {GalleryPhotoDeleteArgs} args - Arguments to delete one GalleryPhoto.
     * @example
     * // Delete one GalleryPhoto
     * const GalleryPhoto = await prisma.galleryPhoto.delete({
     *   where: {
     *     // ... filter to delete one GalleryPhoto
     *   }
     * })
     * 
     */
    delete<T extends GalleryPhotoDeleteArgs>(args: SelectSubset<T, GalleryPhotoDeleteArgs<ExtArgs>>): Prisma__GalleryPhotoClient<$Result.GetResult<Prisma.$GalleryPhotoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one GalleryPhoto.
     * @param {GalleryPhotoUpdateArgs} args - Arguments to update one GalleryPhoto.
     * @example
     * // Update one GalleryPhoto
     * const galleryPhoto = await prisma.galleryPhoto.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GalleryPhotoUpdateArgs>(args: SelectSubset<T, GalleryPhotoUpdateArgs<ExtArgs>>): Prisma__GalleryPhotoClient<$Result.GetResult<Prisma.$GalleryPhotoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more GalleryPhotos.
     * @param {GalleryPhotoDeleteManyArgs} args - Arguments to filter GalleryPhotos to delete.
     * @example
     * // Delete a few GalleryPhotos
     * const { count } = await prisma.galleryPhoto.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GalleryPhotoDeleteManyArgs>(args?: SelectSubset<T, GalleryPhotoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GalleryPhotos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GalleryPhotoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GalleryPhotos
     * const galleryPhoto = await prisma.galleryPhoto.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GalleryPhotoUpdateManyArgs>(args: SelectSubset<T, GalleryPhotoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GalleryPhotos and returns the data updated in the database.
     * @param {GalleryPhotoUpdateManyAndReturnArgs} args - Arguments to update many GalleryPhotos.
     * @example
     * // Update many GalleryPhotos
     * const galleryPhoto = await prisma.galleryPhoto.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more GalleryPhotos and only return the `id`
     * const galleryPhotoWithIdOnly = await prisma.galleryPhoto.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends GalleryPhotoUpdateManyAndReturnArgs>(args: SelectSubset<T, GalleryPhotoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GalleryPhotoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one GalleryPhoto.
     * @param {GalleryPhotoUpsertArgs} args - Arguments to update or create a GalleryPhoto.
     * @example
     * // Update or create a GalleryPhoto
     * const galleryPhoto = await prisma.galleryPhoto.upsert({
     *   create: {
     *     // ... data to create a GalleryPhoto
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GalleryPhoto we want to update
     *   }
     * })
     */
    upsert<T extends GalleryPhotoUpsertArgs>(args: SelectSubset<T, GalleryPhotoUpsertArgs<ExtArgs>>): Prisma__GalleryPhotoClient<$Result.GetResult<Prisma.$GalleryPhotoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of GalleryPhotos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GalleryPhotoCountArgs} args - Arguments to filter GalleryPhotos to count.
     * @example
     * // Count the number of GalleryPhotos
     * const count = await prisma.galleryPhoto.count({
     *   where: {
     *     // ... the filter for the GalleryPhotos we want to count
     *   }
     * })
    **/
    count<T extends GalleryPhotoCountArgs>(
      args?: Subset<T, GalleryPhotoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GalleryPhotoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GalleryPhoto.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GalleryPhotoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GalleryPhotoAggregateArgs>(args: Subset<T, GalleryPhotoAggregateArgs>): Prisma.PrismaPromise<GetGalleryPhotoAggregateType<T>>

    /**
     * Group by GalleryPhoto.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GalleryPhotoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GalleryPhotoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GalleryPhotoGroupByArgs['orderBy'] }
        : { orderBy?: GalleryPhotoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GalleryPhotoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGalleryPhotoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GalleryPhoto model
   */
  readonly fields: GalleryPhotoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GalleryPhoto.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GalleryPhotoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the GalleryPhoto model
   */
  interface GalleryPhotoFieldRefs {
    readonly id: FieldRef<"GalleryPhoto", 'String'>
    readonly src: FieldRef<"GalleryPhoto", 'String'>
    readonly alt: FieldRef<"GalleryPhoto", 'String'>
    readonly width: FieldRef<"GalleryPhoto", 'Int'>
    readonly height: FieldRef<"GalleryPhoto", 'Int'>
    readonly category: FieldRef<"GalleryPhoto", 'String'>
    readonly isFeatured: FieldRef<"GalleryPhoto", 'Boolean'>
    readonly isHero: FieldRef<"GalleryPhoto", 'Boolean'>
    readonly sortOrder: FieldRef<"GalleryPhoto", 'Int'>
    readonly createdAt: FieldRef<"GalleryPhoto", 'DateTime'>
    readonly updatedAt: FieldRef<"GalleryPhoto", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * GalleryPhoto findUnique
   */
  export type GalleryPhotoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GalleryPhoto
     */
    select?: GalleryPhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GalleryPhoto
     */
    omit?: GalleryPhotoOmit<ExtArgs> | null
    /**
     * Filter, which GalleryPhoto to fetch.
     */
    where: GalleryPhotoWhereUniqueInput
  }

  /**
   * GalleryPhoto findUniqueOrThrow
   */
  export type GalleryPhotoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GalleryPhoto
     */
    select?: GalleryPhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GalleryPhoto
     */
    omit?: GalleryPhotoOmit<ExtArgs> | null
    /**
     * Filter, which GalleryPhoto to fetch.
     */
    where: GalleryPhotoWhereUniqueInput
  }

  /**
   * GalleryPhoto findFirst
   */
  export type GalleryPhotoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GalleryPhoto
     */
    select?: GalleryPhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GalleryPhoto
     */
    omit?: GalleryPhotoOmit<ExtArgs> | null
    /**
     * Filter, which GalleryPhoto to fetch.
     */
    where?: GalleryPhotoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GalleryPhotos to fetch.
     */
    orderBy?: GalleryPhotoOrderByWithRelationInput | GalleryPhotoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GalleryPhotos.
     */
    cursor?: GalleryPhotoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GalleryPhotos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GalleryPhotos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GalleryPhotos.
     */
    distinct?: GalleryPhotoScalarFieldEnum | GalleryPhotoScalarFieldEnum[]
  }

  /**
   * GalleryPhoto findFirstOrThrow
   */
  export type GalleryPhotoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GalleryPhoto
     */
    select?: GalleryPhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GalleryPhoto
     */
    omit?: GalleryPhotoOmit<ExtArgs> | null
    /**
     * Filter, which GalleryPhoto to fetch.
     */
    where?: GalleryPhotoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GalleryPhotos to fetch.
     */
    orderBy?: GalleryPhotoOrderByWithRelationInput | GalleryPhotoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GalleryPhotos.
     */
    cursor?: GalleryPhotoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GalleryPhotos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GalleryPhotos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GalleryPhotos.
     */
    distinct?: GalleryPhotoScalarFieldEnum | GalleryPhotoScalarFieldEnum[]
  }

  /**
   * GalleryPhoto findMany
   */
  export type GalleryPhotoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GalleryPhoto
     */
    select?: GalleryPhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GalleryPhoto
     */
    omit?: GalleryPhotoOmit<ExtArgs> | null
    /**
     * Filter, which GalleryPhotos to fetch.
     */
    where?: GalleryPhotoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GalleryPhotos to fetch.
     */
    orderBy?: GalleryPhotoOrderByWithRelationInput | GalleryPhotoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GalleryPhotos.
     */
    cursor?: GalleryPhotoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GalleryPhotos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GalleryPhotos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GalleryPhotos.
     */
    distinct?: GalleryPhotoScalarFieldEnum | GalleryPhotoScalarFieldEnum[]
  }

  /**
   * GalleryPhoto create
   */
  export type GalleryPhotoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GalleryPhoto
     */
    select?: GalleryPhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GalleryPhoto
     */
    omit?: GalleryPhotoOmit<ExtArgs> | null
    /**
     * The data needed to create a GalleryPhoto.
     */
    data: XOR<GalleryPhotoCreateInput, GalleryPhotoUncheckedCreateInput>
  }

  /**
   * GalleryPhoto createMany
   */
  export type GalleryPhotoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GalleryPhotos.
     */
    data: GalleryPhotoCreateManyInput | GalleryPhotoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GalleryPhoto createManyAndReturn
   */
  export type GalleryPhotoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GalleryPhoto
     */
    select?: GalleryPhotoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GalleryPhoto
     */
    omit?: GalleryPhotoOmit<ExtArgs> | null
    /**
     * The data used to create many GalleryPhotos.
     */
    data: GalleryPhotoCreateManyInput | GalleryPhotoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GalleryPhoto update
   */
  export type GalleryPhotoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GalleryPhoto
     */
    select?: GalleryPhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GalleryPhoto
     */
    omit?: GalleryPhotoOmit<ExtArgs> | null
    /**
     * The data needed to update a GalleryPhoto.
     */
    data: XOR<GalleryPhotoUpdateInput, GalleryPhotoUncheckedUpdateInput>
    /**
     * Choose, which GalleryPhoto to update.
     */
    where: GalleryPhotoWhereUniqueInput
  }

  /**
   * GalleryPhoto updateMany
   */
  export type GalleryPhotoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GalleryPhotos.
     */
    data: XOR<GalleryPhotoUpdateManyMutationInput, GalleryPhotoUncheckedUpdateManyInput>
    /**
     * Filter which GalleryPhotos to update
     */
    where?: GalleryPhotoWhereInput
    /**
     * Limit how many GalleryPhotos to update.
     */
    limit?: number
  }

  /**
   * GalleryPhoto updateManyAndReturn
   */
  export type GalleryPhotoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GalleryPhoto
     */
    select?: GalleryPhotoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GalleryPhoto
     */
    omit?: GalleryPhotoOmit<ExtArgs> | null
    /**
     * The data used to update GalleryPhotos.
     */
    data: XOR<GalleryPhotoUpdateManyMutationInput, GalleryPhotoUncheckedUpdateManyInput>
    /**
     * Filter which GalleryPhotos to update
     */
    where?: GalleryPhotoWhereInput
    /**
     * Limit how many GalleryPhotos to update.
     */
    limit?: number
  }

  /**
   * GalleryPhoto upsert
   */
  export type GalleryPhotoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GalleryPhoto
     */
    select?: GalleryPhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GalleryPhoto
     */
    omit?: GalleryPhotoOmit<ExtArgs> | null
    /**
     * The filter to search for the GalleryPhoto to update in case it exists.
     */
    where: GalleryPhotoWhereUniqueInput
    /**
     * In case the GalleryPhoto found by the `where` argument doesn't exist, create a new GalleryPhoto with this data.
     */
    create: XOR<GalleryPhotoCreateInput, GalleryPhotoUncheckedCreateInput>
    /**
     * In case the GalleryPhoto was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GalleryPhotoUpdateInput, GalleryPhotoUncheckedUpdateInput>
  }

  /**
   * GalleryPhoto delete
   */
  export type GalleryPhotoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GalleryPhoto
     */
    select?: GalleryPhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GalleryPhoto
     */
    omit?: GalleryPhotoOmit<ExtArgs> | null
    /**
     * Filter which GalleryPhoto to delete.
     */
    where: GalleryPhotoWhereUniqueInput
  }

  /**
   * GalleryPhoto deleteMany
   */
  export type GalleryPhotoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GalleryPhotos to delete
     */
    where?: GalleryPhotoWhereInput
    /**
     * Limit how many GalleryPhotos to delete.
     */
    limit?: number
  }

  /**
   * GalleryPhoto without action
   */
  export type GalleryPhotoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GalleryPhoto
     */
    select?: GalleryPhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GalleryPhoto
     */
    omit?: GalleryPhotoOmit<ExtArgs> | null
  }


  /**
   * Model SiteSetting
   */

  export type AggregateSiteSetting = {
    _count: SiteSettingCountAggregateOutputType | null
    _min: SiteSettingMinAggregateOutputType | null
    _max: SiteSettingMaxAggregateOutputType | null
  }

  export type SiteSettingMinAggregateOutputType = {
    id: string | null
    key: string | null
    value: string | null
    updatedAt: Date | null
  }

  export type SiteSettingMaxAggregateOutputType = {
    id: string | null
    key: string | null
    value: string | null
    updatedAt: Date | null
  }

  export type SiteSettingCountAggregateOutputType = {
    id: number
    key: number
    value: number
    updatedAt: number
    _all: number
  }


  export type SiteSettingMinAggregateInputType = {
    id?: true
    key?: true
    value?: true
    updatedAt?: true
  }

  export type SiteSettingMaxAggregateInputType = {
    id?: true
    key?: true
    value?: true
    updatedAt?: true
  }

  export type SiteSettingCountAggregateInputType = {
    id?: true
    key?: true
    value?: true
    updatedAt?: true
    _all?: true
  }

  export type SiteSettingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SiteSetting to aggregate.
     */
    where?: SiteSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SiteSettings to fetch.
     */
    orderBy?: SiteSettingOrderByWithRelationInput | SiteSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SiteSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SiteSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SiteSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SiteSettings
    **/
    _count?: true | SiteSettingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SiteSettingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SiteSettingMaxAggregateInputType
  }

  export type GetSiteSettingAggregateType<T extends SiteSettingAggregateArgs> = {
        [P in keyof T & keyof AggregateSiteSetting]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSiteSetting[P]>
      : GetScalarType<T[P], AggregateSiteSetting[P]>
  }




  export type SiteSettingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SiteSettingWhereInput
    orderBy?: SiteSettingOrderByWithAggregationInput | SiteSettingOrderByWithAggregationInput[]
    by: SiteSettingScalarFieldEnum[] | SiteSettingScalarFieldEnum
    having?: SiteSettingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SiteSettingCountAggregateInputType | true
    _min?: SiteSettingMinAggregateInputType
    _max?: SiteSettingMaxAggregateInputType
  }

  export type SiteSettingGroupByOutputType = {
    id: string
    key: string
    value: string
    updatedAt: Date
    _count: SiteSettingCountAggregateOutputType | null
    _min: SiteSettingMinAggregateOutputType | null
    _max: SiteSettingMaxAggregateOutputType | null
  }

  type GetSiteSettingGroupByPayload<T extends SiteSettingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SiteSettingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SiteSettingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SiteSettingGroupByOutputType[P]>
            : GetScalarType<T[P], SiteSettingGroupByOutputType[P]>
        }
      >
    >


  export type SiteSettingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    value?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["siteSetting"]>

  export type SiteSettingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    value?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["siteSetting"]>

  export type SiteSettingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    value?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["siteSetting"]>

  export type SiteSettingSelectScalar = {
    id?: boolean
    key?: boolean
    value?: boolean
    updatedAt?: boolean
  }

  export type SiteSettingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "key" | "value" | "updatedAt", ExtArgs["result"]["siteSetting"]>

  export type $SiteSettingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SiteSetting"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      key: string
      value: string
      updatedAt: Date
    }, ExtArgs["result"]["siteSetting"]>
    composites: {}
  }

  type SiteSettingGetPayload<S extends boolean | null | undefined | SiteSettingDefaultArgs> = $Result.GetResult<Prisma.$SiteSettingPayload, S>

  type SiteSettingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SiteSettingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SiteSettingCountAggregateInputType | true
    }

  export interface SiteSettingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SiteSetting'], meta: { name: 'SiteSetting' } }
    /**
     * Find zero or one SiteSetting that matches the filter.
     * @param {SiteSettingFindUniqueArgs} args - Arguments to find a SiteSetting
     * @example
     * // Get one SiteSetting
     * const siteSetting = await prisma.siteSetting.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SiteSettingFindUniqueArgs>(args: SelectSubset<T, SiteSettingFindUniqueArgs<ExtArgs>>): Prisma__SiteSettingClient<$Result.GetResult<Prisma.$SiteSettingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SiteSetting that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SiteSettingFindUniqueOrThrowArgs} args - Arguments to find a SiteSetting
     * @example
     * // Get one SiteSetting
     * const siteSetting = await prisma.siteSetting.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SiteSettingFindUniqueOrThrowArgs>(args: SelectSubset<T, SiteSettingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SiteSettingClient<$Result.GetResult<Prisma.$SiteSettingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SiteSetting that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiteSettingFindFirstArgs} args - Arguments to find a SiteSetting
     * @example
     * // Get one SiteSetting
     * const siteSetting = await prisma.siteSetting.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SiteSettingFindFirstArgs>(args?: SelectSubset<T, SiteSettingFindFirstArgs<ExtArgs>>): Prisma__SiteSettingClient<$Result.GetResult<Prisma.$SiteSettingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SiteSetting that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiteSettingFindFirstOrThrowArgs} args - Arguments to find a SiteSetting
     * @example
     * // Get one SiteSetting
     * const siteSetting = await prisma.siteSetting.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SiteSettingFindFirstOrThrowArgs>(args?: SelectSubset<T, SiteSettingFindFirstOrThrowArgs<ExtArgs>>): Prisma__SiteSettingClient<$Result.GetResult<Prisma.$SiteSettingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SiteSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiteSettingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SiteSettings
     * const siteSettings = await prisma.siteSetting.findMany()
     * 
     * // Get first 10 SiteSettings
     * const siteSettings = await prisma.siteSetting.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const siteSettingWithIdOnly = await prisma.siteSetting.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SiteSettingFindManyArgs>(args?: SelectSubset<T, SiteSettingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SiteSettingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SiteSetting.
     * @param {SiteSettingCreateArgs} args - Arguments to create a SiteSetting.
     * @example
     * // Create one SiteSetting
     * const SiteSetting = await prisma.siteSetting.create({
     *   data: {
     *     // ... data to create a SiteSetting
     *   }
     * })
     * 
     */
    create<T extends SiteSettingCreateArgs>(args: SelectSubset<T, SiteSettingCreateArgs<ExtArgs>>): Prisma__SiteSettingClient<$Result.GetResult<Prisma.$SiteSettingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SiteSettings.
     * @param {SiteSettingCreateManyArgs} args - Arguments to create many SiteSettings.
     * @example
     * // Create many SiteSettings
     * const siteSetting = await prisma.siteSetting.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SiteSettingCreateManyArgs>(args?: SelectSubset<T, SiteSettingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SiteSettings and returns the data saved in the database.
     * @param {SiteSettingCreateManyAndReturnArgs} args - Arguments to create many SiteSettings.
     * @example
     * // Create many SiteSettings
     * const siteSetting = await prisma.siteSetting.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SiteSettings and only return the `id`
     * const siteSettingWithIdOnly = await prisma.siteSetting.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SiteSettingCreateManyAndReturnArgs>(args?: SelectSubset<T, SiteSettingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SiteSettingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SiteSetting.
     * @param {SiteSettingDeleteArgs} args - Arguments to delete one SiteSetting.
     * @example
     * // Delete one SiteSetting
     * const SiteSetting = await prisma.siteSetting.delete({
     *   where: {
     *     // ... filter to delete one SiteSetting
     *   }
     * })
     * 
     */
    delete<T extends SiteSettingDeleteArgs>(args: SelectSubset<T, SiteSettingDeleteArgs<ExtArgs>>): Prisma__SiteSettingClient<$Result.GetResult<Prisma.$SiteSettingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SiteSetting.
     * @param {SiteSettingUpdateArgs} args - Arguments to update one SiteSetting.
     * @example
     * // Update one SiteSetting
     * const siteSetting = await prisma.siteSetting.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SiteSettingUpdateArgs>(args: SelectSubset<T, SiteSettingUpdateArgs<ExtArgs>>): Prisma__SiteSettingClient<$Result.GetResult<Prisma.$SiteSettingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SiteSettings.
     * @param {SiteSettingDeleteManyArgs} args - Arguments to filter SiteSettings to delete.
     * @example
     * // Delete a few SiteSettings
     * const { count } = await prisma.siteSetting.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SiteSettingDeleteManyArgs>(args?: SelectSubset<T, SiteSettingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SiteSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiteSettingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SiteSettings
     * const siteSetting = await prisma.siteSetting.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SiteSettingUpdateManyArgs>(args: SelectSubset<T, SiteSettingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SiteSettings and returns the data updated in the database.
     * @param {SiteSettingUpdateManyAndReturnArgs} args - Arguments to update many SiteSettings.
     * @example
     * // Update many SiteSettings
     * const siteSetting = await prisma.siteSetting.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SiteSettings and only return the `id`
     * const siteSettingWithIdOnly = await prisma.siteSetting.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SiteSettingUpdateManyAndReturnArgs>(args: SelectSubset<T, SiteSettingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SiteSettingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SiteSetting.
     * @param {SiteSettingUpsertArgs} args - Arguments to update or create a SiteSetting.
     * @example
     * // Update or create a SiteSetting
     * const siteSetting = await prisma.siteSetting.upsert({
     *   create: {
     *     // ... data to create a SiteSetting
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SiteSetting we want to update
     *   }
     * })
     */
    upsert<T extends SiteSettingUpsertArgs>(args: SelectSubset<T, SiteSettingUpsertArgs<ExtArgs>>): Prisma__SiteSettingClient<$Result.GetResult<Prisma.$SiteSettingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SiteSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiteSettingCountArgs} args - Arguments to filter SiteSettings to count.
     * @example
     * // Count the number of SiteSettings
     * const count = await prisma.siteSetting.count({
     *   where: {
     *     // ... the filter for the SiteSettings we want to count
     *   }
     * })
    **/
    count<T extends SiteSettingCountArgs>(
      args?: Subset<T, SiteSettingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SiteSettingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SiteSetting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiteSettingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SiteSettingAggregateArgs>(args: Subset<T, SiteSettingAggregateArgs>): Prisma.PrismaPromise<GetSiteSettingAggregateType<T>>

    /**
     * Group by SiteSetting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiteSettingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SiteSettingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SiteSettingGroupByArgs['orderBy'] }
        : { orderBy?: SiteSettingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SiteSettingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSiteSettingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SiteSetting model
   */
  readonly fields: SiteSettingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SiteSetting.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SiteSettingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SiteSetting model
   */
  interface SiteSettingFieldRefs {
    readonly id: FieldRef<"SiteSetting", 'String'>
    readonly key: FieldRef<"SiteSetting", 'String'>
    readonly value: FieldRef<"SiteSetting", 'String'>
    readonly updatedAt: FieldRef<"SiteSetting", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SiteSetting findUnique
   */
  export type SiteSettingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteSetting
     */
    select?: SiteSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SiteSetting
     */
    omit?: SiteSettingOmit<ExtArgs> | null
    /**
     * Filter, which SiteSetting to fetch.
     */
    where: SiteSettingWhereUniqueInput
  }

  /**
   * SiteSetting findUniqueOrThrow
   */
  export type SiteSettingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteSetting
     */
    select?: SiteSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SiteSetting
     */
    omit?: SiteSettingOmit<ExtArgs> | null
    /**
     * Filter, which SiteSetting to fetch.
     */
    where: SiteSettingWhereUniqueInput
  }

  /**
   * SiteSetting findFirst
   */
  export type SiteSettingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteSetting
     */
    select?: SiteSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SiteSetting
     */
    omit?: SiteSettingOmit<ExtArgs> | null
    /**
     * Filter, which SiteSetting to fetch.
     */
    where?: SiteSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SiteSettings to fetch.
     */
    orderBy?: SiteSettingOrderByWithRelationInput | SiteSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SiteSettings.
     */
    cursor?: SiteSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SiteSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SiteSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SiteSettings.
     */
    distinct?: SiteSettingScalarFieldEnum | SiteSettingScalarFieldEnum[]
  }

  /**
   * SiteSetting findFirstOrThrow
   */
  export type SiteSettingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteSetting
     */
    select?: SiteSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SiteSetting
     */
    omit?: SiteSettingOmit<ExtArgs> | null
    /**
     * Filter, which SiteSetting to fetch.
     */
    where?: SiteSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SiteSettings to fetch.
     */
    orderBy?: SiteSettingOrderByWithRelationInput | SiteSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SiteSettings.
     */
    cursor?: SiteSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SiteSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SiteSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SiteSettings.
     */
    distinct?: SiteSettingScalarFieldEnum | SiteSettingScalarFieldEnum[]
  }

  /**
   * SiteSetting findMany
   */
  export type SiteSettingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteSetting
     */
    select?: SiteSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SiteSetting
     */
    omit?: SiteSettingOmit<ExtArgs> | null
    /**
     * Filter, which SiteSettings to fetch.
     */
    where?: SiteSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SiteSettings to fetch.
     */
    orderBy?: SiteSettingOrderByWithRelationInput | SiteSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SiteSettings.
     */
    cursor?: SiteSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SiteSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SiteSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SiteSettings.
     */
    distinct?: SiteSettingScalarFieldEnum | SiteSettingScalarFieldEnum[]
  }

  /**
   * SiteSetting create
   */
  export type SiteSettingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteSetting
     */
    select?: SiteSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SiteSetting
     */
    omit?: SiteSettingOmit<ExtArgs> | null
    /**
     * The data needed to create a SiteSetting.
     */
    data: XOR<SiteSettingCreateInput, SiteSettingUncheckedCreateInput>
  }

  /**
   * SiteSetting createMany
   */
  export type SiteSettingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SiteSettings.
     */
    data: SiteSettingCreateManyInput | SiteSettingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SiteSetting createManyAndReturn
   */
  export type SiteSettingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteSetting
     */
    select?: SiteSettingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SiteSetting
     */
    omit?: SiteSettingOmit<ExtArgs> | null
    /**
     * The data used to create many SiteSettings.
     */
    data: SiteSettingCreateManyInput | SiteSettingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SiteSetting update
   */
  export type SiteSettingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteSetting
     */
    select?: SiteSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SiteSetting
     */
    omit?: SiteSettingOmit<ExtArgs> | null
    /**
     * The data needed to update a SiteSetting.
     */
    data: XOR<SiteSettingUpdateInput, SiteSettingUncheckedUpdateInput>
    /**
     * Choose, which SiteSetting to update.
     */
    where: SiteSettingWhereUniqueInput
  }

  /**
   * SiteSetting updateMany
   */
  export type SiteSettingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SiteSettings.
     */
    data: XOR<SiteSettingUpdateManyMutationInput, SiteSettingUncheckedUpdateManyInput>
    /**
     * Filter which SiteSettings to update
     */
    where?: SiteSettingWhereInput
    /**
     * Limit how many SiteSettings to update.
     */
    limit?: number
  }

  /**
   * SiteSetting updateManyAndReturn
   */
  export type SiteSettingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteSetting
     */
    select?: SiteSettingSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SiteSetting
     */
    omit?: SiteSettingOmit<ExtArgs> | null
    /**
     * The data used to update SiteSettings.
     */
    data: XOR<SiteSettingUpdateManyMutationInput, SiteSettingUncheckedUpdateManyInput>
    /**
     * Filter which SiteSettings to update
     */
    where?: SiteSettingWhereInput
    /**
     * Limit how many SiteSettings to update.
     */
    limit?: number
  }

  /**
   * SiteSetting upsert
   */
  export type SiteSettingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteSetting
     */
    select?: SiteSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SiteSetting
     */
    omit?: SiteSettingOmit<ExtArgs> | null
    /**
     * The filter to search for the SiteSetting to update in case it exists.
     */
    where: SiteSettingWhereUniqueInput
    /**
     * In case the SiteSetting found by the `where` argument doesn't exist, create a new SiteSetting with this data.
     */
    create: XOR<SiteSettingCreateInput, SiteSettingUncheckedCreateInput>
    /**
     * In case the SiteSetting was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SiteSettingUpdateInput, SiteSettingUncheckedUpdateInput>
  }

  /**
   * SiteSetting delete
   */
  export type SiteSettingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteSetting
     */
    select?: SiteSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SiteSetting
     */
    omit?: SiteSettingOmit<ExtArgs> | null
    /**
     * Filter which SiteSetting to delete.
     */
    where: SiteSettingWhereUniqueInput
  }

  /**
   * SiteSetting deleteMany
   */
  export type SiteSettingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SiteSettings to delete
     */
    where?: SiteSettingWhereInput
    /**
     * Limit how many SiteSettings to delete.
     */
    limit?: number
  }

  /**
   * SiteSetting without action
   */
  export type SiteSettingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteSetting
     */
    select?: SiteSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SiteSetting
     */
    omit?: SiteSettingOmit<ExtArgs> | null
  }


  /**
   * Model AffiliatePost
   */

  export type AggregateAffiliatePost = {
    _count: AffiliatePostCountAggregateOutputType | null
    _avg: AffiliatePostAvgAggregateOutputType | null
    _sum: AffiliatePostSumAggregateOutputType | null
    _min: AffiliatePostMinAggregateOutputType | null
    _max: AffiliatePostMaxAggregateOutputType | null
  }

  export type AffiliatePostAvgAggregateOutputType = {
    likeCount: number | null
  }

  export type AffiliatePostSumAggregateOutputType = {
    likeCount: number | null
  }

  export type AffiliatePostMinAggregateOutputType = {
    id: string | null
    imageUrl: string | null
    caption: string | null
    likeCount: number | null
    isPublished: boolean | null
    postedBy: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AffiliatePostMaxAggregateOutputType = {
    id: string | null
    imageUrl: string | null
    caption: string | null
    likeCount: number | null
    isPublished: boolean | null
    postedBy: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AffiliatePostCountAggregateOutputType = {
    id: number
    imageUrl: number
    caption: number
    hashtags: number
    likeCount: number
    isPublished: number
    postedBy: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AffiliatePostAvgAggregateInputType = {
    likeCount?: true
  }

  export type AffiliatePostSumAggregateInputType = {
    likeCount?: true
  }

  export type AffiliatePostMinAggregateInputType = {
    id?: true
    imageUrl?: true
    caption?: true
    likeCount?: true
    isPublished?: true
    postedBy?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AffiliatePostMaxAggregateInputType = {
    id?: true
    imageUrl?: true
    caption?: true
    likeCount?: true
    isPublished?: true
    postedBy?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AffiliatePostCountAggregateInputType = {
    id?: true
    imageUrl?: true
    caption?: true
    hashtags?: true
    likeCount?: true
    isPublished?: true
    postedBy?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AffiliatePostAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AffiliatePost to aggregate.
     */
    where?: AffiliatePostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AffiliatePosts to fetch.
     */
    orderBy?: AffiliatePostOrderByWithRelationInput | AffiliatePostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AffiliatePostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AffiliatePosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AffiliatePosts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AffiliatePosts
    **/
    _count?: true | AffiliatePostCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AffiliatePostAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AffiliatePostSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AffiliatePostMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AffiliatePostMaxAggregateInputType
  }

  export type GetAffiliatePostAggregateType<T extends AffiliatePostAggregateArgs> = {
        [P in keyof T & keyof AggregateAffiliatePost]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAffiliatePost[P]>
      : GetScalarType<T[P], AggregateAffiliatePost[P]>
  }




  export type AffiliatePostGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AffiliatePostWhereInput
    orderBy?: AffiliatePostOrderByWithAggregationInput | AffiliatePostOrderByWithAggregationInput[]
    by: AffiliatePostScalarFieldEnum[] | AffiliatePostScalarFieldEnum
    having?: AffiliatePostScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AffiliatePostCountAggregateInputType | true
    _avg?: AffiliatePostAvgAggregateInputType
    _sum?: AffiliatePostSumAggregateInputType
    _min?: AffiliatePostMinAggregateInputType
    _max?: AffiliatePostMaxAggregateInputType
  }

  export type AffiliatePostGroupByOutputType = {
    id: string
    imageUrl: string
    caption: string
    hashtags: string[]
    likeCount: number
    isPublished: boolean
    postedBy: string
    createdAt: Date
    updatedAt: Date
    _count: AffiliatePostCountAggregateOutputType | null
    _avg: AffiliatePostAvgAggregateOutputType | null
    _sum: AffiliatePostSumAggregateOutputType | null
    _min: AffiliatePostMinAggregateOutputType | null
    _max: AffiliatePostMaxAggregateOutputType | null
  }

  type GetAffiliatePostGroupByPayload<T extends AffiliatePostGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AffiliatePostGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AffiliatePostGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AffiliatePostGroupByOutputType[P]>
            : GetScalarType<T[P], AffiliatePostGroupByOutputType[P]>
        }
      >
    >


  export type AffiliatePostSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    imageUrl?: boolean
    caption?: boolean
    hashtags?: boolean
    likeCount?: boolean
    isPublished?: boolean
    postedBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["affiliatePost"]>

  export type AffiliatePostSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    imageUrl?: boolean
    caption?: boolean
    hashtags?: boolean
    likeCount?: boolean
    isPublished?: boolean
    postedBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["affiliatePost"]>

  export type AffiliatePostSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    imageUrl?: boolean
    caption?: boolean
    hashtags?: boolean
    likeCount?: boolean
    isPublished?: boolean
    postedBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["affiliatePost"]>

  export type AffiliatePostSelectScalar = {
    id?: boolean
    imageUrl?: boolean
    caption?: boolean
    hashtags?: boolean
    likeCount?: boolean
    isPublished?: boolean
    postedBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AffiliatePostOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "imageUrl" | "caption" | "hashtags" | "likeCount" | "isPublished" | "postedBy" | "createdAt" | "updatedAt", ExtArgs["result"]["affiliatePost"]>

  export type $AffiliatePostPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AffiliatePost"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      imageUrl: string
      caption: string
      hashtags: string[]
      likeCount: number
      isPublished: boolean
      postedBy: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["affiliatePost"]>
    composites: {}
  }

  type AffiliatePostGetPayload<S extends boolean | null | undefined | AffiliatePostDefaultArgs> = $Result.GetResult<Prisma.$AffiliatePostPayload, S>

  type AffiliatePostCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AffiliatePostFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AffiliatePostCountAggregateInputType | true
    }

  export interface AffiliatePostDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AffiliatePost'], meta: { name: 'AffiliatePost' } }
    /**
     * Find zero or one AffiliatePost that matches the filter.
     * @param {AffiliatePostFindUniqueArgs} args - Arguments to find a AffiliatePost
     * @example
     * // Get one AffiliatePost
     * const affiliatePost = await prisma.affiliatePost.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AffiliatePostFindUniqueArgs>(args: SelectSubset<T, AffiliatePostFindUniqueArgs<ExtArgs>>): Prisma__AffiliatePostClient<$Result.GetResult<Prisma.$AffiliatePostPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AffiliatePost that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AffiliatePostFindUniqueOrThrowArgs} args - Arguments to find a AffiliatePost
     * @example
     * // Get one AffiliatePost
     * const affiliatePost = await prisma.affiliatePost.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AffiliatePostFindUniqueOrThrowArgs>(args: SelectSubset<T, AffiliatePostFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AffiliatePostClient<$Result.GetResult<Prisma.$AffiliatePostPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AffiliatePost that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AffiliatePostFindFirstArgs} args - Arguments to find a AffiliatePost
     * @example
     * // Get one AffiliatePost
     * const affiliatePost = await prisma.affiliatePost.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AffiliatePostFindFirstArgs>(args?: SelectSubset<T, AffiliatePostFindFirstArgs<ExtArgs>>): Prisma__AffiliatePostClient<$Result.GetResult<Prisma.$AffiliatePostPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AffiliatePost that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AffiliatePostFindFirstOrThrowArgs} args - Arguments to find a AffiliatePost
     * @example
     * // Get one AffiliatePost
     * const affiliatePost = await prisma.affiliatePost.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AffiliatePostFindFirstOrThrowArgs>(args?: SelectSubset<T, AffiliatePostFindFirstOrThrowArgs<ExtArgs>>): Prisma__AffiliatePostClient<$Result.GetResult<Prisma.$AffiliatePostPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AffiliatePosts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AffiliatePostFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AffiliatePosts
     * const affiliatePosts = await prisma.affiliatePost.findMany()
     * 
     * // Get first 10 AffiliatePosts
     * const affiliatePosts = await prisma.affiliatePost.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const affiliatePostWithIdOnly = await prisma.affiliatePost.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AffiliatePostFindManyArgs>(args?: SelectSubset<T, AffiliatePostFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AffiliatePostPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AffiliatePost.
     * @param {AffiliatePostCreateArgs} args - Arguments to create a AffiliatePost.
     * @example
     * // Create one AffiliatePost
     * const AffiliatePost = await prisma.affiliatePost.create({
     *   data: {
     *     // ... data to create a AffiliatePost
     *   }
     * })
     * 
     */
    create<T extends AffiliatePostCreateArgs>(args: SelectSubset<T, AffiliatePostCreateArgs<ExtArgs>>): Prisma__AffiliatePostClient<$Result.GetResult<Prisma.$AffiliatePostPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AffiliatePosts.
     * @param {AffiliatePostCreateManyArgs} args - Arguments to create many AffiliatePosts.
     * @example
     * // Create many AffiliatePosts
     * const affiliatePost = await prisma.affiliatePost.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AffiliatePostCreateManyArgs>(args?: SelectSubset<T, AffiliatePostCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AffiliatePosts and returns the data saved in the database.
     * @param {AffiliatePostCreateManyAndReturnArgs} args - Arguments to create many AffiliatePosts.
     * @example
     * // Create many AffiliatePosts
     * const affiliatePost = await prisma.affiliatePost.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AffiliatePosts and only return the `id`
     * const affiliatePostWithIdOnly = await prisma.affiliatePost.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AffiliatePostCreateManyAndReturnArgs>(args?: SelectSubset<T, AffiliatePostCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AffiliatePostPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AffiliatePost.
     * @param {AffiliatePostDeleteArgs} args - Arguments to delete one AffiliatePost.
     * @example
     * // Delete one AffiliatePost
     * const AffiliatePost = await prisma.affiliatePost.delete({
     *   where: {
     *     // ... filter to delete one AffiliatePost
     *   }
     * })
     * 
     */
    delete<T extends AffiliatePostDeleteArgs>(args: SelectSubset<T, AffiliatePostDeleteArgs<ExtArgs>>): Prisma__AffiliatePostClient<$Result.GetResult<Prisma.$AffiliatePostPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AffiliatePost.
     * @param {AffiliatePostUpdateArgs} args - Arguments to update one AffiliatePost.
     * @example
     * // Update one AffiliatePost
     * const affiliatePost = await prisma.affiliatePost.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AffiliatePostUpdateArgs>(args: SelectSubset<T, AffiliatePostUpdateArgs<ExtArgs>>): Prisma__AffiliatePostClient<$Result.GetResult<Prisma.$AffiliatePostPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AffiliatePosts.
     * @param {AffiliatePostDeleteManyArgs} args - Arguments to filter AffiliatePosts to delete.
     * @example
     * // Delete a few AffiliatePosts
     * const { count } = await prisma.affiliatePost.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AffiliatePostDeleteManyArgs>(args?: SelectSubset<T, AffiliatePostDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AffiliatePosts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AffiliatePostUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AffiliatePosts
     * const affiliatePost = await prisma.affiliatePost.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AffiliatePostUpdateManyArgs>(args: SelectSubset<T, AffiliatePostUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AffiliatePosts and returns the data updated in the database.
     * @param {AffiliatePostUpdateManyAndReturnArgs} args - Arguments to update many AffiliatePosts.
     * @example
     * // Update many AffiliatePosts
     * const affiliatePost = await prisma.affiliatePost.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AffiliatePosts and only return the `id`
     * const affiliatePostWithIdOnly = await prisma.affiliatePost.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AffiliatePostUpdateManyAndReturnArgs>(args: SelectSubset<T, AffiliatePostUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AffiliatePostPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AffiliatePost.
     * @param {AffiliatePostUpsertArgs} args - Arguments to update or create a AffiliatePost.
     * @example
     * // Update or create a AffiliatePost
     * const affiliatePost = await prisma.affiliatePost.upsert({
     *   create: {
     *     // ... data to create a AffiliatePost
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AffiliatePost we want to update
     *   }
     * })
     */
    upsert<T extends AffiliatePostUpsertArgs>(args: SelectSubset<T, AffiliatePostUpsertArgs<ExtArgs>>): Prisma__AffiliatePostClient<$Result.GetResult<Prisma.$AffiliatePostPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AffiliatePosts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AffiliatePostCountArgs} args - Arguments to filter AffiliatePosts to count.
     * @example
     * // Count the number of AffiliatePosts
     * const count = await prisma.affiliatePost.count({
     *   where: {
     *     // ... the filter for the AffiliatePosts we want to count
     *   }
     * })
    **/
    count<T extends AffiliatePostCountArgs>(
      args?: Subset<T, AffiliatePostCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AffiliatePostCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AffiliatePost.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AffiliatePostAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AffiliatePostAggregateArgs>(args: Subset<T, AffiliatePostAggregateArgs>): Prisma.PrismaPromise<GetAffiliatePostAggregateType<T>>

    /**
     * Group by AffiliatePost.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AffiliatePostGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AffiliatePostGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AffiliatePostGroupByArgs['orderBy'] }
        : { orderBy?: AffiliatePostGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AffiliatePostGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAffiliatePostGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AffiliatePost model
   */
  readonly fields: AffiliatePostFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AffiliatePost.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AffiliatePostClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AffiliatePost model
   */
  interface AffiliatePostFieldRefs {
    readonly id: FieldRef<"AffiliatePost", 'String'>
    readonly imageUrl: FieldRef<"AffiliatePost", 'String'>
    readonly caption: FieldRef<"AffiliatePost", 'String'>
    readonly hashtags: FieldRef<"AffiliatePost", 'String[]'>
    readonly likeCount: FieldRef<"AffiliatePost", 'Int'>
    readonly isPublished: FieldRef<"AffiliatePost", 'Boolean'>
    readonly postedBy: FieldRef<"AffiliatePost", 'String'>
    readonly createdAt: FieldRef<"AffiliatePost", 'DateTime'>
    readonly updatedAt: FieldRef<"AffiliatePost", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AffiliatePost findUnique
   */
  export type AffiliatePostFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliatePost
     */
    select?: AffiliatePostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliatePost
     */
    omit?: AffiliatePostOmit<ExtArgs> | null
    /**
     * Filter, which AffiliatePost to fetch.
     */
    where: AffiliatePostWhereUniqueInput
  }

  /**
   * AffiliatePost findUniqueOrThrow
   */
  export type AffiliatePostFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliatePost
     */
    select?: AffiliatePostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliatePost
     */
    omit?: AffiliatePostOmit<ExtArgs> | null
    /**
     * Filter, which AffiliatePost to fetch.
     */
    where: AffiliatePostWhereUniqueInput
  }

  /**
   * AffiliatePost findFirst
   */
  export type AffiliatePostFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliatePost
     */
    select?: AffiliatePostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliatePost
     */
    omit?: AffiliatePostOmit<ExtArgs> | null
    /**
     * Filter, which AffiliatePost to fetch.
     */
    where?: AffiliatePostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AffiliatePosts to fetch.
     */
    orderBy?: AffiliatePostOrderByWithRelationInput | AffiliatePostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AffiliatePosts.
     */
    cursor?: AffiliatePostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AffiliatePosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AffiliatePosts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AffiliatePosts.
     */
    distinct?: AffiliatePostScalarFieldEnum | AffiliatePostScalarFieldEnum[]
  }

  /**
   * AffiliatePost findFirstOrThrow
   */
  export type AffiliatePostFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliatePost
     */
    select?: AffiliatePostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliatePost
     */
    omit?: AffiliatePostOmit<ExtArgs> | null
    /**
     * Filter, which AffiliatePost to fetch.
     */
    where?: AffiliatePostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AffiliatePosts to fetch.
     */
    orderBy?: AffiliatePostOrderByWithRelationInput | AffiliatePostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AffiliatePosts.
     */
    cursor?: AffiliatePostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AffiliatePosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AffiliatePosts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AffiliatePosts.
     */
    distinct?: AffiliatePostScalarFieldEnum | AffiliatePostScalarFieldEnum[]
  }

  /**
   * AffiliatePost findMany
   */
  export type AffiliatePostFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliatePost
     */
    select?: AffiliatePostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliatePost
     */
    omit?: AffiliatePostOmit<ExtArgs> | null
    /**
     * Filter, which AffiliatePosts to fetch.
     */
    where?: AffiliatePostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AffiliatePosts to fetch.
     */
    orderBy?: AffiliatePostOrderByWithRelationInput | AffiliatePostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AffiliatePosts.
     */
    cursor?: AffiliatePostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AffiliatePosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AffiliatePosts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AffiliatePosts.
     */
    distinct?: AffiliatePostScalarFieldEnum | AffiliatePostScalarFieldEnum[]
  }

  /**
   * AffiliatePost create
   */
  export type AffiliatePostCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliatePost
     */
    select?: AffiliatePostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliatePost
     */
    omit?: AffiliatePostOmit<ExtArgs> | null
    /**
     * The data needed to create a AffiliatePost.
     */
    data: XOR<AffiliatePostCreateInput, AffiliatePostUncheckedCreateInput>
  }

  /**
   * AffiliatePost createMany
   */
  export type AffiliatePostCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AffiliatePosts.
     */
    data: AffiliatePostCreateManyInput | AffiliatePostCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AffiliatePost createManyAndReturn
   */
  export type AffiliatePostCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliatePost
     */
    select?: AffiliatePostSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliatePost
     */
    omit?: AffiliatePostOmit<ExtArgs> | null
    /**
     * The data used to create many AffiliatePosts.
     */
    data: AffiliatePostCreateManyInput | AffiliatePostCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AffiliatePost update
   */
  export type AffiliatePostUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliatePost
     */
    select?: AffiliatePostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliatePost
     */
    omit?: AffiliatePostOmit<ExtArgs> | null
    /**
     * The data needed to update a AffiliatePost.
     */
    data: XOR<AffiliatePostUpdateInput, AffiliatePostUncheckedUpdateInput>
    /**
     * Choose, which AffiliatePost to update.
     */
    where: AffiliatePostWhereUniqueInput
  }

  /**
   * AffiliatePost updateMany
   */
  export type AffiliatePostUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AffiliatePosts.
     */
    data: XOR<AffiliatePostUpdateManyMutationInput, AffiliatePostUncheckedUpdateManyInput>
    /**
     * Filter which AffiliatePosts to update
     */
    where?: AffiliatePostWhereInput
    /**
     * Limit how many AffiliatePosts to update.
     */
    limit?: number
  }

  /**
   * AffiliatePost updateManyAndReturn
   */
  export type AffiliatePostUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliatePost
     */
    select?: AffiliatePostSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliatePost
     */
    omit?: AffiliatePostOmit<ExtArgs> | null
    /**
     * The data used to update AffiliatePosts.
     */
    data: XOR<AffiliatePostUpdateManyMutationInput, AffiliatePostUncheckedUpdateManyInput>
    /**
     * Filter which AffiliatePosts to update
     */
    where?: AffiliatePostWhereInput
    /**
     * Limit how many AffiliatePosts to update.
     */
    limit?: number
  }

  /**
   * AffiliatePost upsert
   */
  export type AffiliatePostUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliatePost
     */
    select?: AffiliatePostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliatePost
     */
    omit?: AffiliatePostOmit<ExtArgs> | null
    /**
     * The filter to search for the AffiliatePost to update in case it exists.
     */
    where: AffiliatePostWhereUniqueInput
    /**
     * In case the AffiliatePost found by the `where` argument doesn't exist, create a new AffiliatePost with this data.
     */
    create: XOR<AffiliatePostCreateInput, AffiliatePostUncheckedCreateInput>
    /**
     * In case the AffiliatePost was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AffiliatePostUpdateInput, AffiliatePostUncheckedUpdateInput>
  }

  /**
   * AffiliatePost delete
   */
  export type AffiliatePostDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliatePost
     */
    select?: AffiliatePostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliatePost
     */
    omit?: AffiliatePostOmit<ExtArgs> | null
    /**
     * Filter which AffiliatePost to delete.
     */
    where: AffiliatePostWhereUniqueInput
  }

  /**
   * AffiliatePost deleteMany
   */
  export type AffiliatePostDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AffiliatePosts to delete
     */
    where?: AffiliatePostWhereInput
    /**
     * Limit how many AffiliatePosts to delete.
     */
    limit?: number
  }

  /**
   * AffiliatePost without action
   */
  export type AffiliatePostDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliatePost
     */
    select?: AffiliatePostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliatePost
     */
    omit?: AffiliatePostOmit<ExtArgs> | null
  }


  /**
   * Model AffiliateCommission
   */

  export type AggregateAffiliateCommission = {
    _count: AffiliateCommissionCountAggregateOutputType | null
    _avg: AffiliateCommissionAvgAggregateOutputType | null
    _sum: AffiliateCommissionSumAggregateOutputType | null
    _min: AffiliateCommissionMinAggregateOutputType | null
    _max: AffiliateCommissionMaxAggregateOutputType | null
  }

  export type AffiliateCommissionAvgAggregateOutputType = {
    amount: number | null
  }

  export type AffiliateCommissionSumAggregateOutputType = {
    amount: number | null
  }

  export type AffiliateCommissionMinAggregateOutputType = {
    id: string | null
    snapperId: string | null
    bookingId: string | null
    amount: number | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AffiliateCommissionMaxAggregateOutputType = {
    id: string | null
    snapperId: string | null
    bookingId: string | null
    amount: number | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AffiliateCommissionCountAggregateOutputType = {
    id: number
    snapperId: number
    bookingId: number
    amount: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AffiliateCommissionAvgAggregateInputType = {
    amount?: true
  }

  export type AffiliateCommissionSumAggregateInputType = {
    amount?: true
  }

  export type AffiliateCommissionMinAggregateInputType = {
    id?: true
    snapperId?: true
    bookingId?: true
    amount?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AffiliateCommissionMaxAggregateInputType = {
    id?: true
    snapperId?: true
    bookingId?: true
    amount?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AffiliateCommissionCountAggregateInputType = {
    id?: true
    snapperId?: true
    bookingId?: true
    amount?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AffiliateCommissionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AffiliateCommission to aggregate.
     */
    where?: AffiliateCommissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AffiliateCommissions to fetch.
     */
    orderBy?: AffiliateCommissionOrderByWithRelationInput | AffiliateCommissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AffiliateCommissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AffiliateCommissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AffiliateCommissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AffiliateCommissions
    **/
    _count?: true | AffiliateCommissionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AffiliateCommissionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AffiliateCommissionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AffiliateCommissionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AffiliateCommissionMaxAggregateInputType
  }

  export type GetAffiliateCommissionAggregateType<T extends AffiliateCommissionAggregateArgs> = {
        [P in keyof T & keyof AggregateAffiliateCommission]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAffiliateCommission[P]>
      : GetScalarType<T[P], AggregateAffiliateCommission[P]>
  }




  export type AffiliateCommissionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AffiliateCommissionWhereInput
    orderBy?: AffiliateCommissionOrderByWithAggregationInput | AffiliateCommissionOrderByWithAggregationInput[]
    by: AffiliateCommissionScalarFieldEnum[] | AffiliateCommissionScalarFieldEnum
    having?: AffiliateCommissionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AffiliateCommissionCountAggregateInputType | true
    _avg?: AffiliateCommissionAvgAggregateInputType
    _sum?: AffiliateCommissionSumAggregateInputType
    _min?: AffiliateCommissionMinAggregateInputType
    _max?: AffiliateCommissionMaxAggregateInputType
  }

  export type AffiliateCommissionGroupByOutputType = {
    id: string
    snapperId: string
    bookingId: string
    amount: number
    status: string
    createdAt: Date
    updatedAt: Date
    _count: AffiliateCommissionCountAggregateOutputType | null
    _avg: AffiliateCommissionAvgAggregateOutputType | null
    _sum: AffiliateCommissionSumAggregateOutputType | null
    _min: AffiliateCommissionMinAggregateOutputType | null
    _max: AffiliateCommissionMaxAggregateOutputType | null
  }

  type GetAffiliateCommissionGroupByPayload<T extends AffiliateCommissionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AffiliateCommissionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AffiliateCommissionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AffiliateCommissionGroupByOutputType[P]>
            : GetScalarType<T[P], AffiliateCommissionGroupByOutputType[P]>
        }
      >
    >


  export type AffiliateCommissionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    snapperId?: boolean
    bookingId?: boolean
    amount?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    snapper?: boolean | UserDefaultArgs<ExtArgs>
    booking?: boolean | BookingDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["affiliateCommission"]>

  export type AffiliateCommissionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    snapperId?: boolean
    bookingId?: boolean
    amount?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    snapper?: boolean | UserDefaultArgs<ExtArgs>
    booking?: boolean | BookingDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["affiliateCommission"]>

  export type AffiliateCommissionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    snapperId?: boolean
    bookingId?: boolean
    amount?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    snapper?: boolean | UserDefaultArgs<ExtArgs>
    booking?: boolean | BookingDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["affiliateCommission"]>

  export type AffiliateCommissionSelectScalar = {
    id?: boolean
    snapperId?: boolean
    bookingId?: boolean
    amount?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AffiliateCommissionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "snapperId" | "bookingId" | "amount" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["affiliateCommission"]>
  export type AffiliateCommissionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    snapper?: boolean | UserDefaultArgs<ExtArgs>
    booking?: boolean | BookingDefaultArgs<ExtArgs>
  }
  export type AffiliateCommissionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    snapper?: boolean | UserDefaultArgs<ExtArgs>
    booking?: boolean | BookingDefaultArgs<ExtArgs>
  }
  export type AffiliateCommissionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    snapper?: boolean | UserDefaultArgs<ExtArgs>
    booking?: boolean | BookingDefaultArgs<ExtArgs>
  }

  export type $AffiliateCommissionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AffiliateCommission"
    objects: {
      snapper: Prisma.$UserPayload<ExtArgs>
      booking: Prisma.$BookingPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      snapperId: string
      bookingId: string
      amount: number
      status: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["affiliateCommission"]>
    composites: {}
  }

  type AffiliateCommissionGetPayload<S extends boolean | null | undefined | AffiliateCommissionDefaultArgs> = $Result.GetResult<Prisma.$AffiliateCommissionPayload, S>

  type AffiliateCommissionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AffiliateCommissionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AffiliateCommissionCountAggregateInputType | true
    }

  export interface AffiliateCommissionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AffiliateCommission'], meta: { name: 'AffiliateCommission' } }
    /**
     * Find zero or one AffiliateCommission that matches the filter.
     * @param {AffiliateCommissionFindUniqueArgs} args - Arguments to find a AffiliateCommission
     * @example
     * // Get one AffiliateCommission
     * const affiliateCommission = await prisma.affiliateCommission.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AffiliateCommissionFindUniqueArgs>(args: SelectSubset<T, AffiliateCommissionFindUniqueArgs<ExtArgs>>): Prisma__AffiliateCommissionClient<$Result.GetResult<Prisma.$AffiliateCommissionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AffiliateCommission that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AffiliateCommissionFindUniqueOrThrowArgs} args - Arguments to find a AffiliateCommission
     * @example
     * // Get one AffiliateCommission
     * const affiliateCommission = await prisma.affiliateCommission.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AffiliateCommissionFindUniqueOrThrowArgs>(args: SelectSubset<T, AffiliateCommissionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AffiliateCommissionClient<$Result.GetResult<Prisma.$AffiliateCommissionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AffiliateCommission that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AffiliateCommissionFindFirstArgs} args - Arguments to find a AffiliateCommission
     * @example
     * // Get one AffiliateCommission
     * const affiliateCommission = await prisma.affiliateCommission.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AffiliateCommissionFindFirstArgs>(args?: SelectSubset<T, AffiliateCommissionFindFirstArgs<ExtArgs>>): Prisma__AffiliateCommissionClient<$Result.GetResult<Prisma.$AffiliateCommissionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AffiliateCommission that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AffiliateCommissionFindFirstOrThrowArgs} args - Arguments to find a AffiliateCommission
     * @example
     * // Get one AffiliateCommission
     * const affiliateCommission = await prisma.affiliateCommission.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AffiliateCommissionFindFirstOrThrowArgs>(args?: SelectSubset<T, AffiliateCommissionFindFirstOrThrowArgs<ExtArgs>>): Prisma__AffiliateCommissionClient<$Result.GetResult<Prisma.$AffiliateCommissionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AffiliateCommissions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AffiliateCommissionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AffiliateCommissions
     * const affiliateCommissions = await prisma.affiliateCommission.findMany()
     * 
     * // Get first 10 AffiliateCommissions
     * const affiliateCommissions = await prisma.affiliateCommission.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const affiliateCommissionWithIdOnly = await prisma.affiliateCommission.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AffiliateCommissionFindManyArgs>(args?: SelectSubset<T, AffiliateCommissionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AffiliateCommissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AffiliateCommission.
     * @param {AffiliateCommissionCreateArgs} args - Arguments to create a AffiliateCommission.
     * @example
     * // Create one AffiliateCommission
     * const AffiliateCommission = await prisma.affiliateCommission.create({
     *   data: {
     *     // ... data to create a AffiliateCommission
     *   }
     * })
     * 
     */
    create<T extends AffiliateCommissionCreateArgs>(args: SelectSubset<T, AffiliateCommissionCreateArgs<ExtArgs>>): Prisma__AffiliateCommissionClient<$Result.GetResult<Prisma.$AffiliateCommissionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AffiliateCommissions.
     * @param {AffiliateCommissionCreateManyArgs} args - Arguments to create many AffiliateCommissions.
     * @example
     * // Create many AffiliateCommissions
     * const affiliateCommission = await prisma.affiliateCommission.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AffiliateCommissionCreateManyArgs>(args?: SelectSubset<T, AffiliateCommissionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AffiliateCommissions and returns the data saved in the database.
     * @param {AffiliateCommissionCreateManyAndReturnArgs} args - Arguments to create many AffiliateCommissions.
     * @example
     * // Create many AffiliateCommissions
     * const affiliateCommission = await prisma.affiliateCommission.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AffiliateCommissions and only return the `id`
     * const affiliateCommissionWithIdOnly = await prisma.affiliateCommission.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AffiliateCommissionCreateManyAndReturnArgs>(args?: SelectSubset<T, AffiliateCommissionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AffiliateCommissionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AffiliateCommission.
     * @param {AffiliateCommissionDeleteArgs} args - Arguments to delete one AffiliateCommission.
     * @example
     * // Delete one AffiliateCommission
     * const AffiliateCommission = await prisma.affiliateCommission.delete({
     *   where: {
     *     // ... filter to delete one AffiliateCommission
     *   }
     * })
     * 
     */
    delete<T extends AffiliateCommissionDeleteArgs>(args: SelectSubset<T, AffiliateCommissionDeleteArgs<ExtArgs>>): Prisma__AffiliateCommissionClient<$Result.GetResult<Prisma.$AffiliateCommissionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AffiliateCommission.
     * @param {AffiliateCommissionUpdateArgs} args - Arguments to update one AffiliateCommission.
     * @example
     * // Update one AffiliateCommission
     * const affiliateCommission = await prisma.affiliateCommission.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AffiliateCommissionUpdateArgs>(args: SelectSubset<T, AffiliateCommissionUpdateArgs<ExtArgs>>): Prisma__AffiliateCommissionClient<$Result.GetResult<Prisma.$AffiliateCommissionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AffiliateCommissions.
     * @param {AffiliateCommissionDeleteManyArgs} args - Arguments to filter AffiliateCommissions to delete.
     * @example
     * // Delete a few AffiliateCommissions
     * const { count } = await prisma.affiliateCommission.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AffiliateCommissionDeleteManyArgs>(args?: SelectSubset<T, AffiliateCommissionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AffiliateCommissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AffiliateCommissionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AffiliateCommissions
     * const affiliateCommission = await prisma.affiliateCommission.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AffiliateCommissionUpdateManyArgs>(args: SelectSubset<T, AffiliateCommissionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AffiliateCommissions and returns the data updated in the database.
     * @param {AffiliateCommissionUpdateManyAndReturnArgs} args - Arguments to update many AffiliateCommissions.
     * @example
     * // Update many AffiliateCommissions
     * const affiliateCommission = await prisma.affiliateCommission.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AffiliateCommissions and only return the `id`
     * const affiliateCommissionWithIdOnly = await prisma.affiliateCommission.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AffiliateCommissionUpdateManyAndReturnArgs>(args: SelectSubset<T, AffiliateCommissionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AffiliateCommissionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AffiliateCommission.
     * @param {AffiliateCommissionUpsertArgs} args - Arguments to update or create a AffiliateCommission.
     * @example
     * // Update or create a AffiliateCommission
     * const affiliateCommission = await prisma.affiliateCommission.upsert({
     *   create: {
     *     // ... data to create a AffiliateCommission
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AffiliateCommission we want to update
     *   }
     * })
     */
    upsert<T extends AffiliateCommissionUpsertArgs>(args: SelectSubset<T, AffiliateCommissionUpsertArgs<ExtArgs>>): Prisma__AffiliateCommissionClient<$Result.GetResult<Prisma.$AffiliateCommissionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AffiliateCommissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AffiliateCommissionCountArgs} args - Arguments to filter AffiliateCommissions to count.
     * @example
     * // Count the number of AffiliateCommissions
     * const count = await prisma.affiliateCommission.count({
     *   where: {
     *     // ... the filter for the AffiliateCommissions we want to count
     *   }
     * })
    **/
    count<T extends AffiliateCommissionCountArgs>(
      args?: Subset<T, AffiliateCommissionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AffiliateCommissionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AffiliateCommission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AffiliateCommissionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AffiliateCommissionAggregateArgs>(args: Subset<T, AffiliateCommissionAggregateArgs>): Prisma.PrismaPromise<GetAffiliateCommissionAggregateType<T>>

    /**
     * Group by AffiliateCommission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AffiliateCommissionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AffiliateCommissionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AffiliateCommissionGroupByArgs['orderBy'] }
        : { orderBy?: AffiliateCommissionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AffiliateCommissionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAffiliateCommissionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AffiliateCommission model
   */
  readonly fields: AffiliateCommissionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AffiliateCommission.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AffiliateCommissionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    snapper<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    booking<T extends BookingDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BookingDefaultArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AffiliateCommission model
   */
  interface AffiliateCommissionFieldRefs {
    readonly id: FieldRef<"AffiliateCommission", 'String'>
    readonly snapperId: FieldRef<"AffiliateCommission", 'String'>
    readonly bookingId: FieldRef<"AffiliateCommission", 'String'>
    readonly amount: FieldRef<"AffiliateCommission", 'Float'>
    readonly status: FieldRef<"AffiliateCommission", 'String'>
    readonly createdAt: FieldRef<"AffiliateCommission", 'DateTime'>
    readonly updatedAt: FieldRef<"AffiliateCommission", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AffiliateCommission findUnique
   */
  export type AffiliateCommissionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliateCommission
     */
    select?: AffiliateCommissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliateCommission
     */
    omit?: AffiliateCommissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffiliateCommissionInclude<ExtArgs> | null
    /**
     * Filter, which AffiliateCommission to fetch.
     */
    where: AffiliateCommissionWhereUniqueInput
  }

  /**
   * AffiliateCommission findUniqueOrThrow
   */
  export type AffiliateCommissionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliateCommission
     */
    select?: AffiliateCommissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliateCommission
     */
    omit?: AffiliateCommissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffiliateCommissionInclude<ExtArgs> | null
    /**
     * Filter, which AffiliateCommission to fetch.
     */
    where: AffiliateCommissionWhereUniqueInput
  }

  /**
   * AffiliateCommission findFirst
   */
  export type AffiliateCommissionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliateCommission
     */
    select?: AffiliateCommissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliateCommission
     */
    omit?: AffiliateCommissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffiliateCommissionInclude<ExtArgs> | null
    /**
     * Filter, which AffiliateCommission to fetch.
     */
    where?: AffiliateCommissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AffiliateCommissions to fetch.
     */
    orderBy?: AffiliateCommissionOrderByWithRelationInput | AffiliateCommissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AffiliateCommissions.
     */
    cursor?: AffiliateCommissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AffiliateCommissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AffiliateCommissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AffiliateCommissions.
     */
    distinct?: AffiliateCommissionScalarFieldEnum | AffiliateCommissionScalarFieldEnum[]
  }

  /**
   * AffiliateCommission findFirstOrThrow
   */
  export type AffiliateCommissionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliateCommission
     */
    select?: AffiliateCommissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliateCommission
     */
    omit?: AffiliateCommissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffiliateCommissionInclude<ExtArgs> | null
    /**
     * Filter, which AffiliateCommission to fetch.
     */
    where?: AffiliateCommissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AffiliateCommissions to fetch.
     */
    orderBy?: AffiliateCommissionOrderByWithRelationInput | AffiliateCommissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AffiliateCommissions.
     */
    cursor?: AffiliateCommissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AffiliateCommissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AffiliateCommissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AffiliateCommissions.
     */
    distinct?: AffiliateCommissionScalarFieldEnum | AffiliateCommissionScalarFieldEnum[]
  }

  /**
   * AffiliateCommission findMany
   */
  export type AffiliateCommissionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliateCommission
     */
    select?: AffiliateCommissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliateCommission
     */
    omit?: AffiliateCommissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffiliateCommissionInclude<ExtArgs> | null
    /**
     * Filter, which AffiliateCommissions to fetch.
     */
    where?: AffiliateCommissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AffiliateCommissions to fetch.
     */
    orderBy?: AffiliateCommissionOrderByWithRelationInput | AffiliateCommissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AffiliateCommissions.
     */
    cursor?: AffiliateCommissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AffiliateCommissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AffiliateCommissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AffiliateCommissions.
     */
    distinct?: AffiliateCommissionScalarFieldEnum | AffiliateCommissionScalarFieldEnum[]
  }

  /**
   * AffiliateCommission create
   */
  export type AffiliateCommissionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliateCommission
     */
    select?: AffiliateCommissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliateCommission
     */
    omit?: AffiliateCommissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffiliateCommissionInclude<ExtArgs> | null
    /**
     * The data needed to create a AffiliateCommission.
     */
    data: XOR<AffiliateCommissionCreateInput, AffiliateCommissionUncheckedCreateInput>
  }

  /**
   * AffiliateCommission createMany
   */
  export type AffiliateCommissionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AffiliateCommissions.
     */
    data: AffiliateCommissionCreateManyInput | AffiliateCommissionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AffiliateCommission createManyAndReturn
   */
  export type AffiliateCommissionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliateCommission
     */
    select?: AffiliateCommissionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliateCommission
     */
    omit?: AffiliateCommissionOmit<ExtArgs> | null
    /**
     * The data used to create many AffiliateCommissions.
     */
    data: AffiliateCommissionCreateManyInput | AffiliateCommissionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffiliateCommissionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AffiliateCommission update
   */
  export type AffiliateCommissionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliateCommission
     */
    select?: AffiliateCommissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliateCommission
     */
    omit?: AffiliateCommissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffiliateCommissionInclude<ExtArgs> | null
    /**
     * The data needed to update a AffiliateCommission.
     */
    data: XOR<AffiliateCommissionUpdateInput, AffiliateCommissionUncheckedUpdateInput>
    /**
     * Choose, which AffiliateCommission to update.
     */
    where: AffiliateCommissionWhereUniqueInput
  }

  /**
   * AffiliateCommission updateMany
   */
  export type AffiliateCommissionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AffiliateCommissions.
     */
    data: XOR<AffiliateCommissionUpdateManyMutationInput, AffiliateCommissionUncheckedUpdateManyInput>
    /**
     * Filter which AffiliateCommissions to update
     */
    where?: AffiliateCommissionWhereInput
    /**
     * Limit how many AffiliateCommissions to update.
     */
    limit?: number
  }

  /**
   * AffiliateCommission updateManyAndReturn
   */
  export type AffiliateCommissionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliateCommission
     */
    select?: AffiliateCommissionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliateCommission
     */
    omit?: AffiliateCommissionOmit<ExtArgs> | null
    /**
     * The data used to update AffiliateCommissions.
     */
    data: XOR<AffiliateCommissionUpdateManyMutationInput, AffiliateCommissionUncheckedUpdateManyInput>
    /**
     * Filter which AffiliateCommissions to update
     */
    where?: AffiliateCommissionWhereInput
    /**
     * Limit how many AffiliateCommissions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffiliateCommissionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AffiliateCommission upsert
   */
  export type AffiliateCommissionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliateCommission
     */
    select?: AffiliateCommissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliateCommission
     */
    omit?: AffiliateCommissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffiliateCommissionInclude<ExtArgs> | null
    /**
     * The filter to search for the AffiliateCommission to update in case it exists.
     */
    where: AffiliateCommissionWhereUniqueInput
    /**
     * In case the AffiliateCommission found by the `where` argument doesn't exist, create a new AffiliateCommission with this data.
     */
    create: XOR<AffiliateCommissionCreateInput, AffiliateCommissionUncheckedCreateInput>
    /**
     * In case the AffiliateCommission was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AffiliateCommissionUpdateInput, AffiliateCommissionUncheckedUpdateInput>
  }

  /**
   * AffiliateCommission delete
   */
  export type AffiliateCommissionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliateCommission
     */
    select?: AffiliateCommissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliateCommission
     */
    omit?: AffiliateCommissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffiliateCommissionInclude<ExtArgs> | null
    /**
     * Filter which AffiliateCommission to delete.
     */
    where: AffiliateCommissionWhereUniqueInput
  }

  /**
   * AffiliateCommission deleteMany
   */
  export type AffiliateCommissionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AffiliateCommissions to delete
     */
    where?: AffiliateCommissionWhereInput
    /**
     * Limit how many AffiliateCommissions to delete.
     */
    limit?: number
  }

  /**
   * AffiliateCommission without action
   */
  export type AffiliateCommissionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliateCommission
     */
    select?: AffiliateCommissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliateCommission
     */
    omit?: AffiliateCommissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffiliateCommissionInclude<ExtArgs> | null
  }


  /**
   * Model AffiliateApplication
   */

  export type AggregateAffiliateApplication = {
    _count: AffiliateApplicationCountAggregateOutputType | null
    _min: AffiliateApplicationMinAggregateOutputType | null
    _max: AffiliateApplicationMaxAggregateOutputType | null
  }

  export type AffiliateApplicationMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    phone: string | null
    password: string | null
    instagram: string | null
    tiktok: string | null
    occupation: string | null
    city: string | null
    motivation: string | null
    experience: string | null
    status: string | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AffiliateApplicationMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    phone: string | null
    password: string | null
    instagram: string | null
    tiktok: string | null
    occupation: string | null
    city: string | null
    motivation: string | null
    experience: string | null
    status: string | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AffiliateApplicationCountAggregateOutputType = {
    id: number
    name: number
    email: number
    phone: number
    password: number
    instagram: number
    tiktok: number
    occupation: number
    city: number
    motivation: number
    experience: number
    status: number
    notes: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AffiliateApplicationMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    phone?: true
    password?: true
    instagram?: true
    tiktok?: true
    occupation?: true
    city?: true
    motivation?: true
    experience?: true
    status?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AffiliateApplicationMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    phone?: true
    password?: true
    instagram?: true
    tiktok?: true
    occupation?: true
    city?: true
    motivation?: true
    experience?: true
    status?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AffiliateApplicationCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    phone?: true
    password?: true
    instagram?: true
    tiktok?: true
    occupation?: true
    city?: true
    motivation?: true
    experience?: true
    status?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AffiliateApplicationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AffiliateApplication to aggregate.
     */
    where?: AffiliateApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AffiliateApplications to fetch.
     */
    orderBy?: AffiliateApplicationOrderByWithRelationInput | AffiliateApplicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AffiliateApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AffiliateApplications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AffiliateApplications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AffiliateApplications
    **/
    _count?: true | AffiliateApplicationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AffiliateApplicationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AffiliateApplicationMaxAggregateInputType
  }

  export type GetAffiliateApplicationAggregateType<T extends AffiliateApplicationAggregateArgs> = {
        [P in keyof T & keyof AggregateAffiliateApplication]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAffiliateApplication[P]>
      : GetScalarType<T[P], AggregateAffiliateApplication[P]>
  }




  export type AffiliateApplicationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AffiliateApplicationWhereInput
    orderBy?: AffiliateApplicationOrderByWithAggregationInput | AffiliateApplicationOrderByWithAggregationInput[]
    by: AffiliateApplicationScalarFieldEnum[] | AffiliateApplicationScalarFieldEnum
    having?: AffiliateApplicationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AffiliateApplicationCountAggregateInputType | true
    _min?: AffiliateApplicationMinAggregateInputType
    _max?: AffiliateApplicationMaxAggregateInputType
  }

  export type AffiliateApplicationGroupByOutputType = {
    id: string
    name: string
    email: string
    phone: string
    password: string
    instagram: string | null
    tiktok: string | null
    occupation: string | null
    city: string | null
    motivation: string | null
    experience: string | null
    status: string
    notes: string | null
    createdAt: Date
    updatedAt: Date
    _count: AffiliateApplicationCountAggregateOutputType | null
    _min: AffiliateApplicationMinAggregateOutputType | null
    _max: AffiliateApplicationMaxAggregateOutputType | null
  }

  type GetAffiliateApplicationGroupByPayload<T extends AffiliateApplicationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AffiliateApplicationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AffiliateApplicationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AffiliateApplicationGroupByOutputType[P]>
            : GetScalarType<T[P], AffiliateApplicationGroupByOutputType[P]>
        }
      >
    >


  export type AffiliateApplicationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    password?: boolean
    instagram?: boolean
    tiktok?: boolean
    occupation?: boolean
    city?: boolean
    motivation?: boolean
    experience?: boolean
    status?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["affiliateApplication"]>

  export type AffiliateApplicationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    password?: boolean
    instagram?: boolean
    tiktok?: boolean
    occupation?: boolean
    city?: boolean
    motivation?: boolean
    experience?: boolean
    status?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["affiliateApplication"]>

  export type AffiliateApplicationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    password?: boolean
    instagram?: boolean
    tiktok?: boolean
    occupation?: boolean
    city?: boolean
    motivation?: boolean
    experience?: boolean
    status?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["affiliateApplication"]>

  export type AffiliateApplicationSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    password?: boolean
    instagram?: boolean
    tiktok?: boolean
    occupation?: boolean
    city?: boolean
    motivation?: boolean
    experience?: boolean
    status?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AffiliateApplicationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "phone" | "password" | "instagram" | "tiktok" | "occupation" | "city" | "motivation" | "experience" | "status" | "notes" | "createdAt" | "updatedAt", ExtArgs["result"]["affiliateApplication"]>

  export type $AffiliateApplicationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AffiliateApplication"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string
      phone: string
      password: string
      instagram: string | null
      tiktok: string | null
      occupation: string | null
      city: string | null
      motivation: string | null
      experience: string | null
      status: string
      notes: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["affiliateApplication"]>
    composites: {}
  }

  type AffiliateApplicationGetPayload<S extends boolean | null | undefined | AffiliateApplicationDefaultArgs> = $Result.GetResult<Prisma.$AffiliateApplicationPayload, S>

  type AffiliateApplicationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AffiliateApplicationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AffiliateApplicationCountAggregateInputType | true
    }

  export interface AffiliateApplicationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AffiliateApplication'], meta: { name: 'AffiliateApplication' } }
    /**
     * Find zero or one AffiliateApplication that matches the filter.
     * @param {AffiliateApplicationFindUniqueArgs} args - Arguments to find a AffiliateApplication
     * @example
     * // Get one AffiliateApplication
     * const affiliateApplication = await prisma.affiliateApplication.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AffiliateApplicationFindUniqueArgs>(args: SelectSubset<T, AffiliateApplicationFindUniqueArgs<ExtArgs>>): Prisma__AffiliateApplicationClient<$Result.GetResult<Prisma.$AffiliateApplicationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AffiliateApplication that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AffiliateApplicationFindUniqueOrThrowArgs} args - Arguments to find a AffiliateApplication
     * @example
     * // Get one AffiliateApplication
     * const affiliateApplication = await prisma.affiliateApplication.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AffiliateApplicationFindUniqueOrThrowArgs>(args: SelectSubset<T, AffiliateApplicationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AffiliateApplicationClient<$Result.GetResult<Prisma.$AffiliateApplicationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AffiliateApplication that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AffiliateApplicationFindFirstArgs} args - Arguments to find a AffiliateApplication
     * @example
     * // Get one AffiliateApplication
     * const affiliateApplication = await prisma.affiliateApplication.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AffiliateApplicationFindFirstArgs>(args?: SelectSubset<T, AffiliateApplicationFindFirstArgs<ExtArgs>>): Prisma__AffiliateApplicationClient<$Result.GetResult<Prisma.$AffiliateApplicationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AffiliateApplication that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AffiliateApplicationFindFirstOrThrowArgs} args - Arguments to find a AffiliateApplication
     * @example
     * // Get one AffiliateApplication
     * const affiliateApplication = await prisma.affiliateApplication.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AffiliateApplicationFindFirstOrThrowArgs>(args?: SelectSubset<T, AffiliateApplicationFindFirstOrThrowArgs<ExtArgs>>): Prisma__AffiliateApplicationClient<$Result.GetResult<Prisma.$AffiliateApplicationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AffiliateApplications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AffiliateApplicationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AffiliateApplications
     * const affiliateApplications = await prisma.affiliateApplication.findMany()
     * 
     * // Get first 10 AffiliateApplications
     * const affiliateApplications = await prisma.affiliateApplication.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const affiliateApplicationWithIdOnly = await prisma.affiliateApplication.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AffiliateApplicationFindManyArgs>(args?: SelectSubset<T, AffiliateApplicationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AffiliateApplicationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AffiliateApplication.
     * @param {AffiliateApplicationCreateArgs} args - Arguments to create a AffiliateApplication.
     * @example
     * // Create one AffiliateApplication
     * const AffiliateApplication = await prisma.affiliateApplication.create({
     *   data: {
     *     // ... data to create a AffiliateApplication
     *   }
     * })
     * 
     */
    create<T extends AffiliateApplicationCreateArgs>(args: SelectSubset<T, AffiliateApplicationCreateArgs<ExtArgs>>): Prisma__AffiliateApplicationClient<$Result.GetResult<Prisma.$AffiliateApplicationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AffiliateApplications.
     * @param {AffiliateApplicationCreateManyArgs} args - Arguments to create many AffiliateApplications.
     * @example
     * // Create many AffiliateApplications
     * const affiliateApplication = await prisma.affiliateApplication.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AffiliateApplicationCreateManyArgs>(args?: SelectSubset<T, AffiliateApplicationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AffiliateApplications and returns the data saved in the database.
     * @param {AffiliateApplicationCreateManyAndReturnArgs} args - Arguments to create many AffiliateApplications.
     * @example
     * // Create many AffiliateApplications
     * const affiliateApplication = await prisma.affiliateApplication.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AffiliateApplications and only return the `id`
     * const affiliateApplicationWithIdOnly = await prisma.affiliateApplication.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AffiliateApplicationCreateManyAndReturnArgs>(args?: SelectSubset<T, AffiliateApplicationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AffiliateApplicationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AffiliateApplication.
     * @param {AffiliateApplicationDeleteArgs} args - Arguments to delete one AffiliateApplication.
     * @example
     * // Delete one AffiliateApplication
     * const AffiliateApplication = await prisma.affiliateApplication.delete({
     *   where: {
     *     // ... filter to delete one AffiliateApplication
     *   }
     * })
     * 
     */
    delete<T extends AffiliateApplicationDeleteArgs>(args: SelectSubset<T, AffiliateApplicationDeleteArgs<ExtArgs>>): Prisma__AffiliateApplicationClient<$Result.GetResult<Prisma.$AffiliateApplicationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AffiliateApplication.
     * @param {AffiliateApplicationUpdateArgs} args - Arguments to update one AffiliateApplication.
     * @example
     * // Update one AffiliateApplication
     * const affiliateApplication = await prisma.affiliateApplication.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AffiliateApplicationUpdateArgs>(args: SelectSubset<T, AffiliateApplicationUpdateArgs<ExtArgs>>): Prisma__AffiliateApplicationClient<$Result.GetResult<Prisma.$AffiliateApplicationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AffiliateApplications.
     * @param {AffiliateApplicationDeleteManyArgs} args - Arguments to filter AffiliateApplications to delete.
     * @example
     * // Delete a few AffiliateApplications
     * const { count } = await prisma.affiliateApplication.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AffiliateApplicationDeleteManyArgs>(args?: SelectSubset<T, AffiliateApplicationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AffiliateApplications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AffiliateApplicationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AffiliateApplications
     * const affiliateApplication = await prisma.affiliateApplication.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AffiliateApplicationUpdateManyArgs>(args: SelectSubset<T, AffiliateApplicationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AffiliateApplications and returns the data updated in the database.
     * @param {AffiliateApplicationUpdateManyAndReturnArgs} args - Arguments to update many AffiliateApplications.
     * @example
     * // Update many AffiliateApplications
     * const affiliateApplication = await prisma.affiliateApplication.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AffiliateApplications and only return the `id`
     * const affiliateApplicationWithIdOnly = await prisma.affiliateApplication.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AffiliateApplicationUpdateManyAndReturnArgs>(args: SelectSubset<T, AffiliateApplicationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AffiliateApplicationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AffiliateApplication.
     * @param {AffiliateApplicationUpsertArgs} args - Arguments to update or create a AffiliateApplication.
     * @example
     * // Update or create a AffiliateApplication
     * const affiliateApplication = await prisma.affiliateApplication.upsert({
     *   create: {
     *     // ... data to create a AffiliateApplication
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AffiliateApplication we want to update
     *   }
     * })
     */
    upsert<T extends AffiliateApplicationUpsertArgs>(args: SelectSubset<T, AffiliateApplicationUpsertArgs<ExtArgs>>): Prisma__AffiliateApplicationClient<$Result.GetResult<Prisma.$AffiliateApplicationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AffiliateApplications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AffiliateApplicationCountArgs} args - Arguments to filter AffiliateApplications to count.
     * @example
     * // Count the number of AffiliateApplications
     * const count = await prisma.affiliateApplication.count({
     *   where: {
     *     // ... the filter for the AffiliateApplications we want to count
     *   }
     * })
    **/
    count<T extends AffiliateApplicationCountArgs>(
      args?: Subset<T, AffiliateApplicationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AffiliateApplicationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AffiliateApplication.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AffiliateApplicationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AffiliateApplicationAggregateArgs>(args: Subset<T, AffiliateApplicationAggregateArgs>): Prisma.PrismaPromise<GetAffiliateApplicationAggregateType<T>>

    /**
     * Group by AffiliateApplication.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AffiliateApplicationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AffiliateApplicationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AffiliateApplicationGroupByArgs['orderBy'] }
        : { orderBy?: AffiliateApplicationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AffiliateApplicationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAffiliateApplicationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AffiliateApplication model
   */
  readonly fields: AffiliateApplicationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AffiliateApplication.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AffiliateApplicationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AffiliateApplication model
   */
  interface AffiliateApplicationFieldRefs {
    readonly id: FieldRef<"AffiliateApplication", 'String'>
    readonly name: FieldRef<"AffiliateApplication", 'String'>
    readonly email: FieldRef<"AffiliateApplication", 'String'>
    readonly phone: FieldRef<"AffiliateApplication", 'String'>
    readonly password: FieldRef<"AffiliateApplication", 'String'>
    readonly instagram: FieldRef<"AffiliateApplication", 'String'>
    readonly tiktok: FieldRef<"AffiliateApplication", 'String'>
    readonly occupation: FieldRef<"AffiliateApplication", 'String'>
    readonly city: FieldRef<"AffiliateApplication", 'String'>
    readonly motivation: FieldRef<"AffiliateApplication", 'String'>
    readonly experience: FieldRef<"AffiliateApplication", 'String'>
    readonly status: FieldRef<"AffiliateApplication", 'String'>
    readonly notes: FieldRef<"AffiliateApplication", 'String'>
    readonly createdAt: FieldRef<"AffiliateApplication", 'DateTime'>
    readonly updatedAt: FieldRef<"AffiliateApplication", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AffiliateApplication findUnique
   */
  export type AffiliateApplicationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliateApplication
     */
    select?: AffiliateApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliateApplication
     */
    omit?: AffiliateApplicationOmit<ExtArgs> | null
    /**
     * Filter, which AffiliateApplication to fetch.
     */
    where: AffiliateApplicationWhereUniqueInput
  }

  /**
   * AffiliateApplication findUniqueOrThrow
   */
  export type AffiliateApplicationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliateApplication
     */
    select?: AffiliateApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliateApplication
     */
    omit?: AffiliateApplicationOmit<ExtArgs> | null
    /**
     * Filter, which AffiliateApplication to fetch.
     */
    where: AffiliateApplicationWhereUniqueInput
  }

  /**
   * AffiliateApplication findFirst
   */
  export type AffiliateApplicationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliateApplication
     */
    select?: AffiliateApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliateApplication
     */
    omit?: AffiliateApplicationOmit<ExtArgs> | null
    /**
     * Filter, which AffiliateApplication to fetch.
     */
    where?: AffiliateApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AffiliateApplications to fetch.
     */
    orderBy?: AffiliateApplicationOrderByWithRelationInput | AffiliateApplicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AffiliateApplications.
     */
    cursor?: AffiliateApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AffiliateApplications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AffiliateApplications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AffiliateApplications.
     */
    distinct?: AffiliateApplicationScalarFieldEnum | AffiliateApplicationScalarFieldEnum[]
  }

  /**
   * AffiliateApplication findFirstOrThrow
   */
  export type AffiliateApplicationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliateApplication
     */
    select?: AffiliateApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliateApplication
     */
    omit?: AffiliateApplicationOmit<ExtArgs> | null
    /**
     * Filter, which AffiliateApplication to fetch.
     */
    where?: AffiliateApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AffiliateApplications to fetch.
     */
    orderBy?: AffiliateApplicationOrderByWithRelationInput | AffiliateApplicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AffiliateApplications.
     */
    cursor?: AffiliateApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AffiliateApplications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AffiliateApplications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AffiliateApplications.
     */
    distinct?: AffiliateApplicationScalarFieldEnum | AffiliateApplicationScalarFieldEnum[]
  }

  /**
   * AffiliateApplication findMany
   */
  export type AffiliateApplicationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliateApplication
     */
    select?: AffiliateApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliateApplication
     */
    omit?: AffiliateApplicationOmit<ExtArgs> | null
    /**
     * Filter, which AffiliateApplications to fetch.
     */
    where?: AffiliateApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AffiliateApplications to fetch.
     */
    orderBy?: AffiliateApplicationOrderByWithRelationInput | AffiliateApplicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AffiliateApplications.
     */
    cursor?: AffiliateApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AffiliateApplications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AffiliateApplications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AffiliateApplications.
     */
    distinct?: AffiliateApplicationScalarFieldEnum | AffiliateApplicationScalarFieldEnum[]
  }

  /**
   * AffiliateApplication create
   */
  export type AffiliateApplicationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliateApplication
     */
    select?: AffiliateApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliateApplication
     */
    omit?: AffiliateApplicationOmit<ExtArgs> | null
    /**
     * The data needed to create a AffiliateApplication.
     */
    data: XOR<AffiliateApplicationCreateInput, AffiliateApplicationUncheckedCreateInput>
  }

  /**
   * AffiliateApplication createMany
   */
  export type AffiliateApplicationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AffiliateApplications.
     */
    data: AffiliateApplicationCreateManyInput | AffiliateApplicationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AffiliateApplication createManyAndReturn
   */
  export type AffiliateApplicationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliateApplication
     */
    select?: AffiliateApplicationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliateApplication
     */
    omit?: AffiliateApplicationOmit<ExtArgs> | null
    /**
     * The data used to create many AffiliateApplications.
     */
    data: AffiliateApplicationCreateManyInput | AffiliateApplicationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AffiliateApplication update
   */
  export type AffiliateApplicationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliateApplication
     */
    select?: AffiliateApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliateApplication
     */
    omit?: AffiliateApplicationOmit<ExtArgs> | null
    /**
     * The data needed to update a AffiliateApplication.
     */
    data: XOR<AffiliateApplicationUpdateInput, AffiliateApplicationUncheckedUpdateInput>
    /**
     * Choose, which AffiliateApplication to update.
     */
    where: AffiliateApplicationWhereUniqueInput
  }

  /**
   * AffiliateApplication updateMany
   */
  export type AffiliateApplicationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AffiliateApplications.
     */
    data: XOR<AffiliateApplicationUpdateManyMutationInput, AffiliateApplicationUncheckedUpdateManyInput>
    /**
     * Filter which AffiliateApplications to update
     */
    where?: AffiliateApplicationWhereInput
    /**
     * Limit how many AffiliateApplications to update.
     */
    limit?: number
  }

  /**
   * AffiliateApplication updateManyAndReturn
   */
  export type AffiliateApplicationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliateApplication
     */
    select?: AffiliateApplicationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliateApplication
     */
    omit?: AffiliateApplicationOmit<ExtArgs> | null
    /**
     * The data used to update AffiliateApplications.
     */
    data: XOR<AffiliateApplicationUpdateManyMutationInput, AffiliateApplicationUncheckedUpdateManyInput>
    /**
     * Filter which AffiliateApplications to update
     */
    where?: AffiliateApplicationWhereInput
    /**
     * Limit how many AffiliateApplications to update.
     */
    limit?: number
  }

  /**
   * AffiliateApplication upsert
   */
  export type AffiliateApplicationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliateApplication
     */
    select?: AffiliateApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliateApplication
     */
    omit?: AffiliateApplicationOmit<ExtArgs> | null
    /**
     * The filter to search for the AffiliateApplication to update in case it exists.
     */
    where: AffiliateApplicationWhereUniqueInput
    /**
     * In case the AffiliateApplication found by the `where` argument doesn't exist, create a new AffiliateApplication with this data.
     */
    create: XOR<AffiliateApplicationCreateInput, AffiliateApplicationUncheckedCreateInput>
    /**
     * In case the AffiliateApplication was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AffiliateApplicationUpdateInput, AffiliateApplicationUncheckedUpdateInput>
  }

  /**
   * AffiliateApplication delete
   */
  export type AffiliateApplicationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliateApplication
     */
    select?: AffiliateApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliateApplication
     */
    omit?: AffiliateApplicationOmit<ExtArgs> | null
    /**
     * Filter which AffiliateApplication to delete.
     */
    where: AffiliateApplicationWhereUniqueInput
  }

  /**
   * AffiliateApplication deleteMany
   */
  export type AffiliateApplicationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AffiliateApplications to delete
     */
    where?: AffiliateApplicationWhereInput
    /**
     * Limit how many AffiliateApplications to delete.
     */
    limit?: number
  }

  /**
   * AffiliateApplication without action
   */
  export type AffiliateApplicationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliateApplication
     */
    select?: AffiliateApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliateApplication
     */
    omit?: AffiliateApplicationOmit<ExtArgs> | null
  }


  /**
   * Model AffiliateLead
   */

  export type AggregateAffiliateLead = {
    _count: AffiliateLeadCountAggregateOutputType | null
    _min: AffiliateLeadMinAggregateOutputType | null
    _max: AffiliateLeadMaxAggregateOutputType | null
  }

  export type AffiliateLeadMinAggregateOutputType = {
    id: string | null
    name: string | null
    phone: string | null
    email: string | null
    city: string | null
    occupation: string | null
    productSku: string | null
    productName: string | null
    referralCode: string | null
    snapperId: string | null
    notes: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AffiliateLeadMaxAggregateOutputType = {
    id: string | null
    name: string | null
    phone: string | null
    email: string | null
    city: string | null
    occupation: string | null
    productSku: string | null
    productName: string | null
    referralCode: string | null
    snapperId: string | null
    notes: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AffiliateLeadCountAggregateOutputType = {
    id: number
    name: number
    phone: number
    email: number
    city: number
    occupation: number
    productSku: number
    productName: number
    referralCode: number
    snapperId: number
    notes: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AffiliateLeadMinAggregateInputType = {
    id?: true
    name?: true
    phone?: true
    email?: true
    city?: true
    occupation?: true
    productSku?: true
    productName?: true
    referralCode?: true
    snapperId?: true
    notes?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AffiliateLeadMaxAggregateInputType = {
    id?: true
    name?: true
    phone?: true
    email?: true
    city?: true
    occupation?: true
    productSku?: true
    productName?: true
    referralCode?: true
    snapperId?: true
    notes?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AffiliateLeadCountAggregateInputType = {
    id?: true
    name?: true
    phone?: true
    email?: true
    city?: true
    occupation?: true
    productSku?: true
    productName?: true
    referralCode?: true
    snapperId?: true
    notes?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AffiliateLeadAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AffiliateLead to aggregate.
     */
    where?: AffiliateLeadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AffiliateLeads to fetch.
     */
    orderBy?: AffiliateLeadOrderByWithRelationInput | AffiliateLeadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AffiliateLeadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AffiliateLeads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AffiliateLeads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AffiliateLeads
    **/
    _count?: true | AffiliateLeadCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AffiliateLeadMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AffiliateLeadMaxAggregateInputType
  }

  export type GetAffiliateLeadAggregateType<T extends AffiliateLeadAggregateArgs> = {
        [P in keyof T & keyof AggregateAffiliateLead]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAffiliateLead[P]>
      : GetScalarType<T[P], AggregateAffiliateLead[P]>
  }




  export type AffiliateLeadGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AffiliateLeadWhereInput
    orderBy?: AffiliateLeadOrderByWithAggregationInput | AffiliateLeadOrderByWithAggregationInput[]
    by: AffiliateLeadScalarFieldEnum[] | AffiliateLeadScalarFieldEnum
    having?: AffiliateLeadScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AffiliateLeadCountAggregateInputType | true
    _min?: AffiliateLeadMinAggregateInputType
    _max?: AffiliateLeadMaxAggregateInputType
  }

  export type AffiliateLeadGroupByOutputType = {
    id: string
    name: string
    phone: string
    email: string | null
    city: string | null
    occupation: string | null
    productSku: string | null
    productName: string | null
    referralCode: string | null
    snapperId: string | null
    notes: string | null
    status: string
    createdAt: Date
    updatedAt: Date
    _count: AffiliateLeadCountAggregateOutputType | null
    _min: AffiliateLeadMinAggregateOutputType | null
    _max: AffiliateLeadMaxAggregateOutputType | null
  }

  type GetAffiliateLeadGroupByPayload<T extends AffiliateLeadGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AffiliateLeadGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AffiliateLeadGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AffiliateLeadGroupByOutputType[P]>
            : GetScalarType<T[P], AffiliateLeadGroupByOutputType[P]>
        }
      >
    >


  export type AffiliateLeadSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    phone?: boolean
    email?: boolean
    city?: boolean
    occupation?: boolean
    productSku?: boolean
    productName?: boolean
    referralCode?: boolean
    snapperId?: boolean
    notes?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["affiliateLead"]>

  export type AffiliateLeadSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    phone?: boolean
    email?: boolean
    city?: boolean
    occupation?: boolean
    productSku?: boolean
    productName?: boolean
    referralCode?: boolean
    snapperId?: boolean
    notes?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["affiliateLead"]>

  export type AffiliateLeadSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    phone?: boolean
    email?: boolean
    city?: boolean
    occupation?: boolean
    productSku?: boolean
    productName?: boolean
    referralCode?: boolean
    snapperId?: boolean
    notes?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["affiliateLead"]>

  export type AffiliateLeadSelectScalar = {
    id?: boolean
    name?: boolean
    phone?: boolean
    email?: boolean
    city?: boolean
    occupation?: boolean
    productSku?: boolean
    productName?: boolean
    referralCode?: boolean
    snapperId?: boolean
    notes?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AffiliateLeadOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "phone" | "email" | "city" | "occupation" | "productSku" | "productName" | "referralCode" | "snapperId" | "notes" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["affiliateLead"]>

  export type $AffiliateLeadPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AffiliateLead"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      phone: string
      email: string | null
      city: string | null
      occupation: string | null
      productSku: string | null
      productName: string | null
      referralCode: string | null
      snapperId: string | null
      notes: string | null
      status: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["affiliateLead"]>
    composites: {}
  }

  type AffiliateLeadGetPayload<S extends boolean | null | undefined | AffiliateLeadDefaultArgs> = $Result.GetResult<Prisma.$AffiliateLeadPayload, S>

  type AffiliateLeadCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AffiliateLeadFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AffiliateLeadCountAggregateInputType | true
    }

  export interface AffiliateLeadDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AffiliateLead'], meta: { name: 'AffiliateLead' } }
    /**
     * Find zero or one AffiliateLead that matches the filter.
     * @param {AffiliateLeadFindUniqueArgs} args - Arguments to find a AffiliateLead
     * @example
     * // Get one AffiliateLead
     * const affiliateLead = await prisma.affiliateLead.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AffiliateLeadFindUniqueArgs>(args: SelectSubset<T, AffiliateLeadFindUniqueArgs<ExtArgs>>): Prisma__AffiliateLeadClient<$Result.GetResult<Prisma.$AffiliateLeadPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AffiliateLead that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AffiliateLeadFindUniqueOrThrowArgs} args - Arguments to find a AffiliateLead
     * @example
     * // Get one AffiliateLead
     * const affiliateLead = await prisma.affiliateLead.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AffiliateLeadFindUniqueOrThrowArgs>(args: SelectSubset<T, AffiliateLeadFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AffiliateLeadClient<$Result.GetResult<Prisma.$AffiliateLeadPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AffiliateLead that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AffiliateLeadFindFirstArgs} args - Arguments to find a AffiliateLead
     * @example
     * // Get one AffiliateLead
     * const affiliateLead = await prisma.affiliateLead.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AffiliateLeadFindFirstArgs>(args?: SelectSubset<T, AffiliateLeadFindFirstArgs<ExtArgs>>): Prisma__AffiliateLeadClient<$Result.GetResult<Prisma.$AffiliateLeadPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AffiliateLead that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AffiliateLeadFindFirstOrThrowArgs} args - Arguments to find a AffiliateLead
     * @example
     * // Get one AffiliateLead
     * const affiliateLead = await prisma.affiliateLead.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AffiliateLeadFindFirstOrThrowArgs>(args?: SelectSubset<T, AffiliateLeadFindFirstOrThrowArgs<ExtArgs>>): Prisma__AffiliateLeadClient<$Result.GetResult<Prisma.$AffiliateLeadPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AffiliateLeads that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AffiliateLeadFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AffiliateLeads
     * const affiliateLeads = await prisma.affiliateLead.findMany()
     * 
     * // Get first 10 AffiliateLeads
     * const affiliateLeads = await prisma.affiliateLead.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const affiliateLeadWithIdOnly = await prisma.affiliateLead.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AffiliateLeadFindManyArgs>(args?: SelectSubset<T, AffiliateLeadFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AffiliateLeadPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AffiliateLead.
     * @param {AffiliateLeadCreateArgs} args - Arguments to create a AffiliateLead.
     * @example
     * // Create one AffiliateLead
     * const AffiliateLead = await prisma.affiliateLead.create({
     *   data: {
     *     // ... data to create a AffiliateLead
     *   }
     * })
     * 
     */
    create<T extends AffiliateLeadCreateArgs>(args: SelectSubset<T, AffiliateLeadCreateArgs<ExtArgs>>): Prisma__AffiliateLeadClient<$Result.GetResult<Prisma.$AffiliateLeadPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AffiliateLeads.
     * @param {AffiliateLeadCreateManyArgs} args - Arguments to create many AffiliateLeads.
     * @example
     * // Create many AffiliateLeads
     * const affiliateLead = await prisma.affiliateLead.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AffiliateLeadCreateManyArgs>(args?: SelectSubset<T, AffiliateLeadCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AffiliateLeads and returns the data saved in the database.
     * @param {AffiliateLeadCreateManyAndReturnArgs} args - Arguments to create many AffiliateLeads.
     * @example
     * // Create many AffiliateLeads
     * const affiliateLead = await prisma.affiliateLead.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AffiliateLeads and only return the `id`
     * const affiliateLeadWithIdOnly = await prisma.affiliateLead.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AffiliateLeadCreateManyAndReturnArgs>(args?: SelectSubset<T, AffiliateLeadCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AffiliateLeadPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AffiliateLead.
     * @param {AffiliateLeadDeleteArgs} args - Arguments to delete one AffiliateLead.
     * @example
     * // Delete one AffiliateLead
     * const AffiliateLead = await prisma.affiliateLead.delete({
     *   where: {
     *     // ... filter to delete one AffiliateLead
     *   }
     * })
     * 
     */
    delete<T extends AffiliateLeadDeleteArgs>(args: SelectSubset<T, AffiliateLeadDeleteArgs<ExtArgs>>): Prisma__AffiliateLeadClient<$Result.GetResult<Prisma.$AffiliateLeadPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AffiliateLead.
     * @param {AffiliateLeadUpdateArgs} args - Arguments to update one AffiliateLead.
     * @example
     * // Update one AffiliateLead
     * const affiliateLead = await prisma.affiliateLead.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AffiliateLeadUpdateArgs>(args: SelectSubset<T, AffiliateLeadUpdateArgs<ExtArgs>>): Prisma__AffiliateLeadClient<$Result.GetResult<Prisma.$AffiliateLeadPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AffiliateLeads.
     * @param {AffiliateLeadDeleteManyArgs} args - Arguments to filter AffiliateLeads to delete.
     * @example
     * // Delete a few AffiliateLeads
     * const { count } = await prisma.affiliateLead.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AffiliateLeadDeleteManyArgs>(args?: SelectSubset<T, AffiliateLeadDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AffiliateLeads.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AffiliateLeadUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AffiliateLeads
     * const affiliateLead = await prisma.affiliateLead.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AffiliateLeadUpdateManyArgs>(args: SelectSubset<T, AffiliateLeadUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AffiliateLeads and returns the data updated in the database.
     * @param {AffiliateLeadUpdateManyAndReturnArgs} args - Arguments to update many AffiliateLeads.
     * @example
     * // Update many AffiliateLeads
     * const affiliateLead = await prisma.affiliateLead.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AffiliateLeads and only return the `id`
     * const affiliateLeadWithIdOnly = await prisma.affiliateLead.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AffiliateLeadUpdateManyAndReturnArgs>(args: SelectSubset<T, AffiliateLeadUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AffiliateLeadPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AffiliateLead.
     * @param {AffiliateLeadUpsertArgs} args - Arguments to update or create a AffiliateLead.
     * @example
     * // Update or create a AffiliateLead
     * const affiliateLead = await prisma.affiliateLead.upsert({
     *   create: {
     *     // ... data to create a AffiliateLead
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AffiliateLead we want to update
     *   }
     * })
     */
    upsert<T extends AffiliateLeadUpsertArgs>(args: SelectSubset<T, AffiliateLeadUpsertArgs<ExtArgs>>): Prisma__AffiliateLeadClient<$Result.GetResult<Prisma.$AffiliateLeadPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AffiliateLeads.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AffiliateLeadCountArgs} args - Arguments to filter AffiliateLeads to count.
     * @example
     * // Count the number of AffiliateLeads
     * const count = await prisma.affiliateLead.count({
     *   where: {
     *     // ... the filter for the AffiliateLeads we want to count
     *   }
     * })
    **/
    count<T extends AffiliateLeadCountArgs>(
      args?: Subset<T, AffiliateLeadCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AffiliateLeadCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AffiliateLead.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AffiliateLeadAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AffiliateLeadAggregateArgs>(args: Subset<T, AffiliateLeadAggregateArgs>): Prisma.PrismaPromise<GetAffiliateLeadAggregateType<T>>

    /**
     * Group by AffiliateLead.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AffiliateLeadGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AffiliateLeadGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AffiliateLeadGroupByArgs['orderBy'] }
        : { orderBy?: AffiliateLeadGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AffiliateLeadGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAffiliateLeadGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AffiliateLead model
   */
  readonly fields: AffiliateLeadFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AffiliateLead.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AffiliateLeadClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AffiliateLead model
   */
  interface AffiliateLeadFieldRefs {
    readonly id: FieldRef<"AffiliateLead", 'String'>
    readonly name: FieldRef<"AffiliateLead", 'String'>
    readonly phone: FieldRef<"AffiliateLead", 'String'>
    readonly email: FieldRef<"AffiliateLead", 'String'>
    readonly city: FieldRef<"AffiliateLead", 'String'>
    readonly occupation: FieldRef<"AffiliateLead", 'String'>
    readonly productSku: FieldRef<"AffiliateLead", 'String'>
    readonly productName: FieldRef<"AffiliateLead", 'String'>
    readonly referralCode: FieldRef<"AffiliateLead", 'String'>
    readonly snapperId: FieldRef<"AffiliateLead", 'String'>
    readonly notes: FieldRef<"AffiliateLead", 'String'>
    readonly status: FieldRef<"AffiliateLead", 'String'>
    readonly createdAt: FieldRef<"AffiliateLead", 'DateTime'>
    readonly updatedAt: FieldRef<"AffiliateLead", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AffiliateLead findUnique
   */
  export type AffiliateLeadFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliateLead
     */
    select?: AffiliateLeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliateLead
     */
    omit?: AffiliateLeadOmit<ExtArgs> | null
    /**
     * Filter, which AffiliateLead to fetch.
     */
    where: AffiliateLeadWhereUniqueInput
  }

  /**
   * AffiliateLead findUniqueOrThrow
   */
  export type AffiliateLeadFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliateLead
     */
    select?: AffiliateLeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliateLead
     */
    omit?: AffiliateLeadOmit<ExtArgs> | null
    /**
     * Filter, which AffiliateLead to fetch.
     */
    where: AffiliateLeadWhereUniqueInput
  }

  /**
   * AffiliateLead findFirst
   */
  export type AffiliateLeadFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliateLead
     */
    select?: AffiliateLeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliateLead
     */
    omit?: AffiliateLeadOmit<ExtArgs> | null
    /**
     * Filter, which AffiliateLead to fetch.
     */
    where?: AffiliateLeadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AffiliateLeads to fetch.
     */
    orderBy?: AffiliateLeadOrderByWithRelationInput | AffiliateLeadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AffiliateLeads.
     */
    cursor?: AffiliateLeadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AffiliateLeads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AffiliateLeads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AffiliateLeads.
     */
    distinct?: AffiliateLeadScalarFieldEnum | AffiliateLeadScalarFieldEnum[]
  }

  /**
   * AffiliateLead findFirstOrThrow
   */
  export type AffiliateLeadFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliateLead
     */
    select?: AffiliateLeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliateLead
     */
    omit?: AffiliateLeadOmit<ExtArgs> | null
    /**
     * Filter, which AffiliateLead to fetch.
     */
    where?: AffiliateLeadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AffiliateLeads to fetch.
     */
    orderBy?: AffiliateLeadOrderByWithRelationInput | AffiliateLeadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AffiliateLeads.
     */
    cursor?: AffiliateLeadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AffiliateLeads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AffiliateLeads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AffiliateLeads.
     */
    distinct?: AffiliateLeadScalarFieldEnum | AffiliateLeadScalarFieldEnum[]
  }

  /**
   * AffiliateLead findMany
   */
  export type AffiliateLeadFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliateLead
     */
    select?: AffiliateLeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliateLead
     */
    omit?: AffiliateLeadOmit<ExtArgs> | null
    /**
     * Filter, which AffiliateLeads to fetch.
     */
    where?: AffiliateLeadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AffiliateLeads to fetch.
     */
    orderBy?: AffiliateLeadOrderByWithRelationInput | AffiliateLeadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AffiliateLeads.
     */
    cursor?: AffiliateLeadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AffiliateLeads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AffiliateLeads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AffiliateLeads.
     */
    distinct?: AffiliateLeadScalarFieldEnum | AffiliateLeadScalarFieldEnum[]
  }

  /**
   * AffiliateLead create
   */
  export type AffiliateLeadCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliateLead
     */
    select?: AffiliateLeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliateLead
     */
    omit?: AffiliateLeadOmit<ExtArgs> | null
    /**
     * The data needed to create a AffiliateLead.
     */
    data: XOR<AffiliateLeadCreateInput, AffiliateLeadUncheckedCreateInput>
  }

  /**
   * AffiliateLead createMany
   */
  export type AffiliateLeadCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AffiliateLeads.
     */
    data: AffiliateLeadCreateManyInput | AffiliateLeadCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AffiliateLead createManyAndReturn
   */
  export type AffiliateLeadCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliateLead
     */
    select?: AffiliateLeadSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliateLead
     */
    omit?: AffiliateLeadOmit<ExtArgs> | null
    /**
     * The data used to create many AffiliateLeads.
     */
    data: AffiliateLeadCreateManyInput | AffiliateLeadCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AffiliateLead update
   */
  export type AffiliateLeadUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliateLead
     */
    select?: AffiliateLeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliateLead
     */
    omit?: AffiliateLeadOmit<ExtArgs> | null
    /**
     * The data needed to update a AffiliateLead.
     */
    data: XOR<AffiliateLeadUpdateInput, AffiliateLeadUncheckedUpdateInput>
    /**
     * Choose, which AffiliateLead to update.
     */
    where: AffiliateLeadWhereUniqueInput
  }

  /**
   * AffiliateLead updateMany
   */
  export type AffiliateLeadUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AffiliateLeads.
     */
    data: XOR<AffiliateLeadUpdateManyMutationInput, AffiliateLeadUncheckedUpdateManyInput>
    /**
     * Filter which AffiliateLeads to update
     */
    where?: AffiliateLeadWhereInput
    /**
     * Limit how many AffiliateLeads to update.
     */
    limit?: number
  }

  /**
   * AffiliateLead updateManyAndReturn
   */
  export type AffiliateLeadUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliateLead
     */
    select?: AffiliateLeadSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliateLead
     */
    omit?: AffiliateLeadOmit<ExtArgs> | null
    /**
     * The data used to update AffiliateLeads.
     */
    data: XOR<AffiliateLeadUpdateManyMutationInput, AffiliateLeadUncheckedUpdateManyInput>
    /**
     * Filter which AffiliateLeads to update
     */
    where?: AffiliateLeadWhereInput
    /**
     * Limit how many AffiliateLeads to update.
     */
    limit?: number
  }

  /**
   * AffiliateLead upsert
   */
  export type AffiliateLeadUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliateLead
     */
    select?: AffiliateLeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliateLead
     */
    omit?: AffiliateLeadOmit<ExtArgs> | null
    /**
     * The filter to search for the AffiliateLead to update in case it exists.
     */
    where: AffiliateLeadWhereUniqueInput
    /**
     * In case the AffiliateLead found by the `where` argument doesn't exist, create a new AffiliateLead with this data.
     */
    create: XOR<AffiliateLeadCreateInput, AffiliateLeadUncheckedCreateInput>
    /**
     * In case the AffiliateLead was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AffiliateLeadUpdateInput, AffiliateLeadUncheckedUpdateInput>
  }

  /**
   * AffiliateLead delete
   */
  export type AffiliateLeadDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliateLead
     */
    select?: AffiliateLeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliateLead
     */
    omit?: AffiliateLeadOmit<ExtArgs> | null
    /**
     * Filter which AffiliateLead to delete.
     */
    where: AffiliateLeadWhereUniqueInput
  }

  /**
   * AffiliateLead deleteMany
   */
  export type AffiliateLeadDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AffiliateLeads to delete
     */
    where?: AffiliateLeadWhereInput
    /**
     * Limit how many AffiliateLeads to delete.
     */
    limit?: number
  }

  /**
   * AffiliateLead without action
   */
  export type AffiliateLeadDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliateLead
     */
    select?: AffiliateLeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliateLead
     */
    omit?: AffiliateLeadOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const ReferralCodeScalarFieldEnum: {
    id: 'id',
    code: 'code',
    marketerName: 'marketerName',
    discountPct: 'discountPct',
    maxDiscountAmount: 'maxDiscountAmount',
    feePercentage: 'feePercentage',
    bankName: 'bankName',
    bankAccount: 'bankAccount',
    expiryDate: 'expiryDate',
    usageLimit: 'usageLimit',
    usageCount: 'usageCount',
    isActive: 'isActive',
    ownerId: 'ownerId',
    targetProductId: 'targetProductId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ReferralCodeScalarFieldEnum = (typeof ReferralCodeScalarFieldEnum)[keyof typeof ReferralCodeScalarFieldEnum]


  export const BookingScalarFieldEnum: {
    id: 'id',
    invoiceNo: 'invoiceNo',
    packageId: 'packageId',
    packageName: 'packageName',
    customerName: 'customerName',
    customerPhone: 'customerPhone',
    sessionDate: 'sessionDate',
    sessionTime: 'sessionTime',
    notes: 'notes',
    referralCode: 'referralCode',
    discountPct: 'discountPct',
    originalPrice: 'originalPrice',
    finalPrice: 'finalPrice',
    paymentMethod: 'paymentMethod',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type BookingScalarFieldEnum = (typeof BookingScalarFieldEnum)[keyof typeof BookingScalarFieldEnum]


  export const CategoryScalarFieldEnum: {
    id: 'id',
    name: 'name',
    slug: 'slug'
  };

  export type CategoryScalarFieldEnum = (typeof CategoryScalarFieldEnum)[keyof typeof CategoryScalarFieldEnum]


  export const ProductScalarFieldEnum: {
    id: 'id',
    name: 'name',
    sku: 'sku',
    price: 'price',
    stock: 'stock',
    image: 'image',
    duration: 'duration',
    photoCount: 'photoCount',
    features: 'features',
    isPopular: 'isPopular',
    sortOrder: 'sortOrder',
    categoryId: 'categoryId',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProductScalarFieldEnum = (typeof ProductScalarFieldEnum)[keyof typeof ProductScalarFieldEnum]


  export const ReferralUsageScalarFieldEnum: {
    id: 'id',
    referralCodeId: 'referralCodeId',
    transactionId: 'transactionId',
    userId: 'userId',
    usedAt: 'usedAt'
  };

  export type ReferralUsageScalarFieldEnum = (typeof ReferralUsageScalarFieldEnum)[keyof typeof ReferralUsageScalarFieldEnum]


  export const TransactionItemScalarFieldEnum: {
    id: 'id',
    transactionId: 'transactionId',
    productId: 'productId',
    qty: 'qty',
    price: 'price',
    subtotal: 'subtotal'
  };

  export type TransactionItemScalarFieldEnum = (typeof TransactionItemScalarFieldEnum)[keyof typeof TransactionItemScalarFieldEnum]


  export const TransactionScalarFieldEnum: {
    id: 'id',
    invoiceNumber: 'invoiceNumber',
    cashierId: 'cashierId',
    total: 'total',
    tax: 'tax',
    discount: 'discount',
    paymentMethod: 'paymentMethod',
    referralCodeId: 'referralCodeId',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TransactionScalarFieldEnum = (typeof TransactionScalarFieldEnum)[keyof typeof TransactionScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    password: 'password',
    role: 'role',
    phone: 'phone',
    bankName: 'bankName',
    bankAccount: 'bankAccount',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const GalleryPhotoScalarFieldEnum: {
    id: 'id',
    src: 'src',
    alt: 'alt',
    width: 'width',
    height: 'height',
    category: 'category',
    isFeatured: 'isFeatured',
    isHero: 'isHero',
    sortOrder: 'sortOrder',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type GalleryPhotoScalarFieldEnum = (typeof GalleryPhotoScalarFieldEnum)[keyof typeof GalleryPhotoScalarFieldEnum]


  export const SiteSettingScalarFieldEnum: {
    id: 'id',
    key: 'key',
    value: 'value',
    updatedAt: 'updatedAt'
  };

  export type SiteSettingScalarFieldEnum = (typeof SiteSettingScalarFieldEnum)[keyof typeof SiteSettingScalarFieldEnum]


  export const AffiliatePostScalarFieldEnum: {
    id: 'id',
    imageUrl: 'imageUrl',
    caption: 'caption',
    hashtags: 'hashtags',
    likeCount: 'likeCount',
    isPublished: 'isPublished',
    postedBy: 'postedBy',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AffiliatePostScalarFieldEnum = (typeof AffiliatePostScalarFieldEnum)[keyof typeof AffiliatePostScalarFieldEnum]


  export const AffiliateCommissionScalarFieldEnum: {
    id: 'id',
    snapperId: 'snapperId',
    bookingId: 'bookingId',
    amount: 'amount',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AffiliateCommissionScalarFieldEnum = (typeof AffiliateCommissionScalarFieldEnum)[keyof typeof AffiliateCommissionScalarFieldEnum]


  export const AffiliateApplicationScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    phone: 'phone',
    password: 'password',
    instagram: 'instagram',
    tiktok: 'tiktok',
    occupation: 'occupation',
    city: 'city',
    motivation: 'motivation',
    experience: 'experience',
    status: 'status',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AffiliateApplicationScalarFieldEnum = (typeof AffiliateApplicationScalarFieldEnum)[keyof typeof AffiliateApplicationScalarFieldEnum]


  export const AffiliateLeadScalarFieldEnum: {
    id: 'id',
    name: 'name',
    phone: 'phone',
    email: 'email',
    city: 'city',
    occupation: 'occupation',
    productSku: 'productSku',
    productName: 'productName',
    referralCode: 'referralCode',
    snapperId: 'snapperId',
    notes: 'notes',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AffiliateLeadScalarFieldEnum = (typeof AffiliateLeadScalarFieldEnum)[keyof typeof AffiliateLeadScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'PaymentMethod'
   */
  export type EnumPaymentMethodFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentMethod'>
    


  /**
   * Reference to a field of type 'PaymentMethod[]'
   */
  export type ListEnumPaymentMethodFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentMethod[]'>
    


  /**
   * Reference to a field of type 'TransactionStatus'
   */
  export type EnumTransactionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TransactionStatus'>
    


  /**
   * Reference to a field of type 'TransactionStatus[]'
   */
  export type ListEnumTransactionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TransactionStatus[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    
  /**
   * Deep Input Types
   */


  export type ReferralCodeWhereInput = {
    AND?: ReferralCodeWhereInput | ReferralCodeWhereInput[]
    OR?: ReferralCodeWhereInput[]
    NOT?: ReferralCodeWhereInput | ReferralCodeWhereInput[]
    id?: StringFilter<"ReferralCode"> | string
    code?: StringFilter<"ReferralCode"> | string
    marketerName?: StringFilter<"ReferralCode"> | string
    discountPct?: FloatFilter<"ReferralCode"> | number
    maxDiscountAmount?: FloatFilter<"ReferralCode"> | number
    feePercentage?: FloatFilter<"ReferralCode"> | number
    bankName?: StringNullableFilter<"ReferralCode"> | string | null
    bankAccount?: StringNullableFilter<"ReferralCode"> | string | null
    expiryDate?: DateTimeNullableFilter<"ReferralCode"> | Date | string | null
    usageLimit?: IntNullableFilter<"ReferralCode"> | number | null
    usageCount?: IntFilter<"ReferralCode"> | number
    isActive?: BoolFilter<"ReferralCode"> | boolean
    ownerId?: StringNullableFilter<"ReferralCode"> | string | null
    targetProductId?: StringNullableFilter<"ReferralCode"> | string | null
    createdAt?: DateTimeFilter<"ReferralCode"> | Date | string
    updatedAt?: DateTimeFilter<"ReferralCode"> | Date | string
    owner?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    referral_usages?: ReferralUsageListRelationFilter
    transactions?: TransactionListRelationFilter
  }

  export type ReferralCodeOrderByWithRelationInput = {
    id?: SortOrder
    code?: SortOrder
    marketerName?: SortOrder
    discountPct?: SortOrder
    maxDiscountAmount?: SortOrder
    feePercentage?: SortOrder
    bankName?: SortOrderInput | SortOrder
    bankAccount?: SortOrderInput | SortOrder
    expiryDate?: SortOrderInput | SortOrder
    usageLimit?: SortOrderInput | SortOrder
    usageCount?: SortOrder
    isActive?: SortOrder
    ownerId?: SortOrderInput | SortOrder
    targetProductId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    owner?: UserOrderByWithRelationInput
    referral_usages?: ReferralUsageOrderByRelationAggregateInput
    transactions?: TransactionOrderByRelationAggregateInput
  }

  export type ReferralCodeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    code?: string
    ownerId?: string
    AND?: ReferralCodeWhereInput | ReferralCodeWhereInput[]
    OR?: ReferralCodeWhereInput[]
    NOT?: ReferralCodeWhereInput | ReferralCodeWhereInput[]
    marketerName?: StringFilter<"ReferralCode"> | string
    discountPct?: FloatFilter<"ReferralCode"> | number
    maxDiscountAmount?: FloatFilter<"ReferralCode"> | number
    feePercentage?: FloatFilter<"ReferralCode"> | number
    bankName?: StringNullableFilter<"ReferralCode"> | string | null
    bankAccount?: StringNullableFilter<"ReferralCode"> | string | null
    expiryDate?: DateTimeNullableFilter<"ReferralCode"> | Date | string | null
    usageLimit?: IntNullableFilter<"ReferralCode"> | number | null
    usageCount?: IntFilter<"ReferralCode"> | number
    isActive?: BoolFilter<"ReferralCode"> | boolean
    targetProductId?: StringNullableFilter<"ReferralCode"> | string | null
    createdAt?: DateTimeFilter<"ReferralCode"> | Date | string
    updatedAt?: DateTimeFilter<"ReferralCode"> | Date | string
    owner?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    referral_usages?: ReferralUsageListRelationFilter
    transactions?: TransactionListRelationFilter
  }, "id" | "code" | "ownerId">

  export type ReferralCodeOrderByWithAggregationInput = {
    id?: SortOrder
    code?: SortOrder
    marketerName?: SortOrder
    discountPct?: SortOrder
    maxDiscountAmount?: SortOrder
    feePercentage?: SortOrder
    bankName?: SortOrderInput | SortOrder
    bankAccount?: SortOrderInput | SortOrder
    expiryDate?: SortOrderInput | SortOrder
    usageLimit?: SortOrderInput | SortOrder
    usageCount?: SortOrder
    isActive?: SortOrder
    ownerId?: SortOrderInput | SortOrder
    targetProductId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ReferralCodeCountOrderByAggregateInput
    _avg?: ReferralCodeAvgOrderByAggregateInput
    _max?: ReferralCodeMaxOrderByAggregateInput
    _min?: ReferralCodeMinOrderByAggregateInput
    _sum?: ReferralCodeSumOrderByAggregateInput
  }

  export type ReferralCodeScalarWhereWithAggregatesInput = {
    AND?: ReferralCodeScalarWhereWithAggregatesInput | ReferralCodeScalarWhereWithAggregatesInput[]
    OR?: ReferralCodeScalarWhereWithAggregatesInput[]
    NOT?: ReferralCodeScalarWhereWithAggregatesInput | ReferralCodeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ReferralCode"> | string
    code?: StringWithAggregatesFilter<"ReferralCode"> | string
    marketerName?: StringWithAggregatesFilter<"ReferralCode"> | string
    discountPct?: FloatWithAggregatesFilter<"ReferralCode"> | number
    maxDiscountAmount?: FloatWithAggregatesFilter<"ReferralCode"> | number
    feePercentage?: FloatWithAggregatesFilter<"ReferralCode"> | number
    bankName?: StringNullableWithAggregatesFilter<"ReferralCode"> | string | null
    bankAccount?: StringNullableWithAggregatesFilter<"ReferralCode"> | string | null
    expiryDate?: DateTimeNullableWithAggregatesFilter<"ReferralCode"> | Date | string | null
    usageLimit?: IntNullableWithAggregatesFilter<"ReferralCode"> | number | null
    usageCount?: IntWithAggregatesFilter<"ReferralCode"> | number
    isActive?: BoolWithAggregatesFilter<"ReferralCode"> | boolean
    ownerId?: StringNullableWithAggregatesFilter<"ReferralCode"> | string | null
    targetProductId?: StringNullableWithAggregatesFilter<"ReferralCode"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ReferralCode"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ReferralCode"> | Date | string
  }

  export type BookingWhereInput = {
    AND?: BookingWhereInput | BookingWhereInput[]
    OR?: BookingWhereInput[]
    NOT?: BookingWhereInput | BookingWhereInput[]
    id?: StringFilter<"Booking"> | string
    invoiceNo?: StringFilter<"Booking"> | string
    packageId?: StringFilter<"Booking"> | string
    packageName?: StringFilter<"Booking"> | string
    customerName?: StringFilter<"Booking"> | string
    customerPhone?: StringFilter<"Booking"> | string
    sessionDate?: StringFilter<"Booking"> | string
    sessionTime?: StringFilter<"Booking"> | string
    notes?: StringNullableFilter<"Booking"> | string | null
    referralCode?: StringNullableFilter<"Booking"> | string | null
    discountPct?: FloatFilter<"Booking"> | number
    originalPrice?: FloatFilter<"Booking"> | number
    finalPrice?: FloatFilter<"Booking"> | number
    paymentMethod?: StringFilter<"Booking"> | string
    status?: StringFilter<"Booking"> | string
    createdAt?: DateTimeFilter<"Booking"> | Date | string
    updatedAt?: DateTimeFilter<"Booking"> | Date | string
    commissions?: AffiliateCommissionListRelationFilter
  }

  export type BookingOrderByWithRelationInput = {
    id?: SortOrder
    invoiceNo?: SortOrder
    packageId?: SortOrder
    packageName?: SortOrder
    customerName?: SortOrder
    customerPhone?: SortOrder
    sessionDate?: SortOrder
    sessionTime?: SortOrder
    notes?: SortOrderInput | SortOrder
    referralCode?: SortOrderInput | SortOrder
    discountPct?: SortOrder
    originalPrice?: SortOrder
    finalPrice?: SortOrder
    paymentMethod?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    commissions?: AffiliateCommissionOrderByRelationAggregateInput
  }

  export type BookingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    invoiceNo?: string
    AND?: BookingWhereInput | BookingWhereInput[]
    OR?: BookingWhereInput[]
    NOT?: BookingWhereInput | BookingWhereInput[]
    packageId?: StringFilter<"Booking"> | string
    packageName?: StringFilter<"Booking"> | string
    customerName?: StringFilter<"Booking"> | string
    customerPhone?: StringFilter<"Booking"> | string
    sessionDate?: StringFilter<"Booking"> | string
    sessionTime?: StringFilter<"Booking"> | string
    notes?: StringNullableFilter<"Booking"> | string | null
    referralCode?: StringNullableFilter<"Booking"> | string | null
    discountPct?: FloatFilter<"Booking"> | number
    originalPrice?: FloatFilter<"Booking"> | number
    finalPrice?: FloatFilter<"Booking"> | number
    paymentMethod?: StringFilter<"Booking"> | string
    status?: StringFilter<"Booking"> | string
    createdAt?: DateTimeFilter<"Booking"> | Date | string
    updatedAt?: DateTimeFilter<"Booking"> | Date | string
    commissions?: AffiliateCommissionListRelationFilter
  }, "id" | "invoiceNo">

  export type BookingOrderByWithAggregationInput = {
    id?: SortOrder
    invoiceNo?: SortOrder
    packageId?: SortOrder
    packageName?: SortOrder
    customerName?: SortOrder
    customerPhone?: SortOrder
    sessionDate?: SortOrder
    sessionTime?: SortOrder
    notes?: SortOrderInput | SortOrder
    referralCode?: SortOrderInput | SortOrder
    discountPct?: SortOrder
    originalPrice?: SortOrder
    finalPrice?: SortOrder
    paymentMethod?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: BookingCountOrderByAggregateInput
    _avg?: BookingAvgOrderByAggregateInput
    _max?: BookingMaxOrderByAggregateInput
    _min?: BookingMinOrderByAggregateInput
    _sum?: BookingSumOrderByAggregateInput
  }

  export type BookingScalarWhereWithAggregatesInput = {
    AND?: BookingScalarWhereWithAggregatesInput | BookingScalarWhereWithAggregatesInput[]
    OR?: BookingScalarWhereWithAggregatesInput[]
    NOT?: BookingScalarWhereWithAggregatesInput | BookingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Booking"> | string
    invoiceNo?: StringWithAggregatesFilter<"Booking"> | string
    packageId?: StringWithAggregatesFilter<"Booking"> | string
    packageName?: StringWithAggregatesFilter<"Booking"> | string
    customerName?: StringWithAggregatesFilter<"Booking"> | string
    customerPhone?: StringWithAggregatesFilter<"Booking"> | string
    sessionDate?: StringWithAggregatesFilter<"Booking"> | string
    sessionTime?: StringWithAggregatesFilter<"Booking"> | string
    notes?: StringNullableWithAggregatesFilter<"Booking"> | string | null
    referralCode?: StringNullableWithAggregatesFilter<"Booking"> | string | null
    discountPct?: FloatWithAggregatesFilter<"Booking"> | number
    originalPrice?: FloatWithAggregatesFilter<"Booking"> | number
    finalPrice?: FloatWithAggregatesFilter<"Booking"> | number
    paymentMethod?: StringWithAggregatesFilter<"Booking"> | string
    status?: StringWithAggregatesFilter<"Booking"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Booking"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Booking"> | Date | string
  }

  export type CategoryWhereInput = {
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    id?: StringFilter<"Category"> | string
    name?: StringFilter<"Category"> | string
    slug?: StringFilter<"Category"> | string
    products?: ProductListRelationFilter
  }

  export type CategoryOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    products?: ProductOrderByRelationAggregateInput
  }

  export type CategoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    name?: StringFilter<"Category"> | string
    products?: ProductListRelationFilter
  }, "id" | "slug">

  export type CategoryOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    _count?: CategoryCountOrderByAggregateInput
    _max?: CategoryMaxOrderByAggregateInput
    _min?: CategoryMinOrderByAggregateInput
  }

  export type CategoryScalarWhereWithAggregatesInput = {
    AND?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    OR?: CategoryScalarWhereWithAggregatesInput[]
    NOT?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Category"> | string
    name?: StringWithAggregatesFilter<"Category"> | string
    slug?: StringWithAggregatesFilter<"Category"> | string
  }

  export type ProductWhereInput = {
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    id?: StringFilter<"Product"> | string
    name?: StringFilter<"Product"> | string
    sku?: StringFilter<"Product"> | string
    price?: FloatFilter<"Product"> | number
    stock?: IntFilter<"Product"> | number
    image?: StringNullableFilter<"Product"> | string | null
    duration?: StringNullableFilter<"Product"> | string | null
    photoCount?: StringNullableFilter<"Product"> | string | null
    features?: StringNullableListFilter<"Product">
    isPopular?: BoolFilter<"Product"> | boolean
    sortOrder?: IntFilter<"Product"> | number
    categoryId?: StringFilter<"Product"> | string
    isActive?: BoolFilter<"Product"> | boolean
    createdAt?: DateTimeFilter<"Product"> | Date | string
    updatedAt?: DateTimeFilter<"Product"> | Date | string
    category?: XOR<CategoryScalarRelationFilter, CategoryWhereInput>
    transaction_items?: TransactionItemListRelationFilter
  }

  export type ProductOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    sku?: SortOrder
    price?: SortOrder
    stock?: SortOrder
    image?: SortOrderInput | SortOrder
    duration?: SortOrderInput | SortOrder
    photoCount?: SortOrderInput | SortOrder
    features?: SortOrder
    isPopular?: SortOrder
    sortOrder?: SortOrder
    categoryId?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    category?: CategoryOrderByWithRelationInput
    transaction_items?: TransactionItemOrderByRelationAggregateInput
  }

  export type ProductWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    sku?: string
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    name?: StringFilter<"Product"> | string
    price?: FloatFilter<"Product"> | number
    stock?: IntFilter<"Product"> | number
    image?: StringNullableFilter<"Product"> | string | null
    duration?: StringNullableFilter<"Product"> | string | null
    photoCount?: StringNullableFilter<"Product"> | string | null
    features?: StringNullableListFilter<"Product">
    isPopular?: BoolFilter<"Product"> | boolean
    sortOrder?: IntFilter<"Product"> | number
    categoryId?: StringFilter<"Product"> | string
    isActive?: BoolFilter<"Product"> | boolean
    createdAt?: DateTimeFilter<"Product"> | Date | string
    updatedAt?: DateTimeFilter<"Product"> | Date | string
    category?: XOR<CategoryScalarRelationFilter, CategoryWhereInput>
    transaction_items?: TransactionItemListRelationFilter
  }, "id" | "sku">

  export type ProductOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    sku?: SortOrder
    price?: SortOrder
    stock?: SortOrder
    image?: SortOrderInput | SortOrder
    duration?: SortOrderInput | SortOrder
    photoCount?: SortOrderInput | SortOrder
    features?: SortOrder
    isPopular?: SortOrder
    sortOrder?: SortOrder
    categoryId?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProductCountOrderByAggregateInput
    _avg?: ProductAvgOrderByAggregateInput
    _max?: ProductMaxOrderByAggregateInput
    _min?: ProductMinOrderByAggregateInput
    _sum?: ProductSumOrderByAggregateInput
  }

  export type ProductScalarWhereWithAggregatesInput = {
    AND?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    OR?: ProductScalarWhereWithAggregatesInput[]
    NOT?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Product"> | string
    name?: StringWithAggregatesFilter<"Product"> | string
    sku?: StringWithAggregatesFilter<"Product"> | string
    price?: FloatWithAggregatesFilter<"Product"> | number
    stock?: IntWithAggregatesFilter<"Product"> | number
    image?: StringNullableWithAggregatesFilter<"Product"> | string | null
    duration?: StringNullableWithAggregatesFilter<"Product"> | string | null
    photoCount?: StringNullableWithAggregatesFilter<"Product"> | string | null
    features?: StringNullableListFilter<"Product">
    isPopular?: BoolWithAggregatesFilter<"Product"> | boolean
    sortOrder?: IntWithAggregatesFilter<"Product"> | number
    categoryId?: StringWithAggregatesFilter<"Product"> | string
    isActive?: BoolWithAggregatesFilter<"Product"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Product"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Product"> | Date | string
  }

  export type ReferralUsageWhereInput = {
    AND?: ReferralUsageWhereInput | ReferralUsageWhereInput[]
    OR?: ReferralUsageWhereInput[]
    NOT?: ReferralUsageWhereInput | ReferralUsageWhereInput[]
    id?: StringFilter<"ReferralUsage"> | string
    referralCodeId?: StringFilter<"ReferralUsage"> | string
    transactionId?: StringFilter<"ReferralUsage"> | string
    userId?: StringFilter<"ReferralUsage"> | string
    usedAt?: DateTimeFilter<"ReferralUsage"> | Date | string
    referralCode?: XOR<ReferralCodeScalarRelationFilter, ReferralCodeWhereInput>
    transaction?: XOR<TransactionScalarRelationFilter, TransactionWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ReferralUsageOrderByWithRelationInput = {
    id?: SortOrder
    referralCodeId?: SortOrder
    transactionId?: SortOrder
    userId?: SortOrder
    usedAt?: SortOrder
    referralCode?: ReferralCodeOrderByWithRelationInput
    transaction?: TransactionOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type ReferralUsageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    transactionId?: string
    AND?: ReferralUsageWhereInput | ReferralUsageWhereInput[]
    OR?: ReferralUsageWhereInput[]
    NOT?: ReferralUsageWhereInput | ReferralUsageWhereInput[]
    referralCodeId?: StringFilter<"ReferralUsage"> | string
    userId?: StringFilter<"ReferralUsage"> | string
    usedAt?: DateTimeFilter<"ReferralUsage"> | Date | string
    referralCode?: XOR<ReferralCodeScalarRelationFilter, ReferralCodeWhereInput>
    transaction?: XOR<TransactionScalarRelationFilter, TransactionWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "transactionId">

  export type ReferralUsageOrderByWithAggregationInput = {
    id?: SortOrder
    referralCodeId?: SortOrder
    transactionId?: SortOrder
    userId?: SortOrder
    usedAt?: SortOrder
    _count?: ReferralUsageCountOrderByAggregateInput
    _max?: ReferralUsageMaxOrderByAggregateInput
    _min?: ReferralUsageMinOrderByAggregateInput
  }

  export type ReferralUsageScalarWhereWithAggregatesInput = {
    AND?: ReferralUsageScalarWhereWithAggregatesInput | ReferralUsageScalarWhereWithAggregatesInput[]
    OR?: ReferralUsageScalarWhereWithAggregatesInput[]
    NOT?: ReferralUsageScalarWhereWithAggregatesInput | ReferralUsageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ReferralUsage"> | string
    referralCodeId?: StringWithAggregatesFilter<"ReferralUsage"> | string
    transactionId?: StringWithAggregatesFilter<"ReferralUsage"> | string
    userId?: StringWithAggregatesFilter<"ReferralUsage"> | string
    usedAt?: DateTimeWithAggregatesFilter<"ReferralUsage"> | Date | string
  }

  export type TransactionItemWhereInput = {
    AND?: TransactionItemWhereInput | TransactionItemWhereInput[]
    OR?: TransactionItemWhereInput[]
    NOT?: TransactionItemWhereInput | TransactionItemWhereInput[]
    id?: StringFilter<"TransactionItem"> | string
    transactionId?: StringFilter<"TransactionItem"> | string
    productId?: StringFilter<"TransactionItem"> | string
    qty?: IntFilter<"TransactionItem"> | number
    price?: FloatFilter<"TransactionItem"> | number
    subtotal?: FloatFilter<"TransactionItem"> | number
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
    transaction?: XOR<TransactionScalarRelationFilter, TransactionWhereInput>
  }

  export type TransactionItemOrderByWithRelationInput = {
    id?: SortOrder
    transactionId?: SortOrder
    productId?: SortOrder
    qty?: SortOrder
    price?: SortOrder
    subtotal?: SortOrder
    product?: ProductOrderByWithRelationInput
    transaction?: TransactionOrderByWithRelationInput
  }

  export type TransactionItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TransactionItemWhereInput | TransactionItemWhereInput[]
    OR?: TransactionItemWhereInput[]
    NOT?: TransactionItemWhereInput | TransactionItemWhereInput[]
    transactionId?: StringFilter<"TransactionItem"> | string
    productId?: StringFilter<"TransactionItem"> | string
    qty?: IntFilter<"TransactionItem"> | number
    price?: FloatFilter<"TransactionItem"> | number
    subtotal?: FloatFilter<"TransactionItem"> | number
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
    transaction?: XOR<TransactionScalarRelationFilter, TransactionWhereInput>
  }, "id">

  export type TransactionItemOrderByWithAggregationInput = {
    id?: SortOrder
    transactionId?: SortOrder
    productId?: SortOrder
    qty?: SortOrder
    price?: SortOrder
    subtotal?: SortOrder
    _count?: TransactionItemCountOrderByAggregateInput
    _avg?: TransactionItemAvgOrderByAggregateInput
    _max?: TransactionItemMaxOrderByAggregateInput
    _min?: TransactionItemMinOrderByAggregateInput
    _sum?: TransactionItemSumOrderByAggregateInput
  }

  export type TransactionItemScalarWhereWithAggregatesInput = {
    AND?: TransactionItemScalarWhereWithAggregatesInput | TransactionItemScalarWhereWithAggregatesInput[]
    OR?: TransactionItemScalarWhereWithAggregatesInput[]
    NOT?: TransactionItemScalarWhereWithAggregatesInput | TransactionItemScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TransactionItem"> | string
    transactionId?: StringWithAggregatesFilter<"TransactionItem"> | string
    productId?: StringWithAggregatesFilter<"TransactionItem"> | string
    qty?: IntWithAggregatesFilter<"TransactionItem"> | number
    price?: FloatWithAggregatesFilter<"TransactionItem"> | number
    subtotal?: FloatWithAggregatesFilter<"TransactionItem"> | number
  }

  export type TransactionWhereInput = {
    AND?: TransactionWhereInput | TransactionWhereInput[]
    OR?: TransactionWhereInput[]
    NOT?: TransactionWhereInput | TransactionWhereInput[]
    id?: StringFilter<"Transaction"> | string
    invoiceNumber?: StringFilter<"Transaction"> | string
    cashierId?: StringFilter<"Transaction"> | string
    total?: FloatFilter<"Transaction"> | number
    tax?: FloatFilter<"Transaction"> | number
    discount?: FloatFilter<"Transaction"> | number
    paymentMethod?: EnumPaymentMethodFilter<"Transaction"> | $Enums.PaymentMethod
    referralCodeId?: StringNullableFilter<"Transaction"> | string | null
    status?: EnumTransactionStatusFilter<"Transaction"> | $Enums.TransactionStatus
    createdAt?: DateTimeFilter<"Transaction"> | Date | string
    updatedAt?: DateTimeFilter<"Transaction"> | Date | string
    referralUsage?: XOR<ReferralUsageNullableScalarRelationFilter, ReferralUsageWhereInput> | null
    items?: TransactionItemListRelationFilter
    cashier?: XOR<UserScalarRelationFilter, UserWhereInput>
    referralCode?: XOR<ReferralCodeNullableScalarRelationFilter, ReferralCodeWhereInput> | null
  }

  export type TransactionOrderByWithRelationInput = {
    id?: SortOrder
    invoiceNumber?: SortOrder
    cashierId?: SortOrder
    total?: SortOrder
    tax?: SortOrder
    discount?: SortOrder
    paymentMethod?: SortOrder
    referralCodeId?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    referralUsage?: ReferralUsageOrderByWithRelationInput
    items?: TransactionItemOrderByRelationAggregateInput
    cashier?: UserOrderByWithRelationInput
    referralCode?: ReferralCodeOrderByWithRelationInput
  }

  export type TransactionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    invoiceNumber?: string
    AND?: TransactionWhereInput | TransactionWhereInput[]
    OR?: TransactionWhereInput[]
    NOT?: TransactionWhereInput | TransactionWhereInput[]
    cashierId?: StringFilter<"Transaction"> | string
    total?: FloatFilter<"Transaction"> | number
    tax?: FloatFilter<"Transaction"> | number
    discount?: FloatFilter<"Transaction"> | number
    paymentMethod?: EnumPaymentMethodFilter<"Transaction"> | $Enums.PaymentMethod
    referralCodeId?: StringNullableFilter<"Transaction"> | string | null
    status?: EnumTransactionStatusFilter<"Transaction"> | $Enums.TransactionStatus
    createdAt?: DateTimeFilter<"Transaction"> | Date | string
    updatedAt?: DateTimeFilter<"Transaction"> | Date | string
    referralUsage?: XOR<ReferralUsageNullableScalarRelationFilter, ReferralUsageWhereInput> | null
    items?: TransactionItemListRelationFilter
    cashier?: XOR<UserScalarRelationFilter, UserWhereInput>
    referralCode?: XOR<ReferralCodeNullableScalarRelationFilter, ReferralCodeWhereInput> | null
  }, "id" | "invoiceNumber">

  export type TransactionOrderByWithAggregationInput = {
    id?: SortOrder
    invoiceNumber?: SortOrder
    cashierId?: SortOrder
    total?: SortOrder
    tax?: SortOrder
    discount?: SortOrder
    paymentMethod?: SortOrder
    referralCodeId?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TransactionCountOrderByAggregateInput
    _avg?: TransactionAvgOrderByAggregateInput
    _max?: TransactionMaxOrderByAggregateInput
    _min?: TransactionMinOrderByAggregateInput
    _sum?: TransactionSumOrderByAggregateInput
  }

  export type TransactionScalarWhereWithAggregatesInput = {
    AND?: TransactionScalarWhereWithAggregatesInput | TransactionScalarWhereWithAggregatesInput[]
    OR?: TransactionScalarWhereWithAggregatesInput[]
    NOT?: TransactionScalarWhereWithAggregatesInput | TransactionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Transaction"> | string
    invoiceNumber?: StringWithAggregatesFilter<"Transaction"> | string
    cashierId?: StringWithAggregatesFilter<"Transaction"> | string
    total?: FloatWithAggregatesFilter<"Transaction"> | number
    tax?: FloatWithAggregatesFilter<"Transaction"> | number
    discount?: FloatWithAggregatesFilter<"Transaction"> | number
    paymentMethod?: EnumPaymentMethodWithAggregatesFilter<"Transaction"> | $Enums.PaymentMethod
    referralCodeId?: StringNullableWithAggregatesFilter<"Transaction"> | string | null
    status?: EnumTransactionStatusWithAggregatesFilter<"Transaction"> | $Enums.TransactionStatus
    createdAt?: DateTimeWithAggregatesFilter<"Transaction"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Transaction"> | Date | string
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    phone?: StringNullableFilter<"User"> | string | null
    bankName?: StringNullableFilter<"User"> | string | null
    bankAccount?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    referral_usages?: ReferralUsageListRelationFilter
    transactions?: TransactionListRelationFilter
    referralCode?: XOR<ReferralCodeNullableScalarRelationFilter, ReferralCodeWhereInput> | null
    commissions?: AffiliateCommissionListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    phone?: SortOrderInput | SortOrder
    bankName?: SortOrderInput | SortOrder
    bankAccount?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    referral_usages?: ReferralUsageOrderByRelationAggregateInput
    transactions?: TransactionOrderByRelationAggregateInput
    referralCode?: ReferralCodeOrderByWithRelationInput
    commissions?: AffiliateCommissionOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    phone?: StringNullableFilter<"User"> | string | null
    bankName?: StringNullableFilter<"User"> | string | null
    bankAccount?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    referral_usages?: ReferralUsageListRelationFilter
    transactions?: TransactionListRelationFilter
    referralCode?: XOR<ReferralCodeNullableScalarRelationFilter, ReferralCodeWhereInput> | null
    commissions?: AffiliateCommissionListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    phone?: SortOrderInput | SortOrder
    bankName?: SortOrderInput | SortOrder
    bankAccount?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    phone?: StringNullableWithAggregatesFilter<"User"> | string | null
    bankName?: StringNullableWithAggregatesFilter<"User"> | string | null
    bankAccount?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type GalleryPhotoWhereInput = {
    AND?: GalleryPhotoWhereInput | GalleryPhotoWhereInput[]
    OR?: GalleryPhotoWhereInput[]
    NOT?: GalleryPhotoWhereInput | GalleryPhotoWhereInput[]
    id?: StringFilter<"GalleryPhoto"> | string
    src?: StringFilter<"GalleryPhoto"> | string
    alt?: StringFilter<"GalleryPhoto"> | string
    width?: IntFilter<"GalleryPhoto"> | number
    height?: IntFilter<"GalleryPhoto"> | number
    category?: StringFilter<"GalleryPhoto"> | string
    isFeatured?: BoolFilter<"GalleryPhoto"> | boolean
    isHero?: BoolFilter<"GalleryPhoto"> | boolean
    sortOrder?: IntFilter<"GalleryPhoto"> | number
    createdAt?: DateTimeFilter<"GalleryPhoto"> | Date | string
    updatedAt?: DateTimeFilter<"GalleryPhoto"> | Date | string
  }

  export type GalleryPhotoOrderByWithRelationInput = {
    id?: SortOrder
    src?: SortOrder
    alt?: SortOrder
    width?: SortOrder
    height?: SortOrder
    category?: SortOrder
    isFeatured?: SortOrder
    isHero?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GalleryPhotoWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: GalleryPhotoWhereInput | GalleryPhotoWhereInput[]
    OR?: GalleryPhotoWhereInput[]
    NOT?: GalleryPhotoWhereInput | GalleryPhotoWhereInput[]
    src?: StringFilter<"GalleryPhoto"> | string
    alt?: StringFilter<"GalleryPhoto"> | string
    width?: IntFilter<"GalleryPhoto"> | number
    height?: IntFilter<"GalleryPhoto"> | number
    category?: StringFilter<"GalleryPhoto"> | string
    isFeatured?: BoolFilter<"GalleryPhoto"> | boolean
    isHero?: BoolFilter<"GalleryPhoto"> | boolean
    sortOrder?: IntFilter<"GalleryPhoto"> | number
    createdAt?: DateTimeFilter<"GalleryPhoto"> | Date | string
    updatedAt?: DateTimeFilter<"GalleryPhoto"> | Date | string
  }, "id">

  export type GalleryPhotoOrderByWithAggregationInput = {
    id?: SortOrder
    src?: SortOrder
    alt?: SortOrder
    width?: SortOrder
    height?: SortOrder
    category?: SortOrder
    isFeatured?: SortOrder
    isHero?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: GalleryPhotoCountOrderByAggregateInput
    _avg?: GalleryPhotoAvgOrderByAggregateInput
    _max?: GalleryPhotoMaxOrderByAggregateInput
    _min?: GalleryPhotoMinOrderByAggregateInput
    _sum?: GalleryPhotoSumOrderByAggregateInput
  }

  export type GalleryPhotoScalarWhereWithAggregatesInput = {
    AND?: GalleryPhotoScalarWhereWithAggregatesInput | GalleryPhotoScalarWhereWithAggregatesInput[]
    OR?: GalleryPhotoScalarWhereWithAggregatesInput[]
    NOT?: GalleryPhotoScalarWhereWithAggregatesInput | GalleryPhotoScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"GalleryPhoto"> | string
    src?: StringWithAggregatesFilter<"GalleryPhoto"> | string
    alt?: StringWithAggregatesFilter<"GalleryPhoto"> | string
    width?: IntWithAggregatesFilter<"GalleryPhoto"> | number
    height?: IntWithAggregatesFilter<"GalleryPhoto"> | number
    category?: StringWithAggregatesFilter<"GalleryPhoto"> | string
    isFeatured?: BoolWithAggregatesFilter<"GalleryPhoto"> | boolean
    isHero?: BoolWithAggregatesFilter<"GalleryPhoto"> | boolean
    sortOrder?: IntWithAggregatesFilter<"GalleryPhoto"> | number
    createdAt?: DateTimeWithAggregatesFilter<"GalleryPhoto"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"GalleryPhoto"> | Date | string
  }

  export type SiteSettingWhereInput = {
    AND?: SiteSettingWhereInput | SiteSettingWhereInput[]
    OR?: SiteSettingWhereInput[]
    NOT?: SiteSettingWhereInput | SiteSettingWhereInput[]
    id?: StringFilter<"SiteSetting"> | string
    key?: StringFilter<"SiteSetting"> | string
    value?: StringFilter<"SiteSetting"> | string
    updatedAt?: DateTimeFilter<"SiteSetting"> | Date | string
  }

  export type SiteSettingOrderByWithRelationInput = {
    id?: SortOrder
    key?: SortOrder
    value?: SortOrder
    updatedAt?: SortOrder
  }

  export type SiteSettingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    key?: string
    AND?: SiteSettingWhereInput | SiteSettingWhereInput[]
    OR?: SiteSettingWhereInput[]
    NOT?: SiteSettingWhereInput | SiteSettingWhereInput[]
    value?: StringFilter<"SiteSetting"> | string
    updatedAt?: DateTimeFilter<"SiteSetting"> | Date | string
  }, "id" | "key">

  export type SiteSettingOrderByWithAggregationInput = {
    id?: SortOrder
    key?: SortOrder
    value?: SortOrder
    updatedAt?: SortOrder
    _count?: SiteSettingCountOrderByAggregateInput
    _max?: SiteSettingMaxOrderByAggregateInput
    _min?: SiteSettingMinOrderByAggregateInput
  }

  export type SiteSettingScalarWhereWithAggregatesInput = {
    AND?: SiteSettingScalarWhereWithAggregatesInput | SiteSettingScalarWhereWithAggregatesInput[]
    OR?: SiteSettingScalarWhereWithAggregatesInput[]
    NOT?: SiteSettingScalarWhereWithAggregatesInput | SiteSettingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SiteSetting"> | string
    key?: StringWithAggregatesFilter<"SiteSetting"> | string
    value?: StringWithAggregatesFilter<"SiteSetting"> | string
    updatedAt?: DateTimeWithAggregatesFilter<"SiteSetting"> | Date | string
  }

  export type AffiliatePostWhereInput = {
    AND?: AffiliatePostWhereInput | AffiliatePostWhereInput[]
    OR?: AffiliatePostWhereInput[]
    NOT?: AffiliatePostWhereInput | AffiliatePostWhereInput[]
    id?: StringFilter<"AffiliatePost"> | string
    imageUrl?: StringFilter<"AffiliatePost"> | string
    caption?: StringFilter<"AffiliatePost"> | string
    hashtags?: StringNullableListFilter<"AffiliatePost">
    likeCount?: IntFilter<"AffiliatePost"> | number
    isPublished?: BoolFilter<"AffiliatePost"> | boolean
    postedBy?: StringFilter<"AffiliatePost"> | string
    createdAt?: DateTimeFilter<"AffiliatePost"> | Date | string
    updatedAt?: DateTimeFilter<"AffiliatePost"> | Date | string
  }

  export type AffiliatePostOrderByWithRelationInput = {
    id?: SortOrder
    imageUrl?: SortOrder
    caption?: SortOrder
    hashtags?: SortOrder
    likeCount?: SortOrder
    isPublished?: SortOrder
    postedBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AffiliatePostWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AffiliatePostWhereInput | AffiliatePostWhereInput[]
    OR?: AffiliatePostWhereInput[]
    NOT?: AffiliatePostWhereInput | AffiliatePostWhereInput[]
    imageUrl?: StringFilter<"AffiliatePost"> | string
    caption?: StringFilter<"AffiliatePost"> | string
    hashtags?: StringNullableListFilter<"AffiliatePost">
    likeCount?: IntFilter<"AffiliatePost"> | number
    isPublished?: BoolFilter<"AffiliatePost"> | boolean
    postedBy?: StringFilter<"AffiliatePost"> | string
    createdAt?: DateTimeFilter<"AffiliatePost"> | Date | string
    updatedAt?: DateTimeFilter<"AffiliatePost"> | Date | string
  }, "id">

  export type AffiliatePostOrderByWithAggregationInput = {
    id?: SortOrder
    imageUrl?: SortOrder
    caption?: SortOrder
    hashtags?: SortOrder
    likeCount?: SortOrder
    isPublished?: SortOrder
    postedBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AffiliatePostCountOrderByAggregateInput
    _avg?: AffiliatePostAvgOrderByAggregateInput
    _max?: AffiliatePostMaxOrderByAggregateInput
    _min?: AffiliatePostMinOrderByAggregateInput
    _sum?: AffiliatePostSumOrderByAggregateInput
  }

  export type AffiliatePostScalarWhereWithAggregatesInput = {
    AND?: AffiliatePostScalarWhereWithAggregatesInput | AffiliatePostScalarWhereWithAggregatesInput[]
    OR?: AffiliatePostScalarWhereWithAggregatesInput[]
    NOT?: AffiliatePostScalarWhereWithAggregatesInput | AffiliatePostScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AffiliatePost"> | string
    imageUrl?: StringWithAggregatesFilter<"AffiliatePost"> | string
    caption?: StringWithAggregatesFilter<"AffiliatePost"> | string
    hashtags?: StringNullableListFilter<"AffiliatePost">
    likeCount?: IntWithAggregatesFilter<"AffiliatePost"> | number
    isPublished?: BoolWithAggregatesFilter<"AffiliatePost"> | boolean
    postedBy?: StringWithAggregatesFilter<"AffiliatePost"> | string
    createdAt?: DateTimeWithAggregatesFilter<"AffiliatePost"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AffiliatePost"> | Date | string
  }

  export type AffiliateCommissionWhereInput = {
    AND?: AffiliateCommissionWhereInput | AffiliateCommissionWhereInput[]
    OR?: AffiliateCommissionWhereInput[]
    NOT?: AffiliateCommissionWhereInput | AffiliateCommissionWhereInput[]
    id?: StringFilter<"AffiliateCommission"> | string
    snapperId?: StringFilter<"AffiliateCommission"> | string
    bookingId?: StringFilter<"AffiliateCommission"> | string
    amount?: FloatFilter<"AffiliateCommission"> | number
    status?: StringFilter<"AffiliateCommission"> | string
    createdAt?: DateTimeFilter<"AffiliateCommission"> | Date | string
    updatedAt?: DateTimeFilter<"AffiliateCommission"> | Date | string
    snapper?: XOR<UserScalarRelationFilter, UserWhereInput>
    booking?: XOR<BookingScalarRelationFilter, BookingWhereInput>
  }

  export type AffiliateCommissionOrderByWithRelationInput = {
    id?: SortOrder
    snapperId?: SortOrder
    bookingId?: SortOrder
    amount?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    snapper?: UserOrderByWithRelationInput
    booking?: BookingOrderByWithRelationInput
  }

  export type AffiliateCommissionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AffiliateCommissionWhereInput | AffiliateCommissionWhereInput[]
    OR?: AffiliateCommissionWhereInput[]
    NOT?: AffiliateCommissionWhereInput | AffiliateCommissionWhereInput[]
    snapperId?: StringFilter<"AffiliateCommission"> | string
    bookingId?: StringFilter<"AffiliateCommission"> | string
    amount?: FloatFilter<"AffiliateCommission"> | number
    status?: StringFilter<"AffiliateCommission"> | string
    createdAt?: DateTimeFilter<"AffiliateCommission"> | Date | string
    updatedAt?: DateTimeFilter<"AffiliateCommission"> | Date | string
    snapper?: XOR<UserScalarRelationFilter, UserWhereInput>
    booking?: XOR<BookingScalarRelationFilter, BookingWhereInput>
  }, "id">

  export type AffiliateCommissionOrderByWithAggregationInput = {
    id?: SortOrder
    snapperId?: SortOrder
    bookingId?: SortOrder
    amount?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AffiliateCommissionCountOrderByAggregateInput
    _avg?: AffiliateCommissionAvgOrderByAggregateInput
    _max?: AffiliateCommissionMaxOrderByAggregateInput
    _min?: AffiliateCommissionMinOrderByAggregateInput
    _sum?: AffiliateCommissionSumOrderByAggregateInput
  }

  export type AffiliateCommissionScalarWhereWithAggregatesInput = {
    AND?: AffiliateCommissionScalarWhereWithAggregatesInput | AffiliateCommissionScalarWhereWithAggregatesInput[]
    OR?: AffiliateCommissionScalarWhereWithAggregatesInput[]
    NOT?: AffiliateCommissionScalarWhereWithAggregatesInput | AffiliateCommissionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AffiliateCommission"> | string
    snapperId?: StringWithAggregatesFilter<"AffiliateCommission"> | string
    bookingId?: StringWithAggregatesFilter<"AffiliateCommission"> | string
    amount?: FloatWithAggregatesFilter<"AffiliateCommission"> | number
    status?: StringWithAggregatesFilter<"AffiliateCommission"> | string
    createdAt?: DateTimeWithAggregatesFilter<"AffiliateCommission"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AffiliateCommission"> | Date | string
  }

  export type AffiliateApplicationWhereInput = {
    AND?: AffiliateApplicationWhereInput | AffiliateApplicationWhereInput[]
    OR?: AffiliateApplicationWhereInput[]
    NOT?: AffiliateApplicationWhereInput | AffiliateApplicationWhereInput[]
    id?: StringFilter<"AffiliateApplication"> | string
    name?: StringFilter<"AffiliateApplication"> | string
    email?: StringFilter<"AffiliateApplication"> | string
    phone?: StringFilter<"AffiliateApplication"> | string
    password?: StringFilter<"AffiliateApplication"> | string
    instagram?: StringNullableFilter<"AffiliateApplication"> | string | null
    tiktok?: StringNullableFilter<"AffiliateApplication"> | string | null
    occupation?: StringNullableFilter<"AffiliateApplication"> | string | null
    city?: StringNullableFilter<"AffiliateApplication"> | string | null
    motivation?: StringNullableFilter<"AffiliateApplication"> | string | null
    experience?: StringNullableFilter<"AffiliateApplication"> | string | null
    status?: StringFilter<"AffiliateApplication"> | string
    notes?: StringNullableFilter<"AffiliateApplication"> | string | null
    createdAt?: DateTimeFilter<"AffiliateApplication"> | Date | string
    updatedAt?: DateTimeFilter<"AffiliateApplication"> | Date | string
  }

  export type AffiliateApplicationOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    password?: SortOrder
    instagram?: SortOrderInput | SortOrder
    tiktok?: SortOrderInput | SortOrder
    occupation?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    motivation?: SortOrderInput | SortOrder
    experience?: SortOrderInput | SortOrder
    status?: SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AffiliateApplicationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AffiliateApplicationWhereInput | AffiliateApplicationWhereInput[]
    OR?: AffiliateApplicationWhereInput[]
    NOT?: AffiliateApplicationWhereInput | AffiliateApplicationWhereInput[]
    name?: StringFilter<"AffiliateApplication"> | string
    email?: StringFilter<"AffiliateApplication"> | string
    phone?: StringFilter<"AffiliateApplication"> | string
    password?: StringFilter<"AffiliateApplication"> | string
    instagram?: StringNullableFilter<"AffiliateApplication"> | string | null
    tiktok?: StringNullableFilter<"AffiliateApplication"> | string | null
    occupation?: StringNullableFilter<"AffiliateApplication"> | string | null
    city?: StringNullableFilter<"AffiliateApplication"> | string | null
    motivation?: StringNullableFilter<"AffiliateApplication"> | string | null
    experience?: StringNullableFilter<"AffiliateApplication"> | string | null
    status?: StringFilter<"AffiliateApplication"> | string
    notes?: StringNullableFilter<"AffiliateApplication"> | string | null
    createdAt?: DateTimeFilter<"AffiliateApplication"> | Date | string
    updatedAt?: DateTimeFilter<"AffiliateApplication"> | Date | string
  }, "id">

  export type AffiliateApplicationOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    password?: SortOrder
    instagram?: SortOrderInput | SortOrder
    tiktok?: SortOrderInput | SortOrder
    occupation?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    motivation?: SortOrderInput | SortOrder
    experience?: SortOrderInput | SortOrder
    status?: SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AffiliateApplicationCountOrderByAggregateInput
    _max?: AffiliateApplicationMaxOrderByAggregateInput
    _min?: AffiliateApplicationMinOrderByAggregateInput
  }

  export type AffiliateApplicationScalarWhereWithAggregatesInput = {
    AND?: AffiliateApplicationScalarWhereWithAggregatesInput | AffiliateApplicationScalarWhereWithAggregatesInput[]
    OR?: AffiliateApplicationScalarWhereWithAggregatesInput[]
    NOT?: AffiliateApplicationScalarWhereWithAggregatesInput | AffiliateApplicationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AffiliateApplication"> | string
    name?: StringWithAggregatesFilter<"AffiliateApplication"> | string
    email?: StringWithAggregatesFilter<"AffiliateApplication"> | string
    phone?: StringWithAggregatesFilter<"AffiliateApplication"> | string
    password?: StringWithAggregatesFilter<"AffiliateApplication"> | string
    instagram?: StringNullableWithAggregatesFilter<"AffiliateApplication"> | string | null
    tiktok?: StringNullableWithAggregatesFilter<"AffiliateApplication"> | string | null
    occupation?: StringNullableWithAggregatesFilter<"AffiliateApplication"> | string | null
    city?: StringNullableWithAggregatesFilter<"AffiliateApplication"> | string | null
    motivation?: StringNullableWithAggregatesFilter<"AffiliateApplication"> | string | null
    experience?: StringNullableWithAggregatesFilter<"AffiliateApplication"> | string | null
    status?: StringWithAggregatesFilter<"AffiliateApplication"> | string
    notes?: StringNullableWithAggregatesFilter<"AffiliateApplication"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"AffiliateApplication"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AffiliateApplication"> | Date | string
  }

  export type AffiliateLeadWhereInput = {
    AND?: AffiliateLeadWhereInput | AffiliateLeadWhereInput[]
    OR?: AffiliateLeadWhereInput[]
    NOT?: AffiliateLeadWhereInput | AffiliateLeadWhereInput[]
    id?: StringFilter<"AffiliateLead"> | string
    name?: StringFilter<"AffiliateLead"> | string
    phone?: StringFilter<"AffiliateLead"> | string
    email?: StringNullableFilter<"AffiliateLead"> | string | null
    city?: StringNullableFilter<"AffiliateLead"> | string | null
    occupation?: StringNullableFilter<"AffiliateLead"> | string | null
    productSku?: StringNullableFilter<"AffiliateLead"> | string | null
    productName?: StringNullableFilter<"AffiliateLead"> | string | null
    referralCode?: StringNullableFilter<"AffiliateLead"> | string | null
    snapperId?: StringNullableFilter<"AffiliateLead"> | string | null
    notes?: StringNullableFilter<"AffiliateLead"> | string | null
    status?: StringFilter<"AffiliateLead"> | string
    createdAt?: DateTimeFilter<"AffiliateLead"> | Date | string
    updatedAt?: DateTimeFilter<"AffiliateLead"> | Date | string
  }

  export type AffiliateLeadOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    email?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    occupation?: SortOrderInput | SortOrder
    productSku?: SortOrderInput | SortOrder
    productName?: SortOrderInput | SortOrder
    referralCode?: SortOrderInput | SortOrder
    snapperId?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AffiliateLeadWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AffiliateLeadWhereInput | AffiliateLeadWhereInput[]
    OR?: AffiliateLeadWhereInput[]
    NOT?: AffiliateLeadWhereInput | AffiliateLeadWhereInput[]
    name?: StringFilter<"AffiliateLead"> | string
    phone?: StringFilter<"AffiliateLead"> | string
    email?: StringNullableFilter<"AffiliateLead"> | string | null
    city?: StringNullableFilter<"AffiliateLead"> | string | null
    occupation?: StringNullableFilter<"AffiliateLead"> | string | null
    productSku?: StringNullableFilter<"AffiliateLead"> | string | null
    productName?: StringNullableFilter<"AffiliateLead"> | string | null
    referralCode?: StringNullableFilter<"AffiliateLead"> | string | null
    snapperId?: StringNullableFilter<"AffiliateLead"> | string | null
    notes?: StringNullableFilter<"AffiliateLead"> | string | null
    status?: StringFilter<"AffiliateLead"> | string
    createdAt?: DateTimeFilter<"AffiliateLead"> | Date | string
    updatedAt?: DateTimeFilter<"AffiliateLead"> | Date | string
  }, "id">

  export type AffiliateLeadOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    email?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    occupation?: SortOrderInput | SortOrder
    productSku?: SortOrderInput | SortOrder
    productName?: SortOrderInput | SortOrder
    referralCode?: SortOrderInput | SortOrder
    snapperId?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AffiliateLeadCountOrderByAggregateInput
    _max?: AffiliateLeadMaxOrderByAggregateInput
    _min?: AffiliateLeadMinOrderByAggregateInput
  }

  export type AffiliateLeadScalarWhereWithAggregatesInput = {
    AND?: AffiliateLeadScalarWhereWithAggregatesInput | AffiliateLeadScalarWhereWithAggregatesInput[]
    OR?: AffiliateLeadScalarWhereWithAggregatesInput[]
    NOT?: AffiliateLeadScalarWhereWithAggregatesInput | AffiliateLeadScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AffiliateLead"> | string
    name?: StringWithAggregatesFilter<"AffiliateLead"> | string
    phone?: StringWithAggregatesFilter<"AffiliateLead"> | string
    email?: StringNullableWithAggregatesFilter<"AffiliateLead"> | string | null
    city?: StringNullableWithAggregatesFilter<"AffiliateLead"> | string | null
    occupation?: StringNullableWithAggregatesFilter<"AffiliateLead"> | string | null
    productSku?: StringNullableWithAggregatesFilter<"AffiliateLead"> | string | null
    productName?: StringNullableWithAggregatesFilter<"AffiliateLead"> | string | null
    referralCode?: StringNullableWithAggregatesFilter<"AffiliateLead"> | string | null
    snapperId?: StringNullableWithAggregatesFilter<"AffiliateLead"> | string | null
    notes?: StringNullableWithAggregatesFilter<"AffiliateLead"> | string | null
    status?: StringWithAggregatesFilter<"AffiliateLead"> | string
    createdAt?: DateTimeWithAggregatesFilter<"AffiliateLead"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AffiliateLead"> | Date | string
  }

  export type ReferralCodeCreateInput = {
    id?: string
    code: string
    marketerName?: string
    discountPct: number
    maxDiscountAmount?: number
    feePercentage?: number
    bankName?: string | null
    bankAccount?: string | null
    expiryDate?: Date | string | null
    usageLimit?: number | null
    usageCount?: number
    isActive?: boolean
    targetProductId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    owner?: UserCreateNestedOneWithoutReferralCodeInput
    referral_usages?: ReferralUsageCreateNestedManyWithoutReferralCodeInput
    transactions?: TransactionCreateNestedManyWithoutReferralCodeInput
  }

  export type ReferralCodeUncheckedCreateInput = {
    id?: string
    code: string
    marketerName?: string
    discountPct: number
    maxDiscountAmount?: number
    feePercentage?: number
    bankName?: string | null
    bankAccount?: string | null
    expiryDate?: Date | string | null
    usageLimit?: number | null
    usageCount?: number
    isActive?: boolean
    ownerId?: string | null
    targetProductId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    referral_usages?: ReferralUsageUncheckedCreateNestedManyWithoutReferralCodeInput
    transactions?: TransactionUncheckedCreateNestedManyWithoutReferralCodeInput
  }

  export type ReferralCodeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    marketerName?: StringFieldUpdateOperationsInput | string
    discountPct?: FloatFieldUpdateOperationsInput | number
    maxDiscountAmount?: FloatFieldUpdateOperationsInput | number
    feePercentage?: FloatFieldUpdateOperationsInput | number
    bankName?: NullableStringFieldUpdateOperationsInput | string | null
    bankAccount?: NullableStringFieldUpdateOperationsInput | string | null
    expiryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    usageLimit?: NullableIntFieldUpdateOperationsInput | number | null
    usageCount?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    targetProductId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: UserUpdateOneWithoutReferralCodeNestedInput
    referral_usages?: ReferralUsageUpdateManyWithoutReferralCodeNestedInput
    transactions?: TransactionUpdateManyWithoutReferralCodeNestedInput
  }

  export type ReferralCodeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    marketerName?: StringFieldUpdateOperationsInput | string
    discountPct?: FloatFieldUpdateOperationsInput | number
    maxDiscountAmount?: FloatFieldUpdateOperationsInput | number
    feePercentage?: FloatFieldUpdateOperationsInput | number
    bankName?: NullableStringFieldUpdateOperationsInput | string | null
    bankAccount?: NullableStringFieldUpdateOperationsInput | string | null
    expiryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    usageLimit?: NullableIntFieldUpdateOperationsInput | number | null
    usageCount?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    ownerId?: NullableStringFieldUpdateOperationsInput | string | null
    targetProductId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    referral_usages?: ReferralUsageUncheckedUpdateManyWithoutReferralCodeNestedInput
    transactions?: TransactionUncheckedUpdateManyWithoutReferralCodeNestedInput
  }

  export type ReferralCodeCreateManyInput = {
    id?: string
    code: string
    marketerName?: string
    discountPct: number
    maxDiscountAmount?: number
    feePercentage?: number
    bankName?: string | null
    bankAccount?: string | null
    expiryDate?: Date | string | null
    usageLimit?: number | null
    usageCount?: number
    isActive?: boolean
    ownerId?: string | null
    targetProductId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReferralCodeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    marketerName?: StringFieldUpdateOperationsInput | string
    discountPct?: FloatFieldUpdateOperationsInput | number
    maxDiscountAmount?: FloatFieldUpdateOperationsInput | number
    feePercentage?: FloatFieldUpdateOperationsInput | number
    bankName?: NullableStringFieldUpdateOperationsInput | string | null
    bankAccount?: NullableStringFieldUpdateOperationsInput | string | null
    expiryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    usageLimit?: NullableIntFieldUpdateOperationsInput | number | null
    usageCount?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    targetProductId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReferralCodeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    marketerName?: StringFieldUpdateOperationsInput | string
    discountPct?: FloatFieldUpdateOperationsInput | number
    maxDiscountAmount?: FloatFieldUpdateOperationsInput | number
    feePercentage?: FloatFieldUpdateOperationsInput | number
    bankName?: NullableStringFieldUpdateOperationsInput | string | null
    bankAccount?: NullableStringFieldUpdateOperationsInput | string | null
    expiryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    usageLimit?: NullableIntFieldUpdateOperationsInput | number | null
    usageCount?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    ownerId?: NullableStringFieldUpdateOperationsInput | string | null
    targetProductId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingCreateInput = {
    id?: string
    invoiceNo: string
    packageId: string
    packageName: string
    customerName: string
    customerPhone: string
    sessionDate: string
    sessionTime: string
    notes?: string | null
    referralCode?: string | null
    discountPct?: number
    originalPrice: number
    finalPrice: number
    paymentMethod: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    commissions?: AffiliateCommissionCreateNestedManyWithoutBookingInput
  }

  export type BookingUncheckedCreateInput = {
    id?: string
    invoiceNo: string
    packageId: string
    packageName: string
    customerName: string
    customerPhone: string
    sessionDate: string
    sessionTime: string
    notes?: string | null
    referralCode?: string | null
    discountPct?: number
    originalPrice: number
    finalPrice: number
    paymentMethod: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    commissions?: AffiliateCommissionUncheckedCreateNestedManyWithoutBookingInput
  }

  export type BookingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoiceNo?: StringFieldUpdateOperationsInput | string
    packageId?: StringFieldUpdateOperationsInput | string
    packageName?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerPhone?: StringFieldUpdateOperationsInput | string
    sessionDate?: StringFieldUpdateOperationsInput | string
    sessionTime?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    referralCode?: NullableStringFieldUpdateOperationsInput | string | null
    discountPct?: FloatFieldUpdateOperationsInput | number
    originalPrice?: FloatFieldUpdateOperationsInput | number
    finalPrice?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    commissions?: AffiliateCommissionUpdateManyWithoutBookingNestedInput
  }

  export type BookingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoiceNo?: StringFieldUpdateOperationsInput | string
    packageId?: StringFieldUpdateOperationsInput | string
    packageName?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerPhone?: StringFieldUpdateOperationsInput | string
    sessionDate?: StringFieldUpdateOperationsInput | string
    sessionTime?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    referralCode?: NullableStringFieldUpdateOperationsInput | string | null
    discountPct?: FloatFieldUpdateOperationsInput | number
    originalPrice?: FloatFieldUpdateOperationsInput | number
    finalPrice?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    commissions?: AffiliateCommissionUncheckedUpdateManyWithoutBookingNestedInput
  }

  export type BookingCreateManyInput = {
    id?: string
    invoiceNo: string
    packageId: string
    packageName: string
    customerName: string
    customerPhone: string
    sessionDate: string
    sessionTime: string
    notes?: string | null
    referralCode?: string | null
    discountPct?: number
    originalPrice: number
    finalPrice: number
    paymentMethod: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BookingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoiceNo?: StringFieldUpdateOperationsInput | string
    packageId?: StringFieldUpdateOperationsInput | string
    packageName?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerPhone?: StringFieldUpdateOperationsInput | string
    sessionDate?: StringFieldUpdateOperationsInput | string
    sessionTime?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    referralCode?: NullableStringFieldUpdateOperationsInput | string | null
    discountPct?: FloatFieldUpdateOperationsInput | number
    originalPrice?: FloatFieldUpdateOperationsInput | number
    finalPrice?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoiceNo?: StringFieldUpdateOperationsInput | string
    packageId?: StringFieldUpdateOperationsInput | string
    packageName?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerPhone?: StringFieldUpdateOperationsInput | string
    sessionDate?: StringFieldUpdateOperationsInput | string
    sessionTime?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    referralCode?: NullableStringFieldUpdateOperationsInput | string | null
    discountPct?: FloatFieldUpdateOperationsInput | number
    originalPrice?: FloatFieldUpdateOperationsInput | number
    finalPrice?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryCreateInput = {
    id?: string
    name: string
    slug: string
    products?: ProductCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateInput = {
    id?: string
    name: string
    slug: string
    products?: ProductUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    products?: ProductUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    products?: ProductUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryCreateManyInput = {
    id?: string
    name: string
    slug: string
  }

  export type CategoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
  }

  export type CategoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
  }

  export type ProductCreateInput = {
    id?: string
    name: string
    sku: string
    price: number
    stock: number
    image?: string | null
    duration?: string | null
    photoCount?: string | null
    features?: ProductCreatefeaturesInput | string[]
    isPopular?: boolean
    sortOrder?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    category: CategoryCreateNestedOneWithoutProductsInput
    transaction_items?: TransactionItemCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateInput = {
    id?: string
    name: string
    sku: string
    price: number
    stock: number
    image?: string | null
    duration?: string | null
    photoCount?: string | null
    features?: ProductCreatefeaturesInput | string[]
    isPopular?: boolean
    sortOrder?: number
    categoryId: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    transaction_items?: TransactionItemUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    stock?: IntFieldUpdateOperationsInput | number
    image?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    photoCount?: NullableStringFieldUpdateOperationsInput | string | null
    features?: ProductUpdatefeaturesInput | string[]
    isPopular?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: CategoryUpdateOneRequiredWithoutProductsNestedInput
    transaction_items?: TransactionItemUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    stock?: IntFieldUpdateOperationsInput | number
    image?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    photoCount?: NullableStringFieldUpdateOperationsInput | string | null
    features?: ProductUpdatefeaturesInput | string[]
    isPopular?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    categoryId?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transaction_items?: TransactionItemUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductCreateManyInput = {
    id?: string
    name: string
    sku: string
    price: number
    stock: number
    image?: string | null
    duration?: string | null
    photoCount?: string | null
    features?: ProductCreatefeaturesInput | string[]
    isPopular?: boolean
    sortOrder?: number
    categoryId: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    stock?: IntFieldUpdateOperationsInput | number
    image?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    photoCount?: NullableStringFieldUpdateOperationsInput | string | null
    features?: ProductUpdatefeaturesInput | string[]
    isPopular?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    stock?: IntFieldUpdateOperationsInput | number
    image?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    photoCount?: NullableStringFieldUpdateOperationsInput | string | null
    features?: ProductUpdatefeaturesInput | string[]
    isPopular?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    categoryId?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReferralUsageCreateInput = {
    id?: string
    usedAt?: Date | string
    referralCode: ReferralCodeCreateNestedOneWithoutReferral_usagesInput
    transaction: TransactionCreateNestedOneWithoutReferralUsageInput
    user: UserCreateNestedOneWithoutReferral_usagesInput
  }

  export type ReferralUsageUncheckedCreateInput = {
    id?: string
    referralCodeId: string
    transactionId: string
    userId: string
    usedAt?: Date | string
  }

  export type ReferralUsageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    usedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    referralCode?: ReferralCodeUpdateOneRequiredWithoutReferral_usagesNestedInput
    transaction?: TransactionUpdateOneRequiredWithoutReferralUsageNestedInput
    user?: UserUpdateOneRequiredWithoutReferral_usagesNestedInput
  }

  export type ReferralUsageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    referralCodeId?: StringFieldUpdateOperationsInput | string
    transactionId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    usedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReferralUsageCreateManyInput = {
    id?: string
    referralCodeId: string
    transactionId: string
    userId: string
    usedAt?: Date | string
  }

  export type ReferralUsageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    usedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReferralUsageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    referralCodeId?: StringFieldUpdateOperationsInput | string
    transactionId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    usedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionItemCreateInput = {
    id?: string
    qty: number
    price: number
    subtotal: number
    product: ProductCreateNestedOneWithoutTransaction_itemsInput
    transaction: TransactionCreateNestedOneWithoutItemsInput
  }

  export type TransactionItemUncheckedCreateInput = {
    id?: string
    transactionId: string
    productId: string
    qty: number
    price: number
    subtotal: number
  }

  export type TransactionItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    qty?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    subtotal?: FloatFieldUpdateOperationsInput | number
    product?: ProductUpdateOneRequiredWithoutTransaction_itemsNestedInput
    transaction?: TransactionUpdateOneRequiredWithoutItemsNestedInput
  }

  export type TransactionItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    transactionId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    qty?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    subtotal?: FloatFieldUpdateOperationsInput | number
  }

  export type TransactionItemCreateManyInput = {
    id?: string
    transactionId: string
    productId: string
    qty: number
    price: number
    subtotal: number
  }

  export type TransactionItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    qty?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    subtotal?: FloatFieldUpdateOperationsInput | number
  }

  export type TransactionItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    transactionId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    qty?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    subtotal?: FloatFieldUpdateOperationsInput | number
  }

  export type TransactionCreateInput = {
    id?: string
    invoiceNumber: string
    total: number
    tax: number
    discount?: number
    paymentMethod: $Enums.PaymentMethod
    status?: $Enums.TransactionStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    referralUsage?: ReferralUsageCreateNestedOneWithoutTransactionInput
    items?: TransactionItemCreateNestedManyWithoutTransactionInput
    cashier: UserCreateNestedOneWithoutTransactionsInput
    referralCode?: ReferralCodeCreateNestedOneWithoutTransactionsInput
  }

  export type TransactionUncheckedCreateInput = {
    id?: string
    invoiceNumber: string
    cashierId: string
    total: number
    tax: number
    discount?: number
    paymentMethod: $Enums.PaymentMethod
    referralCodeId?: string | null
    status?: $Enums.TransactionStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    referralUsage?: ReferralUsageUncheckedCreateNestedOneWithoutTransactionInput
    items?: TransactionItemUncheckedCreateNestedManyWithoutTransactionInput
  }

  export type TransactionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoiceNumber?: StringFieldUpdateOperationsInput | string
    total?: FloatFieldUpdateOperationsInput | number
    tax?: FloatFieldUpdateOperationsInput | number
    discount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    status?: EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    referralUsage?: ReferralUsageUpdateOneWithoutTransactionNestedInput
    items?: TransactionItemUpdateManyWithoutTransactionNestedInput
    cashier?: UserUpdateOneRequiredWithoutTransactionsNestedInput
    referralCode?: ReferralCodeUpdateOneWithoutTransactionsNestedInput
  }

  export type TransactionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoiceNumber?: StringFieldUpdateOperationsInput | string
    cashierId?: StringFieldUpdateOperationsInput | string
    total?: FloatFieldUpdateOperationsInput | number
    tax?: FloatFieldUpdateOperationsInput | number
    discount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    referralCodeId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    referralUsage?: ReferralUsageUncheckedUpdateOneWithoutTransactionNestedInput
    items?: TransactionItemUncheckedUpdateManyWithoutTransactionNestedInput
  }

  export type TransactionCreateManyInput = {
    id?: string
    invoiceNumber: string
    cashierId: string
    total: number
    tax: number
    discount?: number
    paymentMethod: $Enums.PaymentMethod
    referralCodeId?: string | null
    status?: $Enums.TransactionStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TransactionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoiceNumber?: StringFieldUpdateOperationsInput | string
    total?: FloatFieldUpdateOperationsInput | number
    tax?: FloatFieldUpdateOperationsInput | number
    discount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    status?: EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoiceNumber?: StringFieldUpdateOperationsInput | string
    cashierId?: StringFieldUpdateOperationsInput | string
    total?: FloatFieldUpdateOperationsInput | number
    tax?: FloatFieldUpdateOperationsInput | number
    discount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    referralCodeId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateInput = {
    id?: string
    name: string
    email: string
    password: string
    role?: $Enums.Role
    phone?: string | null
    bankName?: string | null
    bankAccount?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    referral_usages?: ReferralUsageCreateNestedManyWithoutUserInput
    transactions?: TransactionCreateNestedManyWithoutCashierInput
    referralCode?: ReferralCodeCreateNestedOneWithoutOwnerInput
    commissions?: AffiliateCommissionCreateNestedManyWithoutSnapperInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    name: string
    email: string
    password: string
    role?: $Enums.Role
    phone?: string | null
    bankName?: string | null
    bankAccount?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    referral_usages?: ReferralUsageUncheckedCreateNestedManyWithoutUserInput
    transactions?: TransactionUncheckedCreateNestedManyWithoutCashierInput
    referralCode?: ReferralCodeUncheckedCreateNestedOneWithoutOwnerInput
    commissions?: AffiliateCommissionUncheckedCreateNestedManyWithoutSnapperInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    bankName?: NullableStringFieldUpdateOperationsInput | string | null
    bankAccount?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    referral_usages?: ReferralUsageUpdateManyWithoutUserNestedInput
    transactions?: TransactionUpdateManyWithoutCashierNestedInput
    referralCode?: ReferralCodeUpdateOneWithoutOwnerNestedInput
    commissions?: AffiliateCommissionUpdateManyWithoutSnapperNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    bankName?: NullableStringFieldUpdateOperationsInput | string | null
    bankAccount?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    referral_usages?: ReferralUsageUncheckedUpdateManyWithoutUserNestedInput
    transactions?: TransactionUncheckedUpdateManyWithoutCashierNestedInput
    referralCode?: ReferralCodeUncheckedUpdateOneWithoutOwnerNestedInput
    commissions?: AffiliateCommissionUncheckedUpdateManyWithoutSnapperNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    name: string
    email: string
    password: string
    role?: $Enums.Role
    phone?: string | null
    bankName?: string | null
    bankAccount?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    bankName?: NullableStringFieldUpdateOperationsInput | string | null
    bankAccount?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    bankName?: NullableStringFieldUpdateOperationsInput | string | null
    bankAccount?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GalleryPhotoCreateInput = {
    id?: string
    src: string
    alt: string
    width: number
    height: number
    category: string
    isFeatured?: boolean
    isHero?: boolean
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GalleryPhotoUncheckedCreateInput = {
    id?: string
    src: string
    alt: string
    width: number
    height: number
    category: string
    isFeatured?: boolean
    isHero?: boolean
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GalleryPhotoUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    src?: StringFieldUpdateOperationsInput | string
    alt?: StringFieldUpdateOperationsInput | string
    width?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    category?: StringFieldUpdateOperationsInput | string
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    isHero?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GalleryPhotoUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    src?: StringFieldUpdateOperationsInput | string
    alt?: StringFieldUpdateOperationsInput | string
    width?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    category?: StringFieldUpdateOperationsInput | string
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    isHero?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GalleryPhotoCreateManyInput = {
    id?: string
    src: string
    alt: string
    width: number
    height: number
    category: string
    isFeatured?: boolean
    isHero?: boolean
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GalleryPhotoUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    src?: StringFieldUpdateOperationsInput | string
    alt?: StringFieldUpdateOperationsInput | string
    width?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    category?: StringFieldUpdateOperationsInput | string
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    isHero?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GalleryPhotoUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    src?: StringFieldUpdateOperationsInput | string
    alt?: StringFieldUpdateOperationsInput | string
    width?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    category?: StringFieldUpdateOperationsInput | string
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    isHero?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SiteSettingCreateInput = {
    id?: string
    key: string
    value: string
    updatedAt?: Date | string
  }

  export type SiteSettingUncheckedCreateInput = {
    id?: string
    key: string
    value: string
    updatedAt?: Date | string
  }

  export type SiteSettingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SiteSettingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SiteSettingCreateManyInput = {
    id?: string
    key: string
    value: string
    updatedAt?: Date | string
  }

  export type SiteSettingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SiteSettingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AffiliatePostCreateInput = {
    id?: string
    imageUrl: string
    caption: string
    hashtags?: AffiliatePostCreatehashtagsInput | string[]
    likeCount?: number
    isPublished?: boolean
    postedBy: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AffiliatePostUncheckedCreateInput = {
    id?: string
    imageUrl: string
    caption: string
    hashtags?: AffiliatePostCreatehashtagsInput | string[]
    likeCount?: number
    isPublished?: boolean
    postedBy: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AffiliatePostUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    caption?: StringFieldUpdateOperationsInput | string
    hashtags?: AffiliatePostUpdatehashtagsInput | string[]
    likeCount?: IntFieldUpdateOperationsInput | number
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    postedBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AffiliatePostUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    caption?: StringFieldUpdateOperationsInput | string
    hashtags?: AffiliatePostUpdatehashtagsInput | string[]
    likeCount?: IntFieldUpdateOperationsInput | number
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    postedBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AffiliatePostCreateManyInput = {
    id?: string
    imageUrl: string
    caption: string
    hashtags?: AffiliatePostCreatehashtagsInput | string[]
    likeCount?: number
    isPublished?: boolean
    postedBy: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AffiliatePostUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    caption?: StringFieldUpdateOperationsInput | string
    hashtags?: AffiliatePostUpdatehashtagsInput | string[]
    likeCount?: IntFieldUpdateOperationsInput | number
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    postedBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AffiliatePostUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    caption?: StringFieldUpdateOperationsInput | string
    hashtags?: AffiliatePostUpdatehashtagsInput | string[]
    likeCount?: IntFieldUpdateOperationsInput | number
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    postedBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AffiliateCommissionCreateInput = {
    id?: string
    amount: number
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    snapper: UserCreateNestedOneWithoutCommissionsInput
    booking: BookingCreateNestedOneWithoutCommissionsInput
  }

  export type AffiliateCommissionUncheckedCreateInput = {
    id?: string
    snapperId: string
    bookingId: string
    amount: number
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AffiliateCommissionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    snapper?: UserUpdateOneRequiredWithoutCommissionsNestedInput
    booking?: BookingUpdateOneRequiredWithoutCommissionsNestedInput
  }

  export type AffiliateCommissionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    snapperId?: StringFieldUpdateOperationsInput | string
    bookingId?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AffiliateCommissionCreateManyInput = {
    id?: string
    snapperId: string
    bookingId: string
    amount: number
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AffiliateCommissionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AffiliateCommissionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    snapperId?: StringFieldUpdateOperationsInput | string
    bookingId?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AffiliateApplicationCreateInput = {
    id?: string
    name: string
    email: string
    phone: string
    password?: string
    instagram?: string | null
    tiktok?: string | null
    occupation?: string | null
    city?: string | null
    motivation?: string | null
    experience?: string | null
    status?: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AffiliateApplicationUncheckedCreateInput = {
    id?: string
    name: string
    email: string
    phone: string
    password?: string
    instagram?: string | null
    tiktok?: string | null
    occupation?: string | null
    city?: string | null
    motivation?: string | null
    experience?: string | null
    status?: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AffiliateApplicationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    instagram?: NullableStringFieldUpdateOperationsInput | string | null
    tiktok?: NullableStringFieldUpdateOperationsInput | string | null
    occupation?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    motivation?: NullableStringFieldUpdateOperationsInput | string | null
    experience?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AffiliateApplicationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    instagram?: NullableStringFieldUpdateOperationsInput | string | null
    tiktok?: NullableStringFieldUpdateOperationsInput | string | null
    occupation?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    motivation?: NullableStringFieldUpdateOperationsInput | string | null
    experience?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AffiliateApplicationCreateManyInput = {
    id?: string
    name: string
    email: string
    phone: string
    password?: string
    instagram?: string | null
    tiktok?: string | null
    occupation?: string | null
    city?: string | null
    motivation?: string | null
    experience?: string | null
    status?: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AffiliateApplicationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    instagram?: NullableStringFieldUpdateOperationsInput | string | null
    tiktok?: NullableStringFieldUpdateOperationsInput | string | null
    occupation?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    motivation?: NullableStringFieldUpdateOperationsInput | string | null
    experience?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AffiliateApplicationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    instagram?: NullableStringFieldUpdateOperationsInput | string | null
    tiktok?: NullableStringFieldUpdateOperationsInput | string | null
    occupation?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    motivation?: NullableStringFieldUpdateOperationsInput | string | null
    experience?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AffiliateLeadCreateInput = {
    id?: string
    name: string
    phone: string
    email?: string | null
    city?: string | null
    occupation?: string | null
    productSku?: string | null
    productName?: string | null
    referralCode?: string | null
    snapperId?: string | null
    notes?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AffiliateLeadUncheckedCreateInput = {
    id?: string
    name: string
    phone: string
    email?: string | null
    city?: string | null
    occupation?: string | null
    productSku?: string | null
    productName?: string | null
    referralCode?: string | null
    snapperId?: string | null
    notes?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AffiliateLeadUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    occupation?: NullableStringFieldUpdateOperationsInput | string | null
    productSku?: NullableStringFieldUpdateOperationsInput | string | null
    productName?: NullableStringFieldUpdateOperationsInput | string | null
    referralCode?: NullableStringFieldUpdateOperationsInput | string | null
    snapperId?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AffiliateLeadUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    occupation?: NullableStringFieldUpdateOperationsInput | string | null
    productSku?: NullableStringFieldUpdateOperationsInput | string | null
    productName?: NullableStringFieldUpdateOperationsInput | string | null
    referralCode?: NullableStringFieldUpdateOperationsInput | string | null
    snapperId?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AffiliateLeadCreateManyInput = {
    id?: string
    name: string
    phone: string
    email?: string | null
    city?: string | null
    occupation?: string | null
    productSku?: string | null
    productName?: string | null
    referralCode?: string | null
    snapperId?: string | null
    notes?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AffiliateLeadUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    occupation?: NullableStringFieldUpdateOperationsInput | string | null
    productSku?: NullableStringFieldUpdateOperationsInput | string | null
    productName?: NullableStringFieldUpdateOperationsInput | string | null
    referralCode?: NullableStringFieldUpdateOperationsInput | string | null
    snapperId?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AffiliateLeadUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    occupation?: NullableStringFieldUpdateOperationsInput | string | null
    productSku?: NullableStringFieldUpdateOperationsInput | string | null
    productName?: NullableStringFieldUpdateOperationsInput | string | null
    referralCode?: NullableStringFieldUpdateOperationsInput | string | null
    snapperId?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type ReferralUsageListRelationFilter = {
    every?: ReferralUsageWhereInput
    some?: ReferralUsageWhereInput
    none?: ReferralUsageWhereInput
  }

  export type TransactionListRelationFilter = {
    every?: TransactionWhereInput
    some?: TransactionWhereInput
    none?: TransactionWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ReferralUsageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TransactionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ReferralCodeCountOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    marketerName?: SortOrder
    discountPct?: SortOrder
    maxDiscountAmount?: SortOrder
    feePercentage?: SortOrder
    bankName?: SortOrder
    bankAccount?: SortOrder
    expiryDate?: SortOrder
    usageLimit?: SortOrder
    usageCount?: SortOrder
    isActive?: SortOrder
    ownerId?: SortOrder
    targetProductId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ReferralCodeAvgOrderByAggregateInput = {
    discountPct?: SortOrder
    maxDiscountAmount?: SortOrder
    feePercentage?: SortOrder
    usageLimit?: SortOrder
    usageCount?: SortOrder
  }

  export type ReferralCodeMaxOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    marketerName?: SortOrder
    discountPct?: SortOrder
    maxDiscountAmount?: SortOrder
    feePercentage?: SortOrder
    bankName?: SortOrder
    bankAccount?: SortOrder
    expiryDate?: SortOrder
    usageLimit?: SortOrder
    usageCount?: SortOrder
    isActive?: SortOrder
    ownerId?: SortOrder
    targetProductId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ReferralCodeMinOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    marketerName?: SortOrder
    discountPct?: SortOrder
    maxDiscountAmount?: SortOrder
    feePercentage?: SortOrder
    bankName?: SortOrder
    bankAccount?: SortOrder
    expiryDate?: SortOrder
    usageLimit?: SortOrder
    usageCount?: SortOrder
    isActive?: SortOrder
    ownerId?: SortOrder
    targetProductId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ReferralCodeSumOrderByAggregateInput = {
    discountPct?: SortOrder
    maxDiscountAmount?: SortOrder
    feePercentage?: SortOrder
    usageLimit?: SortOrder
    usageCount?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type AffiliateCommissionListRelationFilter = {
    every?: AffiliateCommissionWhereInput
    some?: AffiliateCommissionWhereInput
    none?: AffiliateCommissionWhereInput
  }

  export type AffiliateCommissionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BookingCountOrderByAggregateInput = {
    id?: SortOrder
    invoiceNo?: SortOrder
    packageId?: SortOrder
    packageName?: SortOrder
    customerName?: SortOrder
    customerPhone?: SortOrder
    sessionDate?: SortOrder
    sessionTime?: SortOrder
    notes?: SortOrder
    referralCode?: SortOrder
    discountPct?: SortOrder
    originalPrice?: SortOrder
    finalPrice?: SortOrder
    paymentMethod?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BookingAvgOrderByAggregateInput = {
    discountPct?: SortOrder
    originalPrice?: SortOrder
    finalPrice?: SortOrder
  }

  export type BookingMaxOrderByAggregateInput = {
    id?: SortOrder
    invoiceNo?: SortOrder
    packageId?: SortOrder
    packageName?: SortOrder
    customerName?: SortOrder
    customerPhone?: SortOrder
    sessionDate?: SortOrder
    sessionTime?: SortOrder
    notes?: SortOrder
    referralCode?: SortOrder
    discountPct?: SortOrder
    originalPrice?: SortOrder
    finalPrice?: SortOrder
    paymentMethod?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BookingMinOrderByAggregateInput = {
    id?: SortOrder
    invoiceNo?: SortOrder
    packageId?: SortOrder
    packageName?: SortOrder
    customerName?: SortOrder
    customerPhone?: SortOrder
    sessionDate?: SortOrder
    sessionTime?: SortOrder
    notes?: SortOrder
    referralCode?: SortOrder
    discountPct?: SortOrder
    originalPrice?: SortOrder
    finalPrice?: SortOrder
    paymentMethod?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BookingSumOrderByAggregateInput = {
    discountPct?: SortOrder
    originalPrice?: SortOrder
    finalPrice?: SortOrder
  }

  export type ProductListRelationFilter = {
    every?: ProductWhereInput
    some?: ProductWhereInput
    none?: ProductWhereInput
  }

  export type ProductOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CategoryCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
  }

  export type CategoryMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
  }

  export type CategoryMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type CategoryScalarRelationFilter = {
    is?: CategoryWhereInput
    isNot?: CategoryWhereInput
  }

  export type TransactionItemListRelationFilter = {
    every?: TransactionItemWhereInput
    some?: TransactionItemWhereInput
    none?: TransactionItemWhereInput
  }

  export type TransactionItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProductCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    sku?: SortOrder
    price?: SortOrder
    stock?: SortOrder
    image?: SortOrder
    duration?: SortOrder
    photoCount?: SortOrder
    features?: SortOrder
    isPopular?: SortOrder
    sortOrder?: SortOrder
    categoryId?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductAvgOrderByAggregateInput = {
    price?: SortOrder
    stock?: SortOrder
    sortOrder?: SortOrder
  }

  export type ProductMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    sku?: SortOrder
    price?: SortOrder
    stock?: SortOrder
    image?: SortOrder
    duration?: SortOrder
    photoCount?: SortOrder
    isPopular?: SortOrder
    sortOrder?: SortOrder
    categoryId?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    sku?: SortOrder
    price?: SortOrder
    stock?: SortOrder
    image?: SortOrder
    duration?: SortOrder
    photoCount?: SortOrder
    isPopular?: SortOrder
    sortOrder?: SortOrder
    categoryId?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductSumOrderByAggregateInput = {
    price?: SortOrder
    stock?: SortOrder
    sortOrder?: SortOrder
  }

  export type ReferralCodeScalarRelationFilter = {
    is?: ReferralCodeWhereInput
    isNot?: ReferralCodeWhereInput
  }

  export type TransactionScalarRelationFilter = {
    is?: TransactionWhereInput
    isNot?: TransactionWhereInput
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type ReferralUsageCountOrderByAggregateInput = {
    id?: SortOrder
    referralCodeId?: SortOrder
    transactionId?: SortOrder
    userId?: SortOrder
    usedAt?: SortOrder
  }

  export type ReferralUsageMaxOrderByAggregateInput = {
    id?: SortOrder
    referralCodeId?: SortOrder
    transactionId?: SortOrder
    userId?: SortOrder
    usedAt?: SortOrder
  }

  export type ReferralUsageMinOrderByAggregateInput = {
    id?: SortOrder
    referralCodeId?: SortOrder
    transactionId?: SortOrder
    userId?: SortOrder
    usedAt?: SortOrder
  }

  export type ProductScalarRelationFilter = {
    is?: ProductWhereInput
    isNot?: ProductWhereInput
  }

  export type TransactionItemCountOrderByAggregateInput = {
    id?: SortOrder
    transactionId?: SortOrder
    productId?: SortOrder
    qty?: SortOrder
    price?: SortOrder
    subtotal?: SortOrder
  }

  export type TransactionItemAvgOrderByAggregateInput = {
    qty?: SortOrder
    price?: SortOrder
    subtotal?: SortOrder
  }

  export type TransactionItemMaxOrderByAggregateInput = {
    id?: SortOrder
    transactionId?: SortOrder
    productId?: SortOrder
    qty?: SortOrder
    price?: SortOrder
    subtotal?: SortOrder
  }

  export type TransactionItemMinOrderByAggregateInput = {
    id?: SortOrder
    transactionId?: SortOrder
    productId?: SortOrder
    qty?: SortOrder
    price?: SortOrder
    subtotal?: SortOrder
  }

  export type TransactionItemSumOrderByAggregateInput = {
    qty?: SortOrder
    price?: SortOrder
    subtotal?: SortOrder
  }

  export type EnumPaymentMethodFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentMethod | EnumPaymentMethodFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentMethodFilter<$PrismaModel> | $Enums.PaymentMethod
  }

  export type EnumTransactionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionStatus | EnumTransactionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionStatus[] | ListEnumTransactionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransactionStatus[] | ListEnumTransactionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTransactionStatusFilter<$PrismaModel> | $Enums.TransactionStatus
  }

  export type ReferralUsageNullableScalarRelationFilter = {
    is?: ReferralUsageWhereInput | null
    isNot?: ReferralUsageWhereInput | null
  }

  export type ReferralCodeNullableScalarRelationFilter = {
    is?: ReferralCodeWhereInput | null
    isNot?: ReferralCodeWhereInput | null
  }

  export type TransactionCountOrderByAggregateInput = {
    id?: SortOrder
    invoiceNumber?: SortOrder
    cashierId?: SortOrder
    total?: SortOrder
    tax?: SortOrder
    discount?: SortOrder
    paymentMethod?: SortOrder
    referralCodeId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TransactionAvgOrderByAggregateInput = {
    total?: SortOrder
    tax?: SortOrder
    discount?: SortOrder
  }

  export type TransactionMaxOrderByAggregateInput = {
    id?: SortOrder
    invoiceNumber?: SortOrder
    cashierId?: SortOrder
    total?: SortOrder
    tax?: SortOrder
    discount?: SortOrder
    paymentMethod?: SortOrder
    referralCodeId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TransactionMinOrderByAggregateInput = {
    id?: SortOrder
    invoiceNumber?: SortOrder
    cashierId?: SortOrder
    total?: SortOrder
    tax?: SortOrder
    discount?: SortOrder
    paymentMethod?: SortOrder
    referralCodeId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TransactionSumOrderByAggregateInput = {
    total?: SortOrder
    tax?: SortOrder
    discount?: SortOrder
  }

  export type EnumPaymentMethodWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentMethod | EnumPaymentMethodFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentMethodWithAggregatesFilter<$PrismaModel> | $Enums.PaymentMethod
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentMethodFilter<$PrismaModel>
    _max?: NestedEnumPaymentMethodFilter<$PrismaModel>
  }

  export type EnumTransactionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionStatus | EnumTransactionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionStatus[] | ListEnumTransactionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransactionStatus[] | ListEnumTransactionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTransactionStatusWithAggregatesFilter<$PrismaModel> | $Enums.TransactionStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTransactionStatusFilter<$PrismaModel>
    _max?: NestedEnumTransactionStatusFilter<$PrismaModel>
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    phone?: SortOrder
    bankName?: SortOrder
    bankAccount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    phone?: SortOrder
    bankName?: SortOrder
    bankAccount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    phone?: SortOrder
    bankName?: SortOrder
    bankAccount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type GalleryPhotoCountOrderByAggregateInput = {
    id?: SortOrder
    src?: SortOrder
    alt?: SortOrder
    width?: SortOrder
    height?: SortOrder
    category?: SortOrder
    isFeatured?: SortOrder
    isHero?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GalleryPhotoAvgOrderByAggregateInput = {
    width?: SortOrder
    height?: SortOrder
    sortOrder?: SortOrder
  }

  export type GalleryPhotoMaxOrderByAggregateInput = {
    id?: SortOrder
    src?: SortOrder
    alt?: SortOrder
    width?: SortOrder
    height?: SortOrder
    category?: SortOrder
    isFeatured?: SortOrder
    isHero?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GalleryPhotoMinOrderByAggregateInput = {
    id?: SortOrder
    src?: SortOrder
    alt?: SortOrder
    width?: SortOrder
    height?: SortOrder
    category?: SortOrder
    isFeatured?: SortOrder
    isHero?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GalleryPhotoSumOrderByAggregateInput = {
    width?: SortOrder
    height?: SortOrder
    sortOrder?: SortOrder
  }

  export type SiteSettingCountOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    value?: SortOrder
    updatedAt?: SortOrder
  }

  export type SiteSettingMaxOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    value?: SortOrder
    updatedAt?: SortOrder
  }

  export type SiteSettingMinOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    value?: SortOrder
    updatedAt?: SortOrder
  }

  export type AffiliatePostCountOrderByAggregateInput = {
    id?: SortOrder
    imageUrl?: SortOrder
    caption?: SortOrder
    hashtags?: SortOrder
    likeCount?: SortOrder
    isPublished?: SortOrder
    postedBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AffiliatePostAvgOrderByAggregateInput = {
    likeCount?: SortOrder
  }

  export type AffiliatePostMaxOrderByAggregateInput = {
    id?: SortOrder
    imageUrl?: SortOrder
    caption?: SortOrder
    likeCount?: SortOrder
    isPublished?: SortOrder
    postedBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AffiliatePostMinOrderByAggregateInput = {
    id?: SortOrder
    imageUrl?: SortOrder
    caption?: SortOrder
    likeCount?: SortOrder
    isPublished?: SortOrder
    postedBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AffiliatePostSumOrderByAggregateInput = {
    likeCount?: SortOrder
  }

  export type BookingScalarRelationFilter = {
    is?: BookingWhereInput
    isNot?: BookingWhereInput
  }

  export type AffiliateCommissionCountOrderByAggregateInput = {
    id?: SortOrder
    snapperId?: SortOrder
    bookingId?: SortOrder
    amount?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AffiliateCommissionAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type AffiliateCommissionMaxOrderByAggregateInput = {
    id?: SortOrder
    snapperId?: SortOrder
    bookingId?: SortOrder
    amount?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AffiliateCommissionMinOrderByAggregateInput = {
    id?: SortOrder
    snapperId?: SortOrder
    bookingId?: SortOrder
    amount?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AffiliateCommissionSumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type AffiliateApplicationCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    password?: SortOrder
    instagram?: SortOrder
    tiktok?: SortOrder
    occupation?: SortOrder
    city?: SortOrder
    motivation?: SortOrder
    experience?: SortOrder
    status?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AffiliateApplicationMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    password?: SortOrder
    instagram?: SortOrder
    tiktok?: SortOrder
    occupation?: SortOrder
    city?: SortOrder
    motivation?: SortOrder
    experience?: SortOrder
    status?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AffiliateApplicationMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    password?: SortOrder
    instagram?: SortOrder
    tiktok?: SortOrder
    occupation?: SortOrder
    city?: SortOrder
    motivation?: SortOrder
    experience?: SortOrder
    status?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AffiliateLeadCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    city?: SortOrder
    occupation?: SortOrder
    productSku?: SortOrder
    productName?: SortOrder
    referralCode?: SortOrder
    snapperId?: SortOrder
    notes?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AffiliateLeadMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    city?: SortOrder
    occupation?: SortOrder
    productSku?: SortOrder
    productName?: SortOrder
    referralCode?: SortOrder
    snapperId?: SortOrder
    notes?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AffiliateLeadMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    city?: SortOrder
    occupation?: SortOrder
    productSku?: SortOrder
    productName?: SortOrder
    referralCode?: SortOrder
    snapperId?: SortOrder
    notes?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserCreateNestedOneWithoutReferralCodeInput = {
    create?: XOR<UserCreateWithoutReferralCodeInput, UserUncheckedCreateWithoutReferralCodeInput>
    connectOrCreate?: UserCreateOrConnectWithoutReferralCodeInput
    connect?: UserWhereUniqueInput
  }

  export type ReferralUsageCreateNestedManyWithoutReferralCodeInput = {
    create?: XOR<ReferralUsageCreateWithoutReferralCodeInput, ReferralUsageUncheckedCreateWithoutReferralCodeInput> | ReferralUsageCreateWithoutReferralCodeInput[] | ReferralUsageUncheckedCreateWithoutReferralCodeInput[]
    connectOrCreate?: ReferralUsageCreateOrConnectWithoutReferralCodeInput | ReferralUsageCreateOrConnectWithoutReferralCodeInput[]
    createMany?: ReferralUsageCreateManyReferralCodeInputEnvelope
    connect?: ReferralUsageWhereUniqueInput | ReferralUsageWhereUniqueInput[]
  }

  export type TransactionCreateNestedManyWithoutReferralCodeInput = {
    create?: XOR<TransactionCreateWithoutReferralCodeInput, TransactionUncheckedCreateWithoutReferralCodeInput> | TransactionCreateWithoutReferralCodeInput[] | TransactionUncheckedCreateWithoutReferralCodeInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutReferralCodeInput | TransactionCreateOrConnectWithoutReferralCodeInput[]
    createMany?: TransactionCreateManyReferralCodeInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type ReferralUsageUncheckedCreateNestedManyWithoutReferralCodeInput = {
    create?: XOR<ReferralUsageCreateWithoutReferralCodeInput, ReferralUsageUncheckedCreateWithoutReferralCodeInput> | ReferralUsageCreateWithoutReferralCodeInput[] | ReferralUsageUncheckedCreateWithoutReferralCodeInput[]
    connectOrCreate?: ReferralUsageCreateOrConnectWithoutReferralCodeInput | ReferralUsageCreateOrConnectWithoutReferralCodeInput[]
    createMany?: ReferralUsageCreateManyReferralCodeInputEnvelope
    connect?: ReferralUsageWhereUniqueInput | ReferralUsageWhereUniqueInput[]
  }

  export type TransactionUncheckedCreateNestedManyWithoutReferralCodeInput = {
    create?: XOR<TransactionCreateWithoutReferralCodeInput, TransactionUncheckedCreateWithoutReferralCodeInput> | TransactionCreateWithoutReferralCodeInput[] | TransactionUncheckedCreateWithoutReferralCodeInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutReferralCodeInput | TransactionCreateOrConnectWithoutReferralCodeInput[]
    createMany?: TransactionCreateManyReferralCodeInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type UserUpdateOneWithoutReferralCodeNestedInput = {
    create?: XOR<UserCreateWithoutReferralCodeInput, UserUncheckedCreateWithoutReferralCodeInput>
    connectOrCreate?: UserCreateOrConnectWithoutReferralCodeInput
    upsert?: UserUpsertWithoutReferralCodeInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutReferralCodeInput, UserUpdateWithoutReferralCodeInput>, UserUncheckedUpdateWithoutReferralCodeInput>
  }

  export type ReferralUsageUpdateManyWithoutReferralCodeNestedInput = {
    create?: XOR<ReferralUsageCreateWithoutReferralCodeInput, ReferralUsageUncheckedCreateWithoutReferralCodeInput> | ReferralUsageCreateWithoutReferralCodeInput[] | ReferralUsageUncheckedCreateWithoutReferralCodeInput[]
    connectOrCreate?: ReferralUsageCreateOrConnectWithoutReferralCodeInput | ReferralUsageCreateOrConnectWithoutReferralCodeInput[]
    upsert?: ReferralUsageUpsertWithWhereUniqueWithoutReferralCodeInput | ReferralUsageUpsertWithWhereUniqueWithoutReferralCodeInput[]
    createMany?: ReferralUsageCreateManyReferralCodeInputEnvelope
    set?: ReferralUsageWhereUniqueInput | ReferralUsageWhereUniqueInput[]
    disconnect?: ReferralUsageWhereUniqueInput | ReferralUsageWhereUniqueInput[]
    delete?: ReferralUsageWhereUniqueInput | ReferralUsageWhereUniqueInput[]
    connect?: ReferralUsageWhereUniqueInput | ReferralUsageWhereUniqueInput[]
    update?: ReferralUsageUpdateWithWhereUniqueWithoutReferralCodeInput | ReferralUsageUpdateWithWhereUniqueWithoutReferralCodeInput[]
    updateMany?: ReferralUsageUpdateManyWithWhereWithoutReferralCodeInput | ReferralUsageUpdateManyWithWhereWithoutReferralCodeInput[]
    deleteMany?: ReferralUsageScalarWhereInput | ReferralUsageScalarWhereInput[]
  }

  export type TransactionUpdateManyWithoutReferralCodeNestedInput = {
    create?: XOR<TransactionCreateWithoutReferralCodeInput, TransactionUncheckedCreateWithoutReferralCodeInput> | TransactionCreateWithoutReferralCodeInput[] | TransactionUncheckedCreateWithoutReferralCodeInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutReferralCodeInput | TransactionCreateOrConnectWithoutReferralCodeInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutReferralCodeInput | TransactionUpsertWithWhereUniqueWithoutReferralCodeInput[]
    createMany?: TransactionCreateManyReferralCodeInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutReferralCodeInput | TransactionUpdateWithWhereUniqueWithoutReferralCodeInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutReferralCodeInput | TransactionUpdateManyWithWhereWithoutReferralCodeInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type ReferralUsageUncheckedUpdateManyWithoutReferralCodeNestedInput = {
    create?: XOR<ReferralUsageCreateWithoutReferralCodeInput, ReferralUsageUncheckedCreateWithoutReferralCodeInput> | ReferralUsageCreateWithoutReferralCodeInput[] | ReferralUsageUncheckedCreateWithoutReferralCodeInput[]
    connectOrCreate?: ReferralUsageCreateOrConnectWithoutReferralCodeInput | ReferralUsageCreateOrConnectWithoutReferralCodeInput[]
    upsert?: ReferralUsageUpsertWithWhereUniqueWithoutReferralCodeInput | ReferralUsageUpsertWithWhereUniqueWithoutReferralCodeInput[]
    createMany?: ReferralUsageCreateManyReferralCodeInputEnvelope
    set?: ReferralUsageWhereUniqueInput | ReferralUsageWhereUniqueInput[]
    disconnect?: ReferralUsageWhereUniqueInput | ReferralUsageWhereUniqueInput[]
    delete?: ReferralUsageWhereUniqueInput | ReferralUsageWhereUniqueInput[]
    connect?: ReferralUsageWhereUniqueInput | ReferralUsageWhereUniqueInput[]
    update?: ReferralUsageUpdateWithWhereUniqueWithoutReferralCodeInput | ReferralUsageUpdateWithWhereUniqueWithoutReferralCodeInput[]
    updateMany?: ReferralUsageUpdateManyWithWhereWithoutReferralCodeInput | ReferralUsageUpdateManyWithWhereWithoutReferralCodeInput[]
    deleteMany?: ReferralUsageScalarWhereInput | ReferralUsageScalarWhereInput[]
  }

  export type TransactionUncheckedUpdateManyWithoutReferralCodeNestedInput = {
    create?: XOR<TransactionCreateWithoutReferralCodeInput, TransactionUncheckedCreateWithoutReferralCodeInput> | TransactionCreateWithoutReferralCodeInput[] | TransactionUncheckedCreateWithoutReferralCodeInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutReferralCodeInput | TransactionCreateOrConnectWithoutReferralCodeInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutReferralCodeInput | TransactionUpsertWithWhereUniqueWithoutReferralCodeInput[]
    createMany?: TransactionCreateManyReferralCodeInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutReferralCodeInput | TransactionUpdateWithWhereUniqueWithoutReferralCodeInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutReferralCodeInput | TransactionUpdateManyWithWhereWithoutReferralCodeInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type AffiliateCommissionCreateNestedManyWithoutBookingInput = {
    create?: XOR<AffiliateCommissionCreateWithoutBookingInput, AffiliateCommissionUncheckedCreateWithoutBookingInput> | AffiliateCommissionCreateWithoutBookingInput[] | AffiliateCommissionUncheckedCreateWithoutBookingInput[]
    connectOrCreate?: AffiliateCommissionCreateOrConnectWithoutBookingInput | AffiliateCommissionCreateOrConnectWithoutBookingInput[]
    createMany?: AffiliateCommissionCreateManyBookingInputEnvelope
    connect?: AffiliateCommissionWhereUniqueInput | AffiliateCommissionWhereUniqueInput[]
  }

  export type AffiliateCommissionUncheckedCreateNestedManyWithoutBookingInput = {
    create?: XOR<AffiliateCommissionCreateWithoutBookingInput, AffiliateCommissionUncheckedCreateWithoutBookingInput> | AffiliateCommissionCreateWithoutBookingInput[] | AffiliateCommissionUncheckedCreateWithoutBookingInput[]
    connectOrCreate?: AffiliateCommissionCreateOrConnectWithoutBookingInput | AffiliateCommissionCreateOrConnectWithoutBookingInput[]
    createMany?: AffiliateCommissionCreateManyBookingInputEnvelope
    connect?: AffiliateCommissionWhereUniqueInput | AffiliateCommissionWhereUniqueInput[]
  }

  export type AffiliateCommissionUpdateManyWithoutBookingNestedInput = {
    create?: XOR<AffiliateCommissionCreateWithoutBookingInput, AffiliateCommissionUncheckedCreateWithoutBookingInput> | AffiliateCommissionCreateWithoutBookingInput[] | AffiliateCommissionUncheckedCreateWithoutBookingInput[]
    connectOrCreate?: AffiliateCommissionCreateOrConnectWithoutBookingInput | AffiliateCommissionCreateOrConnectWithoutBookingInput[]
    upsert?: AffiliateCommissionUpsertWithWhereUniqueWithoutBookingInput | AffiliateCommissionUpsertWithWhereUniqueWithoutBookingInput[]
    createMany?: AffiliateCommissionCreateManyBookingInputEnvelope
    set?: AffiliateCommissionWhereUniqueInput | AffiliateCommissionWhereUniqueInput[]
    disconnect?: AffiliateCommissionWhereUniqueInput | AffiliateCommissionWhereUniqueInput[]
    delete?: AffiliateCommissionWhereUniqueInput | AffiliateCommissionWhereUniqueInput[]
    connect?: AffiliateCommissionWhereUniqueInput | AffiliateCommissionWhereUniqueInput[]
    update?: AffiliateCommissionUpdateWithWhereUniqueWithoutBookingInput | AffiliateCommissionUpdateWithWhereUniqueWithoutBookingInput[]
    updateMany?: AffiliateCommissionUpdateManyWithWhereWithoutBookingInput | AffiliateCommissionUpdateManyWithWhereWithoutBookingInput[]
    deleteMany?: AffiliateCommissionScalarWhereInput | AffiliateCommissionScalarWhereInput[]
  }

  export type AffiliateCommissionUncheckedUpdateManyWithoutBookingNestedInput = {
    create?: XOR<AffiliateCommissionCreateWithoutBookingInput, AffiliateCommissionUncheckedCreateWithoutBookingInput> | AffiliateCommissionCreateWithoutBookingInput[] | AffiliateCommissionUncheckedCreateWithoutBookingInput[]
    connectOrCreate?: AffiliateCommissionCreateOrConnectWithoutBookingInput | AffiliateCommissionCreateOrConnectWithoutBookingInput[]
    upsert?: AffiliateCommissionUpsertWithWhereUniqueWithoutBookingInput | AffiliateCommissionUpsertWithWhereUniqueWithoutBookingInput[]
    createMany?: AffiliateCommissionCreateManyBookingInputEnvelope
    set?: AffiliateCommissionWhereUniqueInput | AffiliateCommissionWhereUniqueInput[]
    disconnect?: AffiliateCommissionWhereUniqueInput | AffiliateCommissionWhereUniqueInput[]
    delete?: AffiliateCommissionWhereUniqueInput | AffiliateCommissionWhereUniqueInput[]
    connect?: AffiliateCommissionWhereUniqueInput | AffiliateCommissionWhereUniqueInput[]
    update?: AffiliateCommissionUpdateWithWhereUniqueWithoutBookingInput | AffiliateCommissionUpdateWithWhereUniqueWithoutBookingInput[]
    updateMany?: AffiliateCommissionUpdateManyWithWhereWithoutBookingInput | AffiliateCommissionUpdateManyWithWhereWithoutBookingInput[]
    deleteMany?: AffiliateCommissionScalarWhereInput | AffiliateCommissionScalarWhereInput[]
  }

  export type ProductCreateNestedManyWithoutCategoryInput = {
    create?: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput> | ProductCreateWithoutCategoryInput[] | ProductUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutCategoryInput | ProductCreateOrConnectWithoutCategoryInput[]
    createMany?: ProductCreateManyCategoryInputEnvelope
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
  }

  export type ProductUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput> | ProductCreateWithoutCategoryInput[] | ProductUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutCategoryInput | ProductCreateOrConnectWithoutCategoryInput[]
    createMany?: ProductCreateManyCategoryInputEnvelope
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
  }

  export type ProductUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput> | ProductCreateWithoutCategoryInput[] | ProductUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutCategoryInput | ProductCreateOrConnectWithoutCategoryInput[]
    upsert?: ProductUpsertWithWhereUniqueWithoutCategoryInput | ProductUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: ProductCreateManyCategoryInputEnvelope
    set?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    disconnect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    delete?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    update?: ProductUpdateWithWhereUniqueWithoutCategoryInput | ProductUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: ProductUpdateManyWithWhereWithoutCategoryInput | ProductUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: ProductScalarWhereInput | ProductScalarWhereInput[]
  }

  export type ProductUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput> | ProductCreateWithoutCategoryInput[] | ProductUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutCategoryInput | ProductCreateOrConnectWithoutCategoryInput[]
    upsert?: ProductUpsertWithWhereUniqueWithoutCategoryInput | ProductUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: ProductCreateManyCategoryInputEnvelope
    set?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    disconnect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    delete?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    update?: ProductUpdateWithWhereUniqueWithoutCategoryInput | ProductUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: ProductUpdateManyWithWhereWithoutCategoryInput | ProductUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: ProductScalarWhereInput | ProductScalarWhereInput[]
  }

  export type ProductCreatefeaturesInput = {
    set: string[]
  }

  export type CategoryCreateNestedOneWithoutProductsInput = {
    create?: XOR<CategoryCreateWithoutProductsInput, CategoryUncheckedCreateWithoutProductsInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutProductsInput
    connect?: CategoryWhereUniqueInput
  }

  export type TransactionItemCreateNestedManyWithoutProductInput = {
    create?: XOR<TransactionItemCreateWithoutProductInput, TransactionItemUncheckedCreateWithoutProductInput> | TransactionItemCreateWithoutProductInput[] | TransactionItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: TransactionItemCreateOrConnectWithoutProductInput | TransactionItemCreateOrConnectWithoutProductInput[]
    createMany?: TransactionItemCreateManyProductInputEnvelope
    connect?: TransactionItemWhereUniqueInput | TransactionItemWhereUniqueInput[]
  }

  export type TransactionItemUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<TransactionItemCreateWithoutProductInput, TransactionItemUncheckedCreateWithoutProductInput> | TransactionItemCreateWithoutProductInput[] | TransactionItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: TransactionItemCreateOrConnectWithoutProductInput | TransactionItemCreateOrConnectWithoutProductInput[]
    createMany?: TransactionItemCreateManyProductInputEnvelope
    connect?: TransactionItemWhereUniqueInput | TransactionItemWhereUniqueInput[]
  }

  export type ProductUpdatefeaturesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type CategoryUpdateOneRequiredWithoutProductsNestedInput = {
    create?: XOR<CategoryCreateWithoutProductsInput, CategoryUncheckedCreateWithoutProductsInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutProductsInput
    upsert?: CategoryUpsertWithoutProductsInput
    connect?: CategoryWhereUniqueInput
    update?: XOR<XOR<CategoryUpdateToOneWithWhereWithoutProductsInput, CategoryUpdateWithoutProductsInput>, CategoryUncheckedUpdateWithoutProductsInput>
  }

  export type TransactionItemUpdateManyWithoutProductNestedInput = {
    create?: XOR<TransactionItemCreateWithoutProductInput, TransactionItemUncheckedCreateWithoutProductInput> | TransactionItemCreateWithoutProductInput[] | TransactionItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: TransactionItemCreateOrConnectWithoutProductInput | TransactionItemCreateOrConnectWithoutProductInput[]
    upsert?: TransactionItemUpsertWithWhereUniqueWithoutProductInput | TransactionItemUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: TransactionItemCreateManyProductInputEnvelope
    set?: TransactionItemWhereUniqueInput | TransactionItemWhereUniqueInput[]
    disconnect?: TransactionItemWhereUniqueInput | TransactionItemWhereUniqueInput[]
    delete?: TransactionItemWhereUniqueInput | TransactionItemWhereUniqueInput[]
    connect?: TransactionItemWhereUniqueInput | TransactionItemWhereUniqueInput[]
    update?: TransactionItemUpdateWithWhereUniqueWithoutProductInput | TransactionItemUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: TransactionItemUpdateManyWithWhereWithoutProductInput | TransactionItemUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: TransactionItemScalarWhereInput | TransactionItemScalarWhereInput[]
  }

  export type TransactionItemUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<TransactionItemCreateWithoutProductInput, TransactionItemUncheckedCreateWithoutProductInput> | TransactionItemCreateWithoutProductInput[] | TransactionItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: TransactionItemCreateOrConnectWithoutProductInput | TransactionItemCreateOrConnectWithoutProductInput[]
    upsert?: TransactionItemUpsertWithWhereUniqueWithoutProductInput | TransactionItemUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: TransactionItemCreateManyProductInputEnvelope
    set?: TransactionItemWhereUniqueInput | TransactionItemWhereUniqueInput[]
    disconnect?: TransactionItemWhereUniqueInput | TransactionItemWhereUniqueInput[]
    delete?: TransactionItemWhereUniqueInput | TransactionItemWhereUniqueInput[]
    connect?: TransactionItemWhereUniqueInput | TransactionItemWhereUniqueInput[]
    update?: TransactionItemUpdateWithWhereUniqueWithoutProductInput | TransactionItemUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: TransactionItemUpdateManyWithWhereWithoutProductInput | TransactionItemUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: TransactionItemScalarWhereInput | TransactionItemScalarWhereInput[]
  }

  export type ReferralCodeCreateNestedOneWithoutReferral_usagesInput = {
    create?: XOR<ReferralCodeCreateWithoutReferral_usagesInput, ReferralCodeUncheckedCreateWithoutReferral_usagesInput>
    connectOrCreate?: ReferralCodeCreateOrConnectWithoutReferral_usagesInput
    connect?: ReferralCodeWhereUniqueInput
  }

  export type TransactionCreateNestedOneWithoutReferralUsageInput = {
    create?: XOR<TransactionCreateWithoutReferralUsageInput, TransactionUncheckedCreateWithoutReferralUsageInput>
    connectOrCreate?: TransactionCreateOrConnectWithoutReferralUsageInput
    connect?: TransactionWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutReferral_usagesInput = {
    create?: XOR<UserCreateWithoutReferral_usagesInput, UserUncheckedCreateWithoutReferral_usagesInput>
    connectOrCreate?: UserCreateOrConnectWithoutReferral_usagesInput
    connect?: UserWhereUniqueInput
  }

  export type ReferralCodeUpdateOneRequiredWithoutReferral_usagesNestedInput = {
    create?: XOR<ReferralCodeCreateWithoutReferral_usagesInput, ReferralCodeUncheckedCreateWithoutReferral_usagesInput>
    connectOrCreate?: ReferralCodeCreateOrConnectWithoutReferral_usagesInput
    upsert?: ReferralCodeUpsertWithoutReferral_usagesInput
    connect?: ReferralCodeWhereUniqueInput
    update?: XOR<XOR<ReferralCodeUpdateToOneWithWhereWithoutReferral_usagesInput, ReferralCodeUpdateWithoutReferral_usagesInput>, ReferralCodeUncheckedUpdateWithoutReferral_usagesInput>
  }

  export type TransactionUpdateOneRequiredWithoutReferralUsageNestedInput = {
    create?: XOR<TransactionCreateWithoutReferralUsageInput, TransactionUncheckedCreateWithoutReferralUsageInput>
    connectOrCreate?: TransactionCreateOrConnectWithoutReferralUsageInput
    upsert?: TransactionUpsertWithoutReferralUsageInput
    connect?: TransactionWhereUniqueInput
    update?: XOR<XOR<TransactionUpdateToOneWithWhereWithoutReferralUsageInput, TransactionUpdateWithoutReferralUsageInput>, TransactionUncheckedUpdateWithoutReferralUsageInput>
  }

  export type UserUpdateOneRequiredWithoutReferral_usagesNestedInput = {
    create?: XOR<UserCreateWithoutReferral_usagesInput, UserUncheckedCreateWithoutReferral_usagesInput>
    connectOrCreate?: UserCreateOrConnectWithoutReferral_usagesInput
    upsert?: UserUpsertWithoutReferral_usagesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutReferral_usagesInput, UserUpdateWithoutReferral_usagesInput>, UserUncheckedUpdateWithoutReferral_usagesInput>
  }

  export type ProductCreateNestedOneWithoutTransaction_itemsInput = {
    create?: XOR<ProductCreateWithoutTransaction_itemsInput, ProductUncheckedCreateWithoutTransaction_itemsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutTransaction_itemsInput
    connect?: ProductWhereUniqueInput
  }

  export type TransactionCreateNestedOneWithoutItemsInput = {
    create?: XOR<TransactionCreateWithoutItemsInput, TransactionUncheckedCreateWithoutItemsInput>
    connectOrCreate?: TransactionCreateOrConnectWithoutItemsInput
    connect?: TransactionWhereUniqueInput
  }

  export type ProductUpdateOneRequiredWithoutTransaction_itemsNestedInput = {
    create?: XOR<ProductCreateWithoutTransaction_itemsInput, ProductUncheckedCreateWithoutTransaction_itemsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutTransaction_itemsInput
    upsert?: ProductUpsertWithoutTransaction_itemsInput
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutTransaction_itemsInput, ProductUpdateWithoutTransaction_itemsInput>, ProductUncheckedUpdateWithoutTransaction_itemsInput>
  }

  export type TransactionUpdateOneRequiredWithoutItemsNestedInput = {
    create?: XOR<TransactionCreateWithoutItemsInput, TransactionUncheckedCreateWithoutItemsInput>
    connectOrCreate?: TransactionCreateOrConnectWithoutItemsInput
    upsert?: TransactionUpsertWithoutItemsInput
    connect?: TransactionWhereUniqueInput
    update?: XOR<XOR<TransactionUpdateToOneWithWhereWithoutItemsInput, TransactionUpdateWithoutItemsInput>, TransactionUncheckedUpdateWithoutItemsInput>
  }

  export type ReferralUsageCreateNestedOneWithoutTransactionInput = {
    create?: XOR<ReferralUsageCreateWithoutTransactionInput, ReferralUsageUncheckedCreateWithoutTransactionInput>
    connectOrCreate?: ReferralUsageCreateOrConnectWithoutTransactionInput
    connect?: ReferralUsageWhereUniqueInput
  }

  export type TransactionItemCreateNestedManyWithoutTransactionInput = {
    create?: XOR<TransactionItemCreateWithoutTransactionInput, TransactionItemUncheckedCreateWithoutTransactionInput> | TransactionItemCreateWithoutTransactionInput[] | TransactionItemUncheckedCreateWithoutTransactionInput[]
    connectOrCreate?: TransactionItemCreateOrConnectWithoutTransactionInput | TransactionItemCreateOrConnectWithoutTransactionInput[]
    createMany?: TransactionItemCreateManyTransactionInputEnvelope
    connect?: TransactionItemWhereUniqueInput | TransactionItemWhereUniqueInput[]
  }

  export type UserCreateNestedOneWithoutTransactionsInput = {
    create?: XOR<UserCreateWithoutTransactionsInput, UserUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTransactionsInput
    connect?: UserWhereUniqueInput
  }

  export type ReferralCodeCreateNestedOneWithoutTransactionsInput = {
    create?: XOR<ReferralCodeCreateWithoutTransactionsInput, ReferralCodeUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: ReferralCodeCreateOrConnectWithoutTransactionsInput
    connect?: ReferralCodeWhereUniqueInput
  }

  export type ReferralUsageUncheckedCreateNestedOneWithoutTransactionInput = {
    create?: XOR<ReferralUsageCreateWithoutTransactionInput, ReferralUsageUncheckedCreateWithoutTransactionInput>
    connectOrCreate?: ReferralUsageCreateOrConnectWithoutTransactionInput
    connect?: ReferralUsageWhereUniqueInput
  }

  export type TransactionItemUncheckedCreateNestedManyWithoutTransactionInput = {
    create?: XOR<TransactionItemCreateWithoutTransactionInput, TransactionItemUncheckedCreateWithoutTransactionInput> | TransactionItemCreateWithoutTransactionInput[] | TransactionItemUncheckedCreateWithoutTransactionInput[]
    connectOrCreate?: TransactionItemCreateOrConnectWithoutTransactionInput | TransactionItemCreateOrConnectWithoutTransactionInput[]
    createMany?: TransactionItemCreateManyTransactionInputEnvelope
    connect?: TransactionItemWhereUniqueInput | TransactionItemWhereUniqueInput[]
  }

  export type EnumPaymentMethodFieldUpdateOperationsInput = {
    set?: $Enums.PaymentMethod
  }

  export type EnumTransactionStatusFieldUpdateOperationsInput = {
    set?: $Enums.TransactionStatus
  }

  export type ReferralUsageUpdateOneWithoutTransactionNestedInput = {
    create?: XOR<ReferralUsageCreateWithoutTransactionInput, ReferralUsageUncheckedCreateWithoutTransactionInput>
    connectOrCreate?: ReferralUsageCreateOrConnectWithoutTransactionInput
    upsert?: ReferralUsageUpsertWithoutTransactionInput
    disconnect?: ReferralUsageWhereInput | boolean
    delete?: ReferralUsageWhereInput | boolean
    connect?: ReferralUsageWhereUniqueInput
    update?: XOR<XOR<ReferralUsageUpdateToOneWithWhereWithoutTransactionInput, ReferralUsageUpdateWithoutTransactionInput>, ReferralUsageUncheckedUpdateWithoutTransactionInput>
  }

  export type TransactionItemUpdateManyWithoutTransactionNestedInput = {
    create?: XOR<TransactionItemCreateWithoutTransactionInput, TransactionItemUncheckedCreateWithoutTransactionInput> | TransactionItemCreateWithoutTransactionInput[] | TransactionItemUncheckedCreateWithoutTransactionInput[]
    connectOrCreate?: TransactionItemCreateOrConnectWithoutTransactionInput | TransactionItemCreateOrConnectWithoutTransactionInput[]
    upsert?: TransactionItemUpsertWithWhereUniqueWithoutTransactionInput | TransactionItemUpsertWithWhereUniqueWithoutTransactionInput[]
    createMany?: TransactionItemCreateManyTransactionInputEnvelope
    set?: TransactionItemWhereUniqueInput | TransactionItemWhereUniqueInput[]
    disconnect?: TransactionItemWhereUniqueInput | TransactionItemWhereUniqueInput[]
    delete?: TransactionItemWhereUniqueInput | TransactionItemWhereUniqueInput[]
    connect?: TransactionItemWhereUniqueInput | TransactionItemWhereUniqueInput[]
    update?: TransactionItemUpdateWithWhereUniqueWithoutTransactionInput | TransactionItemUpdateWithWhereUniqueWithoutTransactionInput[]
    updateMany?: TransactionItemUpdateManyWithWhereWithoutTransactionInput | TransactionItemUpdateManyWithWhereWithoutTransactionInput[]
    deleteMany?: TransactionItemScalarWhereInput | TransactionItemScalarWhereInput[]
  }

  export type UserUpdateOneRequiredWithoutTransactionsNestedInput = {
    create?: XOR<UserCreateWithoutTransactionsInput, UserUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTransactionsInput
    upsert?: UserUpsertWithoutTransactionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTransactionsInput, UserUpdateWithoutTransactionsInput>, UserUncheckedUpdateWithoutTransactionsInput>
  }

  export type ReferralCodeUpdateOneWithoutTransactionsNestedInput = {
    create?: XOR<ReferralCodeCreateWithoutTransactionsInput, ReferralCodeUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: ReferralCodeCreateOrConnectWithoutTransactionsInput
    upsert?: ReferralCodeUpsertWithoutTransactionsInput
    disconnect?: ReferralCodeWhereInput | boolean
    delete?: ReferralCodeWhereInput | boolean
    connect?: ReferralCodeWhereUniqueInput
    update?: XOR<XOR<ReferralCodeUpdateToOneWithWhereWithoutTransactionsInput, ReferralCodeUpdateWithoutTransactionsInput>, ReferralCodeUncheckedUpdateWithoutTransactionsInput>
  }

  export type ReferralUsageUncheckedUpdateOneWithoutTransactionNestedInput = {
    create?: XOR<ReferralUsageCreateWithoutTransactionInput, ReferralUsageUncheckedCreateWithoutTransactionInput>
    connectOrCreate?: ReferralUsageCreateOrConnectWithoutTransactionInput
    upsert?: ReferralUsageUpsertWithoutTransactionInput
    disconnect?: ReferralUsageWhereInput | boolean
    delete?: ReferralUsageWhereInput | boolean
    connect?: ReferralUsageWhereUniqueInput
    update?: XOR<XOR<ReferralUsageUpdateToOneWithWhereWithoutTransactionInput, ReferralUsageUpdateWithoutTransactionInput>, ReferralUsageUncheckedUpdateWithoutTransactionInput>
  }

  export type TransactionItemUncheckedUpdateManyWithoutTransactionNestedInput = {
    create?: XOR<TransactionItemCreateWithoutTransactionInput, TransactionItemUncheckedCreateWithoutTransactionInput> | TransactionItemCreateWithoutTransactionInput[] | TransactionItemUncheckedCreateWithoutTransactionInput[]
    connectOrCreate?: TransactionItemCreateOrConnectWithoutTransactionInput | TransactionItemCreateOrConnectWithoutTransactionInput[]
    upsert?: TransactionItemUpsertWithWhereUniqueWithoutTransactionInput | TransactionItemUpsertWithWhereUniqueWithoutTransactionInput[]
    createMany?: TransactionItemCreateManyTransactionInputEnvelope
    set?: TransactionItemWhereUniqueInput | TransactionItemWhereUniqueInput[]
    disconnect?: TransactionItemWhereUniqueInput | TransactionItemWhereUniqueInput[]
    delete?: TransactionItemWhereUniqueInput | TransactionItemWhereUniqueInput[]
    connect?: TransactionItemWhereUniqueInput | TransactionItemWhereUniqueInput[]
    update?: TransactionItemUpdateWithWhereUniqueWithoutTransactionInput | TransactionItemUpdateWithWhereUniqueWithoutTransactionInput[]
    updateMany?: TransactionItemUpdateManyWithWhereWithoutTransactionInput | TransactionItemUpdateManyWithWhereWithoutTransactionInput[]
    deleteMany?: TransactionItemScalarWhereInput | TransactionItemScalarWhereInput[]
  }

  export type ReferralUsageCreateNestedManyWithoutUserInput = {
    create?: XOR<ReferralUsageCreateWithoutUserInput, ReferralUsageUncheckedCreateWithoutUserInput> | ReferralUsageCreateWithoutUserInput[] | ReferralUsageUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReferralUsageCreateOrConnectWithoutUserInput | ReferralUsageCreateOrConnectWithoutUserInput[]
    createMany?: ReferralUsageCreateManyUserInputEnvelope
    connect?: ReferralUsageWhereUniqueInput | ReferralUsageWhereUniqueInput[]
  }

  export type TransactionCreateNestedManyWithoutCashierInput = {
    create?: XOR<TransactionCreateWithoutCashierInput, TransactionUncheckedCreateWithoutCashierInput> | TransactionCreateWithoutCashierInput[] | TransactionUncheckedCreateWithoutCashierInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutCashierInput | TransactionCreateOrConnectWithoutCashierInput[]
    createMany?: TransactionCreateManyCashierInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type ReferralCodeCreateNestedOneWithoutOwnerInput = {
    create?: XOR<ReferralCodeCreateWithoutOwnerInput, ReferralCodeUncheckedCreateWithoutOwnerInput>
    connectOrCreate?: ReferralCodeCreateOrConnectWithoutOwnerInput
    connect?: ReferralCodeWhereUniqueInput
  }

  export type AffiliateCommissionCreateNestedManyWithoutSnapperInput = {
    create?: XOR<AffiliateCommissionCreateWithoutSnapperInput, AffiliateCommissionUncheckedCreateWithoutSnapperInput> | AffiliateCommissionCreateWithoutSnapperInput[] | AffiliateCommissionUncheckedCreateWithoutSnapperInput[]
    connectOrCreate?: AffiliateCommissionCreateOrConnectWithoutSnapperInput | AffiliateCommissionCreateOrConnectWithoutSnapperInput[]
    createMany?: AffiliateCommissionCreateManySnapperInputEnvelope
    connect?: AffiliateCommissionWhereUniqueInput | AffiliateCommissionWhereUniqueInput[]
  }

  export type ReferralUsageUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ReferralUsageCreateWithoutUserInput, ReferralUsageUncheckedCreateWithoutUserInput> | ReferralUsageCreateWithoutUserInput[] | ReferralUsageUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReferralUsageCreateOrConnectWithoutUserInput | ReferralUsageCreateOrConnectWithoutUserInput[]
    createMany?: ReferralUsageCreateManyUserInputEnvelope
    connect?: ReferralUsageWhereUniqueInput | ReferralUsageWhereUniqueInput[]
  }

  export type TransactionUncheckedCreateNestedManyWithoutCashierInput = {
    create?: XOR<TransactionCreateWithoutCashierInput, TransactionUncheckedCreateWithoutCashierInput> | TransactionCreateWithoutCashierInput[] | TransactionUncheckedCreateWithoutCashierInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutCashierInput | TransactionCreateOrConnectWithoutCashierInput[]
    createMany?: TransactionCreateManyCashierInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type ReferralCodeUncheckedCreateNestedOneWithoutOwnerInput = {
    create?: XOR<ReferralCodeCreateWithoutOwnerInput, ReferralCodeUncheckedCreateWithoutOwnerInput>
    connectOrCreate?: ReferralCodeCreateOrConnectWithoutOwnerInput
    connect?: ReferralCodeWhereUniqueInput
  }

  export type AffiliateCommissionUncheckedCreateNestedManyWithoutSnapperInput = {
    create?: XOR<AffiliateCommissionCreateWithoutSnapperInput, AffiliateCommissionUncheckedCreateWithoutSnapperInput> | AffiliateCommissionCreateWithoutSnapperInput[] | AffiliateCommissionUncheckedCreateWithoutSnapperInput[]
    connectOrCreate?: AffiliateCommissionCreateOrConnectWithoutSnapperInput | AffiliateCommissionCreateOrConnectWithoutSnapperInput[]
    createMany?: AffiliateCommissionCreateManySnapperInputEnvelope
    connect?: AffiliateCommissionWhereUniqueInput | AffiliateCommissionWhereUniqueInput[]
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type ReferralUsageUpdateManyWithoutUserNestedInput = {
    create?: XOR<ReferralUsageCreateWithoutUserInput, ReferralUsageUncheckedCreateWithoutUserInput> | ReferralUsageCreateWithoutUserInput[] | ReferralUsageUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReferralUsageCreateOrConnectWithoutUserInput | ReferralUsageCreateOrConnectWithoutUserInput[]
    upsert?: ReferralUsageUpsertWithWhereUniqueWithoutUserInput | ReferralUsageUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ReferralUsageCreateManyUserInputEnvelope
    set?: ReferralUsageWhereUniqueInput | ReferralUsageWhereUniqueInput[]
    disconnect?: ReferralUsageWhereUniqueInput | ReferralUsageWhereUniqueInput[]
    delete?: ReferralUsageWhereUniqueInput | ReferralUsageWhereUniqueInput[]
    connect?: ReferralUsageWhereUniqueInput | ReferralUsageWhereUniqueInput[]
    update?: ReferralUsageUpdateWithWhereUniqueWithoutUserInput | ReferralUsageUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ReferralUsageUpdateManyWithWhereWithoutUserInput | ReferralUsageUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ReferralUsageScalarWhereInput | ReferralUsageScalarWhereInput[]
  }

  export type TransactionUpdateManyWithoutCashierNestedInput = {
    create?: XOR<TransactionCreateWithoutCashierInput, TransactionUncheckedCreateWithoutCashierInput> | TransactionCreateWithoutCashierInput[] | TransactionUncheckedCreateWithoutCashierInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutCashierInput | TransactionCreateOrConnectWithoutCashierInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutCashierInput | TransactionUpsertWithWhereUniqueWithoutCashierInput[]
    createMany?: TransactionCreateManyCashierInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutCashierInput | TransactionUpdateWithWhereUniqueWithoutCashierInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutCashierInput | TransactionUpdateManyWithWhereWithoutCashierInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type ReferralCodeUpdateOneWithoutOwnerNestedInput = {
    create?: XOR<ReferralCodeCreateWithoutOwnerInput, ReferralCodeUncheckedCreateWithoutOwnerInput>
    connectOrCreate?: ReferralCodeCreateOrConnectWithoutOwnerInput
    upsert?: ReferralCodeUpsertWithoutOwnerInput
    disconnect?: ReferralCodeWhereInput | boolean
    delete?: ReferralCodeWhereInput | boolean
    connect?: ReferralCodeWhereUniqueInput
    update?: XOR<XOR<ReferralCodeUpdateToOneWithWhereWithoutOwnerInput, ReferralCodeUpdateWithoutOwnerInput>, ReferralCodeUncheckedUpdateWithoutOwnerInput>
  }

  export type AffiliateCommissionUpdateManyWithoutSnapperNestedInput = {
    create?: XOR<AffiliateCommissionCreateWithoutSnapperInput, AffiliateCommissionUncheckedCreateWithoutSnapperInput> | AffiliateCommissionCreateWithoutSnapperInput[] | AffiliateCommissionUncheckedCreateWithoutSnapperInput[]
    connectOrCreate?: AffiliateCommissionCreateOrConnectWithoutSnapperInput | AffiliateCommissionCreateOrConnectWithoutSnapperInput[]
    upsert?: AffiliateCommissionUpsertWithWhereUniqueWithoutSnapperInput | AffiliateCommissionUpsertWithWhereUniqueWithoutSnapperInput[]
    createMany?: AffiliateCommissionCreateManySnapperInputEnvelope
    set?: AffiliateCommissionWhereUniqueInput | AffiliateCommissionWhereUniqueInput[]
    disconnect?: AffiliateCommissionWhereUniqueInput | AffiliateCommissionWhereUniqueInput[]
    delete?: AffiliateCommissionWhereUniqueInput | AffiliateCommissionWhereUniqueInput[]
    connect?: AffiliateCommissionWhereUniqueInput | AffiliateCommissionWhereUniqueInput[]
    update?: AffiliateCommissionUpdateWithWhereUniqueWithoutSnapperInput | AffiliateCommissionUpdateWithWhereUniqueWithoutSnapperInput[]
    updateMany?: AffiliateCommissionUpdateManyWithWhereWithoutSnapperInput | AffiliateCommissionUpdateManyWithWhereWithoutSnapperInput[]
    deleteMany?: AffiliateCommissionScalarWhereInput | AffiliateCommissionScalarWhereInput[]
  }

  export type ReferralUsageUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ReferralUsageCreateWithoutUserInput, ReferralUsageUncheckedCreateWithoutUserInput> | ReferralUsageCreateWithoutUserInput[] | ReferralUsageUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReferralUsageCreateOrConnectWithoutUserInput | ReferralUsageCreateOrConnectWithoutUserInput[]
    upsert?: ReferralUsageUpsertWithWhereUniqueWithoutUserInput | ReferralUsageUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ReferralUsageCreateManyUserInputEnvelope
    set?: ReferralUsageWhereUniqueInput | ReferralUsageWhereUniqueInput[]
    disconnect?: ReferralUsageWhereUniqueInput | ReferralUsageWhereUniqueInput[]
    delete?: ReferralUsageWhereUniqueInput | ReferralUsageWhereUniqueInput[]
    connect?: ReferralUsageWhereUniqueInput | ReferralUsageWhereUniqueInput[]
    update?: ReferralUsageUpdateWithWhereUniqueWithoutUserInput | ReferralUsageUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ReferralUsageUpdateManyWithWhereWithoutUserInput | ReferralUsageUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ReferralUsageScalarWhereInput | ReferralUsageScalarWhereInput[]
  }

  export type TransactionUncheckedUpdateManyWithoutCashierNestedInput = {
    create?: XOR<TransactionCreateWithoutCashierInput, TransactionUncheckedCreateWithoutCashierInput> | TransactionCreateWithoutCashierInput[] | TransactionUncheckedCreateWithoutCashierInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutCashierInput | TransactionCreateOrConnectWithoutCashierInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutCashierInput | TransactionUpsertWithWhereUniqueWithoutCashierInput[]
    createMany?: TransactionCreateManyCashierInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutCashierInput | TransactionUpdateWithWhereUniqueWithoutCashierInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutCashierInput | TransactionUpdateManyWithWhereWithoutCashierInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type ReferralCodeUncheckedUpdateOneWithoutOwnerNestedInput = {
    create?: XOR<ReferralCodeCreateWithoutOwnerInput, ReferralCodeUncheckedCreateWithoutOwnerInput>
    connectOrCreate?: ReferralCodeCreateOrConnectWithoutOwnerInput
    upsert?: ReferralCodeUpsertWithoutOwnerInput
    disconnect?: ReferralCodeWhereInput | boolean
    delete?: ReferralCodeWhereInput | boolean
    connect?: ReferralCodeWhereUniqueInput
    update?: XOR<XOR<ReferralCodeUpdateToOneWithWhereWithoutOwnerInput, ReferralCodeUpdateWithoutOwnerInput>, ReferralCodeUncheckedUpdateWithoutOwnerInput>
  }

  export type AffiliateCommissionUncheckedUpdateManyWithoutSnapperNestedInput = {
    create?: XOR<AffiliateCommissionCreateWithoutSnapperInput, AffiliateCommissionUncheckedCreateWithoutSnapperInput> | AffiliateCommissionCreateWithoutSnapperInput[] | AffiliateCommissionUncheckedCreateWithoutSnapperInput[]
    connectOrCreate?: AffiliateCommissionCreateOrConnectWithoutSnapperInput | AffiliateCommissionCreateOrConnectWithoutSnapperInput[]
    upsert?: AffiliateCommissionUpsertWithWhereUniqueWithoutSnapperInput | AffiliateCommissionUpsertWithWhereUniqueWithoutSnapperInput[]
    createMany?: AffiliateCommissionCreateManySnapperInputEnvelope
    set?: AffiliateCommissionWhereUniqueInput | AffiliateCommissionWhereUniqueInput[]
    disconnect?: AffiliateCommissionWhereUniqueInput | AffiliateCommissionWhereUniqueInput[]
    delete?: AffiliateCommissionWhereUniqueInput | AffiliateCommissionWhereUniqueInput[]
    connect?: AffiliateCommissionWhereUniqueInput | AffiliateCommissionWhereUniqueInput[]
    update?: AffiliateCommissionUpdateWithWhereUniqueWithoutSnapperInput | AffiliateCommissionUpdateWithWhereUniqueWithoutSnapperInput[]
    updateMany?: AffiliateCommissionUpdateManyWithWhereWithoutSnapperInput | AffiliateCommissionUpdateManyWithWhereWithoutSnapperInput[]
    deleteMany?: AffiliateCommissionScalarWhereInput | AffiliateCommissionScalarWhereInput[]
  }

  export type AffiliatePostCreatehashtagsInput = {
    set: string[]
  }

  export type AffiliatePostUpdatehashtagsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type UserCreateNestedOneWithoutCommissionsInput = {
    create?: XOR<UserCreateWithoutCommissionsInput, UserUncheckedCreateWithoutCommissionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCommissionsInput
    connect?: UserWhereUniqueInput
  }

  export type BookingCreateNestedOneWithoutCommissionsInput = {
    create?: XOR<BookingCreateWithoutCommissionsInput, BookingUncheckedCreateWithoutCommissionsInput>
    connectOrCreate?: BookingCreateOrConnectWithoutCommissionsInput
    connect?: BookingWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutCommissionsNestedInput = {
    create?: XOR<UserCreateWithoutCommissionsInput, UserUncheckedCreateWithoutCommissionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCommissionsInput
    upsert?: UserUpsertWithoutCommissionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCommissionsInput, UserUpdateWithoutCommissionsInput>, UserUncheckedUpdateWithoutCommissionsInput>
  }

  export type BookingUpdateOneRequiredWithoutCommissionsNestedInput = {
    create?: XOR<BookingCreateWithoutCommissionsInput, BookingUncheckedCreateWithoutCommissionsInput>
    connectOrCreate?: BookingCreateOrConnectWithoutCommissionsInput
    upsert?: BookingUpsertWithoutCommissionsInput
    connect?: BookingWhereUniqueInput
    update?: XOR<XOR<BookingUpdateToOneWithWhereWithoutCommissionsInput, BookingUpdateWithoutCommissionsInput>, BookingUncheckedUpdateWithoutCommissionsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumPaymentMethodFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentMethod | EnumPaymentMethodFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentMethodFilter<$PrismaModel> | $Enums.PaymentMethod
  }

  export type NestedEnumTransactionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionStatus | EnumTransactionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionStatus[] | ListEnumTransactionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransactionStatus[] | ListEnumTransactionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTransactionStatusFilter<$PrismaModel> | $Enums.TransactionStatus
  }

  export type NestedEnumPaymentMethodWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentMethod | EnumPaymentMethodFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentMethodWithAggregatesFilter<$PrismaModel> | $Enums.PaymentMethod
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentMethodFilter<$PrismaModel>
    _max?: NestedEnumPaymentMethodFilter<$PrismaModel>
  }

  export type NestedEnumTransactionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionStatus | EnumTransactionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionStatus[] | ListEnumTransactionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransactionStatus[] | ListEnumTransactionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTransactionStatusWithAggregatesFilter<$PrismaModel> | $Enums.TransactionStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTransactionStatusFilter<$PrismaModel>
    _max?: NestedEnumTransactionStatusFilter<$PrismaModel>
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type UserCreateWithoutReferralCodeInput = {
    id?: string
    name: string
    email: string
    password: string
    role?: $Enums.Role
    phone?: string | null
    bankName?: string | null
    bankAccount?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    referral_usages?: ReferralUsageCreateNestedManyWithoutUserInput
    transactions?: TransactionCreateNestedManyWithoutCashierInput
    commissions?: AffiliateCommissionCreateNestedManyWithoutSnapperInput
  }

  export type UserUncheckedCreateWithoutReferralCodeInput = {
    id?: string
    name: string
    email: string
    password: string
    role?: $Enums.Role
    phone?: string | null
    bankName?: string | null
    bankAccount?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    referral_usages?: ReferralUsageUncheckedCreateNestedManyWithoutUserInput
    transactions?: TransactionUncheckedCreateNestedManyWithoutCashierInput
    commissions?: AffiliateCommissionUncheckedCreateNestedManyWithoutSnapperInput
  }

  export type UserCreateOrConnectWithoutReferralCodeInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutReferralCodeInput, UserUncheckedCreateWithoutReferralCodeInput>
  }

  export type ReferralUsageCreateWithoutReferralCodeInput = {
    id?: string
    usedAt?: Date | string
    transaction: TransactionCreateNestedOneWithoutReferralUsageInput
    user: UserCreateNestedOneWithoutReferral_usagesInput
  }

  export type ReferralUsageUncheckedCreateWithoutReferralCodeInput = {
    id?: string
    transactionId: string
    userId: string
    usedAt?: Date | string
  }

  export type ReferralUsageCreateOrConnectWithoutReferralCodeInput = {
    where: ReferralUsageWhereUniqueInput
    create: XOR<ReferralUsageCreateWithoutReferralCodeInput, ReferralUsageUncheckedCreateWithoutReferralCodeInput>
  }

  export type ReferralUsageCreateManyReferralCodeInputEnvelope = {
    data: ReferralUsageCreateManyReferralCodeInput | ReferralUsageCreateManyReferralCodeInput[]
    skipDuplicates?: boolean
  }

  export type TransactionCreateWithoutReferralCodeInput = {
    id?: string
    invoiceNumber: string
    total: number
    tax: number
    discount?: number
    paymentMethod: $Enums.PaymentMethod
    status?: $Enums.TransactionStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    referralUsage?: ReferralUsageCreateNestedOneWithoutTransactionInput
    items?: TransactionItemCreateNestedManyWithoutTransactionInput
    cashier: UserCreateNestedOneWithoutTransactionsInput
  }

  export type TransactionUncheckedCreateWithoutReferralCodeInput = {
    id?: string
    invoiceNumber: string
    cashierId: string
    total: number
    tax: number
    discount?: number
    paymentMethod: $Enums.PaymentMethod
    status?: $Enums.TransactionStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    referralUsage?: ReferralUsageUncheckedCreateNestedOneWithoutTransactionInput
    items?: TransactionItemUncheckedCreateNestedManyWithoutTransactionInput
  }

  export type TransactionCreateOrConnectWithoutReferralCodeInput = {
    where: TransactionWhereUniqueInput
    create: XOR<TransactionCreateWithoutReferralCodeInput, TransactionUncheckedCreateWithoutReferralCodeInput>
  }

  export type TransactionCreateManyReferralCodeInputEnvelope = {
    data: TransactionCreateManyReferralCodeInput | TransactionCreateManyReferralCodeInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutReferralCodeInput = {
    update: XOR<UserUpdateWithoutReferralCodeInput, UserUncheckedUpdateWithoutReferralCodeInput>
    create: XOR<UserCreateWithoutReferralCodeInput, UserUncheckedCreateWithoutReferralCodeInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutReferralCodeInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutReferralCodeInput, UserUncheckedUpdateWithoutReferralCodeInput>
  }

  export type UserUpdateWithoutReferralCodeInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    bankName?: NullableStringFieldUpdateOperationsInput | string | null
    bankAccount?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    referral_usages?: ReferralUsageUpdateManyWithoutUserNestedInput
    transactions?: TransactionUpdateManyWithoutCashierNestedInput
    commissions?: AffiliateCommissionUpdateManyWithoutSnapperNestedInput
  }

  export type UserUncheckedUpdateWithoutReferralCodeInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    bankName?: NullableStringFieldUpdateOperationsInput | string | null
    bankAccount?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    referral_usages?: ReferralUsageUncheckedUpdateManyWithoutUserNestedInput
    transactions?: TransactionUncheckedUpdateManyWithoutCashierNestedInput
    commissions?: AffiliateCommissionUncheckedUpdateManyWithoutSnapperNestedInput
  }

  export type ReferralUsageUpsertWithWhereUniqueWithoutReferralCodeInput = {
    where: ReferralUsageWhereUniqueInput
    update: XOR<ReferralUsageUpdateWithoutReferralCodeInput, ReferralUsageUncheckedUpdateWithoutReferralCodeInput>
    create: XOR<ReferralUsageCreateWithoutReferralCodeInput, ReferralUsageUncheckedCreateWithoutReferralCodeInput>
  }

  export type ReferralUsageUpdateWithWhereUniqueWithoutReferralCodeInput = {
    where: ReferralUsageWhereUniqueInput
    data: XOR<ReferralUsageUpdateWithoutReferralCodeInput, ReferralUsageUncheckedUpdateWithoutReferralCodeInput>
  }

  export type ReferralUsageUpdateManyWithWhereWithoutReferralCodeInput = {
    where: ReferralUsageScalarWhereInput
    data: XOR<ReferralUsageUpdateManyMutationInput, ReferralUsageUncheckedUpdateManyWithoutReferralCodeInput>
  }

  export type ReferralUsageScalarWhereInput = {
    AND?: ReferralUsageScalarWhereInput | ReferralUsageScalarWhereInput[]
    OR?: ReferralUsageScalarWhereInput[]
    NOT?: ReferralUsageScalarWhereInput | ReferralUsageScalarWhereInput[]
    id?: StringFilter<"ReferralUsage"> | string
    referralCodeId?: StringFilter<"ReferralUsage"> | string
    transactionId?: StringFilter<"ReferralUsage"> | string
    userId?: StringFilter<"ReferralUsage"> | string
    usedAt?: DateTimeFilter<"ReferralUsage"> | Date | string
  }

  export type TransactionUpsertWithWhereUniqueWithoutReferralCodeInput = {
    where: TransactionWhereUniqueInput
    update: XOR<TransactionUpdateWithoutReferralCodeInput, TransactionUncheckedUpdateWithoutReferralCodeInput>
    create: XOR<TransactionCreateWithoutReferralCodeInput, TransactionUncheckedCreateWithoutReferralCodeInput>
  }

  export type TransactionUpdateWithWhereUniqueWithoutReferralCodeInput = {
    where: TransactionWhereUniqueInput
    data: XOR<TransactionUpdateWithoutReferralCodeInput, TransactionUncheckedUpdateWithoutReferralCodeInput>
  }

  export type TransactionUpdateManyWithWhereWithoutReferralCodeInput = {
    where: TransactionScalarWhereInput
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyWithoutReferralCodeInput>
  }

  export type TransactionScalarWhereInput = {
    AND?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
    OR?: TransactionScalarWhereInput[]
    NOT?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
    id?: StringFilter<"Transaction"> | string
    invoiceNumber?: StringFilter<"Transaction"> | string
    cashierId?: StringFilter<"Transaction"> | string
    total?: FloatFilter<"Transaction"> | number
    tax?: FloatFilter<"Transaction"> | number
    discount?: FloatFilter<"Transaction"> | number
    paymentMethod?: EnumPaymentMethodFilter<"Transaction"> | $Enums.PaymentMethod
    referralCodeId?: StringNullableFilter<"Transaction"> | string | null
    status?: EnumTransactionStatusFilter<"Transaction"> | $Enums.TransactionStatus
    createdAt?: DateTimeFilter<"Transaction"> | Date | string
    updatedAt?: DateTimeFilter<"Transaction"> | Date | string
  }

  export type AffiliateCommissionCreateWithoutBookingInput = {
    id?: string
    amount: number
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    snapper: UserCreateNestedOneWithoutCommissionsInput
  }

  export type AffiliateCommissionUncheckedCreateWithoutBookingInput = {
    id?: string
    snapperId: string
    amount: number
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AffiliateCommissionCreateOrConnectWithoutBookingInput = {
    where: AffiliateCommissionWhereUniqueInput
    create: XOR<AffiliateCommissionCreateWithoutBookingInput, AffiliateCommissionUncheckedCreateWithoutBookingInput>
  }

  export type AffiliateCommissionCreateManyBookingInputEnvelope = {
    data: AffiliateCommissionCreateManyBookingInput | AffiliateCommissionCreateManyBookingInput[]
    skipDuplicates?: boolean
  }

  export type AffiliateCommissionUpsertWithWhereUniqueWithoutBookingInput = {
    where: AffiliateCommissionWhereUniqueInput
    update: XOR<AffiliateCommissionUpdateWithoutBookingInput, AffiliateCommissionUncheckedUpdateWithoutBookingInput>
    create: XOR<AffiliateCommissionCreateWithoutBookingInput, AffiliateCommissionUncheckedCreateWithoutBookingInput>
  }

  export type AffiliateCommissionUpdateWithWhereUniqueWithoutBookingInput = {
    where: AffiliateCommissionWhereUniqueInput
    data: XOR<AffiliateCommissionUpdateWithoutBookingInput, AffiliateCommissionUncheckedUpdateWithoutBookingInput>
  }

  export type AffiliateCommissionUpdateManyWithWhereWithoutBookingInput = {
    where: AffiliateCommissionScalarWhereInput
    data: XOR<AffiliateCommissionUpdateManyMutationInput, AffiliateCommissionUncheckedUpdateManyWithoutBookingInput>
  }

  export type AffiliateCommissionScalarWhereInput = {
    AND?: AffiliateCommissionScalarWhereInput | AffiliateCommissionScalarWhereInput[]
    OR?: AffiliateCommissionScalarWhereInput[]
    NOT?: AffiliateCommissionScalarWhereInput | AffiliateCommissionScalarWhereInput[]
    id?: StringFilter<"AffiliateCommission"> | string
    snapperId?: StringFilter<"AffiliateCommission"> | string
    bookingId?: StringFilter<"AffiliateCommission"> | string
    amount?: FloatFilter<"AffiliateCommission"> | number
    status?: StringFilter<"AffiliateCommission"> | string
    createdAt?: DateTimeFilter<"AffiliateCommission"> | Date | string
    updatedAt?: DateTimeFilter<"AffiliateCommission"> | Date | string
  }

  export type ProductCreateWithoutCategoryInput = {
    id?: string
    name: string
    sku: string
    price: number
    stock: number
    image?: string | null
    duration?: string | null
    photoCount?: string | null
    features?: ProductCreatefeaturesInput | string[]
    isPopular?: boolean
    sortOrder?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    transaction_items?: TransactionItemCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutCategoryInput = {
    id?: string
    name: string
    sku: string
    price: number
    stock: number
    image?: string | null
    duration?: string | null
    photoCount?: string | null
    features?: ProductCreatefeaturesInput | string[]
    isPopular?: boolean
    sortOrder?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    transaction_items?: TransactionItemUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutCategoryInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput>
  }

  export type ProductCreateManyCategoryInputEnvelope = {
    data: ProductCreateManyCategoryInput | ProductCreateManyCategoryInput[]
    skipDuplicates?: boolean
  }

  export type ProductUpsertWithWhereUniqueWithoutCategoryInput = {
    where: ProductWhereUniqueInput
    update: XOR<ProductUpdateWithoutCategoryInput, ProductUncheckedUpdateWithoutCategoryInput>
    create: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput>
  }

  export type ProductUpdateWithWhereUniqueWithoutCategoryInput = {
    where: ProductWhereUniqueInput
    data: XOR<ProductUpdateWithoutCategoryInput, ProductUncheckedUpdateWithoutCategoryInput>
  }

  export type ProductUpdateManyWithWhereWithoutCategoryInput = {
    where: ProductScalarWhereInput
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyWithoutCategoryInput>
  }

  export type ProductScalarWhereInput = {
    AND?: ProductScalarWhereInput | ProductScalarWhereInput[]
    OR?: ProductScalarWhereInput[]
    NOT?: ProductScalarWhereInput | ProductScalarWhereInput[]
    id?: StringFilter<"Product"> | string
    name?: StringFilter<"Product"> | string
    sku?: StringFilter<"Product"> | string
    price?: FloatFilter<"Product"> | number
    stock?: IntFilter<"Product"> | number
    image?: StringNullableFilter<"Product"> | string | null
    duration?: StringNullableFilter<"Product"> | string | null
    photoCount?: StringNullableFilter<"Product"> | string | null
    features?: StringNullableListFilter<"Product">
    isPopular?: BoolFilter<"Product"> | boolean
    sortOrder?: IntFilter<"Product"> | number
    categoryId?: StringFilter<"Product"> | string
    isActive?: BoolFilter<"Product"> | boolean
    createdAt?: DateTimeFilter<"Product"> | Date | string
    updatedAt?: DateTimeFilter<"Product"> | Date | string
  }

  export type CategoryCreateWithoutProductsInput = {
    id?: string
    name: string
    slug: string
  }

  export type CategoryUncheckedCreateWithoutProductsInput = {
    id?: string
    name: string
    slug: string
  }

  export type CategoryCreateOrConnectWithoutProductsInput = {
    where: CategoryWhereUniqueInput
    create: XOR<CategoryCreateWithoutProductsInput, CategoryUncheckedCreateWithoutProductsInput>
  }

  export type TransactionItemCreateWithoutProductInput = {
    id?: string
    qty: number
    price: number
    subtotal: number
    transaction: TransactionCreateNestedOneWithoutItemsInput
  }

  export type TransactionItemUncheckedCreateWithoutProductInput = {
    id?: string
    transactionId: string
    qty: number
    price: number
    subtotal: number
  }

  export type TransactionItemCreateOrConnectWithoutProductInput = {
    where: TransactionItemWhereUniqueInput
    create: XOR<TransactionItemCreateWithoutProductInput, TransactionItemUncheckedCreateWithoutProductInput>
  }

  export type TransactionItemCreateManyProductInputEnvelope = {
    data: TransactionItemCreateManyProductInput | TransactionItemCreateManyProductInput[]
    skipDuplicates?: boolean
  }

  export type CategoryUpsertWithoutProductsInput = {
    update: XOR<CategoryUpdateWithoutProductsInput, CategoryUncheckedUpdateWithoutProductsInput>
    create: XOR<CategoryCreateWithoutProductsInput, CategoryUncheckedCreateWithoutProductsInput>
    where?: CategoryWhereInput
  }

  export type CategoryUpdateToOneWithWhereWithoutProductsInput = {
    where?: CategoryWhereInput
    data: XOR<CategoryUpdateWithoutProductsInput, CategoryUncheckedUpdateWithoutProductsInput>
  }

  export type CategoryUpdateWithoutProductsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
  }

  export type CategoryUncheckedUpdateWithoutProductsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
  }

  export type TransactionItemUpsertWithWhereUniqueWithoutProductInput = {
    where: TransactionItemWhereUniqueInput
    update: XOR<TransactionItemUpdateWithoutProductInput, TransactionItemUncheckedUpdateWithoutProductInput>
    create: XOR<TransactionItemCreateWithoutProductInput, TransactionItemUncheckedCreateWithoutProductInput>
  }

  export type TransactionItemUpdateWithWhereUniqueWithoutProductInput = {
    where: TransactionItemWhereUniqueInput
    data: XOR<TransactionItemUpdateWithoutProductInput, TransactionItemUncheckedUpdateWithoutProductInput>
  }

  export type TransactionItemUpdateManyWithWhereWithoutProductInput = {
    where: TransactionItemScalarWhereInput
    data: XOR<TransactionItemUpdateManyMutationInput, TransactionItemUncheckedUpdateManyWithoutProductInput>
  }

  export type TransactionItemScalarWhereInput = {
    AND?: TransactionItemScalarWhereInput | TransactionItemScalarWhereInput[]
    OR?: TransactionItemScalarWhereInput[]
    NOT?: TransactionItemScalarWhereInput | TransactionItemScalarWhereInput[]
    id?: StringFilter<"TransactionItem"> | string
    transactionId?: StringFilter<"TransactionItem"> | string
    productId?: StringFilter<"TransactionItem"> | string
    qty?: IntFilter<"TransactionItem"> | number
    price?: FloatFilter<"TransactionItem"> | number
    subtotal?: FloatFilter<"TransactionItem"> | number
  }

  export type ReferralCodeCreateWithoutReferral_usagesInput = {
    id?: string
    code: string
    marketerName?: string
    discountPct: number
    maxDiscountAmount?: number
    feePercentage?: number
    bankName?: string | null
    bankAccount?: string | null
    expiryDate?: Date | string | null
    usageLimit?: number | null
    usageCount?: number
    isActive?: boolean
    targetProductId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    owner?: UserCreateNestedOneWithoutReferralCodeInput
    transactions?: TransactionCreateNestedManyWithoutReferralCodeInput
  }

  export type ReferralCodeUncheckedCreateWithoutReferral_usagesInput = {
    id?: string
    code: string
    marketerName?: string
    discountPct: number
    maxDiscountAmount?: number
    feePercentage?: number
    bankName?: string | null
    bankAccount?: string | null
    expiryDate?: Date | string | null
    usageLimit?: number | null
    usageCount?: number
    isActive?: boolean
    ownerId?: string | null
    targetProductId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    transactions?: TransactionUncheckedCreateNestedManyWithoutReferralCodeInput
  }

  export type ReferralCodeCreateOrConnectWithoutReferral_usagesInput = {
    where: ReferralCodeWhereUniqueInput
    create: XOR<ReferralCodeCreateWithoutReferral_usagesInput, ReferralCodeUncheckedCreateWithoutReferral_usagesInput>
  }

  export type TransactionCreateWithoutReferralUsageInput = {
    id?: string
    invoiceNumber: string
    total: number
    tax: number
    discount?: number
    paymentMethod: $Enums.PaymentMethod
    status?: $Enums.TransactionStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: TransactionItemCreateNestedManyWithoutTransactionInput
    cashier: UserCreateNestedOneWithoutTransactionsInput
    referralCode?: ReferralCodeCreateNestedOneWithoutTransactionsInput
  }

  export type TransactionUncheckedCreateWithoutReferralUsageInput = {
    id?: string
    invoiceNumber: string
    cashierId: string
    total: number
    tax: number
    discount?: number
    paymentMethod: $Enums.PaymentMethod
    referralCodeId?: string | null
    status?: $Enums.TransactionStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: TransactionItemUncheckedCreateNestedManyWithoutTransactionInput
  }

  export type TransactionCreateOrConnectWithoutReferralUsageInput = {
    where: TransactionWhereUniqueInput
    create: XOR<TransactionCreateWithoutReferralUsageInput, TransactionUncheckedCreateWithoutReferralUsageInput>
  }

  export type UserCreateWithoutReferral_usagesInput = {
    id?: string
    name: string
    email: string
    password: string
    role?: $Enums.Role
    phone?: string | null
    bankName?: string | null
    bankAccount?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    transactions?: TransactionCreateNestedManyWithoutCashierInput
    referralCode?: ReferralCodeCreateNestedOneWithoutOwnerInput
    commissions?: AffiliateCommissionCreateNestedManyWithoutSnapperInput
  }

  export type UserUncheckedCreateWithoutReferral_usagesInput = {
    id?: string
    name: string
    email: string
    password: string
    role?: $Enums.Role
    phone?: string | null
    bankName?: string | null
    bankAccount?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    transactions?: TransactionUncheckedCreateNestedManyWithoutCashierInput
    referralCode?: ReferralCodeUncheckedCreateNestedOneWithoutOwnerInput
    commissions?: AffiliateCommissionUncheckedCreateNestedManyWithoutSnapperInput
  }

  export type UserCreateOrConnectWithoutReferral_usagesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutReferral_usagesInput, UserUncheckedCreateWithoutReferral_usagesInput>
  }

  export type ReferralCodeUpsertWithoutReferral_usagesInput = {
    update: XOR<ReferralCodeUpdateWithoutReferral_usagesInput, ReferralCodeUncheckedUpdateWithoutReferral_usagesInput>
    create: XOR<ReferralCodeCreateWithoutReferral_usagesInput, ReferralCodeUncheckedCreateWithoutReferral_usagesInput>
    where?: ReferralCodeWhereInput
  }

  export type ReferralCodeUpdateToOneWithWhereWithoutReferral_usagesInput = {
    where?: ReferralCodeWhereInput
    data: XOR<ReferralCodeUpdateWithoutReferral_usagesInput, ReferralCodeUncheckedUpdateWithoutReferral_usagesInput>
  }

  export type ReferralCodeUpdateWithoutReferral_usagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    marketerName?: StringFieldUpdateOperationsInput | string
    discountPct?: FloatFieldUpdateOperationsInput | number
    maxDiscountAmount?: FloatFieldUpdateOperationsInput | number
    feePercentage?: FloatFieldUpdateOperationsInput | number
    bankName?: NullableStringFieldUpdateOperationsInput | string | null
    bankAccount?: NullableStringFieldUpdateOperationsInput | string | null
    expiryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    usageLimit?: NullableIntFieldUpdateOperationsInput | number | null
    usageCount?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    targetProductId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: UserUpdateOneWithoutReferralCodeNestedInput
    transactions?: TransactionUpdateManyWithoutReferralCodeNestedInput
  }

  export type ReferralCodeUncheckedUpdateWithoutReferral_usagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    marketerName?: StringFieldUpdateOperationsInput | string
    discountPct?: FloatFieldUpdateOperationsInput | number
    maxDiscountAmount?: FloatFieldUpdateOperationsInput | number
    feePercentage?: FloatFieldUpdateOperationsInput | number
    bankName?: NullableStringFieldUpdateOperationsInput | string | null
    bankAccount?: NullableStringFieldUpdateOperationsInput | string | null
    expiryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    usageLimit?: NullableIntFieldUpdateOperationsInput | number | null
    usageCount?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    ownerId?: NullableStringFieldUpdateOperationsInput | string | null
    targetProductId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactions?: TransactionUncheckedUpdateManyWithoutReferralCodeNestedInput
  }

  export type TransactionUpsertWithoutReferralUsageInput = {
    update: XOR<TransactionUpdateWithoutReferralUsageInput, TransactionUncheckedUpdateWithoutReferralUsageInput>
    create: XOR<TransactionCreateWithoutReferralUsageInput, TransactionUncheckedCreateWithoutReferralUsageInput>
    where?: TransactionWhereInput
  }

  export type TransactionUpdateToOneWithWhereWithoutReferralUsageInput = {
    where?: TransactionWhereInput
    data: XOR<TransactionUpdateWithoutReferralUsageInput, TransactionUncheckedUpdateWithoutReferralUsageInput>
  }

  export type TransactionUpdateWithoutReferralUsageInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoiceNumber?: StringFieldUpdateOperationsInput | string
    total?: FloatFieldUpdateOperationsInput | number
    tax?: FloatFieldUpdateOperationsInput | number
    discount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    status?: EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: TransactionItemUpdateManyWithoutTransactionNestedInput
    cashier?: UserUpdateOneRequiredWithoutTransactionsNestedInput
    referralCode?: ReferralCodeUpdateOneWithoutTransactionsNestedInput
  }

  export type TransactionUncheckedUpdateWithoutReferralUsageInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoiceNumber?: StringFieldUpdateOperationsInput | string
    cashierId?: StringFieldUpdateOperationsInput | string
    total?: FloatFieldUpdateOperationsInput | number
    tax?: FloatFieldUpdateOperationsInput | number
    discount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    referralCodeId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: TransactionItemUncheckedUpdateManyWithoutTransactionNestedInput
  }

  export type UserUpsertWithoutReferral_usagesInput = {
    update: XOR<UserUpdateWithoutReferral_usagesInput, UserUncheckedUpdateWithoutReferral_usagesInput>
    create: XOR<UserCreateWithoutReferral_usagesInput, UserUncheckedCreateWithoutReferral_usagesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutReferral_usagesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutReferral_usagesInput, UserUncheckedUpdateWithoutReferral_usagesInput>
  }

  export type UserUpdateWithoutReferral_usagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    bankName?: NullableStringFieldUpdateOperationsInput | string | null
    bankAccount?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactions?: TransactionUpdateManyWithoutCashierNestedInput
    referralCode?: ReferralCodeUpdateOneWithoutOwnerNestedInput
    commissions?: AffiliateCommissionUpdateManyWithoutSnapperNestedInput
  }

  export type UserUncheckedUpdateWithoutReferral_usagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    bankName?: NullableStringFieldUpdateOperationsInput | string | null
    bankAccount?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactions?: TransactionUncheckedUpdateManyWithoutCashierNestedInput
    referralCode?: ReferralCodeUncheckedUpdateOneWithoutOwnerNestedInput
    commissions?: AffiliateCommissionUncheckedUpdateManyWithoutSnapperNestedInput
  }

  export type ProductCreateWithoutTransaction_itemsInput = {
    id?: string
    name: string
    sku: string
    price: number
    stock: number
    image?: string | null
    duration?: string | null
    photoCount?: string | null
    features?: ProductCreatefeaturesInput | string[]
    isPopular?: boolean
    sortOrder?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    category: CategoryCreateNestedOneWithoutProductsInput
  }

  export type ProductUncheckedCreateWithoutTransaction_itemsInput = {
    id?: string
    name: string
    sku: string
    price: number
    stock: number
    image?: string | null
    duration?: string | null
    photoCount?: string | null
    features?: ProductCreatefeaturesInput | string[]
    isPopular?: boolean
    sortOrder?: number
    categoryId: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductCreateOrConnectWithoutTransaction_itemsInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutTransaction_itemsInput, ProductUncheckedCreateWithoutTransaction_itemsInput>
  }

  export type TransactionCreateWithoutItemsInput = {
    id?: string
    invoiceNumber: string
    total: number
    tax: number
    discount?: number
    paymentMethod: $Enums.PaymentMethod
    status?: $Enums.TransactionStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    referralUsage?: ReferralUsageCreateNestedOneWithoutTransactionInput
    cashier: UserCreateNestedOneWithoutTransactionsInput
    referralCode?: ReferralCodeCreateNestedOneWithoutTransactionsInput
  }

  export type TransactionUncheckedCreateWithoutItemsInput = {
    id?: string
    invoiceNumber: string
    cashierId: string
    total: number
    tax: number
    discount?: number
    paymentMethod: $Enums.PaymentMethod
    referralCodeId?: string | null
    status?: $Enums.TransactionStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    referralUsage?: ReferralUsageUncheckedCreateNestedOneWithoutTransactionInput
  }

  export type TransactionCreateOrConnectWithoutItemsInput = {
    where: TransactionWhereUniqueInput
    create: XOR<TransactionCreateWithoutItemsInput, TransactionUncheckedCreateWithoutItemsInput>
  }

  export type ProductUpsertWithoutTransaction_itemsInput = {
    update: XOR<ProductUpdateWithoutTransaction_itemsInput, ProductUncheckedUpdateWithoutTransaction_itemsInput>
    create: XOR<ProductCreateWithoutTransaction_itemsInput, ProductUncheckedCreateWithoutTransaction_itemsInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutTransaction_itemsInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutTransaction_itemsInput, ProductUncheckedUpdateWithoutTransaction_itemsInput>
  }

  export type ProductUpdateWithoutTransaction_itemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    stock?: IntFieldUpdateOperationsInput | number
    image?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    photoCount?: NullableStringFieldUpdateOperationsInput | string | null
    features?: ProductUpdatefeaturesInput | string[]
    isPopular?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: CategoryUpdateOneRequiredWithoutProductsNestedInput
  }

  export type ProductUncheckedUpdateWithoutTransaction_itemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    stock?: IntFieldUpdateOperationsInput | number
    image?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    photoCount?: NullableStringFieldUpdateOperationsInput | string | null
    features?: ProductUpdatefeaturesInput | string[]
    isPopular?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    categoryId?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionUpsertWithoutItemsInput = {
    update: XOR<TransactionUpdateWithoutItemsInput, TransactionUncheckedUpdateWithoutItemsInput>
    create: XOR<TransactionCreateWithoutItemsInput, TransactionUncheckedCreateWithoutItemsInput>
    where?: TransactionWhereInput
  }

  export type TransactionUpdateToOneWithWhereWithoutItemsInput = {
    where?: TransactionWhereInput
    data: XOR<TransactionUpdateWithoutItemsInput, TransactionUncheckedUpdateWithoutItemsInput>
  }

  export type TransactionUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoiceNumber?: StringFieldUpdateOperationsInput | string
    total?: FloatFieldUpdateOperationsInput | number
    tax?: FloatFieldUpdateOperationsInput | number
    discount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    status?: EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    referralUsage?: ReferralUsageUpdateOneWithoutTransactionNestedInput
    cashier?: UserUpdateOneRequiredWithoutTransactionsNestedInput
    referralCode?: ReferralCodeUpdateOneWithoutTransactionsNestedInput
  }

  export type TransactionUncheckedUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoiceNumber?: StringFieldUpdateOperationsInput | string
    cashierId?: StringFieldUpdateOperationsInput | string
    total?: FloatFieldUpdateOperationsInput | number
    tax?: FloatFieldUpdateOperationsInput | number
    discount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    referralCodeId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    referralUsage?: ReferralUsageUncheckedUpdateOneWithoutTransactionNestedInput
  }

  export type ReferralUsageCreateWithoutTransactionInput = {
    id?: string
    usedAt?: Date | string
    referralCode: ReferralCodeCreateNestedOneWithoutReferral_usagesInput
    user: UserCreateNestedOneWithoutReferral_usagesInput
  }

  export type ReferralUsageUncheckedCreateWithoutTransactionInput = {
    id?: string
    referralCodeId: string
    userId: string
    usedAt?: Date | string
  }

  export type ReferralUsageCreateOrConnectWithoutTransactionInput = {
    where: ReferralUsageWhereUniqueInput
    create: XOR<ReferralUsageCreateWithoutTransactionInput, ReferralUsageUncheckedCreateWithoutTransactionInput>
  }

  export type TransactionItemCreateWithoutTransactionInput = {
    id?: string
    qty: number
    price: number
    subtotal: number
    product: ProductCreateNestedOneWithoutTransaction_itemsInput
  }

  export type TransactionItemUncheckedCreateWithoutTransactionInput = {
    id?: string
    productId: string
    qty: number
    price: number
    subtotal: number
  }

  export type TransactionItemCreateOrConnectWithoutTransactionInput = {
    where: TransactionItemWhereUniqueInput
    create: XOR<TransactionItemCreateWithoutTransactionInput, TransactionItemUncheckedCreateWithoutTransactionInput>
  }

  export type TransactionItemCreateManyTransactionInputEnvelope = {
    data: TransactionItemCreateManyTransactionInput | TransactionItemCreateManyTransactionInput[]
    skipDuplicates?: boolean
  }

  export type UserCreateWithoutTransactionsInput = {
    id?: string
    name: string
    email: string
    password: string
    role?: $Enums.Role
    phone?: string | null
    bankName?: string | null
    bankAccount?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    referral_usages?: ReferralUsageCreateNestedManyWithoutUserInput
    referralCode?: ReferralCodeCreateNestedOneWithoutOwnerInput
    commissions?: AffiliateCommissionCreateNestedManyWithoutSnapperInput
  }

  export type UserUncheckedCreateWithoutTransactionsInput = {
    id?: string
    name: string
    email: string
    password: string
    role?: $Enums.Role
    phone?: string | null
    bankName?: string | null
    bankAccount?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    referral_usages?: ReferralUsageUncheckedCreateNestedManyWithoutUserInput
    referralCode?: ReferralCodeUncheckedCreateNestedOneWithoutOwnerInput
    commissions?: AffiliateCommissionUncheckedCreateNestedManyWithoutSnapperInput
  }

  export type UserCreateOrConnectWithoutTransactionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTransactionsInput, UserUncheckedCreateWithoutTransactionsInput>
  }

  export type ReferralCodeCreateWithoutTransactionsInput = {
    id?: string
    code: string
    marketerName?: string
    discountPct: number
    maxDiscountAmount?: number
    feePercentage?: number
    bankName?: string | null
    bankAccount?: string | null
    expiryDate?: Date | string | null
    usageLimit?: number | null
    usageCount?: number
    isActive?: boolean
    targetProductId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    owner?: UserCreateNestedOneWithoutReferralCodeInput
    referral_usages?: ReferralUsageCreateNestedManyWithoutReferralCodeInput
  }

  export type ReferralCodeUncheckedCreateWithoutTransactionsInput = {
    id?: string
    code: string
    marketerName?: string
    discountPct: number
    maxDiscountAmount?: number
    feePercentage?: number
    bankName?: string | null
    bankAccount?: string | null
    expiryDate?: Date | string | null
    usageLimit?: number | null
    usageCount?: number
    isActive?: boolean
    ownerId?: string | null
    targetProductId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    referral_usages?: ReferralUsageUncheckedCreateNestedManyWithoutReferralCodeInput
  }

  export type ReferralCodeCreateOrConnectWithoutTransactionsInput = {
    where: ReferralCodeWhereUniqueInput
    create: XOR<ReferralCodeCreateWithoutTransactionsInput, ReferralCodeUncheckedCreateWithoutTransactionsInput>
  }

  export type ReferralUsageUpsertWithoutTransactionInput = {
    update: XOR<ReferralUsageUpdateWithoutTransactionInput, ReferralUsageUncheckedUpdateWithoutTransactionInput>
    create: XOR<ReferralUsageCreateWithoutTransactionInput, ReferralUsageUncheckedCreateWithoutTransactionInput>
    where?: ReferralUsageWhereInput
  }

  export type ReferralUsageUpdateToOneWithWhereWithoutTransactionInput = {
    where?: ReferralUsageWhereInput
    data: XOR<ReferralUsageUpdateWithoutTransactionInput, ReferralUsageUncheckedUpdateWithoutTransactionInput>
  }

  export type ReferralUsageUpdateWithoutTransactionInput = {
    id?: StringFieldUpdateOperationsInput | string
    usedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    referralCode?: ReferralCodeUpdateOneRequiredWithoutReferral_usagesNestedInput
    user?: UserUpdateOneRequiredWithoutReferral_usagesNestedInput
  }

  export type ReferralUsageUncheckedUpdateWithoutTransactionInput = {
    id?: StringFieldUpdateOperationsInput | string
    referralCodeId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    usedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionItemUpsertWithWhereUniqueWithoutTransactionInput = {
    where: TransactionItemWhereUniqueInput
    update: XOR<TransactionItemUpdateWithoutTransactionInput, TransactionItemUncheckedUpdateWithoutTransactionInput>
    create: XOR<TransactionItemCreateWithoutTransactionInput, TransactionItemUncheckedCreateWithoutTransactionInput>
  }

  export type TransactionItemUpdateWithWhereUniqueWithoutTransactionInput = {
    where: TransactionItemWhereUniqueInput
    data: XOR<TransactionItemUpdateWithoutTransactionInput, TransactionItemUncheckedUpdateWithoutTransactionInput>
  }

  export type TransactionItemUpdateManyWithWhereWithoutTransactionInput = {
    where: TransactionItemScalarWhereInput
    data: XOR<TransactionItemUpdateManyMutationInput, TransactionItemUncheckedUpdateManyWithoutTransactionInput>
  }

  export type UserUpsertWithoutTransactionsInput = {
    update: XOR<UserUpdateWithoutTransactionsInput, UserUncheckedUpdateWithoutTransactionsInput>
    create: XOR<UserCreateWithoutTransactionsInput, UserUncheckedCreateWithoutTransactionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTransactionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTransactionsInput, UserUncheckedUpdateWithoutTransactionsInput>
  }

  export type UserUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    bankName?: NullableStringFieldUpdateOperationsInput | string | null
    bankAccount?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    referral_usages?: ReferralUsageUpdateManyWithoutUserNestedInput
    referralCode?: ReferralCodeUpdateOneWithoutOwnerNestedInput
    commissions?: AffiliateCommissionUpdateManyWithoutSnapperNestedInput
  }

  export type UserUncheckedUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    bankName?: NullableStringFieldUpdateOperationsInput | string | null
    bankAccount?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    referral_usages?: ReferralUsageUncheckedUpdateManyWithoutUserNestedInput
    referralCode?: ReferralCodeUncheckedUpdateOneWithoutOwnerNestedInput
    commissions?: AffiliateCommissionUncheckedUpdateManyWithoutSnapperNestedInput
  }

  export type ReferralCodeUpsertWithoutTransactionsInput = {
    update: XOR<ReferralCodeUpdateWithoutTransactionsInput, ReferralCodeUncheckedUpdateWithoutTransactionsInput>
    create: XOR<ReferralCodeCreateWithoutTransactionsInput, ReferralCodeUncheckedCreateWithoutTransactionsInput>
    where?: ReferralCodeWhereInput
  }

  export type ReferralCodeUpdateToOneWithWhereWithoutTransactionsInput = {
    where?: ReferralCodeWhereInput
    data: XOR<ReferralCodeUpdateWithoutTransactionsInput, ReferralCodeUncheckedUpdateWithoutTransactionsInput>
  }

  export type ReferralCodeUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    marketerName?: StringFieldUpdateOperationsInput | string
    discountPct?: FloatFieldUpdateOperationsInput | number
    maxDiscountAmount?: FloatFieldUpdateOperationsInput | number
    feePercentage?: FloatFieldUpdateOperationsInput | number
    bankName?: NullableStringFieldUpdateOperationsInput | string | null
    bankAccount?: NullableStringFieldUpdateOperationsInput | string | null
    expiryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    usageLimit?: NullableIntFieldUpdateOperationsInput | number | null
    usageCount?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    targetProductId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: UserUpdateOneWithoutReferralCodeNestedInput
    referral_usages?: ReferralUsageUpdateManyWithoutReferralCodeNestedInput
  }

  export type ReferralCodeUncheckedUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    marketerName?: StringFieldUpdateOperationsInput | string
    discountPct?: FloatFieldUpdateOperationsInput | number
    maxDiscountAmount?: FloatFieldUpdateOperationsInput | number
    feePercentage?: FloatFieldUpdateOperationsInput | number
    bankName?: NullableStringFieldUpdateOperationsInput | string | null
    bankAccount?: NullableStringFieldUpdateOperationsInput | string | null
    expiryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    usageLimit?: NullableIntFieldUpdateOperationsInput | number | null
    usageCount?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    ownerId?: NullableStringFieldUpdateOperationsInput | string | null
    targetProductId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    referral_usages?: ReferralUsageUncheckedUpdateManyWithoutReferralCodeNestedInput
  }

  export type ReferralUsageCreateWithoutUserInput = {
    id?: string
    usedAt?: Date | string
    referralCode: ReferralCodeCreateNestedOneWithoutReferral_usagesInput
    transaction: TransactionCreateNestedOneWithoutReferralUsageInput
  }

  export type ReferralUsageUncheckedCreateWithoutUserInput = {
    id?: string
    referralCodeId: string
    transactionId: string
    usedAt?: Date | string
  }

  export type ReferralUsageCreateOrConnectWithoutUserInput = {
    where: ReferralUsageWhereUniqueInput
    create: XOR<ReferralUsageCreateWithoutUserInput, ReferralUsageUncheckedCreateWithoutUserInput>
  }

  export type ReferralUsageCreateManyUserInputEnvelope = {
    data: ReferralUsageCreateManyUserInput | ReferralUsageCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type TransactionCreateWithoutCashierInput = {
    id?: string
    invoiceNumber: string
    total: number
    tax: number
    discount?: number
    paymentMethod: $Enums.PaymentMethod
    status?: $Enums.TransactionStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    referralUsage?: ReferralUsageCreateNestedOneWithoutTransactionInput
    items?: TransactionItemCreateNestedManyWithoutTransactionInput
    referralCode?: ReferralCodeCreateNestedOneWithoutTransactionsInput
  }

  export type TransactionUncheckedCreateWithoutCashierInput = {
    id?: string
    invoiceNumber: string
    total: number
    tax: number
    discount?: number
    paymentMethod: $Enums.PaymentMethod
    referralCodeId?: string | null
    status?: $Enums.TransactionStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    referralUsage?: ReferralUsageUncheckedCreateNestedOneWithoutTransactionInput
    items?: TransactionItemUncheckedCreateNestedManyWithoutTransactionInput
  }

  export type TransactionCreateOrConnectWithoutCashierInput = {
    where: TransactionWhereUniqueInput
    create: XOR<TransactionCreateWithoutCashierInput, TransactionUncheckedCreateWithoutCashierInput>
  }

  export type TransactionCreateManyCashierInputEnvelope = {
    data: TransactionCreateManyCashierInput | TransactionCreateManyCashierInput[]
    skipDuplicates?: boolean
  }

  export type ReferralCodeCreateWithoutOwnerInput = {
    id?: string
    code: string
    marketerName?: string
    discountPct: number
    maxDiscountAmount?: number
    feePercentage?: number
    bankName?: string | null
    bankAccount?: string | null
    expiryDate?: Date | string | null
    usageLimit?: number | null
    usageCount?: number
    isActive?: boolean
    targetProductId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    referral_usages?: ReferralUsageCreateNestedManyWithoutReferralCodeInput
    transactions?: TransactionCreateNestedManyWithoutReferralCodeInput
  }

  export type ReferralCodeUncheckedCreateWithoutOwnerInput = {
    id?: string
    code: string
    marketerName?: string
    discountPct: number
    maxDiscountAmount?: number
    feePercentage?: number
    bankName?: string | null
    bankAccount?: string | null
    expiryDate?: Date | string | null
    usageLimit?: number | null
    usageCount?: number
    isActive?: boolean
    targetProductId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    referral_usages?: ReferralUsageUncheckedCreateNestedManyWithoutReferralCodeInput
    transactions?: TransactionUncheckedCreateNestedManyWithoutReferralCodeInput
  }

  export type ReferralCodeCreateOrConnectWithoutOwnerInput = {
    where: ReferralCodeWhereUniqueInput
    create: XOR<ReferralCodeCreateWithoutOwnerInput, ReferralCodeUncheckedCreateWithoutOwnerInput>
  }

  export type AffiliateCommissionCreateWithoutSnapperInput = {
    id?: string
    amount: number
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    booking: BookingCreateNestedOneWithoutCommissionsInput
  }

  export type AffiliateCommissionUncheckedCreateWithoutSnapperInput = {
    id?: string
    bookingId: string
    amount: number
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AffiliateCommissionCreateOrConnectWithoutSnapperInput = {
    where: AffiliateCommissionWhereUniqueInput
    create: XOR<AffiliateCommissionCreateWithoutSnapperInput, AffiliateCommissionUncheckedCreateWithoutSnapperInput>
  }

  export type AffiliateCommissionCreateManySnapperInputEnvelope = {
    data: AffiliateCommissionCreateManySnapperInput | AffiliateCommissionCreateManySnapperInput[]
    skipDuplicates?: boolean
  }

  export type ReferralUsageUpsertWithWhereUniqueWithoutUserInput = {
    where: ReferralUsageWhereUniqueInput
    update: XOR<ReferralUsageUpdateWithoutUserInput, ReferralUsageUncheckedUpdateWithoutUserInput>
    create: XOR<ReferralUsageCreateWithoutUserInput, ReferralUsageUncheckedCreateWithoutUserInput>
  }

  export type ReferralUsageUpdateWithWhereUniqueWithoutUserInput = {
    where: ReferralUsageWhereUniqueInput
    data: XOR<ReferralUsageUpdateWithoutUserInput, ReferralUsageUncheckedUpdateWithoutUserInput>
  }

  export type ReferralUsageUpdateManyWithWhereWithoutUserInput = {
    where: ReferralUsageScalarWhereInput
    data: XOR<ReferralUsageUpdateManyMutationInput, ReferralUsageUncheckedUpdateManyWithoutUserInput>
  }

  export type TransactionUpsertWithWhereUniqueWithoutCashierInput = {
    where: TransactionWhereUniqueInput
    update: XOR<TransactionUpdateWithoutCashierInput, TransactionUncheckedUpdateWithoutCashierInput>
    create: XOR<TransactionCreateWithoutCashierInput, TransactionUncheckedCreateWithoutCashierInput>
  }

  export type TransactionUpdateWithWhereUniqueWithoutCashierInput = {
    where: TransactionWhereUniqueInput
    data: XOR<TransactionUpdateWithoutCashierInput, TransactionUncheckedUpdateWithoutCashierInput>
  }

  export type TransactionUpdateManyWithWhereWithoutCashierInput = {
    where: TransactionScalarWhereInput
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyWithoutCashierInput>
  }

  export type ReferralCodeUpsertWithoutOwnerInput = {
    update: XOR<ReferralCodeUpdateWithoutOwnerInput, ReferralCodeUncheckedUpdateWithoutOwnerInput>
    create: XOR<ReferralCodeCreateWithoutOwnerInput, ReferralCodeUncheckedCreateWithoutOwnerInput>
    where?: ReferralCodeWhereInput
  }

  export type ReferralCodeUpdateToOneWithWhereWithoutOwnerInput = {
    where?: ReferralCodeWhereInput
    data: XOR<ReferralCodeUpdateWithoutOwnerInput, ReferralCodeUncheckedUpdateWithoutOwnerInput>
  }

  export type ReferralCodeUpdateWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    marketerName?: StringFieldUpdateOperationsInput | string
    discountPct?: FloatFieldUpdateOperationsInput | number
    maxDiscountAmount?: FloatFieldUpdateOperationsInput | number
    feePercentage?: FloatFieldUpdateOperationsInput | number
    bankName?: NullableStringFieldUpdateOperationsInput | string | null
    bankAccount?: NullableStringFieldUpdateOperationsInput | string | null
    expiryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    usageLimit?: NullableIntFieldUpdateOperationsInput | number | null
    usageCount?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    targetProductId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    referral_usages?: ReferralUsageUpdateManyWithoutReferralCodeNestedInput
    transactions?: TransactionUpdateManyWithoutReferralCodeNestedInput
  }

  export type ReferralCodeUncheckedUpdateWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    marketerName?: StringFieldUpdateOperationsInput | string
    discountPct?: FloatFieldUpdateOperationsInput | number
    maxDiscountAmount?: FloatFieldUpdateOperationsInput | number
    feePercentage?: FloatFieldUpdateOperationsInput | number
    bankName?: NullableStringFieldUpdateOperationsInput | string | null
    bankAccount?: NullableStringFieldUpdateOperationsInput | string | null
    expiryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    usageLimit?: NullableIntFieldUpdateOperationsInput | number | null
    usageCount?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    targetProductId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    referral_usages?: ReferralUsageUncheckedUpdateManyWithoutReferralCodeNestedInput
    transactions?: TransactionUncheckedUpdateManyWithoutReferralCodeNestedInput
  }

  export type AffiliateCommissionUpsertWithWhereUniqueWithoutSnapperInput = {
    where: AffiliateCommissionWhereUniqueInput
    update: XOR<AffiliateCommissionUpdateWithoutSnapperInput, AffiliateCommissionUncheckedUpdateWithoutSnapperInput>
    create: XOR<AffiliateCommissionCreateWithoutSnapperInput, AffiliateCommissionUncheckedCreateWithoutSnapperInput>
  }

  export type AffiliateCommissionUpdateWithWhereUniqueWithoutSnapperInput = {
    where: AffiliateCommissionWhereUniqueInput
    data: XOR<AffiliateCommissionUpdateWithoutSnapperInput, AffiliateCommissionUncheckedUpdateWithoutSnapperInput>
  }

  export type AffiliateCommissionUpdateManyWithWhereWithoutSnapperInput = {
    where: AffiliateCommissionScalarWhereInput
    data: XOR<AffiliateCommissionUpdateManyMutationInput, AffiliateCommissionUncheckedUpdateManyWithoutSnapperInput>
  }

  export type UserCreateWithoutCommissionsInput = {
    id?: string
    name: string
    email: string
    password: string
    role?: $Enums.Role
    phone?: string | null
    bankName?: string | null
    bankAccount?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    referral_usages?: ReferralUsageCreateNestedManyWithoutUserInput
    transactions?: TransactionCreateNestedManyWithoutCashierInput
    referralCode?: ReferralCodeCreateNestedOneWithoutOwnerInput
  }

  export type UserUncheckedCreateWithoutCommissionsInput = {
    id?: string
    name: string
    email: string
    password: string
    role?: $Enums.Role
    phone?: string | null
    bankName?: string | null
    bankAccount?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    referral_usages?: ReferralUsageUncheckedCreateNestedManyWithoutUserInput
    transactions?: TransactionUncheckedCreateNestedManyWithoutCashierInput
    referralCode?: ReferralCodeUncheckedCreateNestedOneWithoutOwnerInput
  }

  export type UserCreateOrConnectWithoutCommissionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCommissionsInput, UserUncheckedCreateWithoutCommissionsInput>
  }

  export type BookingCreateWithoutCommissionsInput = {
    id?: string
    invoiceNo: string
    packageId: string
    packageName: string
    customerName: string
    customerPhone: string
    sessionDate: string
    sessionTime: string
    notes?: string | null
    referralCode?: string | null
    discountPct?: number
    originalPrice: number
    finalPrice: number
    paymentMethod: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BookingUncheckedCreateWithoutCommissionsInput = {
    id?: string
    invoiceNo: string
    packageId: string
    packageName: string
    customerName: string
    customerPhone: string
    sessionDate: string
    sessionTime: string
    notes?: string | null
    referralCode?: string | null
    discountPct?: number
    originalPrice: number
    finalPrice: number
    paymentMethod: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BookingCreateOrConnectWithoutCommissionsInput = {
    where: BookingWhereUniqueInput
    create: XOR<BookingCreateWithoutCommissionsInput, BookingUncheckedCreateWithoutCommissionsInput>
  }

  export type UserUpsertWithoutCommissionsInput = {
    update: XOR<UserUpdateWithoutCommissionsInput, UserUncheckedUpdateWithoutCommissionsInput>
    create: XOR<UserCreateWithoutCommissionsInput, UserUncheckedCreateWithoutCommissionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCommissionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCommissionsInput, UserUncheckedUpdateWithoutCommissionsInput>
  }

  export type UserUpdateWithoutCommissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    bankName?: NullableStringFieldUpdateOperationsInput | string | null
    bankAccount?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    referral_usages?: ReferralUsageUpdateManyWithoutUserNestedInput
    transactions?: TransactionUpdateManyWithoutCashierNestedInput
    referralCode?: ReferralCodeUpdateOneWithoutOwnerNestedInput
  }

  export type UserUncheckedUpdateWithoutCommissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    bankName?: NullableStringFieldUpdateOperationsInput | string | null
    bankAccount?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    referral_usages?: ReferralUsageUncheckedUpdateManyWithoutUserNestedInput
    transactions?: TransactionUncheckedUpdateManyWithoutCashierNestedInput
    referralCode?: ReferralCodeUncheckedUpdateOneWithoutOwnerNestedInput
  }

  export type BookingUpsertWithoutCommissionsInput = {
    update: XOR<BookingUpdateWithoutCommissionsInput, BookingUncheckedUpdateWithoutCommissionsInput>
    create: XOR<BookingCreateWithoutCommissionsInput, BookingUncheckedCreateWithoutCommissionsInput>
    where?: BookingWhereInput
  }

  export type BookingUpdateToOneWithWhereWithoutCommissionsInput = {
    where?: BookingWhereInput
    data: XOR<BookingUpdateWithoutCommissionsInput, BookingUncheckedUpdateWithoutCommissionsInput>
  }

  export type BookingUpdateWithoutCommissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoiceNo?: StringFieldUpdateOperationsInput | string
    packageId?: StringFieldUpdateOperationsInput | string
    packageName?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerPhone?: StringFieldUpdateOperationsInput | string
    sessionDate?: StringFieldUpdateOperationsInput | string
    sessionTime?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    referralCode?: NullableStringFieldUpdateOperationsInput | string | null
    discountPct?: FloatFieldUpdateOperationsInput | number
    originalPrice?: FloatFieldUpdateOperationsInput | number
    finalPrice?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingUncheckedUpdateWithoutCommissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoiceNo?: StringFieldUpdateOperationsInput | string
    packageId?: StringFieldUpdateOperationsInput | string
    packageName?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerPhone?: StringFieldUpdateOperationsInput | string
    sessionDate?: StringFieldUpdateOperationsInput | string
    sessionTime?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    referralCode?: NullableStringFieldUpdateOperationsInput | string | null
    discountPct?: FloatFieldUpdateOperationsInput | number
    originalPrice?: FloatFieldUpdateOperationsInput | number
    finalPrice?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReferralUsageCreateManyReferralCodeInput = {
    id?: string
    transactionId: string
    userId: string
    usedAt?: Date | string
  }

  export type TransactionCreateManyReferralCodeInput = {
    id?: string
    invoiceNumber: string
    cashierId: string
    total: number
    tax: number
    discount?: number
    paymentMethod: $Enums.PaymentMethod
    status?: $Enums.TransactionStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReferralUsageUpdateWithoutReferralCodeInput = {
    id?: StringFieldUpdateOperationsInput | string
    usedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transaction?: TransactionUpdateOneRequiredWithoutReferralUsageNestedInput
    user?: UserUpdateOneRequiredWithoutReferral_usagesNestedInput
  }

  export type ReferralUsageUncheckedUpdateWithoutReferralCodeInput = {
    id?: StringFieldUpdateOperationsInput | string
    transactionId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    usedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReferralUsageUncheckedUpdateManyWithoutReferralCodeInput = {
    id?: StringFieldUpdateOperationsInput | string
    transactionId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    usedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionUpdateWithoutReferralCodeInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoiceNumber?: StringFieldUpdateOperationsInput | string
    total?: FloatFieldUpdateOperationsInput | number
    tax?: FloatFieldUpdateOperationsInput | number
    discount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    status?: EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    referralUsage?: ReferralUsageUpdateOneWithoutTransactionNestedInput
    items?: TransactionItemUpdateManyWithoutTransactionNestedInput
    cashier?: UserUpdateOneRequiredWithoutTransactionsNestedInput
  }

  export type TransactionUncheckedUpdateWithoutReferralCodeInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoiceNumber?: StringFieldUpdateOperationsInput | string
    cashierId?: StringFieldUpdateOperationsInput | string
    total?: FloatFieldUpdateOperationsInput | number
    tax?: FloatFieldUpdateOperationsInput | number
    discount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    status?: EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    referralUsage?: ReferralUsageUncheckedUpdateOneWithoutTransactionNestedInput
    items?: TransactionItemUncheckedUpdateManyWithoutTransactionNestedInput
  }

  export type TransactionUncheckedUpdateManyWithoutReferralCodeInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoiceNumber?: StringFieldUpdateOperationsInput | string
    cashierId?: StringFieldUpdateOperationsInput | string
    total?: FloatFieldUpdateOperationsInput | number
    tax?: FloatFieldUpdateOperationsInput | number
    discount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    status?: EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AffiliateCommissionCreateManyBookingInput = {
    id?: string
    snapperId: string
    amount: number
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AffiliateCommissionUpdateWithoutBookingInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    snapper?: UserUpdateOneRequiredWithoutCommissionsNestedInput
  }

  export type AffiliateCommissionUncheckedUpdateWithoutBookingInput = {
    id?: StringFieldUpdateOperationsInput | string
    snapperId?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AffiliateCommissionUncheckedUpdateManyWithoutBookingInput = {
    id?: StringFieldUpdateOperationsInput | string
    snapperId?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductCreateManyCategoryInput = {
    id?: string
    name: string
    sku: string
    price: number
    stock: number
    image?: string | null
    duration?: string | null
    photoCount?: string | null
    features?: ProductCreatefeaturesInput | string[]
    isPopular?: boolean
    sortOrder?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    stock?: IntFieldUpdateOperationsInput | number
    image?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    photoCount?: NullableStringFieldUpdateOperationsInput | string | null
    features?: ProductUpdatefeaturesInput | string[]
    isPopular?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transaction_items?: TransactionItemUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    stock?: IntFieldUpdateOperationsInput | number
    image?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    photoCount?: NullableStringFieldUpdateOperationsInput | string | null
    features?: ProductUpdatefeaturesInput | string[]
    isPopular?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transaction_items?: TransactionItemUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateManyWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    stock?: IntFieldUpdateOperationsInput | number
    image?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    photoCount?: NullableStringFieldUpdateOperationsInput | string | null
    features?: ProductUpdatefeaturesInput | string[]
    isPopular?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionItemCreateManyProductInput = {
    id?: string
    transactionId: string
    qty: number
    price: number
    subtotal: number
  }

  export type TransactionItemUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    qty?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    subtotal?: FloatFieldUpdateOperationsInput | number
    transaction?: TransactionUpdateOneRequiredWithoutItemsNestedInput
  }

  export type TransactionItemUncheckedUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    transactionId?: StringFieldUpdateOperationsInput | string
    qty?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    subtotal?: FloatFieldUpdateOperationsInput | number
  }

  export type TransactionItemUncheckedUpdateManyWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    transactionId?: StringFieldUpdateOperationsInput | string
    qty?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    subtotal?: FloatFieldUpdateOperationsInput | number
  }

  export type TransactionItemCreateManyTransactionInput = {
    id?: string
    productId: string
    qty: number
    price: number
    subtotal: number
  }

  export type TransactionItemUpdateWithoutTransactionInput = {
    id?: StringFieldUpdateOperationsInput | string
    qty?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    subtotal?: FloatFieldUpdateOperationsInput | number
    product?: ProductUpdateOneRequiredWithoutTransaction_itemsNestedInput
  }

  export type TransactionItemUncheckedUpdateWithoutTransactionInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    qty?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    subtotal?: FloatFieldUpdateOperationsInput | number
  }

  export type TransactionItemUncheckedUpdateManyWithoutTransactionInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    qty?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    subtotal?: FloatFieldUpdateOperationsInput | number
  }

  export type ReferralUsageCreateManyUserInput = {
    id?: string
    referralCodeId: string
    transactionId: string
    usedAt?: Date | string
  }

  export type TransactionCreateManyCashierInput = {
    id?: string
    invoiceNumber: string
    total: number
    tax: number
    discount?: number
    paymentMethod: $Enums.PaymentMethod
    referralCodeId?: string | null
    status?: $Enums.TransactionStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AffiliateCommissionCreateManySnapperInput = {
    id?: string
    bookingId: string
    amount: number
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReferralUsageUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    usedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    referralCode?: ReferralCodeUpdateOneRequiredWithoutReferral_usagesNestedInput
    transaction?: TransactionUpdateOneRequiredWithoutReferralUsageNestedInput
  }

  export type ReferralUsageUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    referralCodeId?: StringFieldUpdateOperationsInput | string
    transactionId?: StringFieldUpdateOperationsInput | string
    usedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReferralUsageUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    referralCodeId?: StringFieldUpdateOperationsInput | string
    transactionId?: StringFieldUpdateOperationsInput | string
    usedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionUpdateWithoutCashierInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoiceNumber?: StringFieldUpdateOperationsInput | string
    total?: FloatFieldUpdateOperationsInput | number
    tax?: FloatFieldUpdateOperationsInput | number
    discount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    status?: EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    referralUsage?: ReferralUsageUpdateOneWithoutTransactionNestedInput
    items?: TransactionItemUpdateManyWithoutTransactionNestedInput
    referralCode?: ReferralCodeUpdateOneWithoutTransactionsNestedInput
  }

  export type TransactionUncheckedUpdateWithoutCashierInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoiceNumber?: StringFieldUpdateOperationsInput | string
    total?: FloatFieldUpdateOperationsInput | number
    tax?: FloatFieldUpdateOperationsInput | number
    discount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    referralCodeId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    referralUsage?: ReferralUsageUncheckedUpdateOneWithoutTransactionNestedInput
    items?: TransactionItemUncheckedUpdateManyWithoutTransactionNestedInput
  }

  export type TransactionUncheckedUpdateManyWithoutCashierInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoiceNumber?: StringFieldUpdateOperationsInput | string
    total?: FloatFieldUpdateOperationsInput | number
    tax?: FloatFieldUpdateOperationsInput | number
    discount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    referralCodeId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AffiliateCommissionUpdateWithoutSnapperInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    booking?: BookingUpdateOneRequiredWithoutCommissionsNestedInput
  }

  export type AffiliateCommissionUncheckedUpdateWithoutSnapperInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingId?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AffiliateCommissionUncheckedUpdateManyWithoutSnapperInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingId?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}