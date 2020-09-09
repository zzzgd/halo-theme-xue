import { get, post } from 'utils/service';
const baseUrl = '/api/content';

const commentApi = {};

commentApi.createComment = param => {
  const { target } = param;
  return post(`${baseUrl}/${target}/comments`, {
    allowNotification: true,
    ...param,
  });
};

commentApi.listComments = ({ target, targetId, view = 'tree_view', page, size }) => {
  return get(`${baseUrl}/${target}/${targetId}/comments/${view}`, {
    page,
    size,
  });
};

export default commentApi;
