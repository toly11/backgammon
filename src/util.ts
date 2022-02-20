export type UntilRange<Max extends number> = number | Max;

// todo fix this type generator (not working)
// usage example: UntilRange<25>
// result: 0 | 1 | 2 ... | 24
// export type UntilRange<Max extends number> = number extends Max
//   ? number
//   : _Range<Max, []>;

// type _Range<Max extends number, Arr extends number[]>
//   = Arr['length'] extends Max
//   ? Arr[number]
//   : _Range<Max, [...Arr, Arr['length']]>;

// todo write tests
export function unshiftFrom<T>(arr: T[], item: T) {
  const index = arr.indexOf(item);
  if (index > -1 && index < arr.length) {
    const [itemToMove] = arr.splice(index, 1);
    arr.unshift(itemToMove);
  }
  return arr;
}
