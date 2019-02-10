"use strict";

import axios from "axios";
import React, { ChangeEvent, Component } from "react";
import { apiUrl } from "../util/Constants";

type Props = {
  newGroupCallback(): void;
};

type State = {
  formName: string;
};

class NewGroupForm extends Component<Props, State> {
  public state = {
    formName: ""
  };

  public render() {
    return (
      <form onSubmit={this.onNewGroupSubmit}>
        <input
          id="new-group-name-field"
          type="text"
          value={this.state.formName}
          placeholder="Group Name"
          onChange={this.onNameChange}
        />
        <input id="new-group-submit" type="submit" value="Add Group" />
      </form>
    );
  }

  private onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target) {
      this.setState({ formName: event.target.value });
    }
  };

  private onNewGroupSubmit = (event: any) => {
    event.preventDefault();
    axios
      .post(
        `${apiUrl}/groups`,
        { name: this.state.formName },
        { withCredentials: true }
      )
      .then(() => {
        this.setState({ formName: "" });
        this.props.newGroupCallback();
      });
  };
}

export default NewGroupForm;
