import { EventsData } from "../core/events_session";
import { Action } from "redux";
import { EventsActions } from "../actions/events_action";

const INITIAL_STATE : EventsData = {
    eventsData : null,
    loading : false,
    error : ''
}

type Payload = any;
type Error = any;

export interface ActionWithPayload<T,E> extends Action{
    payload? : T,
    error? : E
}

export function EventsReducer(
    state : EventsData = INITIAL_STATE,
    action : ActionWithPayload<Payload,Error>) : 
    EventsData{
        switch(action.type){
            case EventsActions.EVENTS_FETCH :
                return{
                    ...state,
                    eventsData : null,
                    loading : true,
                    error : ''
                }
            case EventsActions.EVENTS_FETCH_SUCCESS :
                return{
                    ...state,
                    eventsData : action.payload,
                    loading : false,
                    error : ''
                }
            case EventsActions.EVENTS_FETCH_ERROR :
                return{
                    ...state,
                    eventsData : null,
                    loading : false,
                    error : action.error
                }
        }
        return state;
    }