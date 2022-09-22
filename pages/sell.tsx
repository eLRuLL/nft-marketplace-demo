import { NextPage } from "next";
import NavigationBar from "../components/NavigationBar";
import { useEffect, useState } from "react";
import NFTListing from "../components/NFTListing";
import { NFTItem } from "../schemas/NFTItem";
import { ALLNFTs } from "../schemas/TestData";

const SellPage: NextPage = () => {
    const [formInput, updateFormInput] = useState({price: '', title: '', description: ''});

    const [sellingNFTItems, setSellingNFTItems] = useState<NFTItem[]>([]);

    useEffect(() => {
        loadSellingNFTItems();
    });

    async function loadSellingNFTItems() {
        setSellingNFTItems(ALLNFTs);
    }

    async function UploadAsset(e: any) {
        const file = e.target.files[0];
        console.log("Uploading file");
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
            </div>

            <h1 className="font-semibold text-xl mt-8 mb-3">
                You are selling these Assets
            </h1>
            <NFTListing nftItems={sellingNFTItems} sell={false} />
        </main>
    </div>)
};

export default SellPage;
