import { createAction, props } from '@ngrx/store';

export const setLocation = createAction('[location] set', props<{ latitude: number, longitude: number }>());
