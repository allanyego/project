import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
// import { Suspense } from "react";
import React, { Suspense, useEffect, useState } from "react";

import About from "./pages/About";
import Home from "./pages/Home";
import Contact from "./pages/Contact";

import "./styles.css";
import "./assets/css/sparkles.css";
import "./assets/css/main.css";
import "./assets/release/likely.css";

import Loading from "./components/Spinner";
import Navbar from "./components/Navbar";
import Register from "./pages/register";
import Lost from "./pages/404";
import Footer from "./components/Footer";
import Terms from "./pages/terms";
import Signin from "./pages/signin";
import Forgot from "./pages/forgot";
import Reset from "./pages/reset";
import Dashboard from "./app/dashboard";
import { AppContext } from "./utils/context";
import { clear, getObject, setObject } from "./utils/storage";
import { STORAGE_KEY } from "./utils/constants";
import useMounted from "./utils/hooks/mounted";

export default function App() {
  const [user, setUser] = useState(null);
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
    <AppContext.Provider value={{}}>
      <div className="App">
        <Router>
          <Navbar user={this.state.user} setUser={this.setUser} />
          <Suspense fallback={<Loading />}>
            <Switch>
              <Route path="/" component={Home} exact />
              <Route path="/about" component={About} exact />
              <Route path="/contact" component={Contact} exact />
              <Route path="/register" component={Register} exact />
              <Route path="/terms" component={Terms} exact />
              <Route
                path="/signin"
                component={() => <Signin setUser={this.setUser} />}
                exact
              />
              <Route
                path="/app/"
                component={() => <Dashboard user={this.state.user} />}
                exact
              />
              <Route path="/forgot" component={Forgot} exact />
              <Route path="/reset/:id" component={Reset} exact />
              <Route path="/404" component={Lost} exact />

              {/* Redirect all other to home page */}
              <Route render={() => <Redirect to="/404" />} />
            </Switch>
          </Suspense>
          <Footer user={this.state.user} setUser={this.setUser} />
        </Router>
      </div>
    </AppContext.Provider>
  );
}
