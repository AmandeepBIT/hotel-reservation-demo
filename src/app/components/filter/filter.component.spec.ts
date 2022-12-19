import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { FilterComponent } from './filter.component';

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should initialise the FILTERED_DATA as model', () =>{    
    expect(component.FILTERED_DATA).toEqual({searchedText:"", endDate: null, startDate: null})
    expect(component.FILTERED_DATA).toBeDefined()
  })

  it('FilterComponent to be defined', () => {
    expect(FilterComponent).toBeDefined();
  });

  it('clear search should clear the search text', () =>{    
    component.clearFilter();    
    expect(component.FILTERED_DATA.searchedText).toEqual("")
    expect(component.FILTERED_DATA.startDate && component.FILTERED_DATA.endDate).toBeUndefined()
  })
  
  it('clear search should clear the search text', () =>{        
    component.clearDate();   
    expect(component.FILTERED_DATA.startDate && component.FILTERED_DATA.endDate).toBeUndefined()
  })

  it('clear all the filters after tapped on clear filters', () =>{        
    component.clearFilter();    
    expect(component.FILTERED_DATA.startDate && component.FILTERED_DATA.endDate).toBeUndefined() 
    expect(component.FILTERED_DATA.searchedText).toEqual("")
  })

  it('apply filter should be called and emit the event', fakeAsync(() =>{   
    component.FILTERED_DATA = {
      startDate: new Date(),
      endDate: new Date(),
      searchedText: ""
    } 
    component.applyDateFilter()  
    expect(component.FILTERED_DATA.searchedText).toEqual("")
    expect(component.FILTERED_DATA.startDate && component.FILTERED_DATA.endDate).toBeNull()    
    
  }))

  it('should call apply filter function', () => {    
    expect(component.applyFilter(undefined)).toBeFalse();
  });

});