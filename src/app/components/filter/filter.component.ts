import {
  Component,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FilterModal } from 'src/app/utils/interfaces/filterData.interface';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
  
  @Output() filterData: EventEmitter<FilterModal> = new EventEmitter();
  FILTERED_DATA: FilterModal = {
    searchedText : "",
    startDate: null,
    endDate: null
  }
   
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  constructor() { }

  /* 
    When user is able to call select the search based functionality or date based then this method will handle  
  */
  applyFilter($event?:Event) {
    if($event){
      var value; 
      if (value = ($event?.target as HTMLInputElement)?.value) {    
        this.FILTERED_DATA.searchedText = value.trim()
      } else {
        this.clearSearch()
      }
      this.clearDate()
      this.filterData.emit(this.FILTERED_DATA);
      return true
    }
    return false
  }

  /* 
    When user is only able to apply the date filter  
  */
  applyDateFilter() {
      this.clearSearch()
      this.FILTERED_DATA.startDate = this.range.value.start 
      this.FILTERED_DATA.endDate = this.range.value.end 
      this.filterData.emit(this.FILTERED_DATA);
  }

  /* 
    Clear all the stuff regarding the search filter and data filter  
  */
  clearFilter() {
    this.clearDate()
    this.clearSearch()
    this.filterData.emit(this.FILTERED_DATA);
  }

  /* 
    Clear all the stuff regarding the search filter   
  */
  clearSearch(){
    this.FILTERED_DATA.searchedText = ""
  }

  /* 
    Clear all the stuff regarding the data filter  
  */
  clearDate(){
    this.FILTERED_DATA.startDate = undefined
    this.FILTERED_DATA.endDate = undefined
    this.range.reset()
  }

}
