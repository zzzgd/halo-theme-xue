import { get, postForm } from 'utils/service';

const baseUrl = '/api/content/posts';

const postApi = {};

postApi.list = param => {
  return get(`${baseUrl}?sort=topPriority,desc`, {
    sort: 'createTime,desc',
    ...param,
  });
};

postApi.detail = postId => {
  return get(`${baseUrl}/${postId}`, { formatDisabled: false, sourceDisabled: false });
};

postApi.detailBySlug = slug => {
  return get(`${baseUrl}/slug`, {
    formatDisabled: false,
    sourceDisabled: false,
    slug: slug,
  });
};

postApi.latest = param => {
  return get(`${baseUrl}`, {
    sort: 'visits,desc',
    ...param,
  });
};

postApi.search = param => {
  return postForm(`${baseUrl}/search`, param);
};

export default postApi;
