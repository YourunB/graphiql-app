export const getDataGraphApi = (url: string, query: string, variablesObj = {}, headersObj = {}) => {
  return fetch(url, {
    method: 'POST',
    headers: headersObj ? headersObj : {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variablesObj }),
  })
    .then(response => response.json())
    .then(data => data)
    .catch(error => console.error('Error:', error));
}