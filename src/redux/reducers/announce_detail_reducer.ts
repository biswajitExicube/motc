import { AnnounceDetailData } from "../core/announce_detail_session";
import { Action } from "redux";
import { AnnounceAction } from "../actions/announce_action";
import { AnnounceDetailAction } from "../actions/announce_detail_action";

const INITIAL_STATE : AnnounceDetailData = {
    announceDetailData : null,
    loading : false,
    error : ''
}

type Payload = any;
type Error = any;

export interface ActionWithPayload<T,E> extends Action{
    payload? : T,
    error? : E
}

export function AnnounceDetailReducer(
    state : AnnounceDetailData = INITIAL_STATE,
    action: ActionWithPayload<Payload,Error>) : 
    AnnounceDetailData{
        switch(action.type){
            case AnnounceAction.ANNOUNCE_FECTH :
                return{
                    ...state,
                    announceDetailData : null,
                    loading : true,
                    error : ''
                }
            case AnnounceDetailAction.ANNOUNCE_DETAIL_FETCH_SUCCESS :
                return{
                    ...state,
                    announceDetailData : action.payload,
                    loading : false,
                    error : ''
                }
            case AnnounceDetailAction.ANNOUNCE_DETAIL_FETCH_ERROR :
                return{
                    ...state,
                    announceDetailData : null,
                    loading : false,
                    error : action.error
                }
        }
    return state;
}