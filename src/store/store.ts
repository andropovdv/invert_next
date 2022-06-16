import featureSetsSlice from "./slices/featureSetsSlice";
import componentTypesSlice from "./slices/componentTypesSlice";
import featureTypes from "./slices/featuresTypesSlice";
import vendors from "./slices/vendorsSlice";
import auth from "./slices/authSlice";
import getUsersSlice from "./slices/usersSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  getUsersSlice,
  auth,
  vendors,
  featureTypes,
  componentTypesSlice,
  featureSetsSlice,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = typeof store;
export type AppDispatch = AppStore["dispatch"];
