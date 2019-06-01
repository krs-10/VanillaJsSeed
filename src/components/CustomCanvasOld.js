import { getFragmentFromString } from "../utility";

import { Observable, Subject } from 'rxjs';

// one day...
// class Beer extends HTMLCanvasElement {

class CustomCanvas extends HTMLElement {
  c = "brown";
  l = "purple"; 
  b = "green";
  static get observedAttributes() {
    return ["c", "l", "b"];
  }
  // static get api(){
  //   let api = `https://dog.ceo/api/breeds/image/random`;
  //   if (this.hasAttribute("api")) api = api;
  //   return api; 
  // }
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" }),
    canvas = document.createElement("canvas"),
    style = document.createElement("style");
    let ctx; 
	 
    style.innerHTML = `{width:2em;height:2em;display:block;background:green;cursor:pointer;}`;

    const customElStyle =
      "width:20rem;height:20rem;display:block;background:red";

    this.style = customElStyle;
    this.shadow = shadow;
    this.canvas = canvas; 
    shadow.appendChild(style);
    shadow.appendChild(canvas);
    this.api = this.hasAttribute("api") ? this.getAttribute("api") : `https://dog.ceo/api/breeds/image/random`;
    this.src = this.hasAttribute("img") ? this.getAttribute("api") : `./../assets/images/paprika.jpg`;
    // this.onclick = e => this.handleClick(e);
    this.onclick = e => this.generateImage(e)

  }
  handleBackgroundChange() {
    this.setAttribute("b", "orange");
    this.handleBackgroundChange()
    this.style.background = "orange";
  }
  async handleClick(e) {
    // const response = await this.callApi(); 
    // console.log('CustomCanvas.js -  response: ', response);
    const size = await this.getResponseSize();
    console.log('CustomCanvas.js -  size: ', size);
    let { chunks } = size; 
    window.chunks = chunks; 

    var test = new Blob([chunks.buffer], { type: "image/jpeg"}); 
    console.log('CustomCanvas.js -  test: ', test);
    window.test = test; 
  }
  async generateImage(){
    let foobar = await this.newImage();
    let bitmap = await createImageBitmap(foobar, 0, 0); 
    console.log('CustomCanvas.js -  foobar: ', foobar);
    console.log('CustomCanvas.js -  bitmap: ', bitmap);
  }
  async newImage(){
    let src = this.src; 
    // could also check if child element is an image?
     try {
       let response = await fetch(src, { mode: "cors"}); 
       let blobbo = await response.blob(); 
       console.log('CustomCanvas.js -  blobbo: ', blobbo);
       return blobbo; 
     }
     catch(error){
       console.log("whoops, something went wrong: ", error); 
       return error; 
     }
  }
  async getResponseSize() {
  const response = await fetch(this.api, { mode: "cors"});
  const reader = response.body.getReader();
  let result = await reader.read();
  let total = 0;
  let chunks;

  while (!result.done) {
    const value = result.value;
    total += value.length;
    console.log('Received chunk', value);
    chunks = value; 
    // get the next result
    result = await reader.read();
  }
  console.log('CustomCanvas.js -  result: ', result);
  return {total, result, chunks};
}

  async callApi() {
    try {
      const apiResponse = await fetch(this.api, { mode: "cors" }); 
      const reader = apiResponse.body.getReader(); 

      const contentLength = +apiResponse.headers.get('Content-Length');
      console.log('CustomCanvas.js -  contentLength: ', contentLength);
      let result = await reader.read(), 
        foobarValue,
      total = 0; 

      while (!result.done) {
        const value = result.value; 
        foobarValue = result.value; 
        total += value.length;
        console.log(`${total} out of ${value.length} read...`);
        // console.log('Received chunk', value);

        // get the next result
        result = await reader.read();
      }
      console.log("done reading")
      return "blegh";
      // return {total, value: foobarValue}; 
    } catch (error) {
      console.log("something went wrong.")
      return {error};
    }
  }
  async connectedCallback() {
    console.log("=================================");
    console.log("Canvas connected.");
  }
  disconnectedCallback() {
    console.log("=================================");
    console.log("Canvas disconnected.");
    // console.log("this :", this);
  }
  adoptedCallback() {
    console.log("=================================");
    console.log("Custom square element moved to new page.");
    console.log("this :", this);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log("=================================");
    console.log("Custom square element attributes changed.");
    console.log("this :", this);
    console.log("name, oldValue, newValue: ", name, oldValue, newValue);
  }
}

export default CustomCanvas;
