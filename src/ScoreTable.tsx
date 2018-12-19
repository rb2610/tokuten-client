"use strict";

import { Cell, Column, ColumnCellProps, Table } from "fixed-data-table-2";
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
  constructor(props: Props) {
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
            columnKey="win-percentage"
            header={<Cell>Win Percentage</Cell>}
            cell={this.cellWinPercentageMapping}
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

  private cellNameMapping = (cellProps: ColumnCellProps) => {
    return (
      <Cell className={`tt-name-${cellProps.rowIndex}`}>
        {this.props.scores.size > 0
          ? Array.from(this.props.scores.values())[cellProps.rowIndex].name
          : "-"}
      </Cell>
    );
  };

  private cellWinsMapping = (cellProps: ColumnCellProps) => {
    return (
      <Cell className={`tt-wins-${cellProps.rowIndex}`}>
        {this.props.scores.size > 0
          ? Array.from(this.props.scores.values())[cellProps.rowIndex].wins
          : "-"}
      </Cell>
    );
  };

  private cellPlayedMapping = (cellProps: ColumnCellProps) => {
    return (
      <Cell className={`tt-played-${cellProps.rowIndex}`}>
        {this.props.scores.size > 0
          ? Array.from(this.props.scores.values())[cellProps.rowIndex].played
          : "-"}
      </Cell>
    );
  };

  private cellWinPercentageMapping = (cellProps: ColumnCellProps) => {
    const score: Score | undefined = this.scoreByIndex(cellProps.rowIndex);

    const winPercentage: string = this.winPercentageFromScore(score);

    return (
      <Cell
        className={`tt-win-ratio-${cellProps.rowIndex}`}
        style={{
          color:
            winPercentage.length > 0
              ? `hsl(${Number.parseInt(winPercentage, 10) * 1.2},90%,35%)`
              : "black"
        }}
      >
        {winPercentage.length > 0 ? `${winPercentage}%` : "-"}
      </Cell>
    );
  };

  private scoreByIndex(index: number): Score | undefined {
    return this.props.scores.size > 0
      ? Array.from(this.props.scores.values())[index]
      : undefined;
  }

  private winPercentageFromScore(score: Score | undefined): string {
    return score && score.played > 0
      ? ((score.wins / score.played) * 100).toFixed(0)
      : "";
  }

  private cellRoundParticipantMapping = (cellProps: ColumnCellProps) => {
    return (
      <Cell className={`tt-round-participant-${cellProps.rowIndex}`}>
        {this.props.scores.size > 0 ? (
          <input
            type="checkbox"
            checked={
              Array.from(this.props.scores.values())[cellProps.rowIndex]
                .isInGame || false
            }
            onChange={this.onToggleParticipation(
              Array.from(this.props.scores.values())[cellProps.rowIndex].id
            )}
          />
        ) : (
          "-"
        )}
      </Cell>
    );
  };

  private cellRoundWinnerMapping = (cellProps: ColumnCellProps) => {
    return (
      <Cell className={`tt-round-winner-${cellProps.rowIndex}`}>
        {this.props.scores.size > 0 ? (
          <input
            type="checkbox"
            checked={
              Array.from(this.props.scores.values())[cellProps.rowIndex]
                .isWinner || false
            }
            onChange={this.onToggleVictory(
              Array.from(this.props.scores.values())[cellProps.rowIndex].id
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
