const express = require('express');
const app = express();
const port = 3000;

// TODO:
// 1. Add get person route
// 2. Add put person route
// 3. Add create person route
// 4. Add delete person route
app.get('/person/:personId', (req,res) => {
  const personId = req.params.personId;
  
  const response = {
    personId,
    firstName: "Maria",
    lastName: "Mihaila"
  };

  res.send(response);
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});