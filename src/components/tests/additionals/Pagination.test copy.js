import React from "react";
import { render, unmountComponentAtNode } from "react-dom";

import ProductCard from '../../additionals/ProductCard';

it("runs without crash", () => {
  const div = document.createElement("div");
  render(<ProductCard item={[]} />, div);
  unmountComponentAtNode(div);
});