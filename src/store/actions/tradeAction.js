import { ADD_STATE } from './types';

export const updateState = data => dispatch => {
  console.log('dt', data);
  dispatch({
    type: ADD_STATE,
    payload: data,
  });
};
