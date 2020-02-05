import { WorkEventsData } from "../core/work_events_session";
import { Action } from "redux";
import { WorkEventsAction } from "../actions/work_events_action";

const INITIAL_STATE : WorkEventsData = {
    workEventsData : null,
    loading : false,
    error : ''
}

type Payload = any;
type Error = any;

export interface ActionWithPayload<T,E> extends Action{
    payload? : T,
    error? : E
}

export function WorkEventsReducer(
    state : WorkEventsData = INITIAL_STATE, 
    action: ActionWithPayload<Payload,Error>) : 
    WorkEventsData{
        switch(action.type){
            case WorkEventsAction.WORK_EVENTS_FETCH :
                return{
                    ...state,
                    workEventsData : null,
                    loading : true,
                    error : ''
                }
            case WorkEventsAction.WORK_EVENTS_FETCH_SUCCESS :
                return{
                    ...state,
                    workEventsData : action.payload,
                    loading : false,
                    error : ''
                }
            case WorkEventsAction.WORK_EVENTS_FETCH_ERROR :
                return{
                    ...state,
                    workEventsData : null,
                    loading : false,
                    error : action.error
                }
        }
    return state;
    }