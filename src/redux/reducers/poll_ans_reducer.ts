

import { PollAnswer } from "../core/polls_session";
import { Action } from "redux";
import { PollsAction } from "../actions/polls_action";

const INITIAL_STATE : PollAnswer = {
    pollAnsData : null,
    loading : false,
    error : ''
}

type Payload = any;
type Error = any;

export interface ActionWithPayload<T,E> extends Action{
    payload? : T,
    error? : E
}

export function PollsAnsReducer(
    state : PollAnswer = INITIAL_STATE,
    action : ActionWithPayload<Payload,Error>
) : PollAnswer{
        switch(action.type){
            case PollsAction.POLLS_FETCH :
                return{
                    ...state,
                    pollAnsData : null,
                    loading : true,
                    error : ''
                }
            case PollsAction.SUCCESS_POLL_ANS :
           // console.log(action.payload)
                return{
                    ...state,
                    pollAnsData : action.payload,
                    loading : false,
                    error : ''
                }
            case PollsAction.FAILED_POLL_ANS :
                return{
                    ...state,
                    pollAnsData : null,
                    loading : false,
                    error : action.error
                }
        }
    return state;
}