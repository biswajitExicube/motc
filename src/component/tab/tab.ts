import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NavController } from 'ionic-angular';

import { HomePage } from '../../pages/home/home';
import { MediaCenterPage } from '../../pages/media-center/media-center';
import { EServicePage } from '../../pages/e-service/e-service';
import { AboutPage } from '../../pages/about/about';
import { KnoledgeCenterPage } from '../../pages/knowledge-center/knowledge-center';

@Component({
    selector : 'tab',
    templateUrl : 'tab.html'
})

export class Tab {
    @Input('type') tabItem:Observable<any>;
    constructor(public navCtrl: NavController){};

    home(){
        this.navCtrl.setRoot(HomePage);
    }
    EService(){
        this.navCtrl.setRoot(EServicePage);
    }
    mediaCenter(){
        this.navCtrl.setRoot(MediaCenterPage);
    }
    knowledge(){
        this.navCtrl.setRoot(KnoledgeCenterPage);
    }
    about(){
        this.navCtrl.setRoot(AboutPage);
    }
};