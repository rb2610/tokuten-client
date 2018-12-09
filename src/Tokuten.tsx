import * as React from "react";
import ContainerDimensions from "react-container-dimensions";
import ScoreTable from "./ScoreTable";

require("./styles/Tokuten.css");

// TODO: Fix this at some point:
// import logo from '../images/logo.svg';
// const logo = require('./images/logo.svg');

class Tokuten extends React.Component {
  public render() {
    return (
      <div className="main">
        <header className="main-header">
          <h1 className="main-title">Tokuten</h1>
        </header>
        <p className="main-intro">Scores and stuff.</p>
        <div style={{ display: "flex", flexFlow: "column", height: "100%", width: "100%" }}>
          <div style={{ flex: "1 1 auto" }}>
            <ContainerDimensions>
              <ScoreTable />
            </ContainerDimensions>
          </div>
        </div>
      </div>
    );
  }
}

export default Tokuten;
