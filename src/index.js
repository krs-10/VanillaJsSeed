
require("./styles/skeleton.css");
require("./styles/main.css");
require("./router.js");

import { DumbBeer } from './components';

customElements.define("dumb-beer", DumbBeer);
