import React, { Component } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { useAppContext } from "../utils/context";

export default function Dashboard() {
  const { currentUser } = useAppContext();

  return (
    <div className="container p-50">
      <div className="row">
        <div className="col-md-3">
          <div className="list-group text-dark">
            <NavLink
              to="/app/"
              className="list-group-item list-group-item-action active"
              aria-current="true"
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/app/downline"
              className="list-group-item list-group-item-action"
            >
              Downline
            </NavLink>
            <NavLink
              to="/app/market"
              className="list-group-item list-group-item-action"
            >
              Market
            </NavLink>
            <NavLink
              to="/app/settings"
              className="list-group-item list-group-item-action"
            >
              Settings
            </NavLink>
          </div>
        </div>
        <div className="col-md-9">
          <p>Hello {currentUser.fname},</p>
          <div className="row">
            <div className="col-md-4 mt-2">
              <div className="card bg-success text-light">
                <div className="card-body">
                  <h5 className="font-weight-bold"> Current Level</h5>
                  <hr />
                  <h1>Level {currentUser.level}</h1>
                </div>
              </div>
            </div>
            <div className="col-md-4 mt-2">
              <div className="card bg-warning text-light">
                <div className="card-body">
                  <h5 className="font-weight-bold"> Total Refferals</h5>
                  <hr />
                  <h1>{currentUser.downline}</h1>
                </div>
              </div>
            </div>
            <div className="col-md-4 mt-2">
              <div className="card bg-dark text-light">
                <div className="card-body">
                  <h5 className="font-weight-bold"> Total Earnings</h5>
                  <hr />
                  <h1>{currentUser.account}</h1>
                </div>
              </div>
            </div>
          </div>
          <a href="/app/deposit" className="btn btn-primary mt-2">
            Deposit Funds
          </a>
          <br />
          <a href="/app/withdraw" className="btn btn-primary mt-2">
            Withdraw
          </a>
          <div className="card mt-4">
            <div className="card-body">
              <p>Referral link</p>
              <div className="btn-group">
                <a
                  className="btn btn-secondary btn-email word-wrap"
                  href={window.location.origin + "/signup/" + currentUser.code}
                >
                  {window.location.origin + "/signup/" + currentUser.code}
                </a>
                <button
                  type="button"
                  className="btn btn-outline-dark btn-copy js-tooltip js-copy"
                  data-toggle="tooltip"
                  data-placement="bottom"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      window.location.origin + "/signup/" + currentUser.code
                    );
                  }}
                  title="Copy to clipboard"
                >
                  <i className="fas fa-copy"></i> Copy
                </button>
              </div>
              <p className="mt-4">
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={
                    "https://wa.me/?text=" +
                    window.location.origin +
                    "/signup/" +
                    currentUser.code
                  }
                  className="text-success"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Share to Whatsapp"
                >
                  <i className="fab fa-whatsapp"></i> Share via Whatsapp
                </a>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={
                    "https://telegram.me/share/url?url=" +
                    window.location.origin +
                    "/signup/" +
                    currentUser.code +
                    "&text=Join%20SPARKLES%20DIGITAL%20TODAY"
                  }
                  className="text-info"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Share to Telegram"
                >
                  <i className="fab fa-telegram"></i> Share via Telegram
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
