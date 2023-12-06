const Utils = require('../js/scripts');

describe('Utils class', () => {
  test('size_dict should return the correct size of an object', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const size = Utils.size_dict(obj);
    expect(size).toBe(3);
  });

    test('delay should execute the provided function after the specified delay', () => {
    jest.useFakeTimers();

    const mockFunction = jest.fn();
    Utils.delay(mockFunction, 1000);

    // Ensure that the function is not called immediately
    expect(mockFunction).not.toBeCalled();

    // Fast-forward time by 1000 milliseconds
    jest.advanceTimersByTime(1000);

    // Ensure that the function is called after the delay
    expect(mockFunction).toBeCalled();

    jest.useRealTimers(); // Restore the real timers
  });
  // You can add more tests for other methods of the Utils class
});
