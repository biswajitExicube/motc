import { AnnounceData } from "../core/announce_session";
import { Action } from "redux";
import { AnnounceAction } from "../actions/announce_action";

const INITIAL_STATE : AnnounceData = {
    announceData : null,
    loading : false,
    error : ''
}

type Payload = any;
type Error = any;

export interface ActionWithPayload<T,E> extends Action{
    payload? : T,
    error? : E
}

export function AnnounceReducer(
    state : AnnounceData = INITIAL_STATE,
    action : ActionWithPayload<Payload,Error>) : 
    AnnounceData{
        switch(action.type){
            case AnnounceAction.ANNOUNCE_FECTH :
                return{
                    ...state,
                    announceData : null,
                    loading : true,
                    error : ''
                }
            case AnnounceAction.ANNOUNCE_FECTH_SUCCESS :
                return{
                    ...state,
                    announceData : action.payload,
                    loading : false,
                    error : ''
                }
            case AnnounceAction.ANNOUNCE_FECTH_ERROR :
                return{
                    ...state,
                    announceData : null,
                    loading : false,
                    error : action.error
                }
        }
        return state;
    }