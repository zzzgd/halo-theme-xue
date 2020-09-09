import { get } from 'utils/service';

const baseUrl = '/api/content/sheets';

const sheetApi = {};

sheetApi.detail = slug => {
  return get(`${baseUrl}/slug`, {
    slug: slug,
    formatDisabled: false,
    sourceDisabled: false,
  });
};

export default sheetApi;
