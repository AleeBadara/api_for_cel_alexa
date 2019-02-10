const mongoose = require('mongoose');

var InstallEnv = mongoose.model('InstallEnv', {
    env: {
        type: String
    },
    branche: {
        type: String
    }
})

module.exports={InstallEnv}