/* eslint-disable no-console */
import { IMoneyKeeperLogger, MoneyKeeperLoggerType } from './logger.contract';

const moneykeeperLog = (name: string, type: MoneyKeeperLoggerType): ((message: string) => void) => {
    switch (type) {
        case 'warning':
            return (message: string) => console.warn(`[${name} WARNING]: ${message}`);
        case 'error':
            return (message: string) => console.error(`[${name} ERROR]: ${message}`);
        default:
            return (message: string) => console.log(`[${name} INFO]: ${message}`);
    }
};

export class MoneyKeeperLogger implements IMoneyKeeperLogger {
    private readonly name: string;

    constructor(name: string) {
        this.name = name;
    }

    log(type: MoneyKeeperLoggerType, message = ''): void {
        return moneykeeperLog(this.name, type)(message);
    }

    info(message?: string): void {
        return this.log('info', message);
    }

    warning(message?: string): void {
        return this.log('warning', message);
    }

    error(message?: string): void {
        return this.log('error', message);
    }
}
