import { OPTIONS, SETTINGS, CATEGORY_LIST, MENU_LIST } from './constants';

const initialState = {
  options: [],
  settings: {},
  categoryList: [],
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
    case CATEGORY_LIST:
      return {
        ...state,
        categoryList: action.payload,
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
