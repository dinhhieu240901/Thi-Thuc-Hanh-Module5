import React from "react";
import { useLocation } from "react-router-dom";
import "../asset/Error.css";

function Error() {
  const { state } = useLocation();
  const location = useLocation().pathname;
  console.log(location);
  return state && state.code ? (
    <div id="notfound">
      <div class="notfound">
        <div class="notfound-404">
          <h1>{state.code}</h1>
        </div>
        <h4>{state.message}</h4>
        <p>
          The page you are looking for might have been removed had its name
          changed or is temporarily unavailable.
          <a href="/">Return to homepage</a>
        </p>
      </div>
    </div>
  ) : location === "/error" ? (
    <div class="notfound">
      <div class="notfound-404">
        <h1 style={{ fontSize: "50px", margin: "auto" }}>Error Page</h1>
      </div>
    </div>
  ) : (
    <div class="notfound">
      <div class="notfound-404">
        <h1 style={{ fontSize: "50px", margin: "auto", whiteSpace: "nowrap" }}>
          URL not found
        </h1>
      </div>
    </div>
  );
}

export default Error;
