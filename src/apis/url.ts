import { baseUrl, errorHandler } from 'src/utils/request.util';

export const getUrlReport = async (paramsQuery: string) => {
  const response = await fetch(`${baseUrl}/url/report?${paramsQuery}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(async (res) => {
      const json = await res.json();
      if (!res.ok) {
        throw new Error(`${res.status}: ${json.message}`);
      }

      return json;
    })
    .catch((err) => {
      errorHandler(err);
    });

  return response;
};

export const shortenUrl = async (form: { targetUrl: string }) => {
  const response = await fetch(`${baseUrl}/url/shorten`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form),
  })
    .then(async (res) => {
      const json = await res.json();
      if (!res.ok) {
        throw new Error(`${res.status}: ${json.message}`);
      }

      return json;
    })
    .catch((err) => {
      errorHandler(err);
    });

  return response;
};

export const redirectUrl = async (shortUrl: string) => {
  const response = await fetch(`${baseUrl}/url/redirect/front/${shortUrl}`, {
    method: 'GET',
  })
    .then(async (res) => {
      const json = await res.json();
      if (!res.ok) {
        throw new Error(`${res.status}: ${json.message}`);
      }

      return json;
    })
    .catch((err) => {
      errorHandler(err);
    });

  return response;
};

export const deleteShortUrl = async (id: string) => {
  const response = await fetch(`${baseUrl}/url/delete/${id}`, {
    method: 'DELETE',
  })
    .then(async (res) => {
      if (!res.ok) {
        throw new Error(`${res.status}`);
      }
    })
    .catch((err) => {
      errorHandler(err);
    });

  return response;
};
