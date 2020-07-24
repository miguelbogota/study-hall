import { Observable, BehaviorSubject } from 'rxjs';

/**
 * Interface for the configuration of the Storage class
 */
export interface StorageSLConfig {
  key: string;
  type: 'local' | 'session';
}

/**
 * This class will allow to set up the local and session storage as an
 * observable to listen for changes
 */
export class StorageLS {

  private logger: BehaviorSubject<{}> = new BehaviorSubject<{}>(null);
  private config: StorageSLConfig = null;

  /**
   * In order to use this class the initial setup needs to be provide
   * as an argument for the initial state.
   *
   * @param config Initial configuration to be searched in the storage.
   */
  constructor(config: StorageSLConfig) {
    this.config = config;
    this.logger = new BehaviorSubject<{}>(this.get());
  }

  /**
   * Function will store the data passed in the local or session storage
   *
   * @param data Data to be store
   */
  set<T>(data: T): void {
    // Check where the information will be store
    if (this.config.type === 'local') { localStorage.setItem(this.config.key, JSON.stringify(data)); }
    else if (this.config.type === 'session') { sessionStorage.setItem(this.config.key, JSON.stringify(data)); }
    // Throw error if is not an option
    else { throw new Error('Error with type of storage to store data, can only be of type "session" or "local" storage.'); }
    this.logger.next(data);
  }

  /**
   * Function return the data stored in the local or session storage
   */
  get<T>(): T {
    // Check if the data exist in local
    if (this.config.type === 'local') {
      const theresData = localStorage.getItem(this.config.key) !== null;
      // Return the data
      return theresData ? JSON.parse(localStorage.getItem(this.config.key)) as T : null;
    }
    else if (this.config.type === 'session') {
      const theresData = sessionStorage.getItem(this.config.key) !== null;
      // Return the data
      return theresData ? JSON.parse(sessionStorage.getItem(this.config.key)) as T : null;
    }
    // Throw error if is not an option
    else { throw new Error('Error with type of storage to store data, can only be of type "session" or "local" storage.'); }
  }

  /**
   * Function deletes the data stored in the local or session storage
   */
  delete(): void {
    // Delete the data from the storage
    if (this.config.type === 'local') { localStorage.removeItem(this.config.key); }
    else if (this.config.type === 'session') { sessionStorage.removeItem(this.config.key); }
    // Throw error if is not an option
    else { throw new Error('Error with type of storage to store data, can only be of type "session" or "local" storage.'); }
    this.logger.next(null);
  }

  // Getters & Setters
  get watch(): Observable<any> { return this.logger.asObservable(); }

}
