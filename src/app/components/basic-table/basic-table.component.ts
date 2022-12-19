import {
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { ReservationsService } from 'src/app/services/reservations.service';
import { Constants } from 'src/app/utils/constants/constants';
import { CRUDPeriodicModal, PeriodicElement } from 'src/app/utils/interfaces/periodic-table.interface';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { Subscription } from 'rxjs';
import { FilterModal } from 'src/app/utils/interfaces/filterData.interface';
import { PerodicModes } from 'src/app/utils/enum/enum';

const ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-basic-table',
  templateUrl: './basic-table.component.html',
  styleUrls: ['./basic-table.component.scss'],
})
export class BasicTableComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = Constants.DISPLAYED_COLUMNS;
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  public subscription!: Subscription;

  constructor(
    public reservationService: ReservationsService,
    public dialog: MatDialog,
    private toaster: ToastrService,
    public dialogRef: MatDialogRef<DialogBoxComponent>
  ) { }

  ngOnInit(): void {
    
    this.getReservationData();
  }

  /* 
    Destory the subscription
    This will help to remove all the event listeners of particular component 
  */
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  /* 
    Load pre-defined data from the reservation.json file  
  */
  getReservationData() {
    this.subscription = this.reservationService
      .getReservationData()
      .subscribe((res) => {
        (res) ? (this.dataSource.data = res) : this.toaster.error(Constants.ERROR)
      });
  }

  /* 
    Filter predicates applied over datasource
    so we can apply the filter functionalities over selected columns
  */
    setupFilter() {
      this.dataSource.filterPredicate = (d: PeriodicElement, filter: string) => {
        const fName = d.firstName && d.firstName.trim().toLowerCase() || '';
        const lName = d.lastName && d.lastName.trim().toLowerCase() || '';
        const city = d.addressLocation.city && d.addressLocation.city.trim().toLowerCase() || '';
        const state = d.addressLocation.state && d.addressLocation.state.trim().toLowerCase() || '';
        const zipcode = d.addressLocation.zipCode && d.addressLocation.zipCode.trim().toLowerCase() || '';
        return (fName.indexOf(filter) !== -1 || lName.indexOf(filter) !== -1 || city.indexOf(filter) !== -1 ||
          state.indexOf(filter) !== -1 || zipcode.indexOf(filter) !== -1)
      };
    }
  /* 
     Get the index based on the ID, so we can update / delete the exact element    
   */
  getIndex(id: number) {
    return this.dataSource.data.map(x => {
      return x.id;
    }).indexOf(id);
  }

  /* 
    Get the filter values from the modal then
    Apply the filters over multiple columns 
   */
  filterData(filterValue: FilterModal) {    
    if (filterValue.startDate && filterValue.endDate) {
      this.dataSource.filterPredicate = (data) => {
        return (
          new Date(data.stay.arrivalDate) >= (filterValue.startDate ? filterValue.startDate : new Date) &&
          new Date(data.stay.arrivalDate) <= (filterValue.endDate ? filterValue.endDate : new Date)
        );
      };
      this.dataSource.filter = '' + Math.random();
    } else {
      this.setupFilter();
      this.dataSource.filter = filterValue.searchedText.trim().toLowerCase();
    }
  }

  /* 
    Open the pop up with create mode.    
   */
  createReservation() {
    let dialogRef = this.dialog.open(DialogBoxComponent, {
      height: Constants.HEIGHT,
      width: Constants.WIDTH,
    });
    dialogRef.afterClosed().subscribe((res) => {
      this.handleEvent(res)
    });
  }

  /* 
    Get the data / modal from the Popup
    So we can update the previous saved data  
  */
  updateReservation(data: any) {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      height: Constants.HEIGHT,
      width: Constants.WIDTH,
      data,
    });

    dialogRef.afterClosed().subscribe((res) => {
      this.handleEvent(res)
    });
  }

  /* 
   Common method to handle the Create and Update events 
   If mode will be Create that means we have to push the data
   Other wise we have to update    
  */
  handleEvent(res: CRUDPeriodicModal) {
    if (res) {
      switch (res.mode) {
        case PerodicModes.CREATE:
          var oldData = this.dataSource.data
          oldData.push(res.modal)
          this.dataSource.data = this.dataSource.data
          break
        case PerodicModes.UPDATE:
          var oldData = this.dataSource.data
          oldData[this.getIndex(res.modal?.id)] = res.modal
          this.dataSource.data = oldData
          break
        default: break;
      }
    }
    return this.dataSource.data
  }
  /* 
   Perform this method when user wants to delete the particular element    
  */
  onDeleteClick(id: number) {
    var val;
    if (val = (this.getIndex(id))) {
      var oldData = this.dataSource.data
      oldData.splice(val, 1);
      this.dataSource.data = oldData
      return true
    }
    return false
  }
}
