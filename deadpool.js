if (typeof(deadpool) == "undefined") {
  console.warn("should use `make deadpool.test`")
  require("debug.js")
  require("/tmp/deadpool.abi")
  require("/tmp/deadpool.bin")
}
function makeBet(name, datetime, other, amount) {
  var price = 100000;
  txhash = deadpool.bet.sendTransaction({
    value: amount,
    from: eth.accounts[0],
    gas: Math.min(price, eth.getBlock(eth.blockNumber).gasLimit)
  })
  mine(1)
  receipt = eth.getTransactionReceipt(txhash)
  txstatus = debug.traceTransaction(txhash)
}
console.log("deadpool.transactionHash:", deadpool.transactionHash)
console.log("deadpool.address:", deadpool.address)
while (deadpool.address == undefined) {
  var receipt = eth.getTransactionReceipt(deadpool.transactionHash)
  if (receipt && receipt.contractAddress) {
    var contract = eth.contract(deadpool.abi)
    deadpool = contract.at(receipt.contractAddress)
  } else {
    admin.sleep(0.1)
  }
}
topoff()
console.log("deadpool.address:", deadpool.address)
if (deadpool.address == undefined) {
  console.error("failed instantiating deadpool contract")
} else {
  console.log("unlocking accounts so we can place bets")
  personal.unlockAccount(eth.accounts[0], null, 1000000)
  personal.unlockAccount(eth.accounts[1], null, 1000000)
}
/* vim: set tabstop=2 expandtab shiftwidth=2 softtabstop=2: */
