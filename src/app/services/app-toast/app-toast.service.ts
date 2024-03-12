import { Injectable } from '@angular/core';

@Injectable()
export class AppToastService {
  toasts: ToastInfo[] = [];

  show(header: string, body: string): void {
    this.toasts.push({ header, body });
  }

  remove(toast: ToastInfo): void {
    this.toasts = this.toasts.filter(t => t != toast);
  }
}

export interface ToastInfo {
  header: string;
  body: string;
  delay?: number;
}
