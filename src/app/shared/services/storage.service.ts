import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() { }

  /**
   * Store a value in localStorage
   * @param key Storage key
   * @param value Value to store (will be JSON stringified if object)
   */
  set(key: string, value: any): void {
    try {
      const serializedValue = typeof value === 'object' ? JSON.stringify(value) : String(value);
      localStorage.setItem(key, serializedValue);
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  }

  /**
   * Get a value from localStorage
   * @param key Storage key
   * @param defaultValue Default value if key doesn't exist
   * @returns The stored value or defaultValue if not found
   */
  get<T>(key: string, defaultValue: T | null = null): T | null {
    try {
      const item = localStorage.getItem(key);
      if (item === null) {
        return defaultValue;
      }
      try {
        // Attempt to parse as JSON
        return JSON.parse(item);
      } catch {
        // If parsing fails, return as is
        return item as unknown as T;
      }
    } catch (e) {
      console.error('Error reading from localStorage', e);
      return defaultValue;
    }
  }

  /**
   * Remove an item from localStorage
   * @param key Storage key to remove
   */
  remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error('Error removing from localStorage', e);
    }
  }

  /**
   * Check if a key exists in localStorage
   * @param key Storage key to check
   * @returns boolean indicating if key exists
   */
  has(key: string): boolean {
    return localStorage.getItem(key) !== null;
  }

  /**
   * Clear all data from localStorage
   */
  clear(): void {
    try {
      localStorage.clear();
    } catch (e) {
      console.error('Error clearing localStorage', e);
    }
  }

  /**
   * Get all keys from localStorage
   * @returns Array of storage keys
   */
  keys(): string[] {
    const keys: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        keys.push(key);
      }
    }
    return keys;
  }

  /**
   * Get the number of items in localStorage
   * @returns Number of stored items
   */
  size(): number {
    return localStorage.length;
  }

  /**
   * Get all stored items as a key-value object
   * @returns Object containing all stored items
   */
  getAll(): { [key: string]: any } {
    const all: { [key: string]: any } = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        all[key] = this.get(key);
      }
    }
    return all;
  }

  /**
   * Store multiple key-value pairs at once
   * @param items Object containing key-value pairs to store
   */
  setMultiple(items: { [key: string]: any }): void {
    Object.entries(items).forEach(([key, value]) => {
      this.set(key, value);
    });
  }
}
