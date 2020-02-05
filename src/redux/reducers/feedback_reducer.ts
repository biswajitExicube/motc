
import { Action } from "redux";
import { FeedbackData } from "../core/feedback_session";
import { FeedbackAction } from "../actions/feedback_action";

const INITIAL_STATE : FeedbackData = {
    feedbackData : null,
    loading : false,
    error : ''
}
type Payload = any;
type Error = any;

export interface ActionWithPayload<T,E> extends Action{
    payload? : T,
    error? : E
}

export function FeedbackReducer(
    state : FeedbackData = INITIAL_STATE,
    action : ActionWithPayload<Payload,Error>) :
    FeedbackData{
        switch(action.type){
            case FeedbackAction.FEEDBACK_FETCH:
                return{
                    ...state,
                    feedbackData : null,
                    loading : true,
                    error : ''
                }
            case FeedbackAction.FEEDBACK_FETCH_SUCCESS:
                return {
                    ...state,
                    feedbackData : action.payload,
                    loading : false,
                    error : ''
                }
            case FeedbackAction.FEEDBACK_FETCH_ERROR:
                return{
                    ...state,
                    feedbackData : null,
                    loading : false,
                    error : action.error
                }
        }
        return state;
    }
