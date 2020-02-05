import { Action } from 'redux';
import { HomeActions } from '../actions/home_action';
import { HomeData } from '../core/home_session';

const INITIAL_STATE : HomeData = {
    homeData : null,
    loading : false,
    error : ''
}

type Payload = any;
type Error = any;

export interface ActionWithPayload<T,E> extends Action {
    payload? : T;
    error? : E;
}

export function HomeReducer(state: HomeData = INITIAL_STATE, action: ActionWithPayload<Payload,Error>) : HomeData {
    switch (action.type){
        case HomeActions.HOME_FETCH:
            return {
                ...state,
                homeData : null,
                loading : true,
                error : ''
            }
        case HomeActions.HOME_FETCH_SUCCESS:
            return {
                ...state,
                homeData : action.payload,
                loading : false,
                error : ''
            }
        case HomeActions.HOME_FETCH_FAILED:
            return {
                ...state,
                homeData : null,
                loading : false,
                error : action.error
            };
    }
    return state;
}