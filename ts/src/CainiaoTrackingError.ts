
import { Context } from './Context'


class CainiaoTrackingError extends Error {

  isCainiaoTrackingError = true

  sdk = 'CainiaoTracking'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  CainiaoTrackingError
}

