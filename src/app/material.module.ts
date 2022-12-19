import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
    declarations: [],
    imports: [
        MatFormFieldModule,
        MatTableModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatIconModule,
        FormsModule,
        MatInputModule,
        MatRadioModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatGridListModule,
        MatListModule,
        MatButtonModule,
        MatCheckboxModule,
        MatChipsModule,
        MatSlideToggleModule,
        MatDialogModule,
    ],
    exports: [
        MatFormFieldModule,
        MatTableModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatIconModule,
        FormsModule,
        MatInputModule,
        MatRadioModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatGridListModule,
        MatListModule,
        MatButtonModule,
        MatCheckboxModule,
        MatChipsModule,
        MatSlideToggleModule,
        MatDialogModule,
        MatToolbarModule
    ],
    providers: [
        MatDatepickerModule,
        MatNativeDateModule,
        { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
        {
            provide: MatDialogRef,
            useValue: {}
        },
    ],
    bootstrap: [],
})
export class MaterialModule { }
