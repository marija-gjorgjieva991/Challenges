import { RouteObject } from "react-router-dom";
import ArtistsList from "./Components/ArtistsList";
import ArtistPage from "./Components/ArtistPage";
import ErrorPage from "./Components/ErrorPage";
import AlbumPage from "./Components/AlbumPage";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <ArtistsList />,
  },
  {
    path: "/artist/:id",
    element: <ArtistPage />,
  },
  {
    path: "/artist/:artistId/:albumId",
    element: <AlbumPage />,
  },
  {
    path: "/*",
    element: <ErrorPage />,
  },
];

export default routes;
