const express = require('express');
const bodyParser = require('body-parser');
var { mongoose } = require('./db/mongoose');
const { InstallEnv } = require('./models/InstallEnv');

const app = express();
app.use(bodyParser.json());

app.get('/envBranche/:env', (req, res) => {
    const env = req.params.env;
    InstallEnv.find({ env: env }).then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    })
});

app.patch('/majEnvBranche/:env', (req, res) => {
    const env = req.params.env;
    const branche = req.body.branche;
    InstallEnv.findOneAndUpdate(
        { env: env }, { $set: { branche: branche } }, { new: true }
    ).then((doc) => {
        if (!doc) {
            const installenv = new InstallEnv({
                env: env,
                branche: branche
            });
            installenv.save().then((doc) => {
                res.send(doc);
            }).catch((e) => {
                res.status(400).send("Ko Maj branche")
            })
        } else {
            res.send(doc);
            console.log('ok')
        }
    }).catch((e) => {
        res.status(400).send("La branche n'existe pas.")
    })

});

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
    console.log('app listening at port ' + PORT);
})