import axios from "axios";
import { Cell, Column, Table } from "fixed-data-table-2";
import * as React from "react";

require("fixed-data-table-2/dist/fixed-data-table.min.css");
require("./styles/TestTable.css");

interface ITestScore {
  id: number;
  name: string;
  wins: number;
}

interface IState {
  data: ITestScore[];
}

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3001";

class TestTable extends React.Component<any, IState> {
  public state = {
    data: Array<ITestScore>()
  };

  constructor(props: any) {
    super(props);
  }

  public componentDidMount() {
    axios.get(`${apiUrl}/api/scoreData`).then(response => {
      const responseData: ITestScore[] = response.data.data;
      if(responseData) {
        this.setState({ data: responseData });
      }
    });
  }

  public render() {
    const headerHeight = 50;
    const rowHeight = 50;
    const rowsCount = this.state.data.length;

    return (
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
      </Table>
    );
  }

  private cellNameMapping = (props: any) => {
    // const row = this.state.data[props.rowIndex];
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
}

export default TestTable;
