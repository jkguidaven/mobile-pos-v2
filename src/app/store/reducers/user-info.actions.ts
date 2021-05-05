import { Action, createReducer, on } from "@ngrx/store";
import { UserInfo } from "src/app/models/user-info";
import * as actions from '../actions/user-info.actions';

export const initialState: UserInfo = undefined;

const userInfoReducer = createReducer(
  initialState,
  on(actions.setUserInfo, (state, { info }) => info),
  on(actions.clearUserInfo, (state) => initialState));


  export default function (state: UserInfo | undefined, action: Action) {
    return userInfoReducer(state, action);
  };
