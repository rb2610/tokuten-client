"use strict";

import { Cell, Column, Table } from "fixed-data-table-2";
import * as React from "react";
import Score from "./dataTypes/Score";

require("fixed-data-table-2/dist/fixed-data-table.min.css");
require("./styles/TestTable.css");

type Props = {
  height: number;
  scores: Map<number, Score>;
  selectedGameId: number;
  selectedGroupId: number;
  width: number;
};

type State = {};

class ScoreTable extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
  }

  public render() {
    const headerHeight = 50;
    const rowHeight = 50;
    const rowsCount = this.props.scores.size;

    return (
      <div>
        <Table
          className={"test-table"}
          rowHeight={rowHeight}
          headerHeight={headerHeight}
          rowsCount={rowsCount}
          width={this.props.width * 0.85}
          height={Math.min(
            /* Margin: */ 2 + headerHeight + rowsCount * rowHeight,
            Math.max(300, this.props.height * 0.85)
          )}
        >
          <Column
            columnKey="name"
            header={<Cell>Name</Cell>}
            cell={this.cellNameMapping}
            flexGrow={1}
            width={50}
          />
          <Column
            columnKey="wins"
            header={<Cell>Wins</Cell>}
            cell={this.cellWinsMapping}
            flexGrow={1}
            width={50}
          />
          <Column
            columnKey="played"
            header={<Cell>Played</Cell>}
            cell={this.cellPlayedMapping}
            flexGrow={1}
            width={50}
          />
          <Column
            columnKey="win-ratio"
            header={<Cell>Win Ratio</Cell>}
            cell={this.cellWinRatioMapping}
            flexGrow={1}
            width={50}
          />
          <Column
            columnKey="participant"
            header={<Cell>In Current Round</Cell>}
            cell={this.cellRoundParticipantMapping}
            flexGrow={1}
            width={50}
          />
          <Column
            columnKey="winner"
            header={<Cell>Won Current Round</Cell>}
            cell={this.cellRoundWinnerMapping}
            flexGrow={1}
            width={50}
          />
        </Table>
      </div>
    );
  }

  private onToggleParticipation = (playerId: number) => (event: any) => {
    const row: Score | undefined = this.props.scores.get(playerId);

    if (row === undefined) {
      return;
    }

    row.isInGame = event.target.checked;

    this.setState({
      data: this.props.scores.set(playerId, row)
    });
  };

  private onToggleVictory = (playerId: number) => (event: any) => {
    const row: Score | undefined = this.props.scores.get(playerId);

    if (row === undefined) {
      return;
    }

    row.isWinner = event.target.checked;

    this.setState({
      data: this.props.scores.set(playerId, row)
    });
  };

  private cellNameMapping = (props: any) => {
    return (
      <Cell className={`tt-name-${props.rowIndex}`}>
        {this.props.scores.size > 0
          ? Array.from(this.props.scores.values())[props.rowIndex].name
          : "-"}
      </Cell>
    );
  };

  private cellWinsMapping = (props: any) => {
    return (
      <Cell className={`tt-wins-${props.rowIndex}`}>
        {this.props.scores.size > 0
          ? Array.from(this.props.scores.values())[props.rowIndex].wins
          : "-"}
      </Cell>
    );
  };

  private cellPlayedMapping = (props: any) => {
    return (
      <Cell className={`tt-played-${props.rowIndex}`}>
        {this.props.scores.size > 0
          ? Array.from(this.props.scores.values())[props.rowIndex].played
          : "-"}
      </Cell>
    );
  };

  private cellWinRatioMapping = (props: any) => {
    return (
      <Cell className={`tt-win-ratio-${props.rowIndex}`}>
        {this.props.scores.size > 0 &&
        Array.from(this.props.scores.values())[props.rowIndex].played > 0
          ? `${(Array.from(this.props.scores.values())[props.rowIndex].wins /
              Array.from(this.props.scores.values())[props.rowIndex].played) *
              100}%`
          : "-"}
      </Cell>
    );
  };

  private cellRoundParticipantMapping = (props: any) => {
    return (
      <Cell className={`tt-round-participant-${props.rowIndex}`}>
        {this.props.scores.size > 0 ? (
          <input
            type="checkbox"
            checked={
              Array.from(this.props.scores.values())[props.rowIndex].isInGame ||
              false
            }
            onChange={this.onToggleParticipation(
              Array.from(this.props.scores.values())[props.rowIndex].id
            )}
          />
        ) : (
          "-"
        )}
      </Cell>
    );
  };

  private cellRoundWinnerMapping = (props: any) => {
    return (
      <Cell className={`tt-round-winner-${props.rowIndex}`}>
        {this.props.scores.size > 0 ? (
          <input
            type="checkbox"
            checked={
              Array.from(this.props.scores.values())[props.rowIndex].isWinner ||
              false
            }
            onChange={this.onToggleVictory(
              Array.from(this.props.scores.values())[props.rowIndex].id
            )}
          />
        ) : (
          "-"
        )}
      </Cell>
    );
  };
}

export default ScoreTable;
