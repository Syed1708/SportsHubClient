import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../pages/Home";
import Login from "../auth/Login";
import Register from "../auth/Register";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";
import Profile from "../auth/Profile";
import ErrorPage from "../pages/ErrorPage";
import PrivacyPolicy from "../components/PrivacyPolicy";
import TermsAndConditions from "../components/TermsAndConditions";
import Events from "@/pages/Events";
import MyBookings from "@/pages/MyBookings";
import ManageEvents from "@/pages/ManageEvents";
import UpdateEvent from "@/pages/UpdateEvent";
import EventDetails from "@/pages/EventDetails";
import CreateEvent from "@/pages/CreateEvent";
import EditEvent from "@/pages/EditEvent";
import PageNotFound from "@/pages/PageNotFound";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        path: "/",
        Component: Home,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/events",
        Component: Events,
      },

      {
        path: "/create-event",
        element: (
          <PrivateRoute>
            <CreateEvent />
          </PrivateRoute>
        ),
      },
      {
        path: "/edit-event/:id",
        element: (
          <PrivateRoute>
            <EditEvent />
          </PrivateRoute>
        ),
      },
      {
        path: "/events/:id",
        element: (
          <PrivateRoute>
            <EventDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/myBookings",
        element: (
          <PrivateRoute>
            <MyBookings />
          </PrivateRoute>
        ),
      },
      {
        path: "/manageEvents",
        element: (
          <PrivateRoute>
            <ManageEvents />
          </PrivateRoute>
        ),
      },
      {
        path: "/manageEvents/:id",
        element: (
          <PrivateRoute>
            <UpdateEvent />
          </PrivateRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile></Profile>
          </PrivateRoute>
        ),
      },
      {
        path: "/privacy",
        Component: PrivacyPolicy,
      },
      {
        path: "/terms-and-conditions",
        Component: TermsAndConditions,
      },
    ],
  },
  {
    path: "/error",
    Component: PageNotFound,
  },
]);

export default router;
