
import { Action } from "redux";
import { SearchNews } from "../../core/all_search_session";
import { AllSearchAction } from "../../actions/all_search_action";

const INITIAL_STATE : SearchNews = {
    SearchNewsData : null,
    loading : false,
    error : ''
}
type Payload = any;
type Error = any;

export interface ActionWithPayload<T,E> extends Action{
    payload? : T,
    error? : E
}

export function NewsSearchReducer(
    state : SearchNews = INITIAL_STATE,
    action : ActionWithPayload<Payload,Error>) :
    SearchNews{
        switch(action.type){
            case AllSearchAction.FETCH_NEWS:
                return{
                    ...state,
                    SearchNewsData : null,
                    loading : true,
                    error : ''
                }
            case AllSearchAction.SUCCESS_NEWS:
                return {
                    ...state,
                    SearchNewsData : action.payload,
                    loading : false,
                    error : ''
                }
            // case AboutAction.ABOUT_FETCH_ERROR:
            //     return{
            //         ...state,
            //         SearchOne : null,
            //         loading : false,
            //         error : action.error
            //     }
        }
        return state;
    }
