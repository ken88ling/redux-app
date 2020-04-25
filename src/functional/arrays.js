const numbers = [1, 2, 3];

// Adding
const index = numbers.indexOf(2);
const added = [...numbers.slice(0, index), 4, ...numbers.slice(index)];

// removing
const removed = numbers.filter((n) => n !== 2);

// updated
const updated = numbers.map((n) => (n === 2 ? 20 : n));

export default (ArraySample) => {
  console.log('array sample add', added);
  console.log('array sample moved', removed);
  console.log('array sample update', updated);
};
