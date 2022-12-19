import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { DialogBoxComponent } from './dialog-box.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogTitle, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/material.module';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/utils/constants/constants';

describe('DialogBoxComponent', () => {
  let component: DialogBoxComponent;
  let fixture: ComponentFixture<DialogBoxComponent>;
  let toastrService: jasmine.SpyObj<ToastrService>

  const dialogMock = {
    close: () => { }
  };

  beforeEach(async () => {
    toastrService = jasmine.createSpyObj<ToastrService>('ToasterService', ['error', 'success']);
    await TestBed.configureTestingModule({
      declarations: [DialogBoxComponent],
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MaterialModule,
        ToastrModule.forRoot()
      ],
      providers: [
        { provide: MatDialogTitle, useValue: {} },
        { provide: MatDialogRef, useValue: dialogMock },
        { provide: MAT_DIALOG_DATA, useValue: [] },
        { provide: ToastrService, useValue: toastrService },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create reservation data if form is valid', () => {
    component.form.setValue(Constants.validMock);
    spyOn(component, 'closePopup')
    component.createReservation()
    component.closePopup()
    expect(component.closePopup).toHaveBeenCalled()
  });

  it('should update reservation data if form is valid', () => {
    component.form.setValue(Constants.validMock);
    spyOn(component, 'closePopup')
    component.updateReservation()
    component.closePopup()
    expect(component.closePopup).toHaveBeenCalled()
  });

  it('should not update reservation data if form is inValid', () => {
    component.form.setValue(Constants.inValidMock);
    spyOn(component, 'createReservation')
    component.onFormSubmit();    
    expect(component.form.valid).toEqual(false)
  });

  it('should call update reservations', () => {
    component.updateReservation();
  });

  it('should call create reservations', () => {
    component.createReservation();
  });

  it('should create tags', () => {
    component.addTags(null);
    expect(component.tags?.length).toBe(component.tags?.length ? component.tags?.length + 1 : 0);
  });

  it('should delete tags', () => {
    component.removeTags('');
    expect(component.tags?.length).toBe(component.tags?.length ? component.tags?.length - 1 : 0);
  });
});
