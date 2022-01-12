const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require("child_process");
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, 'pages')))

app.post('/collective', (req, res) => {
    let mode = req.body.mode;
    let words = req.body.words.toLowerCase().split(/[^a-z]/).filter(w => w.length > 1).join(",");
    console.log("Running Collective.jl for: "+ words);
    if(words.length > 0){
        exec("julia collective/CollectiveLauncher.jl " + words, (error, stdout, stderr) => {
            if (error) {
                console.log("Error: " + error.message);
                res.status(500).send({ error: error.message} );
                return;
            }
            if (stderr) {
                console.log("Error: " + stderr);
                res.status(500).send({ error: stderr });
                return;
            }
            let output = stdout.trim();
            console.log(output);
            output = mode == "html" ? "<pre>\n"+output+"\n</pre>" : output;
            res.status(200).send(output);
            return;
        });
    } else {
        console.log("Error: no words");
        res.status(500).send({ error: "no words" });
        return;
    }
});




app.listen(PORT, () => {
    console.log("App listening at http://localhost:" + PORT)
});
