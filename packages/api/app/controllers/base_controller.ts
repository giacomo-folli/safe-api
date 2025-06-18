import type { HttpContext } from '@adonisjs/core/http'
import type { ZodSchema } from 'zod'

export default class BaseController {
  protected async validateBody<T>(ctx: HttpContext, schema: ZodSchema<T>): Promise<T> {
    try {
      return schema.parse(ctx.request.body())
    } catch (error) {
      ctx.response.status(422).json({
        success: false,
        error: 'Validation failed',
        details: error.errors,
      })
      throw error
    }
  }

  protected success<T>(data: T) {
    return { success: true, data }
  }

  // @ts-ignore
  protected error(message: string, details?: any, status: number = 400) {
    return { success: false, error: message, details }
  }
}
