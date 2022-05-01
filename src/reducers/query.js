import { SAVE_SEARCH } from '../actions';

const INITIAL_STATE = {
  list: [],
};

const query = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_SEARCH:
    return {
      ...state,
      list: action.payload,
    };
  default:
    return state;
  }
};

export default query;
