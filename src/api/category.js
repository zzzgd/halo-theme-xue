import { get } from 'utils/service';

const baseUrl = '/api/content/categories';

const categoryApi = {};

categoryApi.getBySlug = param => {
  const { slug, page, size } = param;
  return get(`${baseUrl}/${slug}/posts?sort=topPriority,desc`, {
    sort: 'createTime,desc',
    page,
    size,
  });
};

categoryApi.list = () => {
  return get(`${baseUrl}`, {
    more: true,
  });
};

export default categoryApi;
