export const getDataGraphApi = (url: string, query: string, variables = {}, headers = {}) => {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify({ query, variables }),
  })
    .then(response => {
      if (!response.ok) {
        return Promise.reject(new Error('Failed to fetch data'));
      }
      return response.json();
    })
    .then(data => data)
    .catch(error => {
      console.error('Error:', error);
      return Promise.reject(error);
    });
};

export const getDataRestApi = (url: string, query = {}, variables = {}, headers = {}) => {
  const queryString = new URLSearchParams({ ...query, ...variables }).toString();
  const fullUrl = `${url}?${queryString}`;

  return fetch(fullUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  })
    .then(response => {
      if (!response.ok) {
        return Promise.reject(new Error('Failed to fetch data'));
      }
      return response.json();
    })
    .then(data => data)
    .catch(error => {
      console.error('Error:', error);
      return Promise.reject(error);
    });
};