const {
  assertIsAResultInstance,
  assertIsASuccess,
  assertIsAFailure,
  assertAssociatedValueEquality
} = require('./src/assertions')
const {
  setAssociatedValue,
  setAssociatedValueAsObject
} = require('./src/helpers')

module.exports = function (chai, utils) {
  const Assertion = chai.Assertion

  utils.addProperty(Assertion.prototype, 'result', function () {
    const obj = utils.flag(this, 'object')
    assertIsAResultInstance(this, obj)

    setAssociatedValue(this, utils, obj.value)
  })

  utils.addProperty(Assertion.prototype, 'success', function () {
    const obj = utils.flag(this, 'object')

    // do not transfer chai flags for is a result instance test (like negation)
    assertIsAResultInstance(new Assertion(obj), obj)
    assertIsASuccess(this, obj)

    setAssociatedValue(this, utils, obj.value)
  })

  utils.addProperty(Assertion.prototype, 'associatedValue', function () {
    setAssociatedValueAsObject(this, utils)
  })

  utils.addMethod(Assertion.prototype, 'successWrapping', function (
    expectedValue
  ) {
    const obj = utils.flag(this, 'object')

    // do not transfer chai flags for is a result instance test (like negation)
    assertIsAResultInstance(new Assertion(obj), obj)
    assertIsASuccess(this, obj)
    assertAssociatedValueEquality(this, obj, expectedValue, { utils, Assertion })
  })

  utils.addProperty(Assertion.prototype, 'failure', function () {
    const obj = utils.flag(this, 'object')

    // do not transfer chai flags for is a result instance test (like negation)
    assertIsAResultInstance(new Assertion(obj), obj)
    assertIsAFailure(this, obj)

    setAssociatedValue(this, utils, obj.value)
  })

  utils.addMethod(Assertion.prototype, 'failureWrapping', function (
    expectedValue
  ) {
    const obj = utils.flag(this, 'object')

    // do not transfer chai flags for is a result instance test (like negation)
    assertIsAResultInstance(new Assertion(obj), obj)
    assertIsAFailure(this, obj)
    assertAssociatedValueEquality(this, obj, expectedValue, { utils, Assertion })
  })
}
