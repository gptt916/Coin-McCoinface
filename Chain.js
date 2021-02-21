import fs from 'fs';
import path from 'path';

import Block from './Block.js';

class Chain {
  constructor() {
    this.blockchain = [];
    this.difficulty = 4;
  }

  getChain() {
    return this.blockchain;
  }

  init() {
    console.info('initializing blockchain...');
    fs.readFile('ledger.json', 'utf8', (err, file) => {
      let genesisBlock
      if (file) {
        console.info('local ledger exists, using local file...')
        this.blockchain = JSON.parse(file)
      } else {
        console.info('local ledger not found, creating new ledger')
        const genesisBlock = new Block(
          0,
          new Date(),
          'Initial Block in the Chain',
          '0'
        );
        fs.writeFile(
          path.join('.', 'ledger.json'),
          JSON.stringify(genesisBlock, null, 4),
          (err) => {
            if (err) {
              console.err('Error writing: ', err);
              return;
            }
          }
        );
        this.blockchain = [genesisBlock];
      }
    });
  }

  obtainLatestBlock() {
    return this.blockchain[this.blockchain.length - 1];
  }

  addNewBlock(newBlock, cb) {
    newBlock.precedingHash = this.obtainLatestBlock().hash;
    newBlock.setIndex(this.obtainLatestBlock().index + 1);
    newBlock.hash = newBlock.computeHash();
    console.log('proofing')
    newBlock.proofOfWork(this.difficulty);
    this.blockchain.push(newBlock);
    fs.writeFile(
      path.join('.', 'ledger.json'),
      JSON.stringify(this.blockchain, null, 4),
      (err) => {
        if (err) {
          console.err('Error writing: ', err);
          cb(err)
          return;
        }
        cb(null, this.blockchain);
      }
    );
  }

  checkChainValidity() {
    for (let i = 1; i < this.blockchain.length; i++) {
      const currentBlock = this.blockchain[i];
      const precedingBlock = this.blockchain[i - 1];

      if (currentBlock.hash !== currentBlock.computeHash()) {
        return false;
      }
      if (currentBlock.precedingHash !== precedingBlock.hash) return false;
    }
    return true;
  }
}

export default Chain;
