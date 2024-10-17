export class BaseResponseEntity {
  constructor(public success: boolean, public data: any) {
    this.success = success;
    this.data = data;
  }
}

export class BaseResponseErrorEntity {
  constructor(public success: boolean, public message: string, public stack?: any) {
    this.success = success;
    this.message = message;
    this.stack = stack;
  }
}