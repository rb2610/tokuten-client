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
  formName: string;
  formPlayed: number;
  formWins: number;
}

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3001";

class TestTable extends React.Component<any, IState> {
  public state = {
    data: Array<ITestScore>(),
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
        {/* <form onSubmit={this.onNewGameSubmit(this)}>
          <input
            id="new-game-wins-field"
            type="text"
            value={this.state.formName}
            placeholder="Player Name"
            onChange={this.onNameChange(this)}
          />
          <input id="new-player-submit" type="submit" value="Add Player" />
        </form> */}
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

  private handleNameChange(event: any, context: TestTable) {
    if (event.target) {
      context.setState({ formName: event.target.value });
    }
  }

  private onNameChange(context: TestTable) {
    return (event: any) => this.handleNameChange(event, context);
  }

  private handleNewPlayerSubmit(event: any, context: TestTable) {
    event.preventDefault();
    axios
      .post(`${apiUrl}/player?groupId=1&gameId=1`, { name: this.state.formName })
      .then(() => {
        this.setState({ formName: "" });
        this.getData();
      });
  }

  private onNewPlayerSubmit(context: TestTable) {
    return (event: any) => this.handleNewPlayerSubmit(event, context);
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
}

export default TestTable;
