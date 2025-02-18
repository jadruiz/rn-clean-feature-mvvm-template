// src/core/state/StateAdapterFactory.ts
import { container } from 'tsyringe';
import { IStateAdapter } from './interfaces/IStateAdapter';
import { RootState } from './redux/store';
import { Config } from '@core/config/environment/ConfigAdapter';
import { Logger, consoleAdapter, LogLevel } from '@core/logging';

const logger = new Logger(consoleAdapter, LogLevel.INFO);

export const getStateAdapter = async (): Promise<IStateAdapter<RootState>> => {
  // Obtiene el tipo de adaptador definido en la configuración, por defecto 'redux'
  const adapterType =
    Config.get<'redux' | 'memory'>('STATE_ADAPTER') ?? 'redux';

  try {
    logger.info(`Cargando adaptador de estado: ${adapterType}`);
    // Resuelve el adaptador usando tsyringe
    return container.resolve<IStateAdapter<RootState>>(
      adapterType === 'redux' ? 'ReduxAdapter' : 'MemoryAdapter',
    );
  } catch (error) {
    logger.error(
      `Error al resolver el adaptador "${adapterType}", usando fallback a Redux.`,
      { error },
    );
    return container.resolve<IStateAdapter<RootState>>('ReduxAdapter');
  }
};
