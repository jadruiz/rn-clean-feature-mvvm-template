// src/core/network/NetworkManager.ts
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';

export class NetworkManager {
  /**
   * Verifica si el dispositivo está en línea.
   * @returns {Promise<boolean>} `true` si hay conexión a Internet, `false` en caso contrario.
   */
  static async isOnline(): Promise<boolean> {
    const state = await NetInfo.fetch();
    return state.isConnected ?? false;
  }

  /**
   * Retorna el tipo de conexión actual (WiFi, Datos móviles, desconocido, etc.).
   * @returns {Promise<string>} Tipo de conexión actual.
   */
  static async getConnectionType(): Promise<string> {
    const state = await NetInfo.fetch();
    return state.type; // Ejemplo: 'wifi', 'cellular', 'unknown', 'none'
  }

  /**
   * Suscripción a cambios en el estado de la red.
   * @param callback Función a ejecutar cuando la conectividad cambia.
   * @returns Función para cancelar la suscripción.
   */
  static subscribe(callback: (state: NetInfoState) => void): () => void {
    const unsubscribe = NetInfo.addEventListener((state) => {
      callback(state);
    });
    return unsubscribe;
  }

  /**
   * Retorna información detallada sobre la conexión de red.
   * @returns {Promise<NetInfoState>} Objeto con información detallada.
   */
  static async getNetworkInfo(): Promise<NetInfoState> {
    return await NetInfo.fetch();
  }
}
