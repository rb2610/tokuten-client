import axios from "axios";
import { Cell, Column, Table } from "fixed-data-table-2";
import * as React from "react";
// import * as Dimensions from "react-dimensions";

require("node_modules/fixed-data-table-2/dist/fixed-data-table.min.css");
require("./styles/TestTable.css");

interface ITestScore {
  id: number;
  name: string;
  wins: number;
}

interface IState {
  data: ITestScore[];
}

class TestTable extends React.Component<any, IState> {
  public state = {
    data: Array<ITestScore>()
  };

  constructor(props : any) {
    super(props);
  }

  public componentDidMount() {
    axios.get("/api/scoreData").then(response => {
      const responseData: ITestScore[] = response.data.data;
      this.setState({ data: responseData });
    });
  }

  public render() {
    return (
      <div>
        <Table
          className={"test-table"}
          rowHeight={50}
          headerHeight={50}
          rowsCount={2}
          width={/* this.props.containerWidth */ 640}
          height={/* this.props.containerHeight */ 640}
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
      </div>
    );
  }

  private cellNameMapping = (props : any) => {
    // const row = this.state.data[props.rowIndex];
    return (
      <Cell className={`tt-name-${props.rowIndex}`}>
        {this.state.data.length > 0 ? this.state.data[props.rowIndex].name : ""}
      </Cell>
    );
  };

  private cellWinsMapping = (props : any) => {
    return (
      <Cell className={`tt-wins-${props.rowIndex}`}>
        {this.state.data.length > 0 ? this.state.data[props.rowIndex].wins : ""}
      </Cell>
    );
  };
}

export default TestTable;

// export default Dimensions({
//   getHeight: (element) => {
//     return window.innerHeight - 200;
//   },
//   getWidth: (element) => {
//     const widthOffset = window.innerWidth < 680 ? 0 : 240;
//     return window.innerWidth - widthOffset;
//   }
// })(TestTable)
