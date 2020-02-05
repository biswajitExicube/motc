import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, MenuController, Slides, SegmentButton, Platform, LoadingController } from 'ionic-angular';

import { SocialSharing } from '@ionic-native/social-sharing';  
import { File } from '@ionic-native/file';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { KnowledgeCenterAction } from '../../redux/actions/knowledge_center_action';
import {  SearchKnowledgeCenterSearchDocument } from '../../redux/core/all_search_session';
import { AllSearchAction } from '../../redux/actions/all_search_action';
import { AlertProvider } from '../../providers/alert-provider/alert_provider';
import { BestPracticeData, PoliticsData, otherKnowledgecenterList } from '../../redux/core/knowledge_center_session';
import { AddRemoveFavAction } from '../../redux/actions/addRemoveFav_action';
import { InAppBrowser } from '@ionic-native/in-app-browser';


@IonicPage()
@Component({
  selector: 'page-knowledge-center',
  templateUrl: 'knowledge-center.html',
})

export class KnoledgeCenterPage {

  @ViewChild('loopSlider') sliderComponent: Slides;
  @ViewChild('fileInput') fileInput: ElementRef;

  /* Politics knowledge center */
  @select(['politics_knowledgeCenter', 'politicsData'])
  readonly politicsData$ : Observable<PoliticsData>;

  /* Best practics knowledge center */
  @select(['bestPractice_knowledgeCenter', 'bestPracticeData'])
  readonly bestPracticeData$ : Observable<BestPracticeData>;

  /* Other knowledge center */
  @select(['other_knowledgeCenter', 'otherKnowledgecenterList'])
  readonly otherKnowledgecenterlist$ : Observable<otherKnowledgecenterList>;
  /* Politics knowledge center */
  @select(['othersData', 'otherKnowledgecenterCatagoryData'])
  readonly othersData$ : Observable<otherKnowledgecenterList>;


  //Knowledge center search [Politics / Best practice / Others]
  @select(['KnowledgeCenterSearchDocumentReducer', 'SearchKnowledgeCenterSearchDocument', 'Documents' ])
  readonly KnowledgeCenterSearchData$ : Observable<SearchKnowledgeCenterSearchDocument>;


  //Segment
  public politModel : string = 'politOne';

  //Stored default value
  public defaultPoliticsData:any=[];
  public defaultBestPracticeData:any=[];
  public defaultOtherknowledgeCenterList:any=[];

  //Stored showing value
  public bestPracticeData : any = [];
  public politicsData : any = [];
  public otherknowledgeCenterList : any = [];

  //Stored Catagories
  public politicsCatagory:any=[];
  public bestPracticeCatagory:any=[];
  public advSearchList : any = [];

  public direction : any;
  public advPolitic : boolean = false;
  public shownGroup = null;
  public EServList : any = [];
  public shownConnect = null;
  public uploadedFile : any;
  public fileName : any;  
  public files : any;
  public selectItem : any;
  
  public currLang : string;

