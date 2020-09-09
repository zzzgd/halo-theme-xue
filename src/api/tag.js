import { get } from 'utils/service';

const baseUrl = '/api/content/tags';

const tagApi = {};

tagApi.getBySlug = param => {
  const { slug, page, size } = param;
  return get(`${baseUrl}/${slug}/posts?sort=topPriority,desc`, {
    sort: 'createTime,desc',
    page,
    size,
  });
};

tagApi.list = () => {
  return get(`${baseUrl}`, {
    more: true,
  });
};

export default tagApi;
