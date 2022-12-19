import { TestBed } from '@angular/core/testing';
import { ReservationsService } from './reservations.service';
import * as mockPeriodicElements from 'src/assets/mock/mockReservation.json'
import { environment } from 'src/environments/environment';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

describe('ReservationsService', () => {

    let httpMock: HttpTestingController;
    let testService: ReservationsService;

    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ReservationsService]
        });

        testService = TestBed.get(ReservationsService);
        httpMock = TestBed.get(HttpTestingController);
    });
    it('should be created', () => {
        expect(testService).toBeDefined();
    });

    it('should have end point as api url', () => {
        expect(testService.API_URL).not.toBeUndefined()
    });

    it('should invoke http method and return data when getReservationData method is called', () => {
        testService.getReservationData().subscribe((res) => {
            expect(res).toEqual([mockPeriodicElements]);
        });
        const req = httpMock.expectOne(`${environment.apiUrl}`);
        expect(req.request.method).toEqual("GET");
        httpMock.verify();
    });
});
