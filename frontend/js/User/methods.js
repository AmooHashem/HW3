const _signin = async (email, password) => {
  const fetchOptions = {
    method: 'POST',
    body: {
      email,
      password,
    }
  }
  return await fetchApi(urls.SIGNIN, fetchOptions);
}

const _signup = async (email, password) => {
  const fetchOptions = {
    method: 'POST',
    body: {
      email,
      password,
    }
  }
  return await fetchApi(urls.SIGNUP, fetchOptions);
}

const _signout = async () => {
  const fetchOptions = {
    method: 'GET',
  }
  return await fetchApi(urls.SIGNOUT, fetchOptions);
}