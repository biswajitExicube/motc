import { EventsDetailData } from "../core/events_detail_session";
import { Action } from "redux";
import { EventsDetailActions } from "../actions/events_detail_action";

const INITIAL_STATE : EventsDetailData = {
    eventsDetailData : null,
    loading : false,
    error : ''
}

type Payload = any;
type Error = any;

export interface ActionWithPayload<T,E> extends Action{
    payload? : T,
    error? : E
}

export function EventsDetailReducer(
    state : EventsDetailData = INITIAL_STATE,
    action : ActionWithPayload<Payload,Error>) : 
    EventsDetailData{
        switch(action.type){
            case EventsDetailActions.EVENTS_DETAIL_FETCH :
                return{
                    ...state,
                    eventsDetailData : null,
                    loading : true,
                    error : ''
                }
            case EventsDetailActions.EVENTS_DETAIL_FETCH_SUCCESS :
                return{
                    ...state,
                    eventsDetailData : action.payload,
                    loading : false,
                    error : ''
                }
            case EventsDetailActions.EVENTS_DETAIL_FETCH_ERROR :
                return{
                    ...state,
                    eventsDetailData : null,
                    loading : false,
                    error : action.error
                }
        }
        return state;
    }