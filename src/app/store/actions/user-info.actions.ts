import { createAction, props } from '@ngrx/store';
import { UserInfo } from '../../models/user-info';

export const setUserInfo = createAction('[Userinfo] set', props<{ info: UserInfo }>());
export const clearUserInfo = createAction('[UserInfo] clear');
