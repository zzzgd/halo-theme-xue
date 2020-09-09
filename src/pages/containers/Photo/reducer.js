import { MENU_LIST, OPTIONS, PHOTO_LIST, SETTINGS } from './constants';

const initialState = {
  options: [],
  settings: {},
  photos: [],
  menus: [],
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
    case PHOTO_LIST:
      return {
        ...state,
        photos: action.payload,
      };
    case MENU_LIST:
      return {
        ...state,
        menus: action.payload,
      };
    default:
      return state;
  }
};
