import React from "react";
import { render, unmountComponentAtNode } from "react-dom";

import SearchBar from '../SearchBar';

it("runs without crash", () => {
  const div = document.createElement("div");
  render(<SearchBar 
          searchItem={()=>{}} 
          handleChange={()=>{}}
          autocompleteCallback = {()=>{}} 
          names={[]}
          brands={[]}
          categories={[]}
          types={[]}
          tags={[]}
        />
        , div);
  unmountComponentAtNode(div);
});