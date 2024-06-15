const Web3 = require('web3');

const web3 = new Web3(
  new Web3.providers.HttpProvider(`https://api.s0.b.hmny.io`),
);
(async () => {
  const myAddr = '0xb7064B93A2f2b7c571F788599ED7D17D9B942bB5';
  const transactions = [];
  var cb = await web3.eth.getBlockNumber();
  console.log(cb);
  const ntc = await web3.eth.getTransactionCount(myAddr, cb);
  console.log(`Number of Transactions ${ntc}`);
  var bal = await web3.eth.getBalance(myAddr, cb);

  console.log(`Balance: ${bal}`);
  for (var i = cb; i >= 0 && (ntc > 0 || bal > 0); --i) {
    console.log(i);
    try {
      var blck = await web3.eth.getBlock(i, true);
      //console.log(blck);
      console.log(ntc);
      blck.transactions.map((tx) => {
        if (tx.to == myAddr) {
          console.log('MY TRANS');
          transactions.push(tx);
          console.log(tx);
        }
        if (tx.from == myAddr) {
          if (tx.to !== tx.from) {
            bal = bal.plus(tx.value);
            --n;
          }
          if (myAddr == tx.to) {
            bal = bal.minus(tx.value);
          }
          console.log('MY TRANS');
          transactions.push(tx);
          console.log(tx);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
  console.log('MY TRANSACTIONS');
  console.log(transactions);
})();
//console.log(currentBlock)

//const bal = web3.eth.getBalance("0xb7064B93A2f2b7c571F788599ED7D17D9B942bB5", currentBlock);
// for (var i = currentBlock; i >= 0 && (n > 0 || bal > 0); --i) {
//     try {
//         var block = eth.getBlock(i, true);
//         if (block && block.transactions) {{
//             block.transactions.forEach(function(e) {
//                 if (paramsWalletAcc == e.from) {
//                     if (e.from != e.to) {
//                         bal = bal.plus(e.value);
//                         console.log(i, e.from, e.to, e.value.toString(10));
//                         --n;
//                     }
//                     if(paramsWalletAcc = e.to) {
//                         if (e.from != e.to)
//                             bal = bal.minus(e.value);
//                         console.log(i, e.from, e.to, e.value.toString(10));
//                     }
//                 }
//             });
//         }}
//     } catch(e) {
//         console.error("Error for block " + i, e);
//     }
//}
