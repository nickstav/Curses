/* ----------------------Get required npm packages------------------------------*/

const pipe = require('./pipe');
const test = require('./test');

const express = require("express");
const cors = require("cors");
const path = require('path');

/* -----------------------Set up server on a local port------------------------ */

const app = express();
const port = 4000;
app.use(cors());
app.use(express.static('../public'));
app.use(express.json({ limit: '1mb' }));
app.listen(port, () => console.log(`Server running at http://localhost:${port}`));

//define absolute path to encode python file
let pythonPath = path.resolve(__dirname, '..', 'python', 'pipeTest.py');

/* --------------------Interaction with the front end---------------------------*/

app.post('/userCanvas', getUserCanvas);


async function getUserCanvas(req, res) {
    try {
        // receive user canvas from the front end
        const userCanvas = req.body;
        console.debug('User Canvas received');
        console.log(userCanvas);

        //send back confirmation message
        let message = "User Canvas recieved from the web app"
        res.send(message);
        console.debug('Confirmation message sent');

    } catch (error) {
        console.log(error);
    }
}

pipe.sendDataToPythonScript(JSON.stringify(test.test), pythonPath)