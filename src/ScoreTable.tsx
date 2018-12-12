"use strict";

import axios from "axios";
import { Cell, Column, Table } from "fixed-data-table-2";
import * as React from "react";
import Game from "./dataTypes/Game";
import Group from "./dataTypes/Group";
import Score from "./dataTypes/Score";
import NavSelectors from "./NavSelectors";

require("fixed-data-table-2/dist/fixed-data-table.min.css");
require("./styles/TestTable.css");

type State = {
  data: Map<number, Score>;
  formGame: string;
  formGroup: string;
  formName: string;
  formPlayed: number;
  formWins: number;
  games: Game[];
  groups: Group[];
  selectedGameId: number;
  selectedGroupId: number;
};

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3001";

class ScoreTable extends React.Component<any, State> {
  public state = {
    data: new Map<number, Score>(),
    formGame: "",
    formGroup: "",
    formName: "",
    formPlayed: 0,
    formWins: 0,
    games: Array<Game>(),
    groups: Array<Group>(),
    selectedGameId: 1,
    selectedGroupId: 1
  };

  constructor(props: any) {
    super(props);
  }

  public componentDidMount() {
    this.loadScores();
    this.loadGames();
    this.loadGroups();
  }

  public render() {
    const headerHeight = 50;
    const rowHeight = 50;
    const rowsCount = this.state.data.size;

    return (
      <div>
        <NavSelectors
          games={this.state.games}
          groups={this.state.groups}
          selectedGameId={this.state.selectedGameId}
          selectedGroupId={this.state.selectedGroupId}
          onSelectedGameChange={this.onSelectedGameChange(this)}
          onSelectedGroupChange={this.onSelectedGroupChange(this)}
        />
        <form onSubmit={this.onNewPlayerSubmit(this)}>
          <input
            id="new-player-name-field"
            type="text"
            value={this.state.formName}
            placeholder="Player Name"
            onChange={this.onNameChange(this)}
          />
          <input id="new-player-submit" type="submit" value="Add Player" />
        </form>
        <form onSubmit={this.onNewGameSubmit(this)}>
          <input
            id="new-game-name-field"
            type="text"
            value={this.state.formGame}
            placeholder="Game Name"
            onChange={this.onGameChange(this)}
          />
          <input id="new-game-submit" type="submit" value="Add Game" />
        </form>
        <form onSubmit={this.onNewGroupSubmit(this)}>
          <input
            id="new-group-name-field"
            type="text"
            value={this.state.formGroup}
            placeholder="Group Name"
            onChange={this.onGroupChange(this)}
          />
          <input id="new-group-submit" type="submit" value="Add Group" />
        </form>
        <input
          id="new-round-submit"
          type="button"
          value="Add Round"
          onClick={this.onNewRoundSubmit}
        />
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

  private loadScores() {
    axios
      .get(
        `${apiUrl}/scores/group/${this.state.selectedGroupId}/game/${
          this.state.selectedGameId
        }`
      )
      .then(response => {
        const responseData: Map<number, Score> = new Map(
          response.data.data
            .sort(
              (row1: Score, row2: Score) =>
                (row2.wins / row2.played || -Number.MAX_SAFE_INTEGER) -
                (row1.wins / row1.played || -Number.MAX_SAFE_INTEGER)
            )
            .map((row: Score) => [row.id, row])
        );

        if (responseData) {
          this.setState({
            data: responseData
          });
        }
      });
  }

  private loadGames() {
    axios.get(`${apiUrl}/games`).then(response => {
      const responseData: Game[] = response.data.data;

      if (responseData) {
        this.setState({ games: responseData });
      }
    });
  }

  private loadGroups() {
    axios.get(`${apiUrl}/groups`).then(response => {
      const responseData: Group[] = response.data.data;

      if (responseData) {
        this.setState({ groups: responseData });
      }
    });
  }

  private handleSelectedGameChange(event: any, context: ScoreTable) {
    if (event.target) {
      context.setState(
        { selectedGameId: event.target.value },
        context.loadScores
      );
    }
  }

  private onSelectedGameChange(context: ScoreTable) {
    return (event: any) => this.handleSelectedGameChange(event, context);
  }

  private handleSelectedGroupChange(event: any, context: ScoreTable) {
    if (event.target) {
      context.setState(
        { selectedGroupId: event.target.value },
        context.loadScores
      );
    }
  }

  private onSelectedGroupChange(context: ScoreTable) {
    return (event: any) => this.handleSelectedGroupChange(event, context);
  }

  private handleNameChange(event: any, context: ScoreTable) {
    if (event.target) {
      context.setState({ formName: event.target.value });
    }
  }

  private onNameChange(context: ScoreTable) {
    return (event: any) => this.handleNameChange(event, context);
  }

  private handleNewGameNameChange(event: any, context: ScoreTable) {
    if (event.target) {
      context.setState({ formGame: event.target.value });
    }
  }

  private onGameChange(context: ScoreTable) {
    return (event: any) => this.handleNewGameNameChange(event, context);
  }

  private handleNewGroupNameChange(event: any, context: ScoreTable) {
    if (event.target) {
      context.setState({ formGroup: event.target.value });
    }
  }

  private onGroupChange(context: ScoreTable) {
    return (event: any) => this.handleNewGroupNameChange(event, context);
  }

  private handleNewPlayerSubmit(event: any, context: ScoreTable) {
    event.preventDefault();
    axios
      .post(
        `${apiUrl}/players?groupId=${this.state.selectedGroupId}&gameId=${
          this.state.selectedGameId
        }`,
        {
          name: this.state.formName
        }
      )
      .then(() => {
        this.setState({ formName: "" });
        this.loadScores();
      });
  }

  private onNewPlayerSubmit(context: ScoreTable) {
    return (event: any) => this.handleNewPlayerSubmit(event, context);
  }

  private handleNewGameSubmit(event: any, context: ScoreTable) {
    event.preventDefault();
    axios
      .post(`${apiUrl}/games`, {
        name: this.state.formGame
      })
      .then(() => {
        this.setState({ formGame: "" });
        this.loadGames();
      });
  }

  private onNewGameSubmit(context: ScoreTable) {
    return (event: any) => this.handleNewGameSubmit(event, context);
  }

  private handleNewGroupSubmit(event: any, context: ScoreTable) {
    event.preventDefault();
    axios
      .post(`${apiUrl}/groups`, {
        name: this.state.formGroup
      })
      .then(() => {
        this.setState({ formGroup: "" });
        this.loadGroups();
      });
  }

  private onNewGroupSubmit(context: ScoreTable) {
    return (event: any) => this.handleNewGroupSubmit(event, context);
  }

  private onNewRoundSubmit = (event: any) => {
    event.preventDefault();
    axios
      .post(
        `${apiUrl}/rounds?groupId=${this.state.selectedGroupId}&gameId=${
          this.state.selectedGameId
        }`,
        {
          participants: Array.from(this.state.data.values())
            .filter(player => player.isInGame)
            .map(participant => ({
              id: participant.id,
              is_winner: participant.isWinner || false // TODO: Make server tolerant
            }))
        }
      )
      .then(() => {
        // this.setState({ formGroup: "" });
        this.loadScores();
      });
  };

  private onToggleParticipation = (playerId: number) => (event: any) => {
    const row: Score | undefined = this.state.data.get(playerId);

    if (row === undefined) {
      return;
    }

    row.isInGame = event.target.checked;

    this.setState({
      data: this.state.data.set(playerId, row)
    });
  };

  private onToggleVictory = (playerId: number) => (event: any) => {
    const row: Score | undefined = this.state.data.get(playerId);

    if (row === undefined) {
      return;
    }

    row.isWinner = event.target.checked;

    this.setState({
      data: this.state.data.set(playerId, row)
    });
  };

  private cellNameMapping = (props: any) => {
    return (
      <Cell className={`tt-name-${props.rowIndex}`}>
        {this.state.data.size > 0
          ? Array.from(this.state.data.values())[props.rowIndex].name
          : "-"}
      </Cell>
    );
  };

  private cellWinsMapping = (props: any) => {
    return (
      <Cell className={`tt-wins-${props.rowIndex}`}>
        {this.state.data.size > 0
          ? Array.from(this.state.data.values())[props.rowIndex].wins
          : "-"}
      </Cell>
    );
  };

  private cellPlayedMapping = (props: any) => {
    return (
      <Cell className={`tt-played-${props.rowIndex}`}>
        {this.state.data.size > 0
          ? Array.from(this.state.data.values())[props.rowIndex].played
          : "-"}
      </Cell>
    );
  };

  private cellWinRatioMapping = (props: any) => {
    return (
      <Cell className={`tt-win-ratio-${props.rowIndex}`}>
        {this.state.data.size > 0 &&
        Array.from(this.state.data.values())[props.rowIndex].played > 0
          ? `${(Array.from(this.state.data.values())[props.rowIndex].wins /
              Array.from(this.state.data.values())[props.rowIndex].played) *
              100}%`
          : "-"}
      </Cell>
    );
  };

  private cellRoundParticipantMapping = (props: any) => {
    return (
      <Cell className={`tt-round-participant-${props.rowIndex}`}>
        {this.state.data.size > 0 ? (
          <input
            type="checkbox"
            checked={
              Array.from(this.state.data.values())[props.rowIndex].isInGame ||
              false
            }
            onChange={this.onToggleParticipation(
              Array.from(this.state.data.values())[props.rowIndex].id
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
        {this.state.data.size > 0 ? (
          <input
            type="checkbox"
            checked={
              Array.from(this.state.data.values())[props.rowIndex].isWinner ||
              false
            }
            onChange={this.onToggleVictory(
              Array.from(this.state.data.values())[props.rowIndex].id
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
