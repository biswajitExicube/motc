import { PollsData } from "../core/polls_session";
import { Action } from "redux";
import { PollsAction } from "../actions/polls_action";

const INITIAL_STATE : PollsData = {
    pollsData : null,
    loading : false,
    error : ''
}

type Payload = any;
type Error = any;

export interface ActionWithPayload<T,E> extends Action{
    payload? : T,
    error? : E
}

export function PollsReducer(
    state : PollsData = INITIAL_STATE,
    action : ActionWithPayload<Payload,Error>
) : PollsData{
        switch(action.type){
            case PollsAction.POLLS_FETCH :
                return{
                    ...state,
                    pollsData : null,
                    loading : true,
                    error : ''
                }
            case PollsAction.POLLS_FETCH_SUCCESS :
                return{
                    ...state,
                    pollsData : action.payload,
                    loading : false,
                    error : ''
                }
            case PollsAction.POLLS_FETCH_ERROR :
                return{
                    ...state,
                    pollsData : null,
                    loading : false,
                    error : action.error
                }
        }
    return state;
}