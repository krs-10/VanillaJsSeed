const path = require('path'); 
const express = require('express'); 


// const compiler = webpack(config);
const app = express(), 
	DIST_DIR = path.resolve(__dirname, 'build'), 
	HTML_FILE = path.resolve(DIST_DIR, 'index.html');

app.use(express.static(DIST_DIR));


app.get('*', (req, res) => {
	res.sendFile(HTML_FILE)
})

app.listen(9000, () => {
	console.log('server.js listening to port 9000');
});


