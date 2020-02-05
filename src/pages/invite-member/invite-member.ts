import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ToastController } from 'ionic-angular';

import { TranslateService } from '@ngx-translate/core';
import { InvitememberAction } from '../../redux/actions/invite_member_action';

@IonicPage()
@Component({
  selector: 'page-invite-member',
  templateUrl: 'invite-member.html',
})
export class InviteMemberPage {

  public direction : any;
  public membersList : any = [];
  public showList : boolean = true;

  public workGroup : any;
  public show : boolean = true;
  public sideMenu : any;
  public inviteMsg : string;
  hideButtons:boolean = true
  public DefaultMembersList:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public events: Events,
    public translate: TranslateService,
    public invitememberaction:InvitememberAction
  ) {

      this.translate.get('inviteMsg').subscribe(value => {this.inviteMsg = value;})
      this.DefaultMembersList = this.navParams.get('members');
      if(this.DefaultMembersList){
        this.membersList = this.DefaultMembersList;
      }
      // this.membersList = this.navParams.get('members');
      this.workGroup = this.navParams.get('workGroup');
      this.sideMenu = this.navParams.get('sideMenu');
      let fromcoming =  this.navParams.get('fromMember');
      if(fromcoming){
        this.hideButtons = false;
      }
      
      if(this.workGroup){
        this.show = true;
      }else{
        this.show = false;
      }
      console.log(this.membersList);

  }

  ionViewWillEnter(){
    this.events.subscribe('type:direction', (value: any) => {
      this.direction = value;
    });
  };
  inputMember(name){
    let result = name.target.value;
  }

  inviteMem(member){
    let data:any=[];
      console.log(member.EmployeeName);
      data.push(member.EmployeeName);

      let inviteuser={
        UserIds : data,
        WorkspaceId : "1090"
      }
      this.invitememberaction.inviteMemberStart(inviteuser);
  }

  searchMember(value:any){
    console.log(value)
    this.membersList=[];
    if (value && value.toString().trim() != '') {
      this.membersList = this.DefaultMembersList.filter((item:any) => {
        return (item.Department.toLowerCase().indexOf(value.toString().toLowerCase()) > -1 || 
        item.EmployeeName.toLowerCase().indexOf(value.toString().toLowerCase()) > -1 ||
        item.JobTitle.toLowerCase().indexOf(value.toString().toLowerCase()) > -1);
      })
    }else{this.membersList = this.DefaultMembersList}
  }


}
