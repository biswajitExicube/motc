import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, Slides, SegmentButton, MenuController, ModalController, ViewController } from 'ionic-angular';
import { WorkspaceChartPage } from '../workspace-chart/workspace-chart';
import { WorkspaceEventPage } from '../workspace-event/workspace-event';
import { CreateWorkspacePage } from '../create-workspace/create-workspace';
import { UserTypePage } from '../user-type/user-type';
import { WorkspaceDetailsPage } from '../workspace-details/workspace-details';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { WorkGroupData } from '../../redux/core/workgroup_session';
import { WorkGroupAction } from '../../redux/actions/workgroup_action';
import { SearchWorkspaces } from '../../redux/core/all_search_session';
import { AllSearchAction } from '../../redux/actions/all_search_action';


@IonicPage()
@Component({
  selector: 'page-work-groups',
  templateUrl: 'work-groups.html',
})
export class WorkGroupsPage {
  @ViewChild('loopSlider') sliderComponent: Slides;

  //Public Workgroup
  @select(['workGroupData', 'workGroupData'])
  readonly workGroupData$ : Observable<WorkGroupData>;

  @select(['WorkspaceSearchReducer', 'SearchWorkspacesData'])
  readonly SearchWorkspacesData$ : Observable<SearchWorkspaces>

  //My Workgroup
  @select(['myworkGroupData', 'myworkGroupData'])
  readonly myworkGroupData$ : Observable<WorkGroupData>;
  
  public direction : any;

  public groupSegModel : string = 'myGroup';
  public workGPList : any =[];
  public myworkGPList : any;
  public currLang : string;
  public showEle : boolean = false;
  public workGroup : any;
  public show : boolean = false;

  public defaultPublicWorkgroup:any;
  public defaultMyWorkgroup:any;

