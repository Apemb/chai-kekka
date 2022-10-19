import {AssertionError} from 'chai'
import {InternalAssertion} from "./internal-assertion";
import ChaiUtils = Chai.ChaiUtils;

const HAS_ASSOCIATED_VALUE_FLAG = 'kekkaHasAssociatedValue'
const ASSOCIATED_VALUE_FLAG = 'kekkaAssociatedValue'

const setAssociatedValue = function (assertion: InternalAssertion, utils: ChaiUtils, associatedValue: any) {
  utils.flag(assertion, ASSOCIATED_VALUE_FLAG, associatedValue)
  utils.flag(assertion, HAS_ASSOCIATED_VALUE_FLAG, true)
}

const setAssociatedValueAsObject = function (assertion: InternalAssertion, utils: ChaiUtils) {
  const hasAssociatedValue = utils.flag(assertion, HAS_ASSOCIATED_VALUE_FLAG)

  if (!hasAssociatedValue) {
    const noAssociatedValueMsg = 'No Result check done,' +
      ' use \'result\', \'success\', or \'failure\' assertion before \'associatedValue\''
    throw new AssertionError(noAssociatedValueMsg)
  }

  const associatedValue = utils.flag(assertion, ASSOCIATED_VALUE_FLAG)

  utils.flag(assertion, 'object', associatedValue)
}

export {
  setAssociatedValue,
  setAssociatedValueAsObject
}
