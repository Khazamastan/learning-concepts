function addIndex(list = []) {
  list.push(list.length);
  console.log(list.slice());
  return list;
}

const first = addIndex();
addIndex(first);
