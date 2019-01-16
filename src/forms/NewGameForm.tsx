"use strict";

import axios from "axios";
import * as React from "react";
import { ChangeEvent } from "react";
import { apiUrl } from "../util/Constants";

type Props = {
  newGameCallback(): void;
};

type State = {
  formName: string;
};

class NewGameForm extends React.Component<Props, State> {
  public state = {
    formName: ""
  };

  public render() {
    return (
      <form onSubmit={this.onNewGameSubmit}>
        <input
          id="new-game-name-field"
          type="text"
          value={this.state.formName}
          placeholder="Game Name"
          onChange={this.onNameChange}
        />
        <input id="new-game-submit" type="submit" value="Add Game" />
      </form>
    );
  }

  private onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target) {
      this.setState({ formName: event.target.value });
    }
  };

  private onNewGameSubmit = (event: any) => {
    event.preventDefault();
    axios
      .post(`${apiUrl}/games`, {
        name: this.state.formName
      })
      .then(() => {
        this.setState({ formName: "" });
        this.props.newGameCallback();
      });
  };
}

export default NewGameForm;
