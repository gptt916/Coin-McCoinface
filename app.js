import express from 'express';
import Chain from './Chain.js';

const app = express();
const port = 3001;

let smashingCoin = new Chain();
smashingCoin.init();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/chain', (req, res) => {
  res.json(smashingCoin.getChain());
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
