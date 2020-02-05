import { NgModule } from '@angular/core';
import { NgRedux, DevToolsExtension } from '@angular-redux/store';
import { createLogger } from 'redux-logger';
import { IAppState } from '../core/store_model';
import { HomeActions } from '../actions/home_action';
import { HomeEpics } from '../epics/home_epics';
import { FavWorkspaceActions } from '../actions/favWorkspace_action';
import { FavWorkspaceEpics } from '../epics/favWorkspace_epics';


import { RootEpics } from './epic_module';
import { rootReducer } from './reducer_module'
import { AboutAction } from '../actions/about_action';
import { AboutEpics } from '../epics/about_epics';
import { TermsPrivacyAction } from '../actions/terms_privacy_action';
import { TermsPrivacyEpic } from '../epics/terms_privacy_epics';
import { AnnouceEpics } from '../epics/announce_epics';
import { AnnounceAction } from '../actions/announce_action';
import { NewsAction } from '../actions/news_action';
import { NewsEpics } from '../epics/news_epics';
import { NewsDetailAction } from '../actions/news_detail_action';
import { NewsDetailEpics } from '../epics/news_detail_epics';
import { EventsActions } from '../actions/events_action';
import { EventsEpics } from '../epics/events_epics';
import { EventsDetailActions } from '../actions/events_detail_action';
import { EventsDetailEpics } from '../epics/events_detail_epics';
import { AgencyAction } from '../actions/agenct_action';
import { AgencyEpics } from '../epics/agency_epics';
import { WorkGroupAction } from '../actions/workgroup_action';
import { WorkGroupEpics } from '../epics/workgroup_epics';
import { SurveysAction } from '../actions/surveys_action';
import { SurveysEpics } from '../epics/surveys_epics';
import { WorkEventsAction } from '../actions/work_events_action';
import { WorkEventsEpics } from '../epics/work_events_epics';

//for demo search
import { AllSearchEpics } from '../epics/all_search_epics';
import { AllSearchAction } from '../actions/all_search_action';
import { FeedbackEpics } from '../epics/feedback_epics';
import { FeedbackAction } from '../actions/feedback_action';
import { AnnounceDetailAction } from '../actions/announce_detail_action';
import { AnnounceDetailEpics } from '../epics/anounce_detail_epics';
import { WorkspaceUserAction } from '../actions/workspace_user_action';
import { WorkspaceUserEpics } from '../epics/workspace_user_epic';
import { KnowledgeCenterAction } from '../actions/knowledge_center_action';
import { KnowledgeCenterEpics } from '../epics/knowledge_center_epics';
import { FavUsersAction } from '../actions/fav_users_action';
import { FavUsersEpics } from '../epics/fav_users_epics';
import { UserTasksAction } from '../actions/user_tasks_action';
import { UserTasksEpics } from '../epics/user_tasks_epics';
import { WorkSpaceDetailAction } from '../actions/work_space_detail_action';
import { WorkSpaceDetailEpics } from '../epics/work_space_detail_epics';
import { AddRemoveFavEpics } from '../epics/addRemoveFav_epics';
import { AddRemoveFavAction } from '../actions/addRemoveFav_action';
import { NotifyAction } from '../actions/notify_action';
import { NotifyEpics } from '../epics/notify_epics';
import { PollsAction } from '../actions/polls_action';
import { PollsEpics } from '../epics/polls_epics';
import { DiscussAction } from '../actions/discuss_action';
import { DiscussEpics } from '../epics/discuss_epics';
import { EServiceEpics } from '../epics/eService_epics';
import { EServiceAction } from '../actions/eService_action';
import { JoinWorkspaceAction } from '../actions/join_workspace_action';
import { JoinWorkspaceEpics } from '../epics/join_workspace_epics';
import { LeaveWorkspaceAction } from '../actions/leave_workspace_action';
import { LeaveWorkspaceEpics } from '../epics/leave_workspace_epics';
import { WorkspaceDocListAction } from '../actions/workspace_docList_action';
import { WorkspaceDocListEpics } from '../epics/workspace_docList_epics';
import { UserloginAction } from '../actions/user_login_action';
import { UserloginEpics } from '../epics/user_login_epics';
import { CreateWorkspaceAction } from '../actions/create_workspace_action';
import { CreateWorkspaceEpics } from '../epics/create_workspace_epic';
import { AllFavouriteAction } from '../actions/all_favourite_action';
import { AllFavouriteEpics } from '../epics/all_favourite_epics';
import { InvitememberAction } from '../actions/invite_member_action';
import { InvitememberEpics } from '../epics/invite_member_epic';
import { WorkspaceRequestdataEpics } from '../epics/workspace_requests_epic';
import { WorkspaceRequestdataAction } from '../actions/workspace_requests_action';
import { GeneralSearchEpics } from '../epics/general_search_epics';
import { GeneralSearchsAction } from '../actions/general_search_action';


@NgModule({
    providers: [
        HomeActions,
        HomeEpics,
        FavWorkspaceActions,
        FavWorkspaceEpics,
        AboutAction,
        AboutEpics,
        TermsPrivacyAction,
        TermsPrivacyEpic,
        AnnouceEpics,
        AnnounceAction,
        AnnounceDetailAction,
        AnnounceDetailEpics,
        NewsAction,
        NewsEpics,
        NewsDetailAction,
        NewsDetailEpics,
        EventsActions,
        EventsEpics,
        EventsDetailActions,
        EventsDetailEpics,
        AgencyAction,
        AgencyEpics,
        WorkGroupAction,
        WorkGroupEpics,
        SurveysAction,
        SurveysEpics,
        WorkEventsAction,
        WorkEventsEpics,
        RootEpics,
        FeedbackAction,
        FeedbackEpics,
        WorkspaceUserAction,
        WorkspaceUserEpics,
        KnowledgeCenterAction,
        KnowledgeCenterEpics,
        FavUsersAction,
        FavUsersEpics,
        UserTasksAction,
        UserTasksEpics,
        WorkSpaceDetailAction,
        WorkSpaceDetailEpics,
        AddRemoveFavEpics,
        AddRemoveFavAction,
        NotifyAction,
        NotifyEpics,
        PollsAction,
        PollsEpics,
        DiscussAction,
        DiscussEpics,
        EServiceEpics,
        EServiceAction,
        JoinWorkspaceAction,
        JoinWorkspaceEpics,
        LeaveWorkspaceAction,
        LeaveWorkspaceEpics,
        WorkspaceDocListAction,
        WorkspaceDocListEpics,
        //create workspace
        CreateWorkspaceAction,
        CreateWorkspaceEpics,

        UserloginAction,
        UserloginEpics,
        //allFavourite
        AllFavouriteAction,
        AllFavouriteEpics,

        //for search
        AllSearchAction,
        AllSearchEpics,
        //Invite member
        InvitememberEpics,
        InvitememberAction,
        //workspace Request 
        WorkspaceRequestdataAction,
        WorkspaceRequestdataEpics,
        //general search
        GeneralSearchsAction,
        GeneralSearchEpics
    ]
})

export class StoreModule {
    constructor(public store : NgRedux<IAppState>, 
        devTools: DevToolsExtension,
        rootEpics : RootEpics
        ){
            store.configureStore(
                rootReducer,
                {},
                [
                //    createLogger(),
                     ...rootEpics.createEpics()],
                devTools.isEnabled()? [devTools.enhancer()] : []
            )
        }
}