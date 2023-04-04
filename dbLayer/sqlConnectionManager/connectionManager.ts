/* tslint:disable:typedef */
import { tds } from '../interface/IConnectionManager';

const sql = require('mssql');
const env = require('dotenv').config();

// tslint:disable-next-line:no-namespace
import IConnectionManager = tds.dbLayer.contracts.IConnectionManager;

export class SqlClientManager implements IConnectionManager {
  private dbInstance: any;

  public async instance() {
    if (this.dbInstance === null || this.dbInstance === undefined) {
      this.dbInstance = await new SqlClientManager().getConnection('');
    }
    return this.dbInstance;
  }

  public getConnection(connectionUrl: string): Promise<any> {
    // tslint:disable-next-line:no-shadowed-variable
    return new Promise(async (resolve, reject) => {
      // Singleton implemented here
      try {
        const configuration = {
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          server: process.env.DB_SERVER,
          database: process.env.DB_DATABASE,
          requestTimeout: 300000,
          options: {
            trustServerCertificate: false,
            enableArithAbort: false,
            encrypt: false
          }
        };

        this.dbInstance = await this.connect(configuration);
        console.log('Connected to Database:::::', process.env.DB_DATABASE);
        resolve(this.dbInstance);
      } catch (exception) {
        console.log('ERROR: While connecting to DB', exception);
        reject(exception);
      }

    });
  }

  public closeConnection = () => {
    // write connection close command
    sql.close();
  };

  private async connect(configuration: object): Promise<any> {
    // sql-server connection
    try {
      return await sql.connect(configuration);
    } catch (err) {
      throw err;
    }
  }

}

