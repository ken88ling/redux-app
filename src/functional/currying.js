import { compose, pipe } from 'lodash/fp';

let input = '   Javascript   ';
let output = '<div>' + input.trim() + '</div>';

const trim = (str) => str.trim();
// const wrap = (type, str) => `<${type}>${str}</${type}>`;
// need to change from passing function like CurryingSample
const wrap = (type) => (str) => `<${type}>${str}</${type}>`;
const toLowerCase = (str) => str.toLowerCase();

// using lodash/fp => function programming
export const CurryingSample2 = () => {
  const transform = pipe(trim, toLowerCase, wrap('span'));
  console.log('currying sample2 => ', transform(input));
};

export default (CurryingSample) => {
  function add(a) {
    return function (b) {
      return a + b;
    };
  }

  const add2 = (a) => (b) => a + b;
  console.log('added', add(1)(5));
};
