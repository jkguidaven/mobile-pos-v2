import { Action, createReducer, on } from '@ngrx/store';
import { UserInfo } from 'src/app/models/user-info';
import * as actions from '../actions/user-info.action';

export const initialState: UserInfo = undefined;

const userInfoReducer = createReducer(
  initialState,
  on(actions.setUserInfo, (_, { info }) => info),
  on(actions.clearUserInfo, () => initialState));


  export default (state: UserInfo | undefined, action: Action) => userInfoReducer(state, action);
