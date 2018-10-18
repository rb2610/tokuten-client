import Tokuten from '../src/Tokuten';

import { expect } from "chai";

import * as React from 'react';

import { shallow } from "enzyme";

const wrapper = shallow(<Tokuten />);

describe("App", () => {
  it("renders without crashing", () => {
    expect(wrapper).to.have.lengthOf(1);
  });
});
