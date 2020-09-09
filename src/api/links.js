import { get } from 'utils/service';

const baseUrl = '/api/content/links';

const linkApi = {};

linkApi.list = param => {
  return get(`${baseUrl}?sort=topPriority,desc`, {
    sort: 'createTime,desc',
    ...param,
  });
};

linkApi.teamView = param => {
  return get(`${baseUrl}/team_view`, {
    // sort: 'topPriority,desc',
    ...param,
  });
};

export default linkApi;
