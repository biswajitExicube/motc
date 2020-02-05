import { combineReducers } from 'redux';
import { HomeReducer } from '../reducers/home_reducer';
import { FavWorkspaceReducer } from '../reducers/favWorkspace_reducer';
import { AboutReducer } from '../reducers/about_reducer';
import { TermsPrivacyReducer } from '../reducers/terms_privacy_reducer';
import { AnnounceReducer } from '../reducers/announce_reducer';
import { NewsReducer } from '../reducers/news_reducer';
import { NewsDetailReducer } from '../reducers/news_detail_reducer';
import { EventsReducer } from '../reducers/events_reducer';
import { EventsDetailReducer } from '../reducers/events_detail_reducer';
import { AgencyReducer } from '../reducers/agency_reducer';
import { WorkGroupReducer } from '../reducers/workgroup_reducer';
import { SurveysOldReducer } from '../reducers/surveys_old_reducer';
import { SurveysNewReducer } from '../reducers/surveys_new_reducer';
import { WorkEventsReducer } from '../reducers/work_events_reducer';
import { FeedbackReducer } from '../reducers/feedback_reducer';

//for Search data
import { NewsSearchReducer } from '../reducers/all_search/news_search_reducer';
import { WorkspaceSearchReducer } from '../reducers/all_search/workspace_search_reducers';
import { UsercontectSearchReducer } from '../reducers/all_search/usercontacts_search_reducers';
import { SurveySearchReducer } from '../reducers/all_search/survey_search_reducers';
import { PollSearchReducer } from '../reducers/all_search/polls_search_reducers';
import { EventSearchReducer } from '../reducers/all_search/events_search_reducer';
import { DocumentSearchReducer } from '../reducers/all_search/documents_search_reducers';
import { AnnouncementSearchReducer } from '../reducers/all_search/announcements_search_reducer';
import { AgenciesSearchReducer } from '../reducers/all_search/agencies_search_reducers';
import { KnowledgeCenterSearchDOcumentReducer } from '../reducers/all_search/knowledge_center_search_document_reducer';

import { AnnounceDetailReducer } from '../reducers/announce_detail_reducer';
import { WorkspaceUserTaskReducer } from '../reducers/workspace_user/workspace_user_task_reducers';
import { PoliticsReducer } from '../reducers/knowledge_center/politics_reducer';
// import { BestPracticeReducer } from '../reducers/knowledge_center/best_practice_reducer';
import { OthersReducer } from '../reducers/knowledge_center/others_knowledgecenter_catagory_reducer';
import { FavUsersReducer } from '../reducers/fav_users_reducer';
import { UserTasksReducer } from '../reducers/user_tasks_reducer';
import { WorkSpaceDetailReducer } from '../reducers/work_space_detail_reducer';
import { AddRemoveFavReducer } from '../reducers/addRemoveFav_reducer';
import { UserTasksDetailReducer } from '../reducers/user_tasks_detail_reducer';
import { NotifyReducer } from '../reducers/notify_reducer';
import { PollsReducer } from '../reducers/polls_reducer';
import { DiscussReducer } from '../reducers/discuss_reducer';
import { EServiceReducer } from '../reducers/eService_reducer';
import { ESCompaniesReducer } from '../reducers/esCompanies_reducer';
import { ESOthersReducer } from '../reducers/esOthers_reducer';
import { ESIndividualReducer } from '../reducers/esIndividual_reducer';
import { JoinWorkspaceReducer } from '../reducers/join_workspace_reducer';
import { LeaveWorkspaceReducer } from '../reducers/leave_workspace_reducer';
import { WorkspaceDocListReducer } from '../reducers/workspace_docList_reducer';
import { UserLoginReducer } from '../reducers/user_login_reducer';
import { myWorkGroupReducer } from '../reducers/myworkgroup_reducer';
import { OtherKnowledgeCenterListReducer } from '../reducers/knowledge_center/other_knowledgecenter_reducer';
import { BestPracticeReducer } from '../reducers/knowledge_center/best_practice_reducer';
import { AnnouncementHome } from '../reducers/announcement_home_reducer';
import { FavUsercontactSearchReducer } from '../reducers/all_search/fav_user_contacts_reducer';

