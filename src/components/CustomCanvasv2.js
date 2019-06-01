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
    console.log("CustomCanvas.js -  this.imageFragment: ", this.imageFragment);
    this.gl = gl;

    this.shadow = shadow;
    this.canvas = canvas;
    this.onclick = e => this.handleClick(e);
  }
  async handleClick(e) {
    this.imageResponse = await this.readImage();
    console.log("CustomCanvas.js -  this.imageResponse: ", this.imageResponse);
    this.loadImage();
    // this.loadImage();
  }
  async initiateCanvas() {
    let gl = this.gl;
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
  }
  loadImage() {
    // let { contentType, value } = this.imageResponse;
    // let blob = new Blob(value, { type: contentType });
    // console.log("CustomCanvas.js -  blob: ", blob);
    // let url = window.URL.createObjectURL(blob);
    // console.log('CustomCanvas.js -  url: ', url);
    // let frag = getFragmentFromString(
    //   `<img src=${url} />`
    // );
    let frag = getFragmentFromString(`<img src=${this.src} />`);
    window.frag = frag;
    this.shadow.appendChild(frag);
    console.log('CustomCanvas.js -  this.shadow: ', this.shadow);
    // frag.onload = (e) => {
    //   console.log('CustomCanvas.js -  e: ', e);
    // }
  }
  async readImage() {
    try {
      const imageResponse = await fetch(this.src, { mode: "cors" });
      const reader = imageResponse.body.getReader();

      const contentLength = +imageResponse.headers.get("Content-Length"),
        contentType = imageResponse.headers.get("Content-Type");
      console.log("CustomCanvas.js -  contentType: ", contentType);
      console.log("CustomCanvas.js -  contentLength: ", contentLength);
      let result = await reader.read(),
        value,
        total = 0;

      while (!result.done) {
        const resultValue = result.value;
        value = result.value;
        total += resultValue.length;
        console.log(
          `${Math.floor((1 - resultValue.length / total) * 100)}% done...`
        );
        // get the next result
        result = await reader.read();
      }
      console.log("done reading");
      return { contentType, result, total, value };
    } catch (error) {
      console.log("something went wrong.");
      return { error };
    }
  }
  drawGlImage(gl) {}
}

export default CustomCanvas;
