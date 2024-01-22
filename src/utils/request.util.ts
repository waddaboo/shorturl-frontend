import { notification } from 'antd';

const { REACT_APP_API_URL, REACT_APP_API_VERSION } = process.env;

const codeMessage: Record<number, string> = {
  200: 'Ok',
  201: 'Created',
  202: 'Accepted',
  204: 'No Content',
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  406: 'Not Acceptable',
  410: 'Gone',
  422: 'Unprocessable Entity',
  500: 'Internal Server Error',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
  504: 'Gateway Timeout',
};

const restructureErrorMessage = (error: any) =>
  (error.response && error.response.data && error.response.data.message) ||
  error.message ||
  `Operation Failed, ${error.toString()}`;

export const errorHandler = (error: {
  response: Response;
  data: {
    message: string;
  };
}): Response => {
  const { response, data } = error;
  if (error) {
    notification.error({
      message: 'An error occurred.',
      description: error.toString(),
    });
  } else if (!error) {
    notification.error({
      description: 'An error occurred.',
      message: 'An error occurred.',
    });
  }

  return response;
};

export const baseUrl = `${REACT_APP_API_URL}/${REACT_APP_API_VERSION}`;
