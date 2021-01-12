const signin = async (email, password) => {
  const fetchOptions = {
    method: 'POST',
    body: {
      email,
      password,
    }
  }
  return await fetchApi(urls.SIGNIN, fetchOptions);
}

const signup = async (email, password) => {
  const fetchOptions = {
    method: 'POST',
    body: {
      email,
      password,
    }
  }
  return await fetchApi(urls.SIGNUP, fetchOptions);
}

const signout = async () => {
  const fetchOptions = {
    method: 'GET',
  }
  return await fetchApi(urls.SIGNOUT, fetchOptions);
}