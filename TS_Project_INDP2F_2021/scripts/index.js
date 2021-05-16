const express = require('express')
const path = require('path');
const app = express()
const port = 3000

app.use("/styles",express.static(path.join(__dirname, '../styles')));
app.use("/pages",express.static(path.join(__dirname, '../pages')));
app.use("/imgs",express.static(path.join(__dirname, '../imgs')));
app.use(express.static(path.join(__dirname, '/')));

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/number_guesser', function (req, res) {
	res.sendFile(path.join(__dirname, '/pages/number_guesser.html'));
});
app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})