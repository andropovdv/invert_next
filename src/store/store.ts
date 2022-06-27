import featureSetsSlice from "./slices/featureSetsSlice";
import componentTypesSlice from "./slices/componentTypesSlice";
import featureTypesSlice from "./slices/featuresTypesSlice";
import vendorsSlice from "./slices/vendorsSlice";
import componentsSlice from "./slices/componentsSlice";
import auth from "./slices/authSlice";
import getUsersSlice from "./slices/usersSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  getUsersSlice,
  auth,
  vendors: vendorsSlice,
  featureTypes: featureTypesSlice,
  componentTypesSlice,
  featureSetsSlice,
  componentsSlice,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
// export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = typeof store.getState;
// export type AppDispatch = AppStore["dispatch"];
export type AppDispatch = typeof store.dispatch;
