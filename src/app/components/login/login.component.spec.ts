import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

class MockUserService {
  login(userData: any) {
    // Retourne un observable simulé pour les tests
    if (userData.email === 'test@example.com' && userData.password === 'password123') {
      return of({ token: 'mockToken', role: 'RH' });
    }
    return throwError(() => new Error('Erreur API'));
  }
}

class MockRouter {
  navigate(path: string[]) {}
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockUserService: MockUserService;
  let mockRouter: MockRouter;

  beforeEach(async () => {
    mockUserService = new MockUserService();
    mockRouter = new MockRouter();

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        { provide: UserService, useValue: mockUserService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should log an error if email or password is missing on submit', () => {
    spyOn(console, 'error');
    component.email = '';
    component.password = '';
    component.onSubmit();
    expect(console.error).toHaveBeenCalledWith('Veuillez remplir tous les champs.');
  });

  it('should call login service on submit', () => {
    component.email = 'test@example.com';
    component.password = 'password123';
    const userData = { email: 'test@example.com', password: 'password123' };

    // Appeler la méthode onSubmit et vérifier que la méthode login a été appelée
    component.onSubmit();

    expect(mockUserService.login).toHaveBeenCalledWith(userData);
  });

  it('should store token and role in localStorage and navigate if login is successful', () => {
    spyOn(localStorage, 'setItem');
    component.email = 'test@example.com';
    component.password = 'password123';

    // Simuler la réponse du service avec succès
    mockUserService.login = () => of({ token: 'mockToken', role: 'RH' });

    component.onSubmit();

    expect(localStorage.setItem).toHaveBeenCalledWith('token', 'mockToken');
    expect(localStorage.setItem).toHaveBeenCalledWith('role', 'RH');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['rh']);
  });

  it('should log an error if login fails', () => {
    spyOn(console, 'error');
    component.email = 'test@example.com';
    component.password = 'password123';

    // Simuler une erreur dans le service de login
    mockUserService.login = () => throwError(() => new Error('Erreur API'));

    component.onSubmit();

    expect(console.error).toHaveBeenCalledWith('Erreur lors de l\'envoi des données :', jasmine.any(Error));
  });

  it('should remove token and role from localStorage on logout', () => {
    spyOn(localStorage, 'removeItem');
    component.logout();
    expect(localStorage.removeItem).toHaveBeenCalledWith('token');
    expect(localStorage.removeItem).toHaveBeenCalledWith('role');
  });

  it('should return true for isAuthenticated if token exists in localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue('mockToken');
    expect(component.isAuthenticated()).toBe(true);
  });

  it('should return false for isAuthenticated if token does not exist in localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    expect(component.isAuthenticated()).toBe(false);
  });

  it('should return true for isRH if role in localStorage is "RH"', () => {
    spyOn(localStorage, 'getItem').and.callFake((key) => key === 'role' ? 'RH' : null);
    expect(component.isRH()).toBe(true);
  });

  it('should return false for isRH if role in localStorage is not "RH"', () => {
    spyOn(localStorage, 'getItem').and.callFake((key) => key === 'role' ? 'EMPLOYE' : null);
    expect(component.isRH()).toBe(false);
  });

  it('should return true for isEmploye if role in localStorage is "EMPLOYE"', () => {
    spyOn(localStorage, 'getItem').and.callFake((key) => key === 'role' ? 'EMPLOYE' : null);
    expect(component.isEmploye()).toBe(true);
  });

  it('should return false for isEmploye if role in localStorage is not "EMPLOYE"', () => {
    spyOn(localStorage, 'getItem').and.callFake((key) => key === 'role' ? 'RH' : null);
    expect(component.isEmploye()).toBe(false);
  });
});
