"use strict";

import axios from "axios";
import * as React from "react";
import Score from "./dataTypes/Score";
import { apiUrl } from "./util/Constants";

type Props = {
  scores: Map<number, Score>;
  selectedGameId: number;
  selectedGroupId: number;
  newRoundCallback(): void;
};

type State = {};

class NewRoundForm extends React.Component<Props, State> {
  public render() {
    return (
      <input
        id="new-round-submit"
        type="button"
        value="Add Round"
        onClick={this.onNewRoundSubmit}
      />
    );
  }

  private onNewRoundSubmit = (event: any) => {
    event.preventDefault();
    axios
      .post(
        `${apiUrl}/rounds?groupId=${this.props.selectedGroupId}&gameId=${
          this.props.selectedGameId
        }`,
        {
          participants: Array.from(this.props.scores.values())
            .filter(player => player.isInGame)
            .map(participant => ({
              id: participant.id,
              is_winner: participant.isWinner || false // TODO: Make server tolerant
            }))
        }
      )
      .then(() => {
        this.props.newRoundCallback();
      });
  };
}

export default NewRoundForm;
