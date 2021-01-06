const { AssertionError } = require('chai')

const HAS_ASSOCIATED_VALUE_FLAG = 'kekkaHasAssociatedValue'
const ASSOCIATED_VALUE_FLAG = 'kekkaAssociatedValue'

const setAssociatedValue = function (assertion, utils, associatedValue) {
  utils.flag(assertion, ASSOCIATED_VALUE_FLAG, associatedValue)
  utils.flag(assertion, HAS_ASSOCIATED_VALUE_FLAG, true)
}

const setAssociatedValueAsObject = function (assertion, utils) {
  const hasAssociatedValue = utils.flag(assertion, HAS_ASSOCIATED_VALUE_FLAG)

  if (!hasAssociatedValue) {
    const noAssociatedValueMsg = 'No Result check done,' +
      ' use \'result\', \'success\', or \'failure\' assertion before \'associatedValue\''
    throw new AssertionError(noAssociatedValueMsg)
  }

  const associatedValue = utils.flag(assertion, ASSOCIATED_VALUE_FLAG)

  utils.flag(assertion, 'object', associatedValue)
}

module.exports = {
  setAssociatedValue,
  setAssociatedValueAsObject
}
