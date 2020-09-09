import { get } from 'utils/service';

const baseUrl = '/api/content/users';

const userApi = {};

userApi.getProfile = () => {
  return get(`${baseUrl}/profile`, {});
};

export default userApi;
