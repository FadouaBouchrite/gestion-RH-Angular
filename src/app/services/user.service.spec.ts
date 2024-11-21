import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });


  it('devrait retourner ID de l utilisateur depuis le localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue('123');
    const id = service.getUserId();
    expect(id).toBe(123);
  });

  it('devrait se connecter et stocker l\'ID et le token', () => {
    const mockResponse = { id: 1, token: 'mockToken', role: 'EMPLOYE' };
    const userData = { username: 'user', password: 'pass' };
  
    service.login(userData).subscribe(response => {
      expect(response.id).toBe(1);
      expect(response.token).toBe('mockToken');
    });
  
    const req = httpMock.expectOne('http://localhost:8080/auth/login');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  })

  it('devrait récupérer la liste des employés', () => {
    const mockEmployes = [{ id: 1, name: 'John' }];
  
    service.getEmployes('mockToken').subscribe(employes => {
      expect(employes).toEqual(mockEmployes);
    });
  
    const req = httpMock.expectOne('http://localhost:8080/rh/getEmployes');
    expect(req.request.method).toBe('GET');
    req.flush(mockEmployes);
  });
  it('devrait vérifier si le rôle de l\'utilisateur est RH', () => {
    spyOn(localStorage, 'getItem').and.returnValue('RH');
    expect(service.isRH()).toBe(true);
  });

  it('devrait vérifier si l\'utilisateur est authentifié', () => {
    spyOn(localStorage, 'getItem').and.returnValue('mockToken');
    expect(service.isAuthenticated()).toBe(true);
  });

  it('devrait changer le mot de passe de l\'utilisateur', () => {
    const id = 1;
    const oldPassword = 'oldPass';
    const newPassword = 'newPass';
    const mockResponse = 'Mot de passe changé avec succès';
  
    spyOn(service, 'getToken').and.returnValue('mockToken');
  
    service.changePassword(id, oldPassword, newPassword).subscribe(response => {
      expect(response).toBe(mockResponse);
    });
  
    const req = httpMock.expectOne(`http://localhost:8080/employe/${id}/change-password`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockResponse);
  });

  it('devrait mettre à jour les informations de l\'utilisateur', () => {
    const mockUser = { id: 1, firstName: 'John', lastName: 'Doe' };
    const userData = new FormData();
    userData.append('firstName', 'John');
    userData.append('lastName', 'Doe');
  
    spyOn(service, 'getToken').and.returnValue('mockToken');
  
    service.updateUserInfo(1, mockUser, null).subscribe(user => {
      expect(user).toEqual(mockUser);
    });
  
    const req = httpMock.expectOne(`http://localhost:8080/employe/1/update-info`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockUser);
  });

  it('devrait récupérer les informations de l\'utilisateur par ID', () => {
    const mockUser = { id: 1, firstName: 'John', lastName: 'Doe' };
    const id = 1;
  
    spyOn(service, 'getToken').and.returnValue('mockToken');
  
    service.getUserById(id).subscribe(user => {
      expect(user).toEqual(mockUser);
    });
  
    const req = httpMock.expectOne(`http://localhost:8080/employe/${id}`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('Bearer mockToken');
    req.flush(mockUser);
  });

  
  
  
});

