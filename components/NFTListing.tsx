import { FunctionComponent } from "react";
import { NFTItem } from "../schemas/NFTItem";
import NFTCard from "./NFTCard";

interface Props{
    nftItems: NFTItem[];
    sell: boolean;
}

const NFTListing: FunctionComponent<Props> = ({nftItems, sell }) => {
    return (
        <div className="flex flex-wrap gap-5">
            {nftItems.map((nftItem, index) => {
                return <NFTCard key={index} nftItem={nftItem} sell={sell} />
            })}
        </div>
    )
}

export default NFTListing;
