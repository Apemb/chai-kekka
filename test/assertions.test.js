const { expect, AssertionError } = require('./test-helper')
const { Success, Failure } = require('kekka')

describe('assertions', () => {
  describe('result', () => {
    const isAResultAssertion = function (value) {
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
    const isASuccessAssertion = function (value) {
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
  })

  describe('successWrapping', () => {
    const isSuccessWrappingAssertion = function (value, expectedValue) {
      return () => expect(value).to.be.a.successWrapping(expectedValue)
    }
    const isDeepSuccessWrappingAssertion = function (value, expectedValue) {
      return () => expect(value).to.be.a.deep.successWrapping(expectedValue)
    }

    it('should succeed if value is a Success wrapping the right value', () => {
      const associatedValue = 'string'
      const someSuccessResult = Success('string')

      expect(isSuccessWrappingAssertion(someSuccessResult, associatedValue)).not.to.throw()
    })

    it('should succeed with a deep equality', () => {
      const associatedObject = { a: '423' }
      const someSuccessResult = Success({ a: '423' })

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
    const isAFailureAssertion = function (value) {
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
  })

  describe('failureWrapping', () => {
    const isFailureWrappingAssertion = function (value, expectedValue) {
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
})
