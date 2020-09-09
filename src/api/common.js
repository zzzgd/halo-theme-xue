import { get } from 'utils/service';

const baseUrl = '/api/content';

const commonApi = {};

commonApi.getSettings = () => {
  return get(`${baseUrl}/themes/activation/settings`, {});
};

commonApi.getTreeMenus = () => {
  return get(`${baseUrl}/menus/tree_view?sort=priority`, {});
};

commonApi.getOptions = () => {
  return get(`${baseUrl}/options/list_view`, {});
};

export default commonApi;
