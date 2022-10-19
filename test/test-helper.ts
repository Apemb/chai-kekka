import chaiKekka from '../index'

import chaiAsPromised from 'chai-as-promised'

import chai from 'chai'

chai.use(chaiAsPromised)
chai.use(chaiKekka)

const expect = chai.expect
const AssertionError = chai.AssertionError

export {
  expect,
  AssertionError
}
