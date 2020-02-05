import { DiscussData } from "../core/discuss_session";
import { Action } from "redux";
import { DiscussAction } from "../actions/discuss_action";

const INITIAL_STATE : DiscussData = {
    discussData : null,
    loading : false,
    error : ''
}

type Payload = any;
type Error = any;

export interface ActionWithPayload<T,E> extends Action{
    payload? : T,
    error? : E
}

export function DiscussReducer(
    state : DiscussData = INITIAL_STATE,
    action : ActionWithPayload<Payload,Error>
) : DiscussData{
        switch(action.type){
            case DiscussAction.DISCUSS_FETCH :
                return{
                    ...state,
                    discussData : null,
                    loading : true,
                    error : ''
                }
            case DiscussAction.DISCUSS_FETCH_SUCCESS :
                return{
                    ...state,
                    discussData : action.payload,
                    loading : false,
                    error : ''
                }
            case DiscussAction.DISCUSS_FETCH_ERROR :
                return{
                    ...state,
                    discussData : null,
                    loading : false,
                    error : action.error
                }
        }
    return state;
}