import { PROVINCE } from "../type";
const initialState = {
  data: [],
  pagination: [],
  loadingGet: true,
  loadingPost: false,
};

export const provinceReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROVINCE.GET:
      return {
        ...state,
        data: action.data.data,
      };
    case PROVINCE.PAGINATION:
      console.log("pagination", action.data);
      return {
        ...state,
        pagination: action.data,
      };
    case PROVINCE.GET_LOADING:
      return Object.assign({}, state, {
        loadingGet: action.load,
      });
    case PROVINCE.POST_LOADING:
      return Object.assign({}, state, {
        loadingPost: action.load,
      });
    default:
      return state;
  }
};
