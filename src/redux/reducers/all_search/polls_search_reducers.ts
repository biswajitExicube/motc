
import { Action } from "redux";
import { AboutAction } from "../../actions/about_action";
import { SearchPolls } from "../../core/all_search_session";

const INITIAL_STATE : SearchPolls = {
    SearchPollsData : null,
    loading : false,
    error : ''
}
type Payload = any;
type Error = any;

export interface ActionWithPayload<T,E> extends Action{
    payload? : T,
    error? : E
}

export function PollSearchReducer(
    state : SearchPolls = INITIAL_STATE,
    action : ActionWithPayload<Payload,Error>) :
    SearchPolls{
        switch(action.type){
            case AboutAction.ABOUT_FETCH:
                return{
                    ...state,
                    SearchPollsData : null,
                    loading : true,
                    error : ''
                }
            case AboutAction.ABOUT_FETCH_SUCCESS:
                return {
                    ...state,
                    SearchPollsData : action.payload,
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