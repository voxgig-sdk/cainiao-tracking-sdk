
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { CainiaoTrackingSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = CainiaoTrackingSDK.test()
    equal(testsdk instanceof CainiaoTrackingSDK, true,
      'CainiaoTrackingSDK.test() must return a client synchronously')
  })

})
