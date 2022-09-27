import { NextPage } from "next";
import NavigationBar from "../components/NavigationBar";
import NFTListing from "../components/NFTListing";
import { useEffect, useState } from "react";
import { NFTItem } from "../schemas/NFTItem";

import { ethers } from "ethers";
import { nftMarketAddress } from "../contracts-config";
import NFTMarket from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json';
import Web3Modal from "web3modal";
import axios from "axios";

const OwnedPage: NextPage = () => {
    const [ownedNFTItems, setOwnedNFTItems] = useState<NFTItem[]>([]);

    useEffect(() => {
        loadOwnedNFTItems();
    }, []);

    async function loadOwnedNFTItems() {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();

        const marketContract = new ethers.Contract(nftMarketAddress, NFTMarket.abi, signer);

        const data = await marketContract.getOwnedItems();
        const items = await Promise.all(data.map(async (i: any) => {
            const tokenURI = await marketContract.tokenURI(i.tokenId);
            const meta = await axios.get(tokenURI);
            let price = ethers.utils.formatUnits(i.price.toString(), 'ether');
            let item: NFTItem = {
              price,
              tokenId: i.tokenId.toNumber(),
              seller: i.seller,
              owner: i.owner,
              url: meta.data.url,
              description: meta.data.description,
              title: meta.data.title,
            };
            
            return item;
          }))
          setOwnedNFTItems(items);
    }

    return (<div>
        <NavigationBar />
        <main className={"m-10"}>
            <h1 className="font-semibold text-xl mb-3">
                My Buyed Assets
            </h1>
            {ownedNFTItems.length ? 
                <NFTListing nftItems={ownedNFTItems} sell={false} /> 
                : <div>You don't own any NFTs, go to the market to buy some</div>
            }
        </main>
    </div>)
};

export default OwnedPage;
