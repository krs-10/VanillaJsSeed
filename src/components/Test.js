import { getFragmentFromString } from "../utility";


var Car2 = Object.create(null); //this is an empty object, like {}
Car2.prototype = {
  getInfo: function() {
    return "A " + this.color + " " + this.desc + ".";
  }
};
var car2 = Object.create(Car2.prototype, {
  //value properties
  color: { writable: true, configurable: true, value: "red" }, //concrete desc value
  rawDesc: { writable: false, configurable: true, value: "Porsche boxter" }, // data properties (assigned using getters and setters)
  desc: {
    configurable: true,
    get: function() {
      return this.rawDesc.toUpperCase();
    },
    set: function(value) {
      this.rawDesc = value.toLowerCase();
    }
  }
});
car2.color = "blue";
// car2.rawDesc = "Ferrari";
console.log(car2.getInfo());

const Animal = Object.create(
  {},
  {
    category: { writable: false, value: "animals" },
    species: {
      writable: true,
      enumerable: true,
      configurable: true,
      value: "not sure"
    },
    isAnimal: { writable: false, value: true },
    getInfo: {
      writable: false,
      configurable: false,
      enumerable: false,
      value: function() {
        return `Sure, I can talk about ${this.category}`;
      }
    }
  }
);

const Dog = Object.create(Animal, {
  breed: { writable: true, configurable: true, value: "shiba" },
  description: {
    writable: true,
    configurable: false,
    enumerable: true,
    value: "nasty orange"
  },
  api: {
    writable: false,
    configurable: false,
    enumberable: false,
    value: function() {
      return `https://dog.ceo/api/breed/${this.breed}/images/random`;
    }
  },
  whatKindOfDogIsThat: {
    writable: false,
    configurable: false,
    value: function() {
      return `${this.getInfo()}! It's a ${this.breed}. They're ${
        this.description
      }.`;
    }
  },
  showPicture: {
    configurable: false,
    enumberable: false,
    writable: false,
    value: async function() {
      try {
        const dogPictureResponse = await fetch(this.api());
		const dogPictureJSON = await dogPictureResponse.json();
		console.log('Test.js -  dogPictureJSON: ', dogPictureJSON);
		if (!dogPictureJSON || dogPictureJSON.status !== "success") return `${"https://images.dog.ceo/breeds/shiba/shiba-10.jpg"}`;
		return `${dogPictureJSON.message}`; 
        return `${dogPictureJSON}`;
      } catch (err) {
        console.log("sorry, guess I left it at home.");
        throw err;
      }
    }
  }
});

const createDogPicture = async (myDog) => {
	const src = await myDog.showPicture(); 
	const imageFragment =  getFragmentFromString(`<img src="${src}" />`);
	document.body.append(imageFragment)
}



createDogPicture(Dog); 
