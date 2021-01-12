let storage = localStorage.getItem('USER')
  ? JSON.parse(localStorage.getItem('USER'))
  : {};

const fetchApi = async (url, fetchOptions) => {

  fetchOptions.body = JSON.stringify(fetchOptions.body);
  fetchOptions.headers = {
    ...fetchOptions.headers,
    'Content-Type': 'application/json',
    authorization: storage.token ? storage.token : '',
  };

  const response = await fetch(url, fetchOptions);
  const jsonResponse = await response.json();

  if (!response.ok) {
    throw new Error(jsonResponse.message || 'Error!');
  }
  
  return jsonResponse;
};