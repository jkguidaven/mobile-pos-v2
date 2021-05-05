import { DBSyncState } from "./db-sync";
import { LocationCoordinates } from "./location-coordinates";
import { UserInfo } from "./user-info";

export interface AppState {
  userInfo: UserInfo;
  dbSync: DBSyncState;
  location: LocationCoordinates;
};
