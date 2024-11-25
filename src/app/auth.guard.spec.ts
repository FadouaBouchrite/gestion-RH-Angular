import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth.guard'; // Corrigez le nom d'importation ici

describe('AuthGuard', () => {
  let authGuard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard], // Ajoutez AuthGuard dans les providers
    });
    authGuard = TestBed.inject(AuthGuard); // Correctement injecter le guard
  });

  it('should be created', () => {
    expect(authGuard).toBeTruthy();
  });
});
