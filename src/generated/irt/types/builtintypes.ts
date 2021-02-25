
// Scalars
export const Type_Bool = 'bit';
export const Type_String = 'str';
export const Type_BigInt = 'big';
export const Type_Int08 = 'i08';
export const Type_Int16 = 'i16';
export const Type_Int32 = 'i32';
export const Type_Int64 = 'i64';
export const Type_UInt08 = 'u08';
export const Type_UInt16 = 'u16';
export const Type_UInt32 = 'u32';
export const Type_UInt64 = 'u64';
export const Type_Float = 'f32';
export const Type_Double = 'f64';
export const Type_UUID = 'uid';
export const Type_TTs = 'tsl';
export const Type_TTsTz = 'tso';
export const Type_TTsU = 'tsu';
export const Type_Time = 'time';
export const Type_Date = 'date';
export const Type_Blob = 'blob';

// Special scalars
export const Type_Err = 'err';
export const Type_Any = 'any';

// Generics
export const Type_Set = 'set';
export const Type_List = 'lst';
export const Type_Map = 'map';
export const Type_Option = 'opt';
export const Type_Either = 'either';

export type BuiltinType =
    'bit' | 'str' | 'big' | 'i08' | 'i16' | 'i32' | 'i64' |
    'u08' | 'u16' | 'u32' | 'u64' | 'f32' | 'f64' | 'uid' |
    'tsl' | 'tso' | 'tsu' | 'time' | 'date' | 'blob' | 'err' |
    'any' | 'set' | 'lst' | 'map' | 'opt' | 'either';

export const UUIDDefault = '00000000-0000-0000-0000-000000000000';