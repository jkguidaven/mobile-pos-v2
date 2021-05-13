

import { Action, createReducer, on } from '@ngrx/store';
import { LocationCoordinates } from 'src/app/models/location-coordinates';
import { UserInfo } from 'src/app/models/user-info';
import * as actions from '../actions/location.action';

export const initialState: LocationCoordinates = {
  latitude: 0,
  longitude: 0
};

const locationReducer = createReducer(
  initialState,
  on(actions.setLocation, (state, { latitude, longitude }) => ({
    latitude,
    longitude
  }))
);

export default (state: LocationCoordinates | undefined, action: Action) => locationReducer(state, action);
