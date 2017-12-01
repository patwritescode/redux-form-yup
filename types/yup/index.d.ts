declare module "yup" {
    export = yup;
}
declare const yup: Yup;
interface Yup {
    date(): DateSchema;
    mixed<T>(): Schema<T>;
    string(): StringSchema;
    number(): NumberSchema;
    boolean(): BooleanSchema;
    object<T>(): ObjectSchema<T, {}>;
    object<T, K>(): ObjectSchema<T, K>;
    lazy<T>(fn: (value: T) => Schema<T>): Lazy;
    array<T extends Schema<T>>(): ArraySchema<T>;
    ref(path: string, options: { contextPrefix: string }): Ref;
    reach<T>(schema: Schema<T>, path: string, value?: any, context?: any): Schema<T>;
    addMethod<T>(schemaType: Schema<T>, name: string, method: () => Schema<T>): void;
}

interface ValidationError {
    value: any;
    path: string;
    errors: string | Array<string>;
    inner?: Array<ValidationError>;
}

interface Ref {
}

interface Lazy {
}

interface Schema<T> {
    default(): any;
    clone(): Schema<T>;
    cast(value: any): any;
    isType(value: any): boolean;
    describe(): SchemaDescription;
    test(options: any): Schema<T>;
    meta(metadata: any): Schema<T>;
    default(value: any): Schema<T>;
    label(label: string): Schema<T>;
    strict(isStrict: boolean): Schema<T>;
    concat(schema: Schema<T>): Schema<T>;
    strip(stripField: boolean): Schema<T>;
    required(message?: string): Schema<T>;
    typeError(message?: string): Schema<T>;
    nullable(isNullable: boolean): Schema<T>;
    withMutation(builder: (current: Schema<T>) => void): void;
    oneOf(arrayOfValues: Array<any>, message?: string): Schema<T>;
    equals(arrayOfValues: Array<any>, message?: string): Schema<T>;
    notOneOf(arrayOfValues: Array<any>, message?: string): Schema<T>;
    isValid(value: any, options?: any, callback?: () => void): Promise<any>;
    transform(transformation: (currentValue: any, originalValue: any) => any): Schema<T>;
    validate(value: any, options?: ValidateOptions, callback?: () => void): Promise<any>;
    test(name: string, message: string, test: Function, callbackStyleAsync?: boolean): Schema<T>;
    when(keys: string | Array<string>, builder: any | ((value: any, schema: Schema<T>) => Schema<T>)): Schema<T>;
}

interface StringSchema extends Schema<string> {
    ensure(): StringSchema;
    url(message?: string): StringSchema;
    trim(message?: string): StringSchema;
    email(message?: string): StringSchema;
    required(message?: string): StringSchema;
    lowercase(message?: string): StringSchema;
    uppercase(message?: string): StringSchema;
    matches(regex: RegExp, message?: string): StringSchema;
    min(limit: number | Ref, message?: string): StringSchema;
    max(limit: number | Ref, message?: string): StringSchema;
}

interface NumberSchema extends Schema<number> {
    truncate(): NumberSchema;
    integer(message?: string): NumberSchema;
    positive(message?: string): NumberSchema;
    negative(message?: string): NumberSchema;
    min(limit: number | Ref, message?: string): NumberSchema;
    max(limit: number | Ref, message?: string): NumberSchema;
    round(type: "floor" | "ceil" | "trunc" | "round"): NumberSchema;
}

interface BooleanSchema extends Schema<boolean> {
}

interface DateSchema extends Schema<Date> {
    min(limit: Date | string | Ref, message?: string): DateSchema;
    max(limit: Date | string | Ref, message?: string): DateSchema;
}

interface ArraySchema<T> extends Schema<T> {
    ensure(): ArraySchema<T>;
    of(type: Schema<T>): ArraySchema<T>;
    required(message?: string): ArraySchema<T>;
    min(limit: number | Ref, message?: string): ArraySchema<T>;
    max(limit: number | Ref, message?: string): ArraySchema<T>;
    compact(rejector: (value: any) => boolean): ArraySchema<T>;
}

interface ObjectSchema<T, K> extends Schema<T> {
    camelCase(): ObjectSchema<T, K>;
    constantCase(): ObjectSchema<T, K>;
    noUnknown(onlyKnownKeys: boolean, message?: string): ObjectSchema<T, K>;
    shape(fields: Fields<T>, noSortEdges?: Array<[string, string]>): ObjectSchema<T, K>;
    from<FK extends keyof T, TK extends keyof K>(fromKey: FK, toKey: TK, alias: boolean): ObjectSchema<T, K>;
}

interface ValidateOptions {
}

interface SchemaDescription {
    tests: Array<string>;
    label: string;
    meta: object;
    type: string;
}

type Fields<T> = {
    [P in keyof T]: Schema<any>;
};

// TODO: error model type