const person = {
  name: 'John',
  address: {
    country: 'USA',
    city: 'San Francisco',
  },
};
// const updated = Object.assign({}, person, { name: 'Ken', age: 30 });
// const updated = { ...person, name: 'Ken' };

// deep copy
const updated = {
  ...person,
  address: {
    ...person.address,
    city: 'New York',
  },
  name: 'Ken',
};

// deep copy is troublesome , so it's why immutable util library become popular.

export default (ObjectSample) => console.log('Objects update', updated);
