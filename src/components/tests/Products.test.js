import React from "react";
import { render, unmountComponentAtNode } from "react-dom";

import Products from '../Products';

it("runs without crash", () => {
  const div = document.createElement("div");
  render(<Products products={[]} searchString={""} brands={[]} tags={[]}/> , div);
  unmountComponentAtNode(div);
});