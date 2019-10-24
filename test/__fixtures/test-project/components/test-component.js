module.exports = TestComponent;

function TestComponent() {}

TestComponent.prototype.testMethod = function($happn, testArgument, callback) {
  if (typeof testArgument == 'function') {
    callback = testArgument;
    testArgument = null;
  }
  callback(null, testArgument);
};
