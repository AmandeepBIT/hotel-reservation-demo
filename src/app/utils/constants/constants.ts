export class Constants {
  public static RESERVATION_UPDATE_SUCCESS = 'Reservation updated successfully';
  public static RESERVATION_CREATE_SUCCESS = 'Reservation created successfully';
  public static RESERVATION_DELETE_SUCCESS = 'Reservation deleted successfully';
  public static ERROR = 'Error';
  /***************************** FOR NUMBERS **************************/
  public static HEIGHT = '70%';
  public static WIDTH = '70%';

  /************************ FOR ARRAY VALUES ************************** */
  public static DISPLAYED_COLUMNS: string[] = [
    'name',
    'address',
    'location',
    'arrival',
    'departure',
    'edit',
    'delete',
  ];
  public static ROOMS = [
    { value: '0', viewValue: 'Business Suite' },
    { value: '1', viewValue: 'Presidential Suite' },
  ];
  public static FOODS = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];
   /******************************** UNIT TEST CASES BASED MOCK DATA *********************/
   public static validMock = {
    id: 1,
    stay: {
      arrivalDate: '2021-11-18T05:00:00.000Z',
      departureDate: '2021-11-25T05:00:00.000Z',
    },
    room: {
      roomSize: 'business-suite',
      roomQuantity: 3,
    },
    firstName: 'IDM',
    lastName: 'ENG',
    email: 'idm.test@idm.com',
    phone: '9999999999',
    addressStreet: {
      streetName: 'IDM Street',
      streetNumber: '1234',
    },
    addressLocation: {
      zipCode: '123456',
      state: 'Arizona',
      city: 'OAKVILLE',
    },
    extras: [
      'extraBreakfast',
      'extraTV',
      'extraWiFi',
      'extraParking',
      'extraBalcony',
    ],
    payment: 'cc',
    note: 'idm lab test',
    tags: ['hotel', 'booking', 'labtest'],
    reminder: true,
    newsletter: true,
    confirm: false,
  }
  public static inValidMock = {
    id: "",
    stay: {
      arrivalDate: '',
      departureDate: '',
    },
    room: {
      roomSize: 'business-suite',
      roomQuantity: 3,
    },
    firstName: null,
    lastName: '',
    email: '',
    phone: '',
    addressStreet: {
      streetName: 'IDM Street',
      streetNumber: '1234',
    },
    addressLocation: {
      zipCode: '123456',
      state: 'Arizona',
      city: 'OAKVILLE',
    },
    extras: [
      'extraBreakfast',
      'extraTV',
      'extraWiFi',
      'extraParking',
      'extraBalcony',
    ],
    payment: 'cc',
    note: 'idm lab test',
    tags: ['hotel', 'booking', 'labtest'],
    reminder: true,
    newsletter: true,
    confirm: false,
  }
}
