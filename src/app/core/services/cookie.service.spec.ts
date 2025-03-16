import { TestBed } from '@angular/core/testing';
import { CookieService } from './cookie.service';

describe('CookieService', () => {
  let service: CookieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CookieService);
    // Clear all cookies before each test
    document.cookie.split(';').forEach(cookie => {
      document.cookie = cookie
        .replace(/^ +/, '')
        .replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`);
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get a cookie', () => {
    service.setCookie('test', 'value');
    expect(service.getCookie('test')).toBe('value');
  });

  it('should delete a cookie', () => {
    service.setCookie('test', 'value');
    service.deleteCookie('test');
    expect(service.getCookie('test')).toBeNull();
  });

  it('should check if cookie exists', () => {
    service.setCookie('test', 'value');
    expect(service.hasCookie('test')).toBe(true);
    expect(service.hasCookie('nonexistent')).toBe(false);
  });

  it('should get all cookies', () => {
    service.setCookie('test1', 'value1');
    service.setCookie('test2', 'value2');
    const allCookies = service.getAllCookies();
    expect(allCookies['test1']).toBe('value1');
    expect(allCookies['test2']).toBe('value2');
  });

  it('should clear all cookies', () => {
    service.setCookie('test1', 'value1');
    service.setCookie('test2', 'value2');
    service.clearAllCookies();
    expect(service.getAllCookies()).toEqual({});
  });
});
