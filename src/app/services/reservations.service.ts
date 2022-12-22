import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ElectronService } from 'ngx-electronyzer';
import { PeriodicElement } from '../utils/interfaces/periodic-table.interface';

@Injectable({
  providedIn: 'root',
})

export class ReservationsService {

  public API_URL = `${environment.apiUrl}`;
  constructor(public httpClient: HttpClient, private electronService: ElectronService) {   
  }  
  
  getReservationData(): Promise<PeriodicElement[]> {
    return this.electronService.ipcRenderer.invoke('getReservationList');
  }
  createReservation(item: PeriodicElement){
    this.electronService.ipcRenderer.send('createReservation', item);
  }
  updateReservation(item: PeriodicElement){
    this.electronService.ipcRenderer.send('updateReservation', item);    
  }
  deleteReservation(item: PeriodicElement){
    this.electronService.ipcRenderer.send('deleteReservation', item);
  }
}
