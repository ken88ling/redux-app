import { compose, pipe } from 'lodash/fp';

let input = '   Javascript   ';
let output = '<div>' + input.trim() + '</div>';

const trim = (str) => str.trim();
const wrapInDiv = (str) => `<div>${str}</div>`;
const toLowerCase = (str) => str.toLowerCase();

export default (CompositionSample) => {
  console.log('composition => ', wrapInDiv(toLowerCase(trim(input))));
};

// using lodash/fp => function programming
export const CompositionSample2 = () => {
  // need to read from right to left if you using compose
  const transform = compose(wrapInDiv, toLowerCase, trim);

  // read from left to right if you using pipe
  const transform2 = pipe(trim, toLowerCase, wrapInDiv);
  console.log('composition lodash => ', transform(input));
  console.log('composition lodash 2 => ', transform2(input));
};