  public userId:any;
  public pageNo:any = 0;


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public events: Events,
    public menuCtrl: MenuController,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController,
    public workGroupAction : WorkGroupAction,
    public searchWorkgroupAction : AllSearchAction
  ) {
        /* Localstorage Data */
        let localLang = localStorage.getItem('direction');
        let userData:any = localStorage.getItem('userData');
        userData = JSON.parse(userData);
        this.userId = userData.ID;
        /* For Param Data */
        this.workGroup = this.navParams.get('workGroup');
        let chooseCat = this.navParams.get('chooseCat');
        
        if(localLang == 'ltr'){
            this.currLang = 'en'; 
            this.checkUser(this.currLang)
        }else if(localLang == 'rtl'){;
            this.currLang = 'ar'; 
            this.checkUser(this.currLang)
        }
        
        if(this.workGroup){  
          this.show = false; 
          this.groupSegModel = 'myGroup'
        }else{  
          this.show = true; 
          this.groupSegModel = 'publicGroup' 
        }

        /* For Public Workgroup data ( Default API ) */
        this.workGroupData$.subscribe((data:any) => {
            if(data){
              console.log("public ");
              for( let i=0; i<data.Workspaces.length; i++ ){
                console.log(data.Workspaces[i].IsAdmin);
              }
                if(data.Workspaces){
                  this.defaultPublicWorkgroup = data.Workspaces;
                  this.workGPList = this.defaultPublicWorkgroup
                }else{  
                  this.defaultPublicWorkgroup = []; 
                  this.workGPList = this.defaultPublicWorkgroup 
                }
            }
        })

        /* For My Workgroup data ( Default API ) */
        this.myworkGroupData$.subscribe((data:any) => {
            if(data){
              console.log("My ");
              for( let i=0; i<data.Workspaces.length; i++ ){
                console.log(data.Workspaces[i].IsAdmin);
              }
                if(data.Workspaces){
                  this.defaultMyWorkgroup = data.Workspaces;
                  this.myworkGPList = this.defaultMyWorkgroup
                }else{  
                  this.defaultMyWorkgroup = []; 
                  this.myworkGPList = this.defaultMyWorkgroup 
                }
            }
        })
        
        /* For Search Public WorkGroup Data / Public Workspace Data */
        this.SearchWorkspacesData$.subscribe((data:any) => {
            if(data){
                if(data.Workspaces){
                  if(this.groupSegModel == "myGroup"){  this.myworkGPList = data.Workspaces
                  }else{ this.workGPList = data.Workspaces }
                }else{
                  if(this.groupSegModel == "myGroup"){ this.myworkGPList = [];
                  }else{ this.workGPList = []; }
                }
            }
        })

  }

  /* IonViewWillEnter */
  ionViewWillEnter(){
      this.events.subscribe('type:direction', (value: any) => {
          this.direction = value;
          if(this.direction == 'rtl'){
              this.currLang = 'ar';
              this.checkUser(this.currLang)
          }else if(this.direction == 'ltr'){ 
              this.currLang = 'en';
              this.checkUser(this.currLang)
          }
      });

      if(this.groupSegModel== 'publicGroup'){
          this.sliderComponent.slideTo(1, 500);
      }
  }

  /* Check User */
  checkUser(currentLang){
    let userData:any = localStorage.getItem('userData');
      userData = JSON.parse(userData);
      let localstorageData = userData.ID;
      if(localstorageData){
          let param:any = {
              lang:currentLang,
              userId:localstorageData,
              pageNo:this.pageNo
          }
          this.workGroupAction.workGroupFetch(param);
          this.workGroupAction.myworkGroupFetch(param)
      }
  }

  /* For Search Announcement Function */
  searchWorkspace(searchStr:any){
      if(this.groupSegModel == "myGroup"){
          this.searchPublicWorkgroup(searchStr,'my');
      }else{
          this.searchPublicWorkgroup(searchStr,'public');
      }
  }

  /* For Search Public Workgroup */
  searchPublicWorkgroup(searchStr,searchtype){
      if(searchStr == ""){
          if(this.groupSegModel == "myGroup"){
            this.myworkGPList = this.defaultMyWorkgroup 
          }else{
            this.workGPList = this.defaultPublicWorkgroup
          }
      }else{
          let data ={
            lang:this.currLang,
            workspacetype:searchtype,
            searchquery:searchStr,
            userId:this.userId,
            pageNo:0
          }
        this.searchWorkgroupAction.FetchWorkSpace(data);
      }
  }






  goMissions(work){
    this.navCtrl.push(WorkspaceChartPage, {workspacedetails:work});
  }


  knowMore(workgroupData:any){

    if(workgroupData.CanJoin == false && workgroupData.IsAdmin ==true){
      workgroupData.workgroupUserType = 'admin'
    }else if(workgroupData.CanJoin == false && workgroupData.IsAdmin ==false){
      workgroupData.workgroupUserType = 'member'
    }else if (workgroupData.CanJoin == true && workgroupData.IsAdmin ==false){
      workgroupData.workgroupUserType = 'notMember'
    }
     this.navCtrl.push(WorkspaceDetailsPage, {data:workgroupData,fromHome:this.workGroup?true:false});
  
  }

  





  // doInfinite(infiniteScroll) {
  
  //   console.log('Begin async operation');
  //   this.pageNo = this.pageNo+1
  //   setTimeout(() => {
  //     let param:any = {
  //       lang:this.currLang,
  //       userId:this.userId,
  //       pageNo:this.pageNo
  //     }
  //     this.workGroupAction.workGroupFetch(param);
  //     console.log('Async operation has ended');
  //     infiniteScroll.complete();
  //   }, 500);
  // }







  /* Sidemenu Click Function */
  openMenu(){
    let menuShow = localStorage.getItem('direction');
    if(menuShow == 'rtl'){
      this.menuCtrl.open('right');
    }else{
      this.menuCtrl.open('left');
    }
  }

  /* For Segement Change Function ( 1. My Workgroup, 2. Public Workgroup) */
  segmentChanged(segmentButton: SegmentButton) {
    if(segmentButton.value == 'myGroup'){
      this.sliderComponent.slideTo(0, 500);
    }else if(segmentButton.value == 'publicGroup'){
      this.sliderComponent.slideTo(1, 500);
    }
  }

  /* For Segement Slide Change ( 1. My Workgroup, 2. Public Workgroup) */
  onSlideChanged(s: Slides) {
    let currentIndex = this.sliderComponent.getActiveIndex();
    if(currentIndex == 0){
      this.groupSegModel = 'myGroup';
    }else if(currentIndex == 1){
      this.groupSegModel = 'publicGroup';
    }
  }

  /* Add New Group Function */
  addGroup(){
    if(this.workGroup){
      this.navCtrl.push(CreateWorkspacePage, {workGroup : true});
    }else{
      this.navCtrl.push(CreateWorkspacePage, {sideMenu : true});
    }
  }
  



  /* Individual Item Click Function */
  userType(){
    if(this.workGroup){
      let page = {workGroup : true};
      this.openModal(page);
    }else{
      let page = {sideMenu : true};
      this.openModal(page);
    }
  }

    /* OpenModal Function */
    openModal(page){
      let profileModal = this.modalCtrl.create(UserTypePage, page, {cssClass: 'userType'});
      profileModal.onDidDismiss(data => {
        if(data){
          this.navCtrl.push(WorkspaceDetailsPage, {data:data});
        }
      });
      profileModal.present();
      
    }


}
