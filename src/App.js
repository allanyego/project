import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { lazy, Suspense, useEffect, useState } from "react";

import { AppContext } from "./utils/context";
import { clear, getObject, setObject } from "./utils/storage";
import { STORAGE_KEY } from "./utils/constants";
import useMounted from "./utils/hooks/mounted";
import Loading from "./components/Loading";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const About = lazy(() => import("./pages/About"));
const Home = lazy(() => import("./pages/Home"));
const Contact = lazy(() => import("./pages/Contact"));
const Register = lazy(() => import("./pages/Register"));
const Lost = lazy(() => import("./pages/404"));
const Terms = lazy(() => import("./pages/Terms"));
const Signin = lazy(() => import("./pages/Signin"));
const Forgot = lazy(() => import("./pages/Forgot"));
const Reset = lazy(() => import("./pages/Reset"));
const Dashboard = lazy(() => import("./pages/Dashboard"));

export default function App() {
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [isAuthenticating, setAuthenticating] = useState(true);

  const { isMounted, setMounted } = useMounted();

  /**
   * Helper to update the current user, if any.
   *
   * @param {*} currUser
   * @returns void
   */
  const setCurrentUser = async (currUser) => {
    if (!currUser) {
      await clear();
      return setUser(null);
    }

    const newDetails = {
      ...user,
      ...currUser,
    };
    await setObject(STORAGE_KEY, {
      currentUser: newDetails,
    });

    setUser(newDetails);
  };

  useEffect(() => {
    // When component mounts, check local storage
    getObject(STORAGE_KEY).then((data) => {
      if (!isMounted) {
        return;
      }

      if (data && data.currentUser) {
        setUser(data.currentUser);
      }

      setAuthenticating(false);
    });

    return () => {
      setMounted(false);
    };
  }, []);

  return (
    <AppContext.Provider
      value={{
        currentUser: user,
        setCurrentUser,
        notifications,
        setNotifications,
      }}
    >
      <div className="App">
        <Router>
          <Navbar />
          {isAuthenticating ? (
            <Loading text="Checking Authentication" />
          ) : (
            <Suspense fallback={<Loading />}>
              <Switch>
                <Route path="/" component={Home} exact />
                <Route path="/about" component={About} exact />
                <Route path="/contact" component={Contact} exact />
                <Route path="/register" component={Register} exact />
                <Route path="/terms" component={Terms} exact />
                <Route path="/signin" component={() => <Signin />} exact />
                <Route
                  path="/app/"
                  component={() => <Dashboard user={this.state.user} />}
                  exact
                />
                <Route path="/forgot" component={Forgot} exact />
                <Route path="/reset/:id" component={Reset} exact />

                {/* Handle unknown routes */}
                <Route component={Lost} />
              </Switch>
            </Suspense>
          )}
          <Footer />
        </Router>
      </div>
    </AppContext.Provider>
  );
}
