import React from "react";
import { render, unmountComponentAtNode } from "react-dom";

import Loading from '../../additionals/Loading';

it("runs without crash", () => {
  const div = document.createElement("div");
  render(<Loading loadLocalData={()=>{}} />, div);
  unmountComponentAtNode(div);
});