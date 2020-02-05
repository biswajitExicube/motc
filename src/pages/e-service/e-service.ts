import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, MenuController, Slides, SegmentButton } from 'ionic-angular';
import { EServeIndividualSubPage } from '../e-serve-individual-sub/e-serve-individual-sub';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { ESIndividual, EServiceData, ESCompanies, ESOthers } from '../../redux/core/eService_session';
import { EServiceAction } from '../../redux/actions/eService_action';


@IonicPage()
@Component({
  selector: 'page-e-service',
  templateUrl: 'e-service.html',
})
export class EServicePage {

  @ViewChild('loopSlider') sliderComponent: Slides;

  @select(['eServiceData', 'eServiceData'])
  readonly eServiceData$ : Observable<EServiceData>;


  @select(['esIndividualData', 'esIndividual'])
  readonly esIndividualData$ : Observable<ESIndividual>;
  @select(['esCompaniesData', 'esCompanies'])
  readonly esCompaniesData$ : Observable<ESCompanies>;
  @select(['esOthersData', 'esOthers'])
  readonly esOthersData$ : Observable<ESOthers>;
  
  public direction : any;
  public EServModel : string = '0';
  public EServList : any = [];
  public companyList : any = [];
  public shownGroup = null;
  public segments : any = [];
  public currLang : string;

  //  Individual = 0
  //  Agency = 1
  //  Public = 2

  public defaultIndividualData:any=[];
  public defaultAgencyData:any=[];
  public defaultPublicData:any=[];

  public showIndividual:any=[];
  public showAgency:any=[];
  public showPublic:any=[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public events: Events, 
    public menuCtrl: MenuController,
    public esAction : EServiceAction
  ) {
      this.segments = ["Individual", "Companies", "Others"]
      this.checkLanguage();


      this.esIndividualData$.subscribe((data) => {
          if(data){ 
            this.defaultIndividualData = data;
            this.showIndividual = this.defaultIndividualData;
            console.log("this.showIndividual ", this.showIndividual);
          }
      });

      this.esCompaniesData$.subscribe((data) => {
          if(data){ 
            this.defaultAgencyData = data;
            this.showAgency = this.defaultAgencyData
            console.log("this.showAgency ", this.showAgency);
          }
      });

      this.esOthersData$.subscribe((data) => {
          if(data){ 
            this.defaultPublicData = data;
            this.showPublic = this.defaultPublicData;
            console.log("this.showPublic ", this.showPublic);
           }
      });
      
  }

  ionViewWillEnter(){
    this.events.subscribe('type:direction', (value: any) => {
      this.direction = value;
      if(this.direction == 'rtl'){
        this.currLang = 'ar';
        this.fetchallEservice();
        this.segmentChanged();
      }else if(this.direction == 'ltr'){
        this.currLang = 'en';
        this.segmentChanged();
        this.fetchallEservice();
      }
    });
  }

  checkLanguage(){
    let localLang = localStorage.getItem('direction');
    if(localLang == 'ltr'){
        this.currLang = 'en';
        /*
        this.fetchAllData("0")
        this.fetchAllData("1")
        this.fetchAllData("2")
        */
        this.fetchallEservice()
    }else if(localLang == 'rtl'){
        this.currLang = 'ar';
        /*
        this.fetchAllData("0")
        this.fetchAllData("1")
        this.fetchAllData("2")
        */
        this.fetchallEservice()
    }
  }

/*
  fetchAllData(searchindex){
      if(searchindex == "0"){
        this.esAction.ESIndividualFetch({lang : this.currLang, segment : 'Individual'});

      }else if(searchindex == "1"){
          this.esAction.ESCompaniesFetch({lang : this.currLang, segment : 'Agency'});
          
      }else if(searchindex == "2"){
          this.esAction.ESOthersFetch({lang : this.currLang, segment : 'Public'});
      }
}
*/

fetchallEservice(){
  this.esAction.ESIndividualFetch({lang : this.currLang});
}





  searchEservice(value){
      console.log(value);
      if(this.EServModel == '0'){
        this.showAgency = this.defaultAgencyData
        this.showPublic = this.defaultPublicData
        
          this.showIndividual=[];
          if (value && value.trim() != '') {
            this.showIndividual = this.defaultIndividualData.filter((item:any) => {
              return (item.ServiceBrief.toLowerCase().indexOf(value.toLowerCase()) > -1 || 
              item.ServiceBriefArabic.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
              item.ServiceProvider.toLowerCase().indexOf(value.toLowerCase()) > -1);
            })
          }else{this.showIndividual = this.defaultIndividualData}

      }else if(this.EServModel == '1'){
        this.showIndividual = this.defaultIndividualData;
        this.showPublic = this.defaultPublicData
        
          this.showAgency=[];
          if (value && value.trim() != '') {
            this.showAgency = this.defaultAgencyData.filter((item:any) => {
              return (item.ServiceBrief.toLowerCase().indexOf(value.toLowerCase()) > -1 || 
              item.ServiceBriefArabic.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
              item.ServiceProvider.toLowerCase().indexOf(value.toLowerCase()) > -1);
            })
          }else{this.showAgency = this.defaultAgencyData;}

      }else if(this.EServModel == '2'){

        this.showIndividual = this.defaultIndividualData;
        this.showAgency = this.defaultAgencyData

          this.showPublic=[];
          if (value && value.trim() != '') {
            this.showPublic = this.defaultPublicData.filter((item:any) => {
              return (item.ServiceBrief.toLowerCase().indexOf(value.toLowerCase()) > -1 || 
              item.ServiceBriefArabic.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
              item.ServiceProvider.toLowerCase().indexOf(value.toLowerCase()) > -1);
            })
          }else{this.showPublic = this.defaultPublicData}

      }
  }

  openMenu(){
    let menuShow = localStorage.getItem('direction');
    if(menuShow == 'rtl'){
      this.menuCtrl.open('right');
    }else{
      this.menuCtrl.open('left');
    }
  }

  mediaClick(EServ){
    this.navCtrl.push(EServeIndividualSubPage, {EServDetails : EServ});
  }
  segmentChanged() {

    this.showIndividual = this.defaultIndividualData;
    this.showAgency = this.defaultAgencyData
    this.showPublic = this.defaultPublicData

    // console.log('Segment changed to', this.EServModel);
    this.sliderComponent.slideTo(parseInt(this.EServModel),500);
  }
  
  onSlideChanged(s: Slides) {    
    let currentIndex = this.sliderComponent.getActiveIndex();
    if(currentIndex == 0){
      this.EServModel = '0';
    }else if(currentIndex == 1){
      this.EServModel = '1';
    } else if(currentIndex == 2){
      this.EServModel = '2';
    }
  }

  
  toggleGroup(group) {
    if (this.isGroupShown(group)) {
        this.shownGroup = null;
    } else {
        this.shownGroup = group;
    }
  };
  isGroupShown(group) {
      return this.shownGroup === group;
  };

}
