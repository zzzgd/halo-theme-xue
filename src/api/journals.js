import { get } from 'utils/service';

const baseUrl = '/api/content/journals';

const journalsApi = {};

journalsApi.list = param => {
  return get(`${baseUrl}`, {
    sort: 'createTime,desc',
    ...param,
  });
};

export default journalsApi;
