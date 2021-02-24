import { TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoginResponseData } from '../model/loginResponseData.model';
import { User } from '../model/user.model';

describe('LoginService', () => {
  let service: LoginService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LoginService]
    });
    service = TestBed.inject(LoginService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  afterEach(() => {
    httpMock.verify();
  });

  describe('#authenticate tests', () => {
    it('Should return authenticateResponse by making a POST request to the given url', () => {
      const email = 'test@test.com';
      const password = '123456';
      const mockResponse: LoginResponseData = {
        kind: 'identitytoolkit#VerifyPasswordResponse',
        localId: 'P5oMdo9zYnMhSxLVrVSHjewSbr02',
        email: 'test@test.com',
        displayName: '',
        idToken: 'eyJhbGciOiJSUzI1NiIsImtpZCI6InRCME0yQSJ9.eyJpc3MiOiJodHRwczovL2lkZW50aXR5dG9vbGtpdC5nb29nbGUuY29tLyIsImF1ZCI6InZ1ZS1jb21wbGV0ZWNvdXJzZSIsImlhdCI6MTYxNDAyMDA1OCwiZXhwIjoxNjE1MjI5NjU4LCJ1c2VyX2lkIjoiUDVvTWRvOXpZbk1oU3hMVnJWU0hqZXdTYnIwMiIsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCIsInZlcmlmaWVkIjpmYWxzZX0.Oqp2AS2-2t88voFw3gceEIdoS6iIDVuIXWBfJX6BkMfcL7hV2OlWvaWWtvtVmcdr909ypguimp0OUI6jkLJfXcL4ciFBW3vNx1sXCj5_Aw_GInxmVsAjXLuESoGgo21FOtKqqUVcbJjf3aX7buWVZtroqjPGNyu-AfonMW9RFNYcDxbKKlqU38m_7IxYBke82Ea61VvgAuF38mk_pQEYJiDTJG2uBtiq46FbLcUd7YGbziDQSCC8ChjWihyadbvBCq32i0ZsSqYR53wF8lxYHykEDwKLuWVWGQiyjD60FY5_HNnUs22tsB9_AK3ht-4PTfTA314af1ZE7gr-IYn_5w',
        registered: true
      };
      service.authenticate(email, password).subscribe((res) => {
        expect(res).toBe(mockResponse);
      });
      const req = httpMock.expectOne('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA9HEOZrRHZP026VQObeDz2PVD_GLpMV50');
      expect(req.request.method).toBe('POST');
      req.flush(mockResponse);
    });
  });

  describe('#formatUser tests', () => {
    it('Should return formatUserResponse by taking LoginResponseData', () => {
      const data: LoginResponseData = {
        kind: 'identitytoolkit#VerifyPasswordResponse',
        localId: 'P5oMdo9zYnMhSxLVrVSHjewSbr02',
        email: 'test@test.com',
        displayName: '',
        idToken: 'eyJhbGciOiJSUzI1NiIsImtpZCI6InRCME0yQSJ9.eyJpc3MiOiJodHRwczovL2lkZW50aXR5dG9vbGtpdC5nb29nbGUuY29tLyIsImF1ZCI6InZ1ZS1jb21wbGV0ZWNvdXJzZSIsImlhdCI6MTYxNDAyMDA1OCwiZXhwIjoxNjE1MjI5NjU4LCJ1c2VyX2lkIjoiUDVvTWRvOXpZbk1oU3hMVnJWU0hqZXdTYnIwMiIsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCIsInZlcmlmaWVkIjpmYWxzZX0.Oqp2AS2-2t88voFw3gceEIdoS6iIDVuIXWBfJX6BkMfcL7hV2OlWvaWWtvtVmcdr909ypguimp0OUI6jkLJfXcL4ciFBW3vNx1sXCj5_Aw_GInxmVsAjXLuESoGgo21FOtKqqUVcbJjf3aX7buWVZtroqjPGNyu-AfonMW9RFNYcDxbKKlqU38m_7IxYBke82Ea61VvgAuF38mk_pQEYJiDTJG2uBtiq46FbLcUd7YGbziDQSCC8ChjWihyadbvBCq32i0ZsSqYR53wF8lxYHykEDwKLuWVWGQiyjD60FY5_HNnUs22tsB9_AK3ht-4PTfTA314af1ZE7gr-IYn_5w',
        registered: true
      };
      const mockResponse = service.formatUser(data);
      expect(mockResponse).not.toBe(null);
    });
  });

  describe('#getErrorMessage tests', () => {
    it('Should return Message1 by taking Error Message Code', () => {
      const code = 'EMAIL_NOT_FOUND';
      const response = service.getErrorMessage(code);
      expect(response).toBe('Email Not Found');
    });
    it('Should return Message2 by taking Error Message Code', () => {
      const code = 'INVALID_PASSWORD';
      const response = service.getErrorMessage(code);
      expect(response).toBe('Invalid Password');
    });
    it('Should return default message ', () => {
      const code = 'random message';
      const response = service.getErrorMessage(code);
      expect(response).toBe('Unknown error occurred. Please try again');
    });
  });
});
