import { Observable, of } from "rxjs"

export class ReservationsServiceMock {

    public getReservationData(): Observable<boolean> {
        return of(true)
    }
}
