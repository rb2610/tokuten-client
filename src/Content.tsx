"use strict";

import * as React from "react";
import ContainerDimensions from "react-container-dimensions";
import ScoreTable from "./ScoreTable";

class Content extends React.Component {
  public render() {
    return (
      <div
        style={{
          display: "flex",
          flexFlow: "column",
          height: "100%",
          width: "100%"
        }}
      >
        <div style={{ flex: "1 1 auto" }}>
          <ContainerDimensions>
            <ScoreTable />
          </ContainerDimensions>
        </div>
      </div>
    );
  }
}

export default Content;
