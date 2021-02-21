import sha256 from 'crypto-js/sha256.js';

class Block {
  constructor(index = null, timestamp, data, precedingHash = " ") {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.precedingHash = precedingHash;
    this.hash = this.computeHash();
    this.nonce = 0;
  }

  setIndex(index) {
    this.index = index;
  }

  computeHash() {
    console.log('computing hash with nonce: ', this.nonce)
    console.log('sha256 string: ', this.index + this.precedingHash + this.timestamp + JSON.stringify(this.data) + this.nonce)
    return sha256(
      this.index +
        this.precedingHash +
        this.timestamp +
        JSON.stringify(this.data) +
        this.nonce
    ).toString();
  }

  proofOfWork(difficulty) {
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
    ) {
      this.nonce++;
      this.hash = this.computeHash();
    }
  }
}

export default Block;