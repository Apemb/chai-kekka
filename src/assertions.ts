import {isResult} from 'kekka'
import ChaiUtils = Chai.ChaiUtils
import AssertionStatic = Chai.AssertionStatic
import {InternalAssertion} from './internal-assertion'

const assertIsAResultInstance = function (assertion: InternalAssertion, obj: any) {
  assertion.assert(
    isResult(obj),
    'expected #{this} to be an instance of Result',
    'expected #{this} not to be an instance of Result',
    undefined
    )
}

const assertIsASuccess = function (assertion: InternalAssertion, obj: any) {
  assertion.assert(
    obj.isSuccess(),
    'expected #{this} to be a success',
    'expected #{this} not to be a success',
    undefined
  )
}

const assertIsAFailure = function (assertion: InternalAssertion, obj: any) {
  assertion.assert(
    obj.isFailure(),
    'expected #{this} to be a failure',
    'expected #{this} not to be a failure',
    undefined
  )
}

const assertAssociatedValueEquality = function (
  assertion: InternalAssertion,
  obj: any,
  expectedObj: any,
  { utils, Assertion }: { utils: ChaiUtils, Assertion: AssertionStatic }
) {
  const valueEqualityAssertion = new Assertion(obj.value)
  utils.transferFlags(assertion, valueEqualityAssertion, false)

  valueEqualityAssertion.equal(expectedObj)
}

export {
  assertIsAResultInstance,
  assertIsASuccess,
  assertIsAFailure,
  assertAssociatedValueEquality
}
