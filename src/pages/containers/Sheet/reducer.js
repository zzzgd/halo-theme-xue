import { MENU_LIST, OPTIONS, SETTINGS, SHEET_CONTENT } from './constants';

const initialState = {
  options: [],
  settings: {},
  sheetContent: [],
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
    case SHEET_CONTENT:
      return {
        ...state,
        sheetContent: action.payload,
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
