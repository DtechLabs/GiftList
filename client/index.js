const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main() {
  
  if (!process.argv.count > 2) {
    console.log("Please add name to check as argument:");
    console.log("node client/index.js Your Name");
    return;
  }

  const name = process.argv.slice(2).join(" ");
  console.log(`Checking ${name} for ...`);

  const merkleTree = new MerkleTree(niceList);
  const index = niceList.findIndex(n => n === name);
  const proof = merkleTree.getProof(index);

  const { data: result } = await axios.post(`${serverUrl}/gift`, {
    name: name,
    proof: proof
  });

  console.log(result);
}

main();