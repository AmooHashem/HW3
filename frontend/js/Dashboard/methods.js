const _createPost = async (title, content) => {
  const fetchOptions = {
    method: 'POST',
    body: {
      title,
      content,
    }
  }
  return await fetchApi(urls.POST_CRUD(), fetchOptions);
}

const _editPost = async (title, content, id) => {
  const fetchOptions = {
    method: 'PUT',
    body: {
      title,
      content,
    }
  }
  return await fetchApi(urls.POST_CRUD(id), fetchOptions);
}

const _deletePost = async (id) => {
  const fetchOptions = {
    method: 'DELETE',
  }
  return await fetchApi(urls.POST_CRUD(id), fetchOptions);
}

const _getPost = async (id) => {
  const fetchOptions = {
    method: 'GET',
  }
  return await fetchApi(urls.POST_CRUD(id), fetchOptions);
}

const _readUser = async (id) => {
  const fetchOptions = {
    method: 'GET',
  }
  return await fetchApi(urls.READ_USER(id), fetchOptions);
}