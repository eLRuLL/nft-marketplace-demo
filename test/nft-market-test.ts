import { expect } from "chai";
import { ethers } from "hardhat";

describe("NFTMarket", function () {
    it("Should create and execute market sales", async function () {
        const Market = await ethers.getContractFactory("NFTMarket");
        const market = await Market.deploy();
        await market.deployed();

        const marketAddress = market.address;

        let listingCommission = await market.getListingCommission();
        expect(listingCommission).to.equal(ethers.utils.parseUnits('0.01', 'ether'));
        listingCommission = listingCommission.toString();
        
        const testPrice = ethers.utils.parseUnits('100', 'ether');

        let something = await market.createToken("https://token1.com", testPrice, { value: listingCommission });
        let something2 = await market.createToken("https://token2.com", testPrice, { value: listingCommission });

        const [_, buyerAddress] = await ethers.getSigners();
        let items = await market.getMarketItems();

        expect(items).to.have.a.lengthOf(2);

        await market.connect(buyerAddress).createMarketSale(items[0].tokenId, { value: testPrice });

        const mySellingItems = await market.getMySellingItems();

        expect(mySellingItems).to.have.a.lengthOf(1);
        expect(await market.getMarketItems()).to.have.a.lengthOf(1);
    });
});
