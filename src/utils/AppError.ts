const getErrorDef = (code?: number) => {
  // All the possible end user errors in Application. (the best practice is let backend do this.)
  switch (code) {
    case 7:
      return 'Provided API key is invalid.';
    case 22:
      return 'Invalid movie page.';
    case 34:
      return 'Configured API url is invalid.';

    default:
      return 'Unknown error code.';
  }
};

class AppError {
  private name: string;

  private message: string;

  private code?: number;

  constructor(name: string, message: any, code?: number) {
    this.name = name;
    this.message = message;
    this.code = code;
  }

  getMessage() {
    return `${this.name}: ${this.message}`;
  }

  getCodeMessage() {
    return `${this.name}: ${getErrorDef(this.code)}`;
  }
}

AppError.prototype.toString = function appErrorToString() {
  return `${this.getCodeMessage()}`;
};

export default AppError;
