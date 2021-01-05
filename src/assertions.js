const { Result } = require('kekka')

const assertIsAResultInstance = function (assertion, _obj) {
  assertion.to.be.an.instanceof(Result)
}

const assertIsASuccess = function (assertion, obj) {
  assertion.assert(
    obj.isSuccess(),
    'expected #{this} to be a success',
    'expected #{this} not to be a success'
  )
}

const assertIsAFailure = function (assertion, obj) {
  assertion.assert(
    obj.isFailure(),
    'expected #{this} to be a failure',
    'expected #{this} not to be a failure'
  )
}

const assertAssociatedValueEquality = function (assertion, obj, expectedObj, { utils, Assertion }) {
  const valueEqualityAssertion = new Assertion(obj.value)
  utils.transferFlags(assertion, valueEqualityAssertion, false)

  valueEqualityAssertion.equal(expectedObj)
}

module.exports = {
  assertIsAResultInstance,
  assertIsASuccess,
  assertIsAFailure,
  assertAssociatedValueEquality
}
