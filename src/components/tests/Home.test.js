import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { BrowserRouter } from "react-router-dom";

import Home from '../Home';

it("runs without crash", () => {
  const div = document.createElement("div");
  render(<BrowserRouter><Home /></BrowserRouter>, div);
  unmountComponentAtNode(div);
});