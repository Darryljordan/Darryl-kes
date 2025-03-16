import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieService {
  constructor() { }

  /**
   * Set a cookie with the given name and value
   * @param name Cookie name
   * @param value Cookie value
   * @param days Number of days until the cookie expires
   * @param path Cookie path (default: '/')
   */
  setCookie(name: string, value: string, days: number = 365, path: string = '/'): void {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=${path}`;
  }

  /**
   * Get a cookie value by its name
   * @param name Cookie name
   * @returns Cookie value or null if not found
   */
  getCookie(name: string): string | null {
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1, c.length);
      }
      if (c.indexOf(nameEQ) === 0) {
        return decodeURIComponent(c.substring(nameEQ.length, c.length));
      }
    }
    return null;
  }

  /**
   * Delete a cookie by its name
   * @param name Cookie name
   * @param path Cookie path (default: '/')
   */
  deleteCookie(name: string, path: string = '/'): void {
    this.setCookie(name, '', -1, path);
  }

  /**
   * Check if a cookie exists
   * @param name Cookie name
   * @returns boolean indicating if cookie exists
   */
  hasCookie(name: string): boolean {
    return this.getCookie(name) !== null;
  }

  /**
   * Get all cookies as an object
   * @returns Object with all cookies
   */
  getAllCookies(): { [key: string]: string } {
    const cookies: { [key: string]: string } = {};
    const ca = document.cookie.split(';');
    
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      const parts = c.split('=');
      if (parts.length >= 2) {
        cookies[parts[0]] = decodeURIComponent(parts[1]);
      }
    }
    
    return cookies;
  }

  /**
   * Clear all cookies
   * @param path Cookie path (default: '/')
   */
  clearAllCookies(path: string = '/'): void {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=' + path;
    }
  }
}
