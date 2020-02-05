import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SearchGeneralPage } from '../../pages/search-general/search-general';
import { NavController } from 'ionic-angular';


@Component({
    selector : 'searchbar',
    templateUrl : 'SearchBar.html'
})

export class SearchBar {

    @Input('type') listType:Observable<any>;
    @Input('search') searchType:Observable<any>;
    @Output() advance = new EventEmitter;
    @Output() politics = new EventEmitter;
    @Output() searchInput = new EventEmitter();

    public searchData : any;
    
    constructor(public navCtrl:NavController){};

    advanceSearch(){
        this.advance.emit();
    }
    advancePolitics(){
        this.politics.emit();
    }
    // searchInGen(){
    //     this.navCtrl.push(SearchGeneralPage);
    // }
    // searchGen(search){
    //     console.log(search.target.value);
    // }
    getItems(ev){
        this.searchInput.emit(this.searchData);
    }
};