const mongoose = require('mongoose');
const URI = 'mongodb+srv://mern-stack-task:tobias2123@cluster0.5klkn.mongodb.net/mern-stack-task?retryWrites=true&w=majority'

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}

mongoose.connect(URI, options)
    .then(db => console.log('DB is connected'))
    .catch(err => console.log(err));

module.exports = mongoose;