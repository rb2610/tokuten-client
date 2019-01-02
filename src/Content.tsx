"use strict";

import axios from "axios";
import * as React from "react";
import { ChangeEvent } from "react";
import ContainerDimensions from "react-container-dimensions";
import Game from "./dataTypes/Game";
import Group from "./dataTypes/Group";
import Score from "./dataTypes/Score";
import NavSelectors from "./NavSelectors";
import NewGameForm from "./NewGameForm";
import NewGroupForm from "./NewGroupForm";
import NewPlayerForm from "./NewPlayerForm";
import NewRoundForm from "./NewRoundForm";
import ScoreTable from "./ScoreTable";
import { apiUrl } from "./util/Constants";

type Props = {};

type State = {
  games: Game[];
  groups: Group[];
  persistPlayers: boolean;
  scores: Map<number, Score>;
  selectedGameId: number;
  selectedGroupId: number;
};

class Content extends React.Component<Props, State> {
  public state = {
    games: Array<Game>(),
    groups: Array<Group>(),
    persistPlayers: false,
    scores: new Map<number, Score>(),
    selectedGameId: 1,
    selectedGroupId: 1
  };

  public componentDidMount() {
    this.loadGames();
    this.loadGroups();
    this.loadScores();
  }

  public render() {
    return (
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
    );
  }

  private loadScores = () => {
    axios
      .get(
        `${apiUrl}/scores/group/${this.state.selectedGroupId}/game/${
          this.state.selectedGameId
        }`
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
    axios.get(`${apiUrl}/games`).then(response => {
      const responseData: Game[] = response.data.data;

      if (responseData) {
        this.setState({ games: responseData });
      }
    });
  };

  private loadGroups = () => {
    axios.get(`${apiUrl}/groups`).then(response => {
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
      this.setState(
        {
          selectedGameId: Number.parseInt(event.target.value, 10)
        },
        this.loadScores
      );
    }
  };

  private onSelectedGroupChange = (event: ChangeEvent<HTMLSelectElement>) => {
    if (event.target) {
      this.setState(
        {
          selectedGroupId: Number.parseInt(event.target.value, 10)
        },
        this.loadScores
      );
    }
  };

  private changePersistPlayersCallback = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    this.setState({ persistPlayers: event.target.checked });
  };
}

export default Content;
