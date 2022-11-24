const successResponse = (data) => {
  return {
    success: true,
    data,
  };
};

const errorResponse = (msg, details) => {
  return {
    success: false,
    msg,
    details,
  };
};

class HttpError {
  constructor(status, msg, details) {
    (this.statusCode = status), (this.msg = msg), (this.details = details);
  }
}

module.exports = {
  successResponse,
  errorResponse,
  HttpError,
};