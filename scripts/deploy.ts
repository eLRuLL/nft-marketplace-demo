import { ethers } from "hardhat";

async function main() {
  const Market = await ethers.getContractFactory("NFTMarket");
  const market = await Market.deploy();
  await market.deployed();

  console.log(`NFT Market contract address ${market.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
