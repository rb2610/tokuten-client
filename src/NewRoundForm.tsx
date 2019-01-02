"use strict";

import axios from "axios";
import * as React from "react";
import { ChangeEvent } from "react";
import Score from "./dataTypes/Score";
import { apiUrl } from "./util/Constants";

type Props = {
  persistPlayers: boolean
  scores: Map<number, Score>;
  selectedGameId: number;
  selectedGroupId: number;
  changePersistPlayersCallback(event: ChangeEvent<HTMLInputElement>): void;
  newRoundCallback(): void;
};

type State = {};

class NewRoundForm extends React.Component<Props, State> {
  public render() {
    return (
      <div>
        <input
          id="new-round-submit"
          type="button"
          value="Add Round"
          onClick={this.onNewRoundSubmit}
        />
        <label htmlFor="new-round-maintain-players-check">Keep players?</label>
        <input
          id="new-round-maintain-players-check"
          type="checkbox"
          checked={this.props.persistPlayers}
          onChange={this.props.changePersistPlayersCallback}
        />
      </div>
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
