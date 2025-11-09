import {describe, it, expect} from '@jest/globals';
import {sumAll} from '../src/mathOperations';

describe('Testing sumAll function', () => {
  it("Test sumAll with positive numbers", () => {
    expect(sumAll(1,2,3,4)).toBe(10);
  });
});