  public pageloading:any;
  public userid:any;


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public events: Events,
    public menuCtrl: MenuController,
    private socialSharing: SocialSharing,
    public file : File,
    public zone : NgZone,
    public KCAction : KnowledgeCenterAction,
    public SDocAction : AllSearchAction,
    public LoadingController:LoadingController,
    public alertProvider:AlertProvider,
    public addRmFavAction : AddRemoveFavAction,
    private iab: InAppBrowser,
    public platform:Platform

    ) {
      let userData:any = localStorage.getItem('userData');
      userData = JSON.parse(userData);
      this.userid = userData.ID;
      
      let localLang = localStorage.getItem('direction');
      if(localLang == 'ltr'){
          this.currLang = 'en';
          this.checkUser(this.currLang)
      }else if(localLang == 'rtl'){
          this.currLang = 'ar';
          this.checkUser(this.currLang)
      }

      //Politics Data
      this.politicsData$.subscribe((data : any) => {
          if(data){ 
            console.log(data);
            this.defaultPoliticsData = data.Documents;
            this.politicsCatagory = data.Categories
            this.politicsData =  this.defaultPoliticsData;
          }
      })

      //Best Practice Data
      this.bestPracticeData$.subscribe((data: any) => {
          if(data){ 
            this.defaultBestPracticeData = data.Documents;
            this.bestPracticeCatagory = data.Categories
            this.bestPracticeData = this.defaultBestPracticeData
          }
      })
      
      //Other Knowledge center data using Other Catagorys
      this.otherKnowledgecenterlist$.subscribe((data:any) => {
          if(data){ 
              if(data.Documents){ 
                this.defaultOtherknowledgeCenterList = data.Documents;
                this.otherknowledgeCenterList = this.defaultOtherknowledgeCenterList }
              else{
                this.defaultOtherknowledgeCenterList = [] 
                this.otherknowledgeCenterList = this.defaultOtherknowledgeCenterList;}

          }else{
            this.defaultOtherknowledgeCenterList = []   
            this.otherknowledgeCenterList = this.defaultOtherknowledgeCenterList;}
      })

      //Other Knowledge center catagories
      this.othersData$.subscribe((data:any) => {
        if(data){ 
          setTimeout(() => { this.advSearchList = data; },1500);  
        }
      })

      //All Knowledge center Search result [ Politics / Best Practice / Others ];
      this.KnowledgeCenterSearchData$.subscribe((data:any)=>{
          if(this.politModel == 'politThree'){
            this.otherknowledgeCenterList = data;
          }else if(this.politModel == 'politTwo'){
            this.bestPracticeData = data;
          }else if(this.politModel == 'politOne'){
            this.politicsData = data;
          }
      })

  }

  /* localstorage user ID checking function */
  checkUser(currentLang){
    let userData:any = localStorage.getItem('userData');
      userData = JSON.parse(userData);
      let localstorageData = userData.ID;
      if(localstorageData){

          let data :any= {
            lang:currentLang,
            userid:localstorageData,
          }
          //this.loading();
          this.KCAction.bestPracticeFetch(data);
          this.KCAction.othersFetch(data);
          this.KCAction.politicsFetch(data);

      }
  }

  /* ngDoCheck function */
  ngDoCheck(){
    if(localStorage.getItem('detectChanges')){
        let localLang = localStorage.getItem('direction');
        if(localLang == 'ltr'){
            this.currLang = 'en';
            localStorage.removeItem('detectChanges');
        }else if(localLang == 'rtl'){
            this.currLang = 'ar';
            localStorage.removeItem('detectChanges');
        }
    }
  }


  /* Ion View Will Enter */
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
    if(this.politModel== 'politTwo'){
        this.sliderComponent.slideTo(1, 500);
    }
  }



  /* Filter Politics Data */
  public filterpolitics(item){
    this.advPolitic =! this.advPolitic;
    this.politicsData = [];
    for(let i =0; i<this.defaultPoliticsData.length; i++){
      if( item == this.defaultPoliticsData[i].Categories){
        this.politicsData.push(this.defaultPoliticsData[i]);
      }
    }
  }

  /* Filter Best Practice Data */
  public filterBestPractice(item){
    this.advPolitic =! this.advPolitic;
    this.bestPracticeData = []
    for(let i =0; i<this.defaultBestPracticeData.length; i++){
      if( item == this.defaultBestPracticeData[i].Categories){
        this.bestPracticeData.push(this.defaultBestPracticeData[i]);
      }
    }
  }

  //all Filter data
  public allDataFetch(defaulttype){
      this.advPolitic =! this.advPolitic;
      if(defaulttype == 'politics'){
        this.politicsData = [];
        this.politicsData = this.defaultPoliticsData
      }else{
        this.bestPracticeData = [];
        this.bestPracticeData = this.defaultBestPracticeData
      }
  }


  /* Open Side menu function */
  openMenu(){
    let menuShow = localStorage.getItem('direction');
    if(menuShow == 'rtl'){
      this.menuCtrl.open('right');
    }else{
      this.menuCtrl.open('left');
    }
  }

  /* Advance Search (advance) function */
  advanceSearch(){
    this.advPolitic =! this.advPolitic;
  }

  isGroupShown(group) {
    return this.shownGroup === group;
  };

  /* Fetch other KC Document data using category */
  public fetchOtherKCdataByCategory(item,group) {
    this.fetchNewCatagoryOtherData(item)
    this.advPolitic = !this.advPolitic;
    if (this.isGroupShown(group)) {
        this.shownGroup = null;
    } else {
        this.shownGroup = group;
    }
  };

  /* Fetch other KC document function */
  public fetchNewCatagoryOtherData(item){
    let userData:any = localStorage.getItem('userData');
      userData = JSON.parse(userData);
      let localstorageData = userData.ID;
      let fetchlistdata = {
        lang:this.currLang,
        userid:localstorageData,
        listname:item
      }
      // console.log("fetchlistdata : ", fetchlistdata)
      this.KCAction.othersKnowledgeCenterList(fetchlistdata);
  }

  // filterValue(filter){
  //     //////console.log(filter);
  //     this.advPolitic = false;
  //     this.shownGroup = null;
  // };

  /* Segment change function */
  segmentChanged(segmentButton: SegmentButton) {
      //console.log('Segment changed to', segmentButton.value);
      if(segmentButton.value == 'politOne'){
        this.sliderComponent.slideTo(0, 500);
      }else if(segmentButton.value == 'politTwo'){
        this.sliderComponent.slideTo(1, 500);
      }else if(segmentButton.value == 'politThree'){
        this.sliderComponent.slideTo(2, 500);
      }
  }

  /* change segment using slide function */
  onSlideChanged(s: Slides) {
      this.shownConnect = null;
      let currentIndex = this.sliderComponent.getActiveIndex();
      //console.log('Slide changed', currentIndex);
      if(currentIndex == 0){
        this.politModel = 'politOne';
      }else if(currentIndex == 1){
        this.politModel = 'politTwo';
      } else if(currentIndex == 2){
        this.politModel = 'politThree';
      }
  }

  /* arrow icon change function */
  dirConnect(item,index){
      // console.log(item);
      this.selectItem = item;
      //this.shownConnect = null;
      if(index == this.shownConnect){ 
          this.shownConnect = null;
      }else{
          this.shownConnect = index;
      }
  }

  /* For like function */
  forLike(person){
    console.log(person);
    // this.eventLike = !this.eventLike;
    // let dataimg = person.DocURL.toString();
    // let url = dataimg.slice(1, dataimg.length)
    // console.log(url);
    this.addRmFavAction.startAddRemoveFav({lang: this.currLang, ref: 'documents', itemID : person.DocURL, opr :!this.selectItem.IsFavourite})
    // this.alertProvider.openAlert("Functionality not implement",1000)
  }

  shareItem(person){
    //console.log(person);
    let shareOpts = {
      message: person.DocTitle,
      subject: person.DocURL,
      url: null,
      files: null
    };
    this.socialSharing.share(shareOpts.message + ': ' + shareOpts.subject, null, null, null).then((success) =>{
      ////console.log(success);
    }).catch((error) => {
      ////console.log(error);
    }); 
  }

  // File Upload Start
