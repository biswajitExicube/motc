import { WorkspaceDocList } from "../core/workspace_docList_session";
import { Action } from "redux";
import { WorkspaceDocListAction } from "../actions/workspace_docList_action";

const INITIAL_STATE : WorkspaceDocList = {
    workspaceDocList : null,
    loading : false,
    error : ''
}

type Payload = any;
type Error = any;

export interface ActionWithPayload<T,E> extends Action{
    payload? : any,
    error? : any
}

export function WorkspaceDocListReducer(
    state : WorkspaceDocList = INITIAL_STATE,
    action : ActionWithPayload<Payload,Error>
) : WorkspaceDocList{
    switch(action.type){
        case WorkspaceDocListAction.WORKSPACE_DOCLIST_FETCH :
            return{
                ...state,
                workspaceDocList : null,
                loading : true,
                error : ''
            }
        case WorkspaceDocListAction.WORKSPACE_DOCLIST_FETCH_SUCCESS :
            return{
                ...state,
                workspaceDocList : action.payload,
                loading : false,
                error : ''
            }
        case WorkspaceDocListAction.WORKSPACE_DOCLIST_FETCH_ERROR :
            return{
                ...state,
                workspaceDocList : null,
                loading : false,
                error : action.error
            }
    }
    return state;
}