//Fav News, Events,Documents, Workspaces ==>
import { FavNewsReducer } from '../reducers/all_favourite/fav_news_reducers';
import { FavEventReducer } from '../reducers/all_favourite/fav_event_reducers';
import { FavDocumentReducer } from '../reducers/all_favourite/fav_document_reducers';
import { FavWorkspacesReducer } from '../reducers/all_favourite/fav_workspace_reducers';
import { PollsAnsReducer } from '../reducers/poll_ans_reducer';
import { WorkspaceRequestsdataReducer } from '../reducers/workspace_requests_reducer';
import { GeneralSearchReducer } from '../reducers/general_search_reducer';
// import { WorkspaceRequestReducer } from '../reducers/workspace_request_reducer';
// <== Fav News, Events,Documents, Workspaces


export const rootReducer =
combineReducers({
    homeData : HomeReducer,
    favWorkspaceData : FavWorkspaceReducer,
    aboutData : AboutReducer,
    termsPrivacyData : TermsPrivacyReducer,
    //announcement
    annouceData : AnnounceReducer,
    annouceDetailData : AnnounceDetailReducer,
    announcementHome:AnnouncementHome,
    
    newsData : NewsReducer,
    newsDetailData : NewsDetailReducer,
    eventsData : EventsReducer,
    eventsDetailData : EventsDetailReducer,
    agencyData : AgencyReducer,
    workGroupData : WorkGroupReducer,
    myworkGroupData:myWorkGroupReducer,
    surveysOld : SurveysOldReducer,
    surveysNew : SurveysNewReducer,
    workEventsData : WorkEventsReducer,
    feedbackData:FeedbackReducer,
    notifyData : NotifyReducer,
    //Polls reducers
    pollsData : PollsReducer,
    PollsAnsReducer:PollsAnsReducer,
    
    discussData : DiscussReducer,
    joinWorkspace : JoinWorkspaceReducer,
    leaveWorkspace : LeaveWorkspaceReducer,
    workspaceDocList : WorkspaceDocListReducer,
    //Login
    UserloginData:UserLoginReducer,

    //E-Service
    eServiceData : EServiceReducer,
    esIndividualData : ESIndividualReducer,
    esCompaniesData : ESCompaniesReducer,
    esOthersData : ESOthersReducer,
    
    //workSpaceUser
    workspaceUserTaskData:WorkspaceUserTaskReducer,
    //Knowledge Centae
    bestPractice_knowledgeCenter :BestPracticeReducer,
    politics_knowledgeCenter : PoliticsReducer,
    other_knowledgeCenter:OtherKnowledgeCenterListReducer,
    othersData : OthersReducer,
    
    
    favUsersData : FavUsersReducer,
    userTasksData : UserTasksReducer,
    userTasksDetail : UserTasksDetailReducer,
    workSpaceDetail : WorkSpaceDetailReducer,
    AddRemoveFavData:AddRemoveFavReducer,

    //for Search data
    WorkspaceSearchReducer:WorkspaceSearchReducer,
    UsercontectSearchReducer:UsercontectSearchReducer,
    SurveySearchReducer:SurveySearchReducer,
    PollSearchReducer:PollSearchReducer,
    NewsSearchData:NewsSearchReducer,
    EventSearchReducer:EventSearchReducer,
    DocumentSearchReducer:DocumentSearchReducer,
    AnnouncementSearchReducer:AnnouncementSearchReducer,
    AgenciesSearchReducer:AgenciesSearchReducer,
    KnowledgeCenterSearchDocumentReducer:KnowledgeCenterSearchDOcumentReducer,
    FavUsercontact:FavUsercontactSearchReducer,
    //All Favourite
    FavDocument:FavDocumentReducer,
    FavEvent:FavEventReducer,
    FavNews:FavNewsReducer,
    FavWorkspace:FavWorkspacesReducer,
    //workspace request
    workspaceRequestdata:WorkspaceRequestsdataReducer,
    //General Search
    generalsearchdata:GeneralSearchReducer





})