/*
  selectFile(event){
    this.files = event.target.files[0];
      this.readPhoto(this.files);
  }
  readPhoto(file){
    if(file != undefined){       
      let reader = new FileReader();
      reader.onload = (e)=>{
          this.zone.run(()=>{
              let path:any = e.target;
              let image = path.result;
              this.uploadImage(image) 
          })
      }
      reader.readAsDataURL(file);
    }
  }
  uploadImage(file){    
    ////console.log(file);
  }
  */
  // File Upload End


  /* Search All Knowledge center documents */
  searchDocument(doc){
    console.log(doc);
    if(doc ==  null || doc == undefined || doc == ""){

        if(this.politModel == 'politThree'){
          this.otherknowledgeCenterList = this.defaultOtherknowledgeCenterList;
        }else if (this.politModel == 'politTwo'){
          this.bestPracticeData = this.defaultBestPracticeData;
        }else if (this.politModel == 'politOne'){
          this.politicsData =  this.defaultPoliticsData;
        }

    }else{
        if(this.userid){
          let sDoc:any;
          if(this.politModel == 'politThree'){
              sDoc = {
                  userid:this.userid,  
                  SearchText: doc,
                  Categories: null,  
                  Tags: null,
                  PageCount:0,  
                  ListName: "Others",
                  Language:this.currLang
              }
    
          }else if(this.politModel == 'politTwo'){
              sDoc = {
                  userid:this.userid,  
                  SearchText: doc,
                  Categories: null,  
                  Tags: null,
                  PageCount:0,  
                  ListName: "Best Practices" ,
                  Language:this.currLang
              }
    
          }else if(this.politModel == 'politOne'){
              sDoc = {
                  userid:this.userid, 
                  SearchText: doc,
                  Categories: null, 
                  Tags: null,
                  PageCount:0, 
                  ListName: "Policies and Procedures",
                  Language:this.currLang
              }
    
          }
          // console.log(sDoc);
          this.SDocAction.FetchKnowledgeCenterSearch(sDoc);
        }
    } 

  }

  /* Download Knowledge center all Documents */
  // forDownload(fileName){
  //   if(fileName.DocURL){
  //     let downloadURL = 'http://sp2016adv.westeurope.cloudapp.azure.com:2003/MOTCMobileService.svc/DownloadFile?url=' + fileName.DocURL
  //     window.open(downloadURL);
  //   }
  // }

  forDownload(fileName){
    let downloadURL = 'http://sp2016adv.westeurope.cloudapp.azure.com:2003/MOTCMobileService.svc/DownloadFile?url=' + fileName.DocURL
    if(this.platform.is('ios')){
      this.iab.create("http://sp2016adv.westeurope.cloudapp.azure.com:2003/MOTCMobileService.svc/DownloadFile?url="+fileName.DocURL);
    }else {
      // console.log("here");
      // window.open(downloadURL);
      window.open(downloadURL,'_system');
    }
  }



}
