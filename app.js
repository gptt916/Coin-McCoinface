import express from 'express';
import Chain from './Chain.js';
import Block from './Block.js';

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

app.get('/mine', (req, res) => {
  smashingCoin.addNewBlock(
    new Block(null, new Date(), {"recipient": "Yi Nan Gong", quantity: 100}),
    (err, chain) => {
      if (err) {
        res.status(500).send('Error mining: ', err);
      } else {
        res.json(chain);
      }

    }
  );
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
