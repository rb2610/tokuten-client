"use strict";

import * as React from "react";
import { SFC } from "react";
import { ChangeEvent } from "react";
import Game from "./dataTypes/Game";
import Group from "./dataTypes/Group";

type Props = {
  games: Game[];
  groups: Group[];
  selectedGameId: number;
  selectedGroupId: number;
  onSelectedGroupChange(event: ChangeEvent<HTMLSelectElement>): void;
  onSelectedGameChange(event: ChangeEvent<HTMLSelectElement>): void;
};

const NavSelectors: SFC<Props> = props => {
  return (
    <div>
      <select
        value={props.selectedGroupId}
        onChange={props.onSelectedGroupChange}
      >
        {props.groups.map(group => (
          <option key={group.id} value={group.id}>
            {group.name}
          </option>
        ))}
      </select>
      <select
        value={props.selectedGameId}
        onChange={props.onSelectedGameChange}
      >
        {props.games.map(game => (
          <option key={game.id} value={game.id}>
            {game.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default NavSelectors;
