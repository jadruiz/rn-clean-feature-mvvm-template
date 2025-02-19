// src/core/state/StateAdapterFactory.ts
import { container } from 'tsyringe';
import { IStateAdapter } from '@core/state/interfaces/IStateAdapter';
import { RootState } from '@core/state/redux/store';
import { Config } from '@core/config/environment/ConfigAdapter';
import { Logger, LogLevel } from '@core/logging/Logger';
import { consoleAdapter } from '@core/logging/adapters/consoleAdapter';

const logger = new Logger(consoleAdapter, LogLevel.INFO);

export const getStateAdapter = async (): Promise<IStateAdapter<RootState>> => {
  const adapterType =
    Config.get<'redux' | 'memory'>('STATE_ADAPTER') ?? 'redux';

  try {
    logger.info(`Cargando adaptador de estado: ${adapterType}`);
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
