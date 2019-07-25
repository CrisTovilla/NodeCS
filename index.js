
const db = require('sqlite')
var express = require('express');
var app = express();
app.use(express.json());



app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/category/:id', async (req, res, next) => {
  try {
    await db.open('./database.sqlite', { Promise })
    const category = await  db.get('SELECT * FROM Category WHERE id = ?', req.params.id)
    
    res.status(200).json({category})
  } catch (err) {
    next(err);
  }
});

app.get('/category/', async (req, res, next) => {
  try {
    await db.open('./database.sqlite', { Promise })
    const categories = await  db.all('SELECT * FROM Category')
    
    res.status(200).json({categories})
  } catch (err) {
    next(err);
  }
});

app.post('/category/',async function (req, res,next) {
  try {
    await db.open('./database.sqlite', { Promise })
    const category = await db.run('INSERT INTO Category(name) VALUES(?)', [req.body.name])
    
    res.status(200).json({category })
  } catch (err) {
    next(err);
  }
});

app.put('/category/:id',async function (req, res,next) {
  try {
    await db.open('./database.sqlite', { Promise })
    const category = await db.run('UPDATE Category set name= ? WHERE id = ?', [req.body.name,req.params.id])
    
    res.status(200).json({category })
  } catch (err) {
    next(err);
  }
});




app.listen(3000, function () {
  console.log('app listening on port 3000!');
});



module.exports = app;

