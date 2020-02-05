
import { Action } from "redux";
import { SearchWorkspaces } from "../../core/all_search_session";
import { AllSearchAction } from "../../actions/all_search_action";

const INITIAL_STATE : SearchWorkspaces = {
    SearchWorkspacesData : null,
    loading : false,
    error : ''
}
type Payload = any;
type Error = any;

export interface ActionWithPayload<T,E> extends Action{
    payload? : T,
    error? : E
}

export function WorkspaceSearchReducer(
    state : SearchWorkspaces = INITIAL_STATE,
    action : ActionWithPayload<Payload,Error>) :
    SearchWorkspaces{
        switch(action.type){
            case AllSearchAction.FETCH_WORK_SPACE:
                return{
                    ...state,
                    SearchWorkspacesData : null,
                    loading : true,
                    error : ''
                }
            case AllSearchAction.SUCCESS_WORK_SPACE:
                // console.log(action.payload);
                return {
                    ...state,
                    SearchWorkspacesData : action.payload,
                    loading : false,
                    error : ''
                }
            // case AboutAction.ABOUT_FETCH_ERROR:
            //     return{
            //         ...state,
            //         SearchEventsData : null,
            //         loading : false,
            //         error : action.error
            //     }
        }
        return state;
    }