export class ApiResponse<T> {
  readonly success: boolean;
  readonly data: T | null;
  readonly message: string;
  readonly statusCode: number;

  constructor(statusCode: number, data: T | null = null, message: string = "") {
    this.statusCode = statusCode;
    this.data = data;
    this.success = statusCode < 400;
    this.message = message;
  }

  static success<T>(
    data: T,
    message: string = "Success",
    statusCode: number = 200
  ): ApiResponse<T> {
    return new ApiResponse(statusCode, data, message);
  }

  static error<T>(
    message: string = "Error",
    statusCode: number = 500
  ): ApiResponse<null> {
    return new ApiResponse<null>(statusCode, null, message);
  }
}
