import { NextPage } from "next";
import NavigationBar from "../components/NavigationBar";
import { useEffect, useState } from "react";
import NFTListing from "../components/NFTListing";
import { NFTItem } from "../schemas/NFTItem";
import Web3Modal from "web3modal";

import { create as ipfsHTTPClient } from 'ipfs-http-client';
import { ethers } from "ethers";
import { nftMarketAddress } from "../contracts-config";

import NFTMarket from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json';
import axios from "axios";

const auth = 'Basic ' + Buffer.from('2FMGJKlegpp1hP0r96aBr5wQKzG' + ':' + '9b11ca69ca35774af9c38cabaa2df41b').toString('base64');


const client = ipfsHTTPClient({
    url: 'https://infura-ipfs.io:5001/api/v0',
    headers: {
        authorization: auth,
    },
});

const SellPage: NextPage = () => {
    const [formInput, updateFormInput] = useState({price: '', title: '', description: ''});
    const [fileURL, setFileURL] = useState<string|null>(null);

    const [sellingNFTItems, setSellingNFTItems] = useState<NFTItem[]>([]);

    useEffect(() => {
        loadSellingNFTItems();
    }, []);

    async function loadSellingNFTItems() {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();


        const marketContract = new ethers.Contract(nftMarketAddress, NFTMarket.abi, signer);
        const data = await marketContract.getMySellingItems();
        const items = await Promise.all(data.map(async (i: any) => {
            const tokenURI = await marketContract.tokenURI(i.tokenId);
            const meta = await axios.get(tokenURI);

            let price = ethers.utils.formatUnits(i.price.toString(), 'ether');

            let item: NFTItem = {
                description: meta.data.description,
                seller: i.seller,
                owner: i.owner,
                url: meta.data.url,
                price: price,
                title: meta.data.title,
                tokenId: i.tokenId.toNumber(),
            };
            
            return item;
        }));

        const soldItems = items.filter(i => i.owner);
        setSellingNFTItems(soldItems);
    }

    async function UploadAsset(e: any) {
        const file = e.target.files[0];
        try {
            const added = await client.add(file, {progress: (prog) => console.log(`received ${prog}`)});
            const url = `http://infura-ipfs.io/ipfs/${added.path}`;
            setFileURL(url);
        } catch (e) {
            console.log(e);
        }
    }

    async function createNFTItem() {
        const { price, title, description } = formInput;
        const data = JSON.stringify({title, description, url: fileURL});
        try {
            const added = await client.add(data);
            const url = `https://infura-ipfs.io/ipfs/${added.path}`;
            createSale(url);
        } catch (error) {
            console.log('Error uploading file: ', error);
        }
    }

    async function createSale(url: string) {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();

        const price = ethers.utils.parseUnits(formInput.price, 'ether');

        let marketContract = new ethers.Contract(nftMarketAddress, NFTMarket.abi, signer);
        let listingCommission = await marketContract.getListingCommission();
        listingCommission = listingCommission.toString();

        let transaction = await marketContract.createToken(url, price, {value: listingCommission});
        await transaction.wait();
    }

    return (<div>
        <NavigationBar />
        <main className={"m-10"}>
            <h1 className="font-semibold text-xl mb-3">
                Create New NFT Asset
            </h1>
            <div className="flex flex-col">
                <input
                    placeholder="Asset Title"
                    className="mt-2 border rounded p-4"
                    onChange={e => updateFormInput({...formInput, title: e.target.value})}
                />
                <input
                    placeholder="Asset Description"
                    className="mt-2 border rounded p-4"
                    onChange={e => updateFormInput({...formInput, description: e.target.value})}
                />
                <input
                    placeholder="Asset price"
                    className="mt-2 border rounded p-4"
                    onChange={e => updateFormInput({...formInput, price: e.target.value})}
                />
                <input
                    type="file"
                    name="Asset"
                    className="my-4"
                    onChange={UploadAsset}
                />

                <button 
                    onClick={createNFTItem} 
                    className="btn bg-transparent hover:bg-blue-700 hover:text-white rounded-full dark:text-white border border-blue-500">
                    Create NFT
                </button>
            </div>
            <h1 className="font-semibold text-xl mt-8 mb-3">
                You are selling these Assets
            </h1>
            <NFTListing nftItems={sellingNFTItems} sell={false} />
        </main>
    </div>)
};

export default SellPage;
