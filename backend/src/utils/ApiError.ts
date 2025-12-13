export class ApiError extends Error {
  readonly statusCode: number;
  readonly data: null | Record<string, any>;
  readonly success: boolean;

  constructor(
    statusCode: number,
    message: string = "Something went wrong",
    error?: Error,
    data: null | Record<string, any> = null
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = data;
    this.success = false;

    if (error) {
      this.stack = error.stack;
    }
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message: string = "Bad Request"): ApiError {
    return new ApiError(400, message);
  }

  static unauthorized(message: string = "Unauthorized access"): ApiError {
    return new ApiError(401, message);
  }

  static forbidden(message: string = "Forbidden access"): ApiError {
    return new ApiError(403, message);
  }

  static notFound(message: string = "Resource not found"): ApiError {
    return new ApiError(404, message);
  }

  static conflict(message: string = "Conflict : Existing entries"): ApiError {
    return new ApiError(409, message);
  }

  static internal(message: string = "Internal server error"): ApiError {
    return new ApiError(500, message);
  }

  static accessDenied(message: string = " Access denied"): ApiError {
    return new ApiError(403, message);
  }
}
