import { NewsData } from "../core/news_session";
import { Action } from "redux";
import { NewsAction } from "../actions/news_action";

const INITIAL_STATE : NewsData = {
    newsData : null,
    loading : false,
    error : ''
}

type Payload = any;
type Error = any;

export interface ActionWithPayload<T,E> extends Action{
    payload? : T,
    error? : E
}

export function NewsReducer(
    state : NewsData = INITIAL_STATE,
    action : ActionWithPayload<Payload,Error>) : 
    NewsData{
        switch(action.type){
            case NewsAction.NEWS_FETCH :
                return{
                    ...state,
                    newsData : null,
                    loading : true,
                    error : ''
                }
            case NewsAction.NEWS_FETCH_SUCCESS :
                return{
                    ...state,
                    newsData : action.payload,
                    loading : false,
                    error : ''
                }
            case NewsAction.NEWS_FETCH_ERROR :
                return{
                    ...state,
                    newsData : null,
                    loading : false,
                    error : action.error
                }
        }
        return state;
    }