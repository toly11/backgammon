// usage example: UntilRange<25>
// result: 0 | 1 | 2 ... | 24
export type UntilRange<Max extends number> = number extends Max
  ? number
  : _Range<Max, []>;

type _Range<Max extends number, Arr extends number[]>
  = Arr['length'] extends Max
  ? Arr[number]
  : _Range<Max, [...Arr, Arr['length']]>;
