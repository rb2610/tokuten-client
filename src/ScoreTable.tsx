import axios from "axios";
import { Cell, Column, Table } from "fixed-data-table-2";
import * as React from "react";

require("fixed-data-table-2/dist/fixed-data-table.min.css");
require("./styles/TestTable.css");

interface ITestScore {
  id: number;
  name: string;
  wins: number;
  played: number;
}

interface IState {
  data: ITestScore[];
  formGame: string;
  formGroup: string;
  formName: string;
  formPlayed: number;
  formWins: number;
}

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3001";

class ScoreTable extends React.Component<any, IState> {
  public state = {
    data: Array<ITestScore>(),
    formGame: "",
    formGroup: "",
    formName: "",
    formPlayed: 0,
    formWins: 0
  };

  constructor(props: any) {
    super(props);
  }

  public componentDidMount() {
    this.getData();
  }

  public render() {
    const headerHeight = 50;
    const rowHeight = 50;
    const rowsCount = this.state.data.length;

    return (
      <div>
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
        </Table>
      </div>
    );
  }

  private getData() {
    axios.get(`${apiUrl}/scoreTable/group/1/game/1`).then(response => {
      const responseData: ITestScore[] = response.data.data;

      if (responseData) {
        this.setState({ data: responseData });
      }
    });
  }

  private handleNameChange(event: any, context: ScoreTable) {
    if (event.target) {
      context.setState({ formName: event.target.value });
    }
  }

  private onNameChange(context: ScoreTable) {
    return (event: any) => this.handleNameChange(event, context);
  }

  private handleGameChange(event: any, context: ScoreTable) {
    if (event.target) {
      context.setState({ formGame: event.target.value });
    }
  }

  private onGameChange(context: ScoreTable) {
    return (event: any) => this.handleGameChange(event, context);
  }

  private handleGroupChange(event: any, context: ScoreTable) {
    if (event.target) {
      context.setState({ formGroup: event.target.value });
    }
  }

  private onGroupChange(context: ScoreTable) {
    return (event: any) => this.handleGroupChange(event, context);
  }

  private handleNewPlayerSubmit(event: any, context: ScoreTable) {
    event.preventDefault();
    axios
      .post(`${apiUrl}/player?groupId=1&gameId=1`, {
        name: this.state.formName
      })
      .then(() => {
        this.setState({ formName: "" });
        this.getData();
      });
  }

  private onNewPlayerSubmit(context: ScoreTable) {
    return (event: any) => this.handleNewPlayerSubmit(event, context);
  }

  private handleNewGameSubmit(event: any, context: ScoreTable) {
    event.preventDefault();
    axios
      .post(`${apiUrl}/game`, {
        name: this.state.formGame
      })
      .then(() => {
        this.setState({ formGame: "" });
        this.getData();
      });
  }

  private onNewGameSubmit(context: ScoreTable) {
    return (event: any) => this.handleNewGameSubmit(event, context);
  }

  private handleNewGroupSubmit(event: any, context: ScoreTable) {
    event.preventDefault();
    axios
      .post(`${apiUrl}/group`, {
        name: this.state.formGroup
      })
      .then(() => {
        this.setState({ formGroup: "" });
        this.getData();
      });
  }

  private onNewGroupSubmit(context: ScoreTable) {
    return (event: any) => this.handleNewGroupSubmit(event, context);
  }

  private cellNameMapping = (props: any) => {
    return (
      <Cell className={`tt-name-${props.rowIndex}`}>
        {this.state.data.length > 0 ? this.state.data[props.rowIndex].name : ""}
      </Cell>
    );
  };

  private cellWinsMapping = (props: any) => {
    return (
      <Cell className={`tt-wins-${props.rowIndex}`}>
        {this.state.data.length > 0 ? this.state.data[props.rowIndex].wins : ""}
      </Cell>
    );
  };

  private cellPlayedMapping = (props: any) => {
    return (
      <Cell className={`tt-played-${props.rowIndex}`}>
        {this.state.data.length > 0
          ? this.state.data[props.rowIndex].played
          : ""}
      </Cell>
    );
  };

  // private cellRoundParticipantMapping = (props: any) => {
  //   return (
  //     <Cell className={`tt-round-participant-${props.rowIndex}`}>
  //       <input type="checkbox" checked={this.state.isParticipant} />
  //     </Cell>
  //   );
  // };
}

export default ScoreTable;
