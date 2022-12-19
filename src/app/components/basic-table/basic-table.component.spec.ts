import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import {  
  MatDialogRef,
} from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { of } from 'rxjs';
import { MaterialModule } from 'src/app/material.module';
import { ReservationsService } from 'src/app/services/reservations.service';
import { ReservationsServiceMock } from 'src/tests/mocks/services/reservations-service.mock';
import { BasicTableComponent } from './basic-table.component';
import * as mockPeriodicElements from 'src/assets/mock/mockReservation.json'
import { CRUDPeriodicModal } from 'src/app/utils/interfaces/periodic-table.interface';
import { PerodicModes } from 'src/app/utils/enum/enum';

describe('BasicTableComponent', () => {
  let component: BasicTableComponent;
  let fixture: ComponentFixture<BasicTableComponent>;
  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BasicTableComponent],
      imports: [
        BrowserAnimationsModule,
        HttpClientModule,
        MaterialModule,
        ToastrModule.forRoot(),
      ],
      providers: [
        { provide: ReservationsService, useClass: ReservationsServiceMock },
      ],
    }).compileComponents();  
  });

  beforeEach(() => {
    TestBed.compileComponents();
    fixture = TestBed.createComponent(BasicTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('ReservationsService to be defined', () => {
    expect(ReservationsService).toBeTruthy();
  });

  it('should column names', () => {
    expect(component.displayedColumns).toEqual([
      'name',
      'address',
      'location',
      'arrival',
      'departure',
      'edit',
      'delete',
    ]);
  });

  it('should get the exact index of periodic element array', () => {
    component.dataSource.data = [mockPeriodicElements]      
    expect(component.getIndex(1)).toBe(0)
  });

  it('should call delete element function', () => {
    component.dataSource.data = [mockPeriodicElements]    
    expect(component.onDeleteClick(1)).toBeFalse()
  });

  it('test the search based filters', () => {

    spyOn(component, 'setupFilter');
    spyOn(component.dataSource, 'filterPredicate');    
    component.setupFilter();
    expect(component.dataSource.filterPredicate.length).toBeGreaterThan(1);
  })

  it('should call get reservation api based method', fakeAsync(() => {
    component.dataSource.data = [mockPeriodicElements]
    let preodicEle = spyOn(component.reservationService, 'getReservationData').and.returnValue(of(mockPeriodicElements))
    let subEle = spyOn(component.reservationService.getReservationData(), 'subscribe');
    component.reservationService.getReservationData()
    component.ngOnInit()
    fixture.detectChanges();
    expect(preodicEle).toHaveBeenCalledBefore(subEle);
    expect(subEle).toHaveBeenCalled()
  }));

  it('during update reservation dialog should be Open and called afterClosed', () => {    
    const j = spyOn(component.dialog, 'open').and
    .returnValue({
        afterClosed: () => of(true)
    } as MatDialogRef<typeof component>);
    component.updateReservation(mockPeriodicElements);
    expect(j).toHaveBeenCalled();
  });

  it('during create reservation dialog should be open and called afterClosed', () => {    
    const j = spyOn(component.dialog, 'open').and
    .returnValue({
        afterClosed: () => of(true)
    } as MatDialogRef<typeof component>);
    component.createReservation();
    expect(j).toHaveBeenCalled();
  });

  it('handle create and update reservation code', fakeAsync(() => {
    var mock = mockPeriodicElements
    component.dataSource.data = [mockPeriodicElements]
    const crudPreodicInstance: CRUDPeriodicModal = {
      modal: mock,
      mode: PerodicModes.CREATE
    }    
    expect(component.handleEvent(crudPreodicInstance)).toEqual(component.dataSource.data)
  }));
});
