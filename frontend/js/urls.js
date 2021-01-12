 ROOT = 'http://localhost:1337/api/';
 ADMIN = ROOT.concat('admin/');
const urls = {
  SIGNIN: ROOT.concat('signin/'),
  SIGNUP: ROOT.concat('signup/'),
  SIGNOUT: ROOT.concat('signout/'),
  GET_POSTS: ROOT.concat('post/'),

  READ_USER: (id) => ADMIN.concat(`user/crud/${id}`),
  POST_CRUD: (id) => ADMIN.concat(`post/crud/${id}`),
}