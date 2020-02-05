
import { Action } from "redux";
import { AllSearchAction } from "../../actions/all_search_action";
import { SearchEvents } from "../../core/all_search_session";

const INITIAL_STATE : SearchEvents = {
    SearchEventsData : null,
    loading : false,
    error : ''
}
type Payload = any;
type Error = any;

export interface ActionWithPayload<T,E> extends Action{
    payload? : T,
    error? : E
}

export function EventSearchReducer(
    state : SearchEvents = INITIAL_STATE,
    action : ActionWithPayload<Payload,Error>) :
    SearchEvents{
        switch(action.type){
            case AllSearchAction.FETCH_EVENT:
                return{
                    ...state,
                    SearchEventsData : null,
                    loading : true,
                    error : ''
                }
            case AllSearchAction.SUCCESS_EVENT:
                return {
                    ...state,
                    SearchEventsData : action.payload,
                    loading : false,
                    error : ''
                }
            // case AboutAction.ABOUT_FETCH_ERROR:
            //     return{
            //         ...state,
            //         SearchEventsData : null,
            //         loading : false,
            //         error : action.error
            //     }
        }
        return state;
    }