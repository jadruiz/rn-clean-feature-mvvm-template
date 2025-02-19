// src/infrastructure/network/NetworkObserver.ts
import { NetworkManager } from './NetworkManager';
import { NetInfoState } from '@react-native-community/netinfo';

export class NetworkObserver {
  private subscribers: Array<(isOnline: boolean) => void> = [];

  constructor() {
    // Suscribirse a los cambios de red
    NetworkManager.subscribe((state: NetInfoState) => {
      const isOnline = state.isConnected ?? false;
      this.notifySubscribers(isOnline);
    });
  }

  subscribe(callback: (isOnline: boolean) => void): () => void {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter((cb) => cb !== callback);
    };
  }

  private notifySubscribers(isOnline: boolean): void {
    this.subscribers.forEach((callback) => callback(isOnline));
  }
}
