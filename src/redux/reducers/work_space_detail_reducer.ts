import { WorkSpaceDetailData } from "../core/work_space_detail_session";
import { Action } from "redux";
import { WorkSpaceDetailAction } from "../actions/work_space_detail_action";

const INITIAL_STATE : WorkSpaceDetailData = {
    workSpaceDetailData : null,
    loading : false,
    error : ''
}

type Payload = any;
type Error = any;

export interface ActionWithPayload<T,E> extends Action{
    payload? : T,
    error? : E
}

export function WorkSpaceDetailReducer(
    state : WorkSpaceDetailData = INITIAL_STATE,
    action : ActionWithPayload<Payload,Error>
) : WorkSpaceDetailData{
        switch(action.type){
           
            case WorkSpaceDetailAction.WORK_SPACE_DETAIL_FETCH :
                return{
                    ...state,
                    workSpaceDetailData : null,
                    loading : true,
                    error : ''
                }
            case WorkSpaceDetailAction.WORK_SPACE_DETAIL_FETCH_SUCCESS :
                return{
                    ...state,
                    workSpaceDetailData : action.payload,
                    loading : false,
                    error : ''
                }
            case WorkSpaceDetailAction.WORK_SPACE_DETAIL_FETCH_ERROR :
                return{
                    ...state,
                    workSpaceDetailData : null,
                    loading : false,
                    error : action.error
                }
        }
    return state;
}