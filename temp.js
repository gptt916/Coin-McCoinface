import Chain from './Chain.js';
import Block from './Block.js';

let smashingCoin = new Chain();
smashingCoin.init();
// console.log("smashingCoin mining in progress....");
// console.log(JSON.stringify(
//     new Block(1, "01/06/2020", {
//     sender: "Iris Ljesnjanin",
//     recipient: "Cosima Mielke",
//     quantity: 50
//   }),
//   null,
//   4
// ))
// smashingCoin.addNewBlock(
//   new Block(1, "01/06/2020", {
//     sender: "Iris Ljesnjanin",
//     recipient: "Cosima Mielke",
//     quantity: 50
//   })
// );

// smashingCoin.addNewBlock(
//   new Block(2, "01/07/2020", {
//     sender: "Vitaly Friedman",
//     recipient: "Ricardo Gimenes",
//     quantity: 100
//   })
// );

console.log(JSON.stringify(smashingCoin, null, 4));
