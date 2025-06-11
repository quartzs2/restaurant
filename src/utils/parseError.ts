import HttpError from "../errors/HttpError";

const ERROR_MESSAGES: { [status: number]: string } = {
  400: "잘못된 요청입니다(400).",
  404: "요청하신 데이터를 찾을 수 없습니다(404).",
  500: "서버에 문제가 발생했습니다(500).",
};

const DEFAULT_ERROR_MESSAGE = "알 수 없는 오류가 발생했습니다.";

const parseError = (error: unknown): string => {
  if (error instanceof HttpError) {
    return ERROR_MESSAGES[error.status] || DEFAULT_ERROR_MESSAGE;
  } else {
    return DEFAULT_ERROR_MESSAGE;
  }
};

export default parseError;
