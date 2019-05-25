import { getFragmentFromString } from "../utility";

class DumbBeer extends HTMLElement {
  static get observedAttributes() {
    return ["c", "l", "b"];
  }

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" }),
    div = document.createElement("div"),
	 style = document.createElement("style");
	 
    style.innerHTML = `.square {width:2em;height:2em;display:block;background:green;cursor:pointer;}`;

    const customElStyle =
      "width:20rem;height:20rem;display:block;background:red";

    this.style = customElStyle;
    this.shadow = shadow;
    shadow.appendChild(style);
	  shadow.appendChild(div);
	
    this.classList.add("square");
    this.endpoint = "https://api.punkapi.com/v2/beers/random";
    this.onclick = e => this.handleClick(e);
  }
  handleBackgroundChange() {
    this.setAttribute("b", "orange");
    this.style.background = "orange";
  }
  async handleClick(e) {
    const beers = await this.getBeer(),
      beerNameFragment = getFragmentFromString(`<div>${beers[0].name}</div>`);
	this.shadow.appendChild(beerNameFragment);
	this.handleBackgroundChange()
  }
  async getBeer() {
    const callBeer = await fetch(this.endpoint, { mode: "cors" }).then(res =>
      res.json()
    );
    return callBeer;
  }
  async connectedCallback() {
    console.log("=================================");
    console.log("Custom square element added to page.");
  }
  disconnectedCallback() {
    console.log("=================================");
    console.log("Custom square element removed from page.");
    console.log("this :", this);
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

export default DumbBeer;
