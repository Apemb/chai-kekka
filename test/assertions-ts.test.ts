import {Failure, Success} from "kekka"
import {AssertionError, expect} from "./test-helper";

describe('assertions in Typescript', () => {
  describe('result', () => {
    const isAResultAssertion = function (value: any) {
      return () => expect(value).to.be.a.result
    }

    it('should succeed if value is a Result instance', () => {
      const someSuccessResult = Success('Some String')
      const someFailureResult = Failure(new Error('Failure...'))

      expect(isAResultAssertion(someSuccessResult)).not.to.throw()
      expect(isAResultAssertion(someFailureResult)).not.to.throw()
    })

    it('should fail if value is a not a Result instance', () => {
      const notAResult = 'Some String'

      const assertionErrorMessage = '\'Some String\' to be an instance of Result'
      expect(isAResultAssertion(notAResult)).to.throw(AssertionError, assertionErrorMessage)
    })
  })

  describe('success', () => {
    const isASuccessAssertion = function (value: any) {
      return () => expect(value).to.be.a.success
    }

    it('should succeed if value is a Success', () => {
      const someSuccessResult = Success('Some String')

      expect(isASuccessAssertion(someSuccessResult)).not.to.throw()
    })

    it('should fail if value is a Failure', () => {
      const someFailureResult = Failure(new Error('Failure...'))

      const assertionErrorMessage = 'expected [Result-Failure (Error: Failure...)] to be a success'
      expect(isASuccessAssertion(someFailureResult)).to.throw(AssertionError, assertionErrorMessage)
    })

    it('should fail if value is a not a Result instance', () => {
      const notAResult = 'Some String'

      const assertionErrorMessage = '\'Some String\' to be an instance of Result'
      expect(isASuccessAssertion(notAResult)).to.throw(AssertionError, assertionErrorMessage)
    })

    it('should negate only the success vs failure part', () => {
      const notAResult = 'Some String'
      const someSuccessResult = Success('Some String')
      const someFailureResult = Failure(new Error('Failure...'))

      const isNotASuccessAssertion = function (value: any) {
        return () => expect(value).to.not.be.a.success
      }

      const assertionErrorMessage1 = 'expected [Result-Success (Some String)] not to be a success'
      expect(isNotASuccessAssertion(someSuccessResult)).to.throw(AssertionError, assertionErrorMessage1)

      expect(isNotASuccessAssertion(someFailureResult)).not.to.throw()

      const assertionErrorMessage2 = 'expected \'Some String\' to be an instance of Result'
      expect(isNotASuccessAssertion(notAResult)).to.throw(AssertionError, assertionErrorMessage2)
    })
  })

  describe('successWrapping', () => {
    const isSuccessWrappingAssertion = function (value: any, expectedValue: any) {
      return () => expect(value).to.be.a.successWrapping(expectedValue)
    }
    const isDeepSuccessWrappingAssertion = function (value: any, expectedValue: any) {
      return () => expect(value).to.be.a.deep.successWrapping(expectedValue)
    }

    it('should succeed if value is a Success wrapping the right value', () => {
      const associatedValue = 'string'
      const someSuccessResult = Success('string')

      expect(isSuccessWrappingAssertion(someSuccessResult, associatedValue)).not.to.throw()
    })

    it('should succeed with a deep equality', () => {
      const associatedObject = {a: '423'}
      const someSuccessResult = Success({a: '423'})

      const assertionErrorMessage = 'expected { a: \'423\' } to equal { a: \'423\' }'
      expect(isSuccessWrappingAssertion(someSuccessResult, associatedObject)).to.throw(AssertionError, assertionErrorMessage)
      expect(isDeepSuccessWrappingAssertion(someSuccessResult, associatedObject)).not.to.throw()
    })

    it('should fail if value is a Failure', () => {
      const someFailureResult = Failure(new Error('Failure...'))

      const assertionErrorMessage = 'expected [Result-Failure (Error: Failure...)] to be a success'
      expect(isSuccessWrappingAssertion(someFailureResult, 'not useful')).to.throw(AssertionError, assertionErrorMessage)
    })

    it('should fail if value is not a result', () => {
      const notAResult = 'not a result'

      const assertionErrorMessage = '\'not a result\' to be an instance of Result'
      expect(isSuccessWrappingAssertion(notAResult, 'not useful')).to.throw(AssertionError, assertionErrorMessage)
    })
  })

  describe('failure', () => {
    const isAFailureAssertion = function (value: any) {
      return () => expect(value).to.be.a.failure
    }

    it('should succeed if value is a Failure', () => {
      const someFailureResult = Failure(new Error('Failure...'))

      expect(isAFailureAssertion(someFailureResult)).not.to.throw()
    })

    it('should fail if value is a Success', () => {
      const someSuccessResult = Success('Some String')

      const assertionErrorMessage = 'expected [Result-Success (Some String)] to be a failure'
      expect(isAFailureAssertion(someSuccessResult)).to.throw(AssertionError, assertionErrorMessage)
    })

    it('should fail if value is a not a Result instance', () => {
      const notAResult = 'Some String'

      const assertionErrorMessage = '\'Some String\' to be an instance of Result'
      expect(isAFailureAssertion(notAResult)).to.throw(AssertionError, assertionErrorMessage)
    })

    it('should negate only the success vs failure part', () => {
      const notAResult = 'Some String'
      const someSuccessResult = Success('Some String')
      const someFailureResult = Failure(new Error('Failure...'))

      const isNotAFailureAssertion = function (value: any) {
        return () => expect(value).to.not.be.a.failure
      }

      expect(isNotAFailureAssertion(someSuccessResult)).not.to.throw()

      const assertionErrorMessage1 = 'expected [Result-Failure (Error: Failure...)] not to be a failure'
      expect(isNotAFailureAssertion(someFailureResult)).to.throw(AssertionError, assertionErrorMessage1)

      const assertionErrorMessage2 = 'expected \'Some String\' to be an instance of Result'
      expect(isNotAFailureAssertion(notAResult)).to.throw(AssertionError, assertionErrorMessage2)
    })
  })

  describe('failureWrapping', () => {
    const isFailureWrappingAssertion = function (value: any, expectedValue: any) {
      return () => expect(value).to.be.a.failureWrapping(expectedValue)
    }

    it('should succeed if value is a Failure wrapping the right value', () => {
      const associatedError = new Error('Failure...')
      const someFailureResult = Failure(associatedError)

      expect(isFailureWrappingAssertion(someFailureResult, associatedError)).not.to.throw()
    })

    it('should fail if value is a Success', () => {
      const someSuccessResult = Success('Some String')

      const assertionErrorMessage = 'expected [Result-Success (Some String)] to be a failure'
      expect(isFailureWrappingAssertion(someSuccessResult, 'not useful')).to.throw(AssertionError, assertionErrorMessage)
    })

    it('should fail if value is not a result', () => {
      const notAResult = 'not a result'

      const assertionErrorMessage = '\'not a result\' to be an instance of Result'
      expect(isFailureWrappingAssertion(notAResult, 'not useful')).to.throw(AssertionError, assertionErrorMessage)
    })
  })

  describe('associatedValue', () => {
    it('should succeed if associated value equals expected', () => {
      const expectedValue = 'Some String'
      const someSuccessResult = Success('Some String')

      const isASuccessAssociatedValueAssertion = function (value: any, expectedValue: any) {
        return () => expect(value).to.be.a.success.with.associatedValue.that.equals(expectedValue)
      }

      expect(isASuccessAssociatedValueAssertion(someSuccessResult, expectedValue)).not.to.throw()
    })

    it('should work also with failure result type', () => {
      const expectedValue = new Error('Some Failure')
      const someFailureResult = Failure(expectedValue)

      const isAFailureAssociatedValueAssertion = function (value: any, expectedValue: any) {
        return () => expect(value).to.be.a.failure.with.associatedValue.that.equals(expectedValue)
      }

      expect(isAFailureAssociatedValueAssertion(someFailureResult, expectedValue)).not.to.throw()
    })

    it('should work also with result property', () => {
      const expectedValue = 'Some String'
      const someSuccessResult = Success('Some String')

      const isAResultAssociatedValueAssertion = function (value: any, expectedValue: any) {
        return () => expect(value).to.be.a.result.with.associatedValue.that.equals(expectedValue)
      }

      expect(isAResultAssociatedValueAssertion(someSuccessResult, expectedValue)).not.to.throw()
    })

    it('should work also with deep equality assertion', () => {
      const expectedObject = {a: 'property'}
      const someSuccessResult = Success({a: 'property'})

      const isASuccessAssociatedValueAssertion = function (value: any, expectedValue: any) {
        return () => expect(value).to.be.a.success.with.associatedValue.that.deep.equals(expectedValue)
      }

      expect(isASuccessAssociatedValueAssertion(someSuccessResult, expectedObject)).not.to.throw()
    })

    it('should not work if no test of result was done before hand', () => {
      const expectedValue = 'Some String'
      const someSuccessResult = Success('Some String')

      const noResultCheckAssertion = function (value: any, expectedValue: any) {
        return () => expect(value).to.have.an.associatedValue.that.equals(expectedValue)
      }

      const assertionErrorMessage = 'No Result check done,' +
        ' use \'result\', \'success\', or \'failure\' assertion before \'associatedValue\''
      expect(noResultCheckAssertion(someSuccessResult, expectedValue)).to.throw(AssertionError, assertionErrorMessage)
    })
  })
})
