export function arrayDifference(array, valuesToRemove) {
  const set1 = new Set(valuesToRemove);
  const list1 = array.filter((item) => !set1.has(item));
  const set2 = new Set(array);
  const list2 = valuesToRemove.filter((item) => !set2.has(item));
  return list1.concat(list2);
}
