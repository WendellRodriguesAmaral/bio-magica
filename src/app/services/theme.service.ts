import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDarkTheme = new BehaviorSubject<boolean>(false);
  
  constructor() {
    // Carregar preferência do localStorage se existir
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.isDarkTheme.next(savedTheme === 'dark');
    }
  }
  
  toggleTheme(): void {
    this.isDarkTheme.next(!this.isDarkTheme.value);
    // Salvar preferência no localStorage
    localStorage.setItem('theme', this.isDarkTheme.value ? 'dark' : 'light');
  }
  
  isDarkTheme$(): Observable<boolean> {
    return this.isDarkTheme.asObservable();
  }
  
  getCurrentTheme(): boolean {
    return this.isDarkTheme.value;
  }
}