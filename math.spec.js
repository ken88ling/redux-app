import { isEven } from './src/math';

describe('isEven', () => {
  it('should return true if you give even number', () => {
    // Function under test (SUT)
    const result = isEven(2);
    expect(result).toEqual(true);
  });
  it('should return false if you give odd number', () => {
    const result = isEven(3);
    expect(result).toEqual(false);
  });
});
