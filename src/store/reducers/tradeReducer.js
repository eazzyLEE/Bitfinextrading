import { ADD_STATE } from '../actions/types';

const initialState = {
  book: {
    bids: {},
    asks: {},
    psnap: {},
    mcnt: 0,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_STATE:
      return {
        ...state,
        book: action.payload,
      };
    default:
      return state;
  }
};
