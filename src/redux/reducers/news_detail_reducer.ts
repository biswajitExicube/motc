import { Action } from "redux";
import { NewsAction } from "../actions/news_action";
import { NewsDetailData } from "../core/news_detail_session";
import { NewsDetailAction } from "../actions/news_detail_action";

const INITIAL_STATE : NewsDetailData = {
    newsDetailData : null,
    loading : false,
    error : ''
}

type Payload = any;
type Error = any;

export interface ActionWithPayload<T,E> extends Action{
    payload? : T,
    error? : E
}

export function NewsDetailReducer(
    state : NewsDetailData = INITIAL_STATE,
    action : ActionWithPayload<Payload,Error>) : 
    NewsDetailData{
        switch(action.type){
            case NewsDetailAction.NEWS_DETAIL_FETCH :
                return{
                    ...state,
                    newsDetailData : null,
                    loading : true,
                    error : ''
                }
            case NewsDetailAction.NEWS_DETAIL_FETCH_SUCCESS :
                return{
                    ...state,
                    newsDetailData : action.payload,
                    loading : false,
                    error : ''
                }
            case NewsDetailAction.NEWS_DETAIL_FETCH_ERROR :
                return{
                    ...state,
                    newsDetailData : null,
                    loading : false,
                    error : action.error
                }
        }
        return state;
    }