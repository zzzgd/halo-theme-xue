import { get } from 'utils/service';

const baseUrl = '/api/content/photos';

const photoApi = {};

photoApi.latest = () => {
  return get(`${baseUrl}/latest`, {});
};

export default photoApi;
