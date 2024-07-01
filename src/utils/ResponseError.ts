class ResponseError {
  name: string;

  message: any;

  constructor(name: string, message: any) {
    this.name = name;
    this.message = message;
  }
}

export default ResponseError;
