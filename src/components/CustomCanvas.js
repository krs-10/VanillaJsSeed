import { getFragmentFromString } from "../utility";

import { Observable, Subject } from "rxjs";
import { attribute } from "postcss-selector-parser";

// one day...
// class Beer extends HTMLCanvasElement {

class CustomCanvas extends HTMLElement {
  c = "brown";
  l = "purple";
  b = "green";
  static get observedAttributes() {
    return ["c", "l", "b"];
  }
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" }),
      canvas = document.createElement("canvas"),
      style = document.createElement("style");
    let gl = canvas.getContext("webgl");
    gl.enable(gl.BLEND);
    style.innerHTML = `{width:2em;height:2em;display:block;background:green;cursor:pointer;}`;

    const customElStyle =
      "width:20rem;height:20rem;display:block;background:red";

    this.style = customElStyle;

    shadow.appendChild(style);
    shadow.appendChild(canvas);
    this.src = this.hasAttribute("src")
      ? this.getAttribute("src")
      : `./../assets/images/paprika.jpg`;
    this.imageFragment = getFragmentFromString(`<img />`);
    this.shadow = shadow;
    this.canvas = canvas;
    this.onclick = e => this.handleClick(e);
  }
  async handleLoadFont(e){
    // let fontUrlFragment = `<link as="font" />`;
    // let fontUrl = "../assets/fonts/HelveticaNeueMedium.woff"; 
  }
  async handleClick(e) {
    console.log('clicked -  e: ', e);
  }
}

export default CustomCanvas;
