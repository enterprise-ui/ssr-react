import { FETCH_ARTICLES_SUCCESS } from '../consts';

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_ARTICLES_SUCCESS:
      console.log('reducer');
      console.log(action.payload);
      return action.payload;

    default:
      return state;
  }
};
