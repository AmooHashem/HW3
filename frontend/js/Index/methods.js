const _getAllPosts = async () => {
  const fetchOptions = {
    method: 'GET',
  }
  return await fetchApi(urls.GET_POSTS, fetchOptions);
}