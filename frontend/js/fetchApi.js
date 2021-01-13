const ROOT = 'http://localhost:1337/api/';
const ADMIN = ROOT.concat('admin/');

const urls = {
  SIGNIN: ROOT.concat('signin/'),
  SIGNUP: ROOT.concat('signup/'),
  SIGNOUT: ROOT.concat('signout/'),
  GET_POSTS: ROOT.concat('post/'),

  READ_USER: (id) => ADMIN.concat(`user/crud/${id}`),
  POST_CRUD: (id) => ADMIN.concat(`post/crud/${id}`),
}

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