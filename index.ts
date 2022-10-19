import ChaiStatic = Chai.ChaiStatic
import ChaiUtils = Chai.ChaiUtils

import {
  assertAssociatedValueEquality,
  assertIsAFailure,
  assertIsAResultInstance,
  assertIsASuccess
} from "./src/assertions";

import {setAssociatedValue, setAssociatedValueAsObject} from "./src/helpers";
import {InternalAssertion} from "./src/internal-assertion";

declare global {
  namespace Chai {
    interface Assertion extends LanguageChains, NumericComparison, TypeComparison {
      result: Assertion
      success: Assertion
      successWrapping: (value: any) => Assertion
      failure: Assertion
      failureWrapping: (value: any) => Assertion
      associatedValue: Assertion
    }

    interface Deep extends KeyFilter {
      successWrapping: (value: any) => Assertion
      failureWrapping: (value: any) => Assertion
    }
  }
}

export default function (chai: ChaiStatic, utils: ChaiUtils) {
  const Assertion = chai.Assertion

  utils.addProperty(Assertion.prototype, 'result', function (this: InternalAssertion) {
    const obj = utils.flag(this, 'object')

    assertIsAResultInstance(this, obj)

    setAssociatedValue(this, utils, obj.value)
  })

  utils.addProperty(Assertion.prototype, 'success', function (this: InternalAssertion) {
    const obj = utils.flag(this, 'object')

    // do not transfer chai flags for is a result instance test (like negation)
    assertIsAResultInstance(new Assertion(obj) as InternalAssertion, obj)

    assertIsASuccess(this, obj)

    setAssociatedValue(this, utils, obj.value)
  })

  utils.addProperty(Assertion.prototype, 'associatedValue', function (this: InternalAssertion) {
    setAssociatedValueAsObject(this, utils)
  })

  utils.addMethod(Assertion.prototype, 'successWrapping',
    function (this: InternalAssertion, expectedValue: any) {
      const obj = utils.flag(this, 'object')

      // do not transfer chai flags for is a result instance test (like negation)
      assertIsAResultInstance(new Assertion(obj) as InternalAssertion, obj)
      assertIsASuccess(this, obj)
      assertAssociatedValueEquality(this, obj, expectedValue, {utils, Assertion})
    })

  utils.addProperty(Assertion.prototype, 'failure', function (this: InternalAssertion) {
    const obj = utils.flag(this, 'object')

    // do not transfer chai flags for is a result instance test (like negation)
    assertIsAResultInstance(new Assertion(obj) as InternalAssertion, obj)

    assertIsAFailure(this, obj)

    setAssociatedValue(this, utils, obj.value)
  })

  utils.addMethod(Assertion.prototype, 'failureWrapping',
    function (this: InternalAssertion, expectedValue: any) {
      const obj = utils.flag(this, 'object')

      // do not transfer chai flags for is a result instance test (like negation)
      assertIsAResultInstance(new Assertion(obj) as InternalAssertion, obj)

      assertIsAFailure(this, obj)
      assertAssociatedValueEquality(this, obj, expectedValue, {utils, Assertion})
    })
}
