import { get } from 'utils/service';

const baseUrl = '/api/content/archives/years';

const archivesApi = {};

archivesApi.listByYear = () => {
  return get(`${baseUrl}`);
};
export default archivesApi;
