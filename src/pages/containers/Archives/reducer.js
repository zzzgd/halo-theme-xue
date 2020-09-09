import { ARCHIVE_DATA, OPTIONS, SETTINGS } from './constants';

const initialState = {
  options: [],
  settings: {},
  archiveData: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case OPTIONS:
      return {
        ...state,
        options: action.payload,
      };
    case SETTINGS:
      return {
        ...state,
        settings: action.payload,
      };
    case ARCHIVE_DATA:
      return {
        ...state,
        archiveData: action.payload,
      };
    default:
      return state;
  }
};
