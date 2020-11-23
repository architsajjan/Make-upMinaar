// import React from "react";
// import { render, unmountComponentAtNode } from "react-dom";
// import { act } from "react-dom/test-utils";

// import App from './App';

// let container = null;
// beforeEach(() => {
//   // setup a DOM element as a render target
//   container = document.createElement("div");
//   document.body.appendChild(container);
// });

// afterEach(() => {
//   // cleanup on exiting
//   unmountComponentAtNode(container);
//   container.remove();
//   container = null;
// });

// it("is a fake test", () => {
//   act(() => {
//     render(<App />, container);
//   });
//   expect("truth").toBe("truth");

//   // act(() => {
//   //   render(<Hello name="Jenny" />, container);
//   // });
//   // expect(container.textContent).toBe("Hello, Jenny!");

//   // act(() => {
//   //   render(<Hello name="Margaret" />, container);
//   // });
//   // expect(container.textContent).toBe("Hello, Margaret!");
// });