import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { WorkspaceRequestPage } from '../workspace-request/workspace-request';
import { InviteMemberPage } from '../invite-member/invite-member';
import { WorkGroupsPage } from '../work-groups/work-groups';
import { MediaEventsPage } from '../media-events/media-events';
import { MyTaskPage } from '../my-task/my-task';
import { ContactFavouritePage } from '../contact-favourite/contact-favourite';
import { DocumentListPage } from '../document-list/document-list';

import { SocialSharing } from '@ionic-native/social-sharing';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { WorkSpaceDetailData } from '../../redux/core/work_space_detail_session';
import { WorkSpaceDetailAction } from '../../redux/actions/work_space_detail_action';
import { AlertProvider } from '../../providers/alert-provider/alert_provider';
import { JoinWrokspace } from '../../redux/core/join_workspace_session';
import { JoinWorkspaceAction } from '../../redux/actions/join_workspace_action';
import { LeaveWorkspace } from '../../redux/core/leave_workspace_session';
import { LeaveWorkspaceAction } from '../../redux/actions/leave_workspace_action';
import { UserLoginReducer } from '../../redux/reducers/user_login_reducer';
import { WorkspaceEventPage } from '../workspace-event/workspace-event';
import { AddRemoveFavAction } from '../../redux/actions/addRemoveFav_action';

@IonicPage()
@Component({
  selector: 'page-workspace-details',
  templateUrl: 'workspace-details.html',
})
export class WorkspaceDetailsPage {

  @select(['workSpaceDetail', 'workSpaceDetailData'])
  readonly workSpaceDetailData$ : Observable<WorkSpaceDetailData>;
  @select(['joinWorkspace', 'joinWorkspace'])
  readonly joinWorkspace$ : Observable<JoinWrokspace>;
  @select(['leaveWorkspace', 'leaveWorkspace'])
  readonly leaveWorkspace$ : Observable<LeaveWorkspace>;

  public direction : any;
  public eventLike : boolean = false;
  public userType : any = 'admin';
  public fromHome : any;

  public wsDetail : any = [];

  public workGroup : any;
  public show : boolean = true;
  public workGroupData : any;
  public sideMenu : any;
  public currLang : string;
  public count : number = 0;
  public userDetails : any;
  public skypeUser: any ;
  //new
  userData:any;
  userId:any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public events: Events,
    private sanitizer: DomSanitizer,
    private socialSharing: SocialSharing,
    public workSpaceDetailAction : WorkSpaceDetailAction,
    public joinWorkspaceAction : JoinWorkspaceAction,
    public leaveWorkspaceAction : LeaveWorkspaceAction,
    public alertprovider : AlertProvider,
    public addremovefavaction:AddRemoveFavAction
    
  ) {
      // console.log("here");
      let localLang = localStorage.getItem('direction');
      let userData:any = localStorage.getItem('userData');
      this.userDetails = JSON.parse(userData);
      this.userId = this.userDetails.ID;
      if(localLang == 'ltr'){
        this.currLang = 'en';
        this.GetDetails('en')
        //this.workSpaceDetailAction.workSpaceDetailFetch(this.currLang);
      }else if(localLang == 'rtl'){
        this.currLang = 'ar';
        this.GetDetails('ar')
        //this.workSpaceDetailAction.workSpaceDetailFetch(this.currLang);        
      }


  }


GetDetails(lng){
  this.fromHome = this.navParams.get('fromHome');
  if(this.navParams.get('data')) {
    this.userData = this.navParams.get('data');
    console.log("this.userData : ", this.userData)
    let param :any = {
      lang:lng,
      userId:this.userId,
      workSpaceId:this.userData.ID
    }
    // console.log(param)
    this.workSpaceDetailAction.workSpaceDetailFetch(param)
    
      this.workSpaceDetailData$.subscribe((data : any) => {
        if(data){
          let details:any = data;
          // this.wsDetail = data;
          // console.log(this.wsDetail);
          // this.skypeUser = 'skype://live:pradipmondal7777?call';

          if(details.Admin){
            if(details.Admin.OfficePhone != ''){
              let skypeUrl= 'skype:'+details.Admin.OfficePhone +'?call'
              let chatUrl= 'skype:'+details.Admin.OfficePhone +'?chat'
              details.customcreateSkype =this.sanitizer.bypassSecurityTrustResourceUrl(skypeUrl);
              details.customSkypeChat =this.sanitizer.bypassSecurityTrustResourceUrl(chatUrl);
            }
          }
          this.wsDetail = details; 
          this.skypeUser = this.wsDetail.Admin.OfficePhone;

          console.log(this.wsDetail);         

        }
      })
    
    
  }
}

