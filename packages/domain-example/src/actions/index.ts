import {Dispatch} from 'redux';
import {FETCH_ARTICLES_BEGIN} from '../consts';

export const fetchArticles = (source?: string) => async (dispatch: Dispatch) => {
    console.log('fetchArticles');
    dispatch({
        type: FETCH_ARTICLES_BEGIN,
        payload: source,
    });
};
