process.env.NODE_ENV = 'test'

const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const chaiKekka = require('../index')

chai.use(chaiAsPromised)
chai.use(chaiKekka)

const expect = chai.expect
const AssertionError = chai.AssertionError

module.exports = {
  expect,
  AssertionError
}
