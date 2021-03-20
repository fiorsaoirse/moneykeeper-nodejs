export interface IConfig {
    port: number;
    host: string;
    username: string;
    password: string;
    database: string;
    schema: string;
}

export default <IConfig>{
    port: 5432,
    host: 'localhost',
    username: 'moneykeeper',
    password: 'moneykeepersecret',
    database: 'moneykeeper',
    schema: 'moneykeeper',
};
