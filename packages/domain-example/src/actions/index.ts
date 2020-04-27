import {Dispatch} from 'redux';
import {FETCH_ARTICLES_BEGIN} from '../consts';

export const fetchArticles = (source?: string) => async (dispatch: Dispatch) => {
    dispatch({
        type: FETCH_ARTICLES_BEGIN,
        payload: source,
    });
};
