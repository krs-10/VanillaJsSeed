const path = require("path"),
	pathParse = require("path-parse");


const getSrcSet = image => {
	const { name, dir, ext } = pathParse(image);
	const srcSet = `${dir}/${name}@0.5x${ext} 320w, ${dir}/${name}@2x${ext} 1020w`;
	return srcSet;
};

const getFragmentFromString = htmlString =>
	document.createRange().createContextualFragment(htmlString);

export { getSrcSet, getFragmentFromString }; 
