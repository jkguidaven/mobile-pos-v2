import { DBSyncState } from './db-sync';
import { LocationCoordinates } from './location-coordinates';
import { TransactionList } from './transaction-list';
import { UserInfo } from './user-info';

export interface AppState {
  userInfo: UserInfo;
  dbSync: DBSyncState;
  location: LocationCoordinates;
  transactionQueue: TransactionList;
};
