"use strict";

import * as d3 from "d3";
import * as React from "react";
import Score from "./dataTypes/Score";

require("fixed-data-table-2/dist/fixed-data-table.min.css");
require("./styles/FancyGraph.css");

type Props = {
  height: number;
  scores: Map<number, Score>;
  selectedGameId: number;
  selectedGroupId: number;
  width: number;
};

type State = {};

class FancyGraph extends React.Component<Props, State> {
  protected ref: SVGSVGElement;

  constructor(props: Props) {
    super(props);
  }

  public componentDidMount() {
    // const rowHeight = 50;
    // const rowsCount = this.props.scores.size;
    // d3.select(this.ref)
    //   .append("circle")
    //   .attr("r", 10)
    //   .attr("cx", (this.props.width * 0.85) / 2)
    //   .attr("cy", Math.max(300, this.props.height * 0.85) / 2)
    //   .attr("fill", "red");
  }

  public render() {
    const data = [...this.props.scores].map((score: [number, Score]) => score[1].wins / score[1].played) || [0];

    const barHeight = 25;
    const rowsCount = this.props.scores.size;
    const width = this.props.width * 0.85;

    const x = d3
      .scaleLinear()
      .domain([0, d3.max(data) || 0])
      .range([0, width]);

    const chart = d3
      .select(this.ref)
      .attr("width", width)
      .attr(
        "height",
        Math.min(
          /* Margin: */ 2 + rowsCount * barHeight,
          Math.max(300, this.props.height * 0.85)
        )
      );

    const bar = chart
      .selectAll("g")
      .data(data)
      .enter()
      .append("g")
      .attr("transform", (d, i) => {
        return "translate(0," + i * barHeight + ")";
      });

    bar
      .append("rect")
      .attr("width", x)
      .attr("height", barHeight - 1);

    bar
      .append("text")
      .attr("x", d => x(d) - 3)
      .attr("y", barHeight / 2)
      .attr("dy", ".35em")
      .text(d => d);

    // d3.select(this.ref)
    //   .append("circle")
    //   .attr("r", 10)
    //   .attr("cx", (this.props.width * 0.85) / 2)
    //   .attr("cy", Math.max(300, this.props.height * 0.85) / 2)
    //   .attr("fill", "red");

    return (
      <div>
        <svg
          className={"chart"}
          ref={(ref: SVGSVGElement) => (this.ref = ref)}
          width={this.props.width * 0.85}
          height={Math.min(
            /* Margin: */ 2 + rowsCount * barHeight,
            Math.max(300, this.props.height * 0.85)
          )}
        />
      </div>
    );
  }
}

export default FancyGraph;
