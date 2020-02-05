import { SurveysNew } from "../core/surveys_session";
import { Action } from "redux";
import { SurveysAction } from "../actions/surveys_action";

const INITIAL_STATE : SurveysNew = {    
    surveysNew : null,
    loading : false,
    error : ''
}

type Payload = any;
type Error = any;

export interface ActionWithPayload<T,E> extends Action{
    payload? : T,
    error? : E
}

export function SurveysNewReducer(
    state : SurveysNew = INITIAL_STATE,
    action : ActionWithPayload<Payload,Error>) : 
    SurveysNew{
        switch(action.type){
            case SurveysAction.SURVEYS_AVIALABLE_FETCH :
                return{
                    ...state,
                    surveysNew : null,
                    loading : true,
                    error : ''
                }
            case SurveysAction.SURVEYS_AVIALABLE_FETCH_SUCCESS :
                return{
                    ...state,
                    surveysNew : action.payload,
                    loading : false,
                    error : ''
                }
            case SurveysAction.SURVEYS_AVIALABLE_FETCH_ERROR :
                return{
                    ...state,
                    surveysNew : null,
                    loading : false,
                    error : action.error
                }
            }
            return state;
        }