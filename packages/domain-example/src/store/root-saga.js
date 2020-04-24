import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import config from '../../config';
import { FETCH_ARTICLES_BEGIN, FETCH_ARTICLES_FAILURE, FETCH_ARTICLES_SUCCESS } from '../consts';

export const fetchArticles = source => {
  let url;

  if (source) {
    url = `https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${config.apikey}`;
  } else {
    url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${config.apikey}`;
  }

  return axios.get(url);
};

function* getArticles(action) {
  try {
    console.log('getArticles');
    const { data } = yield call(fetchArticles, action.payload);

    console.log(data);

    yield put({ type: FETCH_ARTICLES_SUCCESS, payload: data.articles });
  } catch (e) {
    yield put({ type: FETCH_ARTICLES_FAILURE, payload: e });
  }
}

function* rootSaga() {
  yield takeEvery(FETCH_ARTICLES_BEGIN, getArticles);
}

export default rootSaga;
