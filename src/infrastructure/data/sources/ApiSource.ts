// src/core/infrastructure/data/ApiSource.ts
import { NetworkManager } from '@core/network/NetworkManager';

export class ApiSource {
  async fetchData(endpoint: string): Promise<any> {
    const online = await NetworkManager.isOnline();
    if (!online) {
      throw new Error('No hay conexión a Internet.');
    }
    // Realiza la solicitud HTTP (por ejemplo, usando fetch o axios)
    const response = await fetch(endpoint);
    return response.json();
  }
}
