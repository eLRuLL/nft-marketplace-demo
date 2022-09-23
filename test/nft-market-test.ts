import { expect } from "chai";
import { ethers } from "hardhat";

describe("NFTMarket", function () {
    it("Should create and execute market sales", async function () {
        const Market = await ethers.getContractFactory("NFTMarket");
        const market = await Market.deploy();
        await market.deployed();

        const marketAddress = market.address;

        const NFT = await ethers.getContractFactory("NFT");
        const nft = await NFT.deploy(marketAddress);
        await nft.deployed();
        
        const nftContractAddress = nft.address;

        let listingCommission = await market.getListingCommission();
        expect(listingCommission).to.equal(ethers.utils.parseUnits('0.01', 'ether'));
        listingCommission = listingCommission.toString();
        
        const testPrice = ethers.utils.parseUnits('100', 'ether');

        await nft.createToken("https://token1.com");
        await nft.createToken("https://token2.com");

        await market.createMarketItem(nftContractAddress, 1, testPrice, { value: listingCommission });
        await market.createMarketItem(nftContractAddress, 2, testPrice, { value: listingCommission });


        const [_, buyerAddress] = await ethers.getSigners();

        await market.connect(buyerAddress).createMarketSale(nftContractAddress, 1, { value: testPrice });

        const items = await market.getMarketItems();

        expect(items).to.have.a.lengthOf(1);
    })
});
