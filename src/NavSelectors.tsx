"use strict";

import * as React from "react";
import { ChangeEvent } from "react";
import Game from "./dataTypes/Game";
import Group from "./dataTypes/Group";

type Props = {
  games: Game[];
  groups: Group[];
  selectedGameId: number;
  selectedGroupId: number;
  onSelectedGroupChange(e: ChangeEvent<HTMLSelectElement>): void;
  onSelectedGameChange(e: ChangeEvent<HTMLSelectElement>): void;
};

class NavSelectors extends React.Component<Props> {
  public render() {
    return (
      <div>
        <select
          value={this.props.selectedGroupId}
          onChange={this.props.onSelectedGroupChange}
        >
          {this.props.groups.map(group => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
        </select>
        <select
          value={this.props.selectedGameId}
          onChange={this.props.onSelectedGameChange}
        >
          {this.props.games.map(game => (
            <option key={game.id} value={game.id}>
              {game.name}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

export default NavSelectors;
