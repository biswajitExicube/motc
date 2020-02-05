import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, MenuController } from 'ionic-angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import { WorkspaceDetailsPage } from '../workspace-details/workspace-details';
import { CreateWorkspaceAction } from '../../redux/actions/create_workspace_action';
import { AlertProvider } from '../../providers/alert-provider/alert_provider';

@IonicPage()
@Component({
  selector: 'page-create-workspace',
  templateUrl: 'create-workspace.html',
})
export class CreateWorkspacePage {

  public direction : any;
  public kindGroupOption : any = 'project';
  // public privacyGroupOption : any = 'private';
  public workSpaceName : string;
  public workSpaceDesc : string ;
  public kindGroupOptions:any = '1'
  public privacyGroupOption:any = '1'

  // public CRWSpaceData : FormGroup;
  public showEle : boolean = false;
  public workGroup : any;
  public show : boolean = true;
  public addGroupH : any;
  public sideMenu : any;
  public userName : any;


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public events: Events,
    public menuCtrl: MenuController,
    private fb: FormBuilder,
    public CreateWorkspaceAction:CreateWorkspaceAction,
    public AlertProvider:AlertProvider,
    public event:Events
  ) {
    let userData:any = localStorage.getItem('userData');
    userData = JSON.parse(userData);
    this.userName = userData.UserName;
    console.log(this.userName);
      this.workGroup = this.navParams.get('workGroup');
      this.addGroupH = this.navParams.get('addGroupH');

      this.sideMenu = this.navParams.get('sideMenu');

      if(this.workGroup || this.addGroupH || this.sideMenu){
        this.show = true;
      }else{
        this.show = false;
      }
      
      // this.CRWSpaceData = this.fb.group({
      //   workSpaceName: [this.workSpaceName],
      //   workSpaceDesc: [this.workSpaceDesc],
      //   kindGroupOptions : [this.kindGroupOption],
      //   privacyGroupOption : [this.privacyGroupOption]
      // })

      this.event.subscribe('location:back',()=>{
        this.navCtrl.pop();
      })
  }


  createWorkspace(){
    console.log(this.workSpaceName,this.workSpaceDesc, this.kindGroupOptions, this.privacyGroupOption);
  if(this.workSpaceName ==undefined || this.workSpaceName==null || this.workSpaceName ==""||
    this.workSpaceDesc==undefined || this.workSpaceDesc==null || this.workSpaceDesc==""||
    this.kindGroupOptions==undefined|| this.kindGroupOptions ==null ||this.kindGroupOptions ==''||
    this.privacyGroupOption==undefined ||this.privacyGroupOption== null ||this.privacyGroupOption==""){

      if(this.workSpaceName ==undefined || this.workSpaceName==null || this.workSpaceName ==""){
          this.AlertProvider.openAlert("Workspace Name cannot be blank",1000);
      }else if(this.workSpaceDesc==undefined || this.workSpaceDesc==null || this.workSpaceDesc==""){
        this.AlertProvider.openAlert("Workspace Description cannot be blank",1000);
      }else if(this.kindGroupOptions==undefined|| this.kindGroupOptions ==null ||this.kindGroupOptions ==''){
        this.AlertProvider.openAlert("kind Group Options cannot be blank",1000);
      }else if(this.privacyGroupOption==undefined ||this.privacyGroupOption== null ||this.privacyGroupOption==""){
        this.AlertProvider.openAlert("privacy Group Option cannot be blank",1000);
      }
    }else{
      let workspacedata={
        Titleenglish : this.workSpaceName,
        Titlearabic : this.workSpaceName,
        Summaryarabic : this.workSpaceDesc,
        Summaryenglish : this.workSpaceDesc,
        Kind : this.kindGroupOptions,
        Privacy : this.privacyGroupOption,
        // Owner : "developer2"
        Owner : this.userName
      }
      this.CreateWorkspaceAction.createWorkspace(workspacedata)
    }
  
  }

  /* IonViewWillEnter */
  ionViewWillEnter(){
    this.events.subscribe('type:direction', (value: any) => {
      this.direction = value;
      // console.log(this.direction);
    });
  }

  /* Open menu */
  openMenu(){
    let menuShow = localStorage.getItem('direction');
    if(menuShow == 'rtl'){
      this.menuCtrl.open('right');
      // this.menuCtrl.close();
    }else{
      this.menuCtrl.open('left');
      // this.menuCtrl.close();
    }
  }

  kindSelect(kind){
    this.kindGroupOption = kind
  }
  privacySelect(privacy){
    this.privacyGroupOption = privacy;
  }
  // createWorkSpace(data){


  //   // data = this.CRWSpaceData.value
  //   if(this.workGroup || this.addGroupH){
  //     // this.navCtrl.push(WorkspaceDetailsPage, {workGroup : true});
  //   }else{
  //     // this.navCtrl.push(WorkspaceDetailsPage, {sideMenu : true});
  //   }
  // }

  workSpaceNext(){
    // console.log(this.workSpaceName,this.workSpaceDesc);
    // console.log("Click");    
  }
}
