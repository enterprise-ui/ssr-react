import { FETCH_ARTICLES_BEGIN } from '../consts';

// eslint-disable-next-line import/prefer-default-export
export const fetchArticles = source => async dispatch => {
  console.log('fetchArticles');
  dispatch({
    type: FETCH_ARTICLES_BEGIN,
    payload: source
  });
};
