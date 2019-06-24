const express = require('express');
const app = express();

const morgan = require('morgan');

//settings

app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);


//middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(require('./routes/index'));

//routes
app.use('/api/users',require('./routes/users'));


//starting the server
app.listen(app.get('port'), ()=>{
    console.log('server on port 3000 ', app.get('port'));
})