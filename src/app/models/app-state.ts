import { DBSyncState } from "./db-sync";
import { UserInfo } from "./user-info";

export interface AppState {
  userInfo: UserInfo;
  dbSync: DBSyncState;
};
