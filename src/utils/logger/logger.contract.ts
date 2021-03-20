export type MoneyKeeperLoggerType = 'info' | 'warning' | 'error';

export interface IMoneyKeeperLogger {
    log(type: MoneyKeeperLoggerType, message?: string): void;

    info(message?: string): void;

    warning(message?: string): void;

    error(message?: string): void;
}
