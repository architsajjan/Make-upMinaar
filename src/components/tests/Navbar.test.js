import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { BrowserRouter } from "react-router-dom";

import Navbar from '../Navbar';

it("runs without crash", () => {
  const div = document.createElement("div");
  render(<BrowserRouter><Navbar action={()=>{}} /></BrowserRouter>, div);
  unmountComponentAtNode(div);
});