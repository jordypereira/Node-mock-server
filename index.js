const cors = require('cors');
const express = require('express');

const { dataFetcher, dataSetter, dataDeleter } = require('./serverActions');

const app = express();

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8984;
}

const jsonParser = express.json();

app.use(cors());
app.options('*', cors());

app.get(/favicon\.ico/, (req, res) => res.send(''));

app.get('/test', (req, res) => {
  res.send('Hello from Express.js!')
});
app.get('*', dataFetcher);
app.put('*', jsonParser, dataSetter);
app.post('*', jsonParser, dataSetter);
app.delete('*', jsonParser, dataDeleter);

app.listen(port, () => console.log(`Dev server running on port ${port}!`));
