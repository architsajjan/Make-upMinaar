import React from "react";
import { render, unmountComponentAtNode } from "react-dom";

import Pagination from '../../additionals/Pagination';

it("runs without crash", () => {
  const div = document.createElement("div");
  render(<Pagination page={1} callback={()=>{}} />, div);
  unmountComponentAtNode(div);
});