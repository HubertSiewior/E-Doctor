const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors=require('cors')
const cookieParser=require('cookie-parser')
const morgan=require('morgan')
const app=express();
dotenv.config();
//Routes
const routes = {
    user: require('./routes/user'),
    disease: require('./routes/disease'),
    eDoctor: require('./routes/eDoctor'),
    medicine: require('./routes/medicine'),
}


app.use(cookieParser(process.env.COOKIES_SECRET));
app.use(morgan('combined'));
app.use(cors({credentials: true, origin: `http://localhost:3000`}));

app.use(express.json());
app.use('/user', routes.user);
app.use('/disease',routes.disease);
app.use('/eDoctor',routes.eDoctor);
app.use('/medicine',routes.medicine);

mongoose.connect(
      process.env.DB,
      { useUnifiedTopology: true, useNewUrlParser: true }, () =>
      {console.log('Connected to DB');
})


app.listen(9000,()=>console.log('Server Up and running'));