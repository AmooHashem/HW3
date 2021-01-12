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