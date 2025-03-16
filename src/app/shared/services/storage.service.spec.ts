import { TestBed } from '@angular/core/testing';
import { StorageService } from './storage.service';

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageService);
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store and retrieve string values', () => {
    service.set('testString', 'Hello World');
    expect(service.get('testString')).toBe('Hello World');
  });

  it('should store and retrieve object values', () => {
    const testObj = { name: 'Test', value: 123 };
    service.set('testObj', testObj);
    expect(service.get('testObj')).toEqual(testObj);
  });

  it('should return default value when key not found', () => {
    expect(service.get('nonexistent', 'default')).toBe('default');
  });

  it('should remove items', () => {
    service.set('testKey', 'value');
    service.remove('testKey');
    expect(service.get('testKey')).toBeNull();
  });

  it('should check if key exists', () => {
    service.set('testKey', 'value');
    expect(service.has('testKey')).toBe(true);
    expect(service.has('nonexistent')).toBe(false);
  });

  it('should clear all items', () => {
    service.set('key1', 'value1');
    service.set('key2', 'value2');
    service.clear();
    expect(service.size()).toBe(0);
  });

  it('should get all keys', () => {
    service.set('key1', 'value1');
    service.set('key2', 'value2');
    expect(service.keys()).toEqual(['key1', 'key2']);
  });

  it('should get correct size', () => {
    service.set('key1', 'value1');
    service.set('key2', 'value2');
    expect(service.size()).toBe(2);
  });

  it('should get all items', () => {
    const items = {
      key1: 'value1',
      key2: { test: 'value2' }
    };
    service.setMultiple(items);
    expect(service.getAll()).toEqual(items);
  });

  it('should set multiple items at once', () => {
    const items = {
      key1: 'value1',
      key2: 'value2'
    };
    service.setMultiple(items);
    expect(service.get('key1')).toBe('value1');
    expect(service.get('key2')).toBe('value2');
  });
});
