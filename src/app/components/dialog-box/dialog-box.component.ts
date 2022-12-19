import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent, MatChipList } from '@angular/material/chips';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ReservationsService } from 'src/app/services/reservations.service';
import { Constants } from 'src/app/utils/constants/constants';
import { CRUDPeriodicModal, PeriodicElement } from 'src/app/utils/interfaces/periodic-table.interface';
import { __values } from 'tslib';
import { PerodicModes } from 'src/app/utils/enum/enum';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss'],

})
export class DialogBoxComponent implements OnInit {
  
  @ViewChild('chipList', { static: true }) chipList!: MatChipList;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;  
  form!: FormGroup;
  Rooms = Constants.ROOMS;
  foods = Constants.FOODS;
  tags: string[] = [];
  currentModel: PeriodicElement
  
  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data: any,
    public reservationService: ReservationsService,
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    public dialog: MatDialog,
    public toastr: ToastrService
  ) {
    // If mode is Update then we have to update the model with previous values
    data ? this.currentModel = data : this.currentModel = ({} as any) as PeriodicElement;
  }
  
  /* 
    Setup Reactive form with some of validators.     
  */
  ngOnInit(): void {    
    this.form = this.fb.group({
      id: Math.floor(Math.random() * 1000000),
      stay: this.fb.group({
        arrivalDate: [null, [Validators.required]],
        departureDate: [null, [Validators.required]],
      }),
      room: this.fb.group({
        roomSize: [null],
        roomQuantity: [null],
      }),
      firstName: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      lastName: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email: [null, Validators.compose([Validators.email])],
      phone: [null],
      addressStreet: this.fb.group({
        streetName: [null, Validators.required],
        streetNumber: [null, Validators.required],
      }),
      addressLocation: this.fb.group({
        city: [null, Validators.required],
        state: [null, Validators.required],
        zipCode: [null, Validators.required],
      }),
      extras: [[]],
      payment: [null],
      note: [null],
      tags: [this.tags],
      reminder: [false],
      newsletter: [false],
      confirm: [false],
    });

    this.tags = this.currentModel?.tags ? this.currentModel.tags : []
    this.form.patchValue(this.currentModel);
  }
  /* 
    When reactive form will be valid then this method will be valid to call     
  */
  onFormSubmit()  {
    if (this.form.invalid) {
      return false;
    }
    (this.currentModel && this.currentModel.id) ? (this.updateReservation()) : this.createReservation();
    return true
  }
  /* 
    When mode is Update 
    Then user can update the information and emit the event to basic table component
    So basic table component can update the data     
  */
  updateReservation() {
    if (this.currentModel && this.currentModel.id){
      const crudPreodicInstance: CRUDPeriodicModal = {
        modal: { ...this.form.value, id: this.currentModel.id},
        mode: PerodicModes.UPDATE
      }
      this.toastr.success(Constants.RESERVATION_UPDATE_SUCCESS);
      this.closePopup(crudPreodicInstance)
    }
  }
  /* 
    When mode is Create 
    Then user can create the information and emit the event to basic table component
    So basic table component can add new data to modal
  */
  createReservation() {
    const crudPreodicInstance: CRUDPeriodicModal = {
      modal: { ...this.form.value, tags: this.tags},
      mode: PerodicModes.CREATE
    }
    this.toastr.success(Constants.RESERVATION_CREATE_SUCCESS);
    this.closePopup(crudPreodicInstance)
  }

  /* 
    This function is to manage the tags / chips 
  */
  addTags(event: MatChipInputEvent | null): void {
    if (event) {
      const value = (event.value || '').trim();
      if (value) {
        this.tags.push(value.trim());
      }
      event.chipInput!.clear();
    }
  }

  /* 
    This function is to delete the tags / chips 
  */
  removeTags(tag: string): void {
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  /* 
    Close the model 
    If model have something to pass to parent component then need to pass the model 
  */
  closePopup(model?:CRUDPeriodicModal) {
    this.dialogRef.close(model);
  }
}
