import { SAVE_EMAIL } from '../actions';

const INITIAL_STATE = {
  userEmail: undefined,
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_EMAIL:
    return {
      ...state,
      userEmail: action.payload,
    };
  default:
    return state;
  }
};

export default user;
