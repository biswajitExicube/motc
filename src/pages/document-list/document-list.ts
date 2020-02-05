import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, MenuController, Platform, Item } from 'ionic-angular';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { WorkspaceDocList } from '../../redux/core/workspace_docList_session';
import { WorkspaceDocListAction } from '../../redux/actions/workspace_docList_action';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SocialSharing } from '@ionic-native/social-sharing';
import { AddRemoveFavAction } from '../../redux/actions/addRemoveFav_action';

@IonicPage()
@Component({
  selector: 'page-document-list',
  templateUrl: 'document-list.html',
})
export class DocumentListPage {

  @select(['workspaceDocList', 'workspaceDocList'])
  readonly workspaceDocList$ : Observable<WorkspaceDocList>

  public direction : any;
  public EServList : any = [];
  public shownConnect = null;
  public currLang : any;
  public getData : any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public events: Events,
    public menuCtrl : MenuController,
    public workspaceDocListAction : WorkspaceDocListAction,
    private iab: InAppBrowser,
    public platform:Platform,
    private socialSharing: SocialSharing,
    public addRmFavAction : AddRemoveFavAction
  ) {
      if(this.navParams.get('data')){
        this.getData = this.navParams.get('data');
        let userData:any = localStorage.getItem('userData');
        userData = JSON.parse(userData);
        console.log("userData ", userData)
        console.log("userData ", this.getData)
        let param :any = {
          userId:userData.ID,
          workspaceId:this.getData.workSpaceId,
          lang:this.getData.lang
        }
        console.log(param);
        this.workspaceDocListAction.workspaceDocListFetch(param)
        this.workspaceDocList$.subscribe((data) => {
          if(data){
            // console.log(data);
            this.EServList = data;
            for(let i=0; i<this.EServList.length; i++){
              console.log(this.EServList[i].isFollowed);
            }
          }
        })
      }
      let localLang = localStorage.getItem('direction');
      if(localLang == 'ltr'){
        //console.log("en");
        this.currLang = 'en';
      }else if(localLang == 'rtl'){
        //console.log("ar");
        this.currLang = 'ar';
      }
  }

  ionViewWillEnter(){
    this.events.subscribe('type:direction', (value: any) => {
      this.direction = value;
      if(this.direction == 'rtl'){
        this.currLang = 'ar';
      }else if(this.direction == 'ltr'){
        this.currLang = 'en';
      }
      // console.log(this.direction);
    });
  }
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

  dirConnect(item){
    console.log("item ", item)
    // this.shownConnect = null;
    if(item == this.shownConnect){ 
      this.shownConnect = null;
    }else{
      this.shownConnect = item;
    }
    // console.log(item);
    // this.isGroupShown(item);
  }
  forFav(doc){
    console.log(doc);
    this.addRmFavAction.startAddRemoveFav({lang: this.currLang, ref: 'workspaces', itemID : this.getData.workSpaceId, opr : !doc.isFollowed, page: 'WSEvents'});
  }
  forchat(person){
    console.log(person);
    let shareOpts = {
      message: person.Title,
      subject: person.ExtensionImageUrl,
      url: null,
      files: null
    };
    this.socialSharing.share(shareOpts.message + ': ' + shareOpts.subject, null, null, null).then((success) =>{
      ////console.log(success);
    }).catch((error) => {
      ////console.log(error);
    }); 
  }
  download(url){
    let downloadURL = "http://sp2016adv.westeurope.cloudapp.azure.com:2003/MOTCMobileService.svc/DownloadFile?url="+url;if(this.platform.is('ios')){
    this.iab.create("http://sp2016adv.westeurope.cloudapp.azure.com:2003/MOTCMobileService.svc/DownloadFile?url="+url);
    }else{
      window.open(downloadURL,'_system');
    }
  }
}