noNumber(option){
  if(option == 'call'){
    this.alertprovider.openToast("No Number for Call!");
  }else{
    this.alertprovider.openToast("No Number for Chat!");
  }
}

  ionViewDidLoad() {
    //console.log('ionViewDidLoad WorkspaceDetailsPage');
  }
  ionViewWillEnter(){
    this.events.subscribe('type:direction', (value: any) => {
      this.direction = value;
      if(this.direction == 'rtl'){
        this.GetDetails('ar')
       // this.workSpaceDetailAction.workSpaceDetailFetch('ar');
      }else if(this.direction == 'ltr'){
        this.GetDetails('en')
        //this.workSpaceDetailAction.workSpaceDetailFetch('en');
      }
    });
    // this.skypeUser = this.sanitizer.bypassSecurityTrustUrl(this.skypeUser);
  }
  likingItem(){
    console.log(this.wsDetail);
    this.eventLike = !this.eventLike;

    let data={
      lang:this.currLang,
      ref:'workspaces',
      itemID:this.wsDetail.ID,
      opr:!this.wsDetail.IsFavourite,
    }

    this.addremovefavaction.startAddRemoveFav(data);


    
  }

  inviteMem(members){
    // console.log(members.Members);
    if(this.workGroup || this.workGroupData){
    //   this.navCtrl.push(InviteMemberPage, {workGroup: true, members : members});
    this.navCtrl.push(InviteMemberPage, {workGroup: true, members : members.Members});
    }else{
    //   this.navCtrl.push(InviteMemberPage, {sideMenu : true, members : members});
    this.navCtrl.push(InviteMemberPage, {sideMenu : true, members : members.Members});
    }
  }
  requestList(members){
    console.log(members)
    
    if(this.workGroup || this.workGroupData){
      this.navCtrl.push(WorkspaceRequestPage, {workGroup: true, members : members.ID ? members.ID :  this.userData.ID});
    }else{
      this.navCtrl.push(WorkspaceRequestPage, {sideMenu : true, members : members.ID ? members.ID :  this.userData.ID});
    }
  }

  
  goDocList(){
    let pdata :any ={
      workSpaceId:this.userData.ID,
      lang:this.currLang
    }
    this.navCtrl.push(DocumentListPage,{data:pdata});

  }

  goEvent(){
    // this.navCtrl.setRoot(MediaEventsPage,{workspacedetails:wData});
    this.navCtrl.push(WorkspaceEventPage,{detailsId:this.userData.ID});
    WorkspaceEventPage
  }
  goTask(){
    this.navCtrl.setRoot(MyTaskPage,{fromPage:'workspace', workspaceId:this.userData.ID});
  }
  goFabContact(members){
    // console.log(members);
    // this.navCtrl.setRoot(ContactFavouritePage);
    if(this.workGroup || this.workGroupData){
      this.navCtrl.push(InviteMemberPage, {workGroup: true, members : members,fromMember:true});
    }else{
      this.navCtrl.push(InviteMemberPage, {sideMenu : true, members : members,fromMember:true});
    }
  }
  chooseCat(){
    this.navCtrl.setRoot(WorkGroupsPage, {chooseCat : true});
  }
  // forChat(){
  //   let shareOpts = {
  //     message : 'Hi',
  //     phoneNumber : this.wsDetail.Admin.email
  //   }
  //   if(this.wsDetail.Admin.email){
  //     this.socialSharing.shareViaSMS(shareOpts.message, shareOpts.phoneNumber).then((success) =>{
  //       //console.log(success);
  //     }).catch((error) => {
  //       //console.log(error);
  //     });
  //   }
  // }

  /* Workspace Leave */
  leaveGR(){
    let paramData :any ={
      lang:this.currLang,
      userId:this.userDetails.ID,
      workspaceId:this.userData.ID
    }
    this.leaveWorkspaceAction.leaveWorkspaceFetch(paramData);
  }

  /* Workspace JOIN */
  joinGR(){
    let paramData :any ={
      lang:this.currLang,
      userId:this.userDetails.ID,
      workspaceId:this.userData.ID
    }
    this.joinWorkspaceAction.joinWorkspaceFetch(paramData);  
  }

  /* Workspace Register */
  public registerWorkspace(){
    let paramData :any ={
      lang:this.currLang,
      userId:this.userDetails.ID,
      workspaceId:this.userData.ID
    }
    this.joinWorkspaceAction.joinWorkspaceFetch(paramData);
  }


  toastView(){
    
  }


}
