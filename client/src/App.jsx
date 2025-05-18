import React from 'react'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import RootLayout from './RootLayout'
import ErrorPage from './pages/ErrorPage';
import MessagesList from "./components/MessagesList";
import Messages from "./pages/Messages";
import Profile from "./pages/Profile";
import SinglePost from "./pages/SinglePost"
import Home from "./pages/Home"
import Bookmarks from "./pages/Bookmarks"
import Login from "./pages/Login"
import Logout from "./pages/Logout"
import Register from "./pages/Register"
import {Provider} from "react-redux";
import store from "./store/store";

const router = createBrowserRouter([
  {path: "/", element: <RootLayout/>, errorElement: <ErrorPage />, children: [
      {index: true, element: <Home />},
      {path: "messages", element: <MessagesList />},
      {path: "messages/:receiverId", element: <Messages />},
      {path: "bookmarks", element: <Bookmarks />},
      {path: "users/:id", element: <Profile />},
      {path: "posts/:id", element: <SinglePost />},
    ]
  },
  {path: "/login", element: <Login />},
  {path: "/register", element: <Register />},
  {path: "/logout", element: <Logout />},
]);


const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App