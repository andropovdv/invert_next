import { Route, Routes } from "react-router-dom";
import { Start } from "pages/Start/Start";
import { Vendors } from "pages/Directory/Vendors/Vendors";
import { Directory } from "pages/Directory/Directory";
import { FeatureTypes } from "pages/Directory/FeatureTypes/FeatureTypes";
import { ComponentTypes } from "pages/Directory/ComponentTypes/ComponentTypes";
import { FeatureSets } from "pages/Directory/FeatureSets/FeatureSets";
import { NotFound } from "pages/NotFound/NotFound";
import { GuestPage } from "pages/Shared/GuestPage";
import { ProtectedRoute } from "./ProtectedRoute";

export const AuthRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<GuestPage />} />
      <Route path="*" element={<NotFound />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/start" element={<Start />} />
        <Route path="directory" element={<Directory />} />
        <Route path="vendors" element={<Vendors />} />
        <Route path="featureTypes" element={<FeatureTypes />} />
        <Route path="componentTypes" element={<ComponentTypes />} />
        <Route path="featureSets" element={<FeatureSets />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );

  // const safeRoute = useRoutes([
  //   { path: "/", element: <Start /> },
  //   { path: "directory", element: <Directory /> },
  //   { path: "vendors", element: <Vendors /> },
  //   { path: "featureTypes", element: <FeatureTypes /> },
  //   { path: "ComponentTypes", element: <ComponentTypes /> },
  //   { path: "featureSets", element: <FeatureSets /> },
  //   { path: "*", element: <NotFound /> },
  // ]);
  // const guestRoute = useRoutes([
  //   { path: "/", element: <GuestPage /> },
  //   { path: "*", element: <NotFound /> },
  // ]);

  // return isAuth ? safeRoute : guestRoute;
};
