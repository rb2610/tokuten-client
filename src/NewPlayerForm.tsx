"use strict";

import axios from "axios";
import * as React from "react";
import { ChangeEvent } from "react";
import { apiUrl } from "./util/Constants";

type Props = {
  selectedGameId: number;
  selectedGroupId: number;
  newPlayerCallback(): void;
};

type State = {
  formName: string;
}

class NewPlayerForm extends React.Component<Props, State> {
  public state = {
    formName: ""
  };

  public render() {
    return (
      <form onSubmit={this.onNewPlayerSubmit}>
        <input
          id="new-player-name-field"
          type="text"
          value={this.state.formName}
          placeholder="Player Name"
          onChange={this.onNameChange}
        />
        <input id="new-player-submit" type="submit" value="Add Player" />
      </form>
    );
  }

  private onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target) {
      this.setState({ formName: event.target.value });
    }
  };

  private onNewPlayerSubmit = (event: any) => {
    event.preventDefault();
    axios
      .post(
        `${apiUrl}/players?groupId=${this.props.selectedGroupId}&gameId=${
          this.props.selectedGameId
        }`,
        {
          name: this.state.formName
        }
      )
      .then(() => {
        this.setState({ formName: "" });
        this.props.newPlayerCallback();
      });
  };
}

export default NewPlayerForm;
