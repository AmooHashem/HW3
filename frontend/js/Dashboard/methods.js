const createPost = async (title, content) => {
  const fetchOptions = {
    method: 'POST',
    body: {
      title,
      content,
    }
  }
  return await fetchApi(urls.POST_CRUD, fetchOptions);
}

const editPost = async (title, content) => {
  const fetchOptions = {
    method: 'PUT',
    body: {
      title,
      content,
    }
  }
  return await fetchApi(urls.POST_CRUD, fetchOptions);
}

const deletePost = async (id) => {
  const fetchOptions = {
    method: 'PUT',
  }
  return await fetchApi(urls.POST_CRUD(id), fetchOptions);
}


const readPost = async (id) => {
  const fetchOptions = {
    method: 'GET',
  }
  return await fetchApi(urls.POST_CRUD(id), fetchOptions);
}
