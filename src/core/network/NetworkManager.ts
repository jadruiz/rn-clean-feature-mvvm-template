// src/core/network/NetworkManager.ts
import NetInfo from '@react-native-community/netinfo';

export class NetworkManager {
  /**
   * Retorna un booleano indicando si el dispositivo está conectado a Internet.
   */
  static async isOnline(): Promise<boolean> {
    const state = await NetInfo.fetch();
    return state.isConnected ?? false;
  }

  /**
   * Permite suscribirse a cambios en la conectividad.
   * @param callback Función a ejecutar cada vez que el estado de la red cambia.
   * @returns Una función para cancelar la suscripción.
   */
  static subscribe(callback: (isConnected: boolean) => void): () => void {
    const unsubscribe = NetInfo.addEventListener((state) => {
      callback(state.isConnected ?? false);
    });
    return unsubscribe;
  }
}
