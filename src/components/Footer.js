import * as React from "react";
import logo from "../assets/img/sparkleslogo.png";
import { useAppContext } from "../utils/context";

export default function Footer() {
  const { currentUser } = useAppContext();

  return (
    <div>
      {!currentUser ? (
        <footer></footer>
      ) : (
        <footer className="p-50 mt-auto">
          <div className="container">
            <div className="row">
              <div className="col-md-3 mt-2">
                <img
                  src={logo}
                  style={{ height: "200px", width: "auto" }}
                  alt="Logo"
                />
              </div>
              <div className="col-md-3 mt-2">
                <h5 className="text-primary">
                  <strong>About</strong>
                </h5>
                <p className="text-light">
                  The Sparkles partnership with the corporates help you achieve
                  your goal at ease. Sparkles therefore offers you golden
                  coupons and vouchers that help you redeem them.
                </p>
                <h5 className="text-light">
                  <strong>Follow Us</strong>
                </h5>
                <h2 className="text-light">
                  <a target="_blank" href="/">
                    <i className="fab fa-facebook"></i>
                  </a>
                  <a target="_blank" href="/">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a target="_blank" href="/">
                    <i className="fab fa-youtube"></i>
                  </a>
                </h2>
              </div>
              <div className="col-md-3 mt-2">
                <h5 className="text-light">
                  <strong>Key Links</strong>
                </h5>
                <ul className="list-group list-group-flush text-primary">
                  <li className="list-group-item">Shopping:</li>
                  <li className="list-group-item">&nbsp;Household</li>
                  <li className="list-group-item">&nbsp;Beauty products</li>
                  <li className="list-group-item">&nbsp;Clothing</li>
                  <li className="list-group-item">&nbsp;Consumables</li>
                </ul>
              </div>
              <div className="col-md-3 mt-2">
                <h5 className="text-light">
                  <strong>Our Core Focus</strong>
                </h5>
                <ul className="list-group list-group-flush text-primary">
                  <li className="list-group-item">Holiday:</li>
                  <li className="list-group-item">&nbsp;Beach Holidays</li>
                  <li className="list-group-item">&nbsp;Vocation Holidays</li>
                  <li className="list-group-item">&nbsp;Weekend Holidays</li>
                  <li className="list-group-item">&nbsp;Sea Excursions</li>
                  <li className="list-group-item">
                    <br />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
