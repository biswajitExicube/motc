
import { Action } from "redux";
import { AllFavouriteAction } from "../../actions/all_favourite_action";
import { FavWorkspace } from "../../core/all_favourite_session";


const INITIAL_STATE : FavWorkspace = {
    favouriteWorkspaces : null,
    loading : false,
    error : ''
}
type Payload = any;
type Error = any;

export interface ActionWithPayload<T,E> extends Action{
    payload? : T,
    error? : E
}

export function FavWorkspacesReducer(
    state : FavWorkspace = INITIAL_STATE,
    action : ActionWithPayload<Payload,Error>) :
    FavWorkspace{
        switch(action.type){
            case AllFavouriteAction.FETCH_FAV_WORKSPACE:
                return{
                    ...state,
                    favouriteWorkspaces : null,
                    loading : true,
                    error : ''
                }
            case AllFavouriteAction.SUCCESS_FAV_WORKSPACE:
                return {
                    ...state,
                    favouriteWorkspaces : action.payload,
                    loading : false,
                    error : ''
                }
        }
        return state;
    }