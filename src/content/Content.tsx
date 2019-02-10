"use strict";

import axios from "axios";
import * as React from "react";
import { ChangeEvent } from "react";
import ContainerDimensions from "react-container-dimensions";
import { RouteComponentProps } from "react-router";
import Game from "../dataTypes/Game";
import Group from "../dataTypes/Group";
import Score from "../dataTypes/Score";
import NewGameForm from "../forms/NewGameForm";
import NewGroupForm from "../forms/NewGroupForm";
import NewPlayerForm from "../forms/NewPlayerForm";
import NewRoundForm from "../forms/NewRoundForm";
import NavSelectors from "../navigation/NavSelectors";
import { apiUrl } from "../util/Constants";
import ScoreTable from "./ScoreTable";

type State = {
  games: Game[];
  groups: Group[];
  persistPlayers: boolean;
  scores: Map<number, Score>;
  selectedGameId: number;
  selectedGroupId: number;
};

class Content extends React.Component<RouteComponentProps<any>, State> {
  public state = {
    games: Array<Game>(),
    groups: Array<Group>(),
    persistPlayers: false,
    scores: new Map<number, Score>(),
    selectedGameId: Number.parseInt(this.getUrlParams().get("game") || "1", 10),
    selectedGroupId: Number.parseInt(
      this.getUrlParams().get("group") || "1",
      10
    )
  };

  public componentDidMount() {
    this.loadGames();
    this.loadGroups();
    this.loadScores();
  }

  public componentDidUpdate() {
    const game: number = Number.parseInt(
      this.getUrlParams().get("game") || "1",
      10
    );

    if (this.state.selectedGameId !== game) {
      this.setState({ selectedGameId: game }, this.loadScores);
    }

    const group: number = Number.parseInt(
      this.getUrlParams().get("group") || "1",
      10
    );

    if (this.state.selectedGroupId !== group) {
      this.setState({ selectedGroupId: group }, this.loadScores);
    }
  }

  public render() {
    return (
      <div>
        <p className="main-intro">Scores and stuff.</p>
        <div
          style={{
            display: "flex",
            flexFlow: "column",
            height: "100%",
            width: "100%"
          }}
        >
          <div style={{ flex: "1 1 auto" }}>
            <ContainerDimensions>
              {({ height, width }) => (
                <div>
                  <NavSelectors
                    games={this.state.games}
                    groups={this.state.groups}
                    selectedGameId={this.state.selectedGameId}
                    selectedGroupId={this.state.selectedGroupId}
                    onSelectedGameChange={this.onSelectedGameChange}
                    onSelectedGroupChange={this.onSelectedGroupChange}
                  />
                  <NewPlayerForm
                    newPlayerCallback={this.loadScores}
                    selectedGameId={this.state.selectedGameId}
                    selectedGroupId={this.state.selectedGroupId}
                  />
                  <NewGameForm newGameCallback={this.loadGames} />
                  <NewGroupForm newGroupCallback={this.loadGroups} />
                  <NewRoundForm
                    newRoundCallback={this.loadScores}
                    persistPlayers={this.state.persistPlayers}
                    changePersistPlayersCallback={
                      this.changePersistPlayersCallback
                    }
                    selectedGameId={this.state.selectedGameId}
                    selectedGroupId={this.state.selectedGroupId}
                    scores={this.state.scores}
                  />
                  <ScoreTable
                    height={height}
                    width={width}
                    scores={this.state.scores}
                    selectedGameId={this.state.selectedGameId}
                    selectedGroupId={this.state.selectedGroupId}
                  />
                </div>
              )}
            </ContainerDimensions>
          </div>
        </div>
      </div>
    );
  }

  private loadScores = () => {
    axios
      .get(
        `${apiUrl}/scores/group/${this.state.selectedGroupId}/game/${
          this.state.selectedGameId
        }`,
        { withCredentials: true }
      )
      .then(response => {
        let responseData: Map<number, Score>;
        if (this.state.persistPlayers && this.state.scores.size > 0) {
          const playersInGame: number[] = this.playersInGame(this.state.scores);

          responseData = new Map(
            response.data.data
              .sort(this.sortByWinRatio)
              .map(
                (row: Score) =>
                  [
                    row.id,
                    { ...row, isInGame: playersInGame.includes(row.id) }
                  ] as [number, Score]
              )
          );
        } else {
          responseData = new Map(
            response.data.data
              .sort(this.sortByWinRatio)
              .map((row: Score) => [row.id, row])
          );
        }

        if (responseData) {
          this.setState({
            scores: responseData
          });
        }
      });
  };

  private playersInGame(scores: Map<number, Score>): number[] {
    return [...scores]
      .filter((score: [number, Score]) => score[1].isInGame)
      .map((score: [number, Score]) => score[0]);
  }

  private sortByWinRatio = (row1: Score, row2: Score) =>
    (row2.wins / row2.played || -Number.MAX_SAFE_INTEGER) -
    (row1.wins / row1.played || -Number.MAX_SAFE_INTEGER);

  private loadGames = () => {
    axios.get(`${apiUrl}/games`, { withCredentials: true }).then(response => {
      const responseData: Game[] = response.data.data;

      if (responseData) {
        this.setState({ games: responseData });
      }
    })
  };

  private loadGroups = () => {
    axios.get(`${apiUrl}/groups`, { withCredentials: true }).then(response => {
      const responseData: Group[] = response.data.data;

      if (responseData) {
        this.setState({
          groups: responseData
        });
      }
    });
  };

  private onSelectedGameChange = (event: ChangeEvent<HTMLSelectElement>) => {
    if (event.target) {
      const values = this.getUrlParams();
      values.set("game", event.target.value);
      this.props.history.push({ search: values.toString() });
    }
  };

  private onSelectedGroupChange = (event: ChangeEvent<HTMLSelectElement>) => {
    if (event.target) {
      const values = this.getUrlParams();
      values.set("group", event.target.value);
      this.props.history.push({ search: values.toString() });
    }
  };

  private changePersistPlayersCallback = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    this.setState({ persistPlayers: event.target.checked });
  };

  private getUrlParams(): URLSearchParams {
    if (!this.props.location.search) {
      return new URLSearchParams();
    }
    return new URLSearchParams(this.props.location.search);
  }
}

export default Content;
