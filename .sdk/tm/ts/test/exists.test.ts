
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { CainiaoTrackingSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await CainiaoTrackingSDK.test()
    equal(null !== testsdk, true)
  })

})
