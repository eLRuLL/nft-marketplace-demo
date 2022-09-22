import { NextPage } from "next";
import NavigationBar from "../components/NavigationBar";
import NFTListing from "../components/NFTListing";
import {useEffect, useState} from "react";
import { ALLNFTs } from "../schemas/TestData";
import { NFTItem } from "../schemas/NFTItem";

const OwnedPage: NextPage = () => {
    const [ownedNFTItems, setOwnedNFTItems] = useState<NFTItem[]>([]);

    useEffect(() => {
        loadOwnedNFTItems();
    });

    async function loadOwnedNFTItems() {
        setOwnedNFTItems(ALLNFTs);
    }

    return (<div>
        <NavigationBar />
        <main className={"m-10"}>
            <h1 className="font-semibold text-xl mb-3">
                My Buyed Assets
            </h1>
            <NFTListing nftItems={ownedNFTItems} sell={false} />
        </main>
    </div>)
};

export default OwnedPage;
