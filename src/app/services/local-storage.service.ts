import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root', // Fournit automatiquement ce service à l'ensemble de l'application
})
export class LocalStorageService {
  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  /**
   * Récupère une valeur du localStorage
   */
  getItem(key: string): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(key);
    }
    return null; // Retourne une valeur par défaut pour le SSR
  }

  /**
   * Enregistre une valeur dans le localStorage
   */
  setItem(key: string, value: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(key, value);
    }
  }

  /**
   * Supprime une valeur du localStorage
   */
  removeItem(key: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(key);
    }
  }
}
