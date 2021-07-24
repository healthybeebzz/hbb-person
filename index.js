import express from 'express';
import bodyParser from 'express';

const app = express();
 
const port = 3000;

app.use(bodyParser.json())

// TODO:
// 1. Add get person route
// 2. Add put person route
// 3. Add create person route
// 4. Add delete person route
app.get('/person/:personId', (req, res) => {
  const personId = req.params.personId;

  const response = {
    personId,
    firstName: "Maria",
    lastName: "Mihaila"
  };

  res.send(response);
});

app.post('/person/create', (req, res) => {
  console.log("req.body ", req.body);

  const response = {
    status: "ok",
    message: "New person created."
  }

  res.send(response);
});

app.put('/person/edit', (req, res) => {
  console.log("req.body ", req.body);

  const response = {
    firstName: "Razvan",
    lastName: "Pavelescu"
  }

  res.send(response);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});