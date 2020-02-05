import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { WorkspaceRequestdataAction } from '../../redux/actions/workspace_requests_action';
import { Observable } from 'rxjs';
import { WorkspaceRequestData } from '../../redux/core/workspace_requests_session';
import { select } from '@angular-redux/store';
// import { WorkspaceRequestActions } from '../../redux/actions/workspace_request_action';

@IonicPage()
@Component({
  selector: 'page-workspace-request',
  templateUrl: 'workspace-request.html',
})
export class WorkspaceRequestPage {

  @select(['workspaceRequestdata', 'workspaceRequestData'])
  readonly workSpaceRequestData$ : Observable<WorkspaceRequestData>;

  public direction : any;
  public requestList : any;
  public requestSearch : string = '';
  public showRqstList : boolean = true;
  public fromHome : any;

  public workGroup : any;
  public show : boolean = true;
  public sideMenu : any;

  public userId:any;
  public defaultWSrequestData:any=[];
  public tempWSrequestData:any=[];
  public userDetails : any;
  public temparr:any=[];
  public checkBox : boolean = false;
  public shownConnect = null;
  public selectItem : any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public events: Events,
    public workspaceRequest:WorkspaceRequestdataAction
  ) {

    this.requestList = this.navParams.get('members');
    this.workGroup = this.navParams.get('workGroup');
    this.sideMenu = this.navParams.get('sideMenu');
    if(this.workGroup){
      this.show = true;
    }else{
      this.show = false;
    }
    // console.log(this.requestList);

    this.fromHome = this.navParams.get('fromHome');
    let userData:any = localStorage.getItem('userData');
      this.userDetails = JSON.parse(userData);
    this.userId = this.userDetails.ID;

   this.fetchdata();
   
   this.workSpaceRequestData$.subscribe((data:any)=>{
     if(data){
       console.log(data);
       this.defaultWSrequestData = data;
       this.tempWSrequestData = this.defaultWSrequestData;
     }else{
      this.defaultWSrequestData = [];
      this.tempWSrequestData = this.defaultWSrequestData;
     }
   })

    
    
  }

  fetchdata(){
    if(this.userId){
      if(this.requestList){
          let data:any = {
            workspaceId:this.requestList,
            userid:this.userId
          }
          console.log("workspace request data: ", data);
        this.workspaceRequest.fetchWorkspaceRequestdata(data);
      }

    }
  }

  ionViewWillEnter(){
    this.events.subscribe('type:direction', (value: any) => {
      this.direction = value;
    });
  }
  inputRequest(value){
    this.tempWSrequestData=[];
    if (value && value.toString().trim() != '') {
      this.tempWSrequestData = this.defaultWSrequestData.filter((item:any) => {
        return (item.Title.toLowerCase().indexOf(value.toString().toLowerCase()) > -1 );
      })
    }else{this.tempWSrequestData = this.defaultWSrequestData}
  }
  userSelect(item,ii){
    // console.log(ii);
    console.log(item);
    this.shownConnect = ii;
    // if(ii == this.shownConnect){ 
    //     this.shownConnect = null;
    // }else{
    //     this.shownConnect = ii;
    // }
    // this.temparr.push(ii);
    // console.log(this.temparr);
    /* Create 1 array */
    if(this.temparr.length!=0){
      let result:any = this.temparr.indexOf(ii);
      if(result ==-1){
          this.temparr.push(ii);
      }else{
        let narr:any = this.temparr.indexOf(ii);
          if (narr > -1) {
            this.temparr.splice(narr, 1);
          }
      }
    }else{
      this.temparr.push(ii);
    }
  }
  ignoreRqst(item,i){
    this.shownConnect = i = null;
    let index = this.temparr.indexOf(i);
    if (index > -1) {
      this.temparr.splice(index, 1);
    }else if(index ==-1){
      this.temparr.splice(index, 1);
    }
  }

  sendRqst(){
    console.log("Invitation list is : ", this.temparr)
    // console.log("Done");
  }
}
