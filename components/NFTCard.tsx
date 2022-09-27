import { NFTItem } from "../schemas/NFTItem";
import { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEthereum } from "@fortawesome/free-brands-svg-icons";
import classNames from "classnames";

import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { nftMarketAddress } from "../contracts-config";
import NFTMarket from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json';

interface Props {
    nftItem: NFTItem;
    sell?: boolean;
}

interface State {
    hovered: boolean;
}

class NFTCard extends Component<Props, State> {
    static defaultProps = {
        sell: true,
    }

    constructor(props: Props) {
        super(props);
        this.state = {
            hovered: false,
        };
    }

    handleMouseOver = () => {
        this.setState(prevState => ({
            hovered: !prevState.hovered,
        }));
    };

    handleBuyNFT = async () => {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);

        const signer = provider.getSigner();

        const contract = new ethers.Contract(nftMarketAddress, NFTMarket.abi, signer);

        const price = ethers.utils.parseUnits(this.props.nftItem.price.toString(), 'ether');

        const transaction = await contract.createMarketSale(this.props.nftItem.tokenId, {value: price});

        await transaction.wait();
    }

    render () {
        return (
            <div onClick={this.props.sell ? this.handleBuyNFT : () => {}} className={classNames(
                "flex flex-col bg-white rounded-lg shadow-xl relative overflow-hidden",
                {"shadow-2xl": this.state.hovered},
                {"cursor-pointer": this.state.hovered},
            )}>
                <div
                    onMouseEnter={this.handleMouseOver}
                    onMouseLeave={this.handleMouseOver}
                    className="flex block w-80 flex-col p-5 gap-0.5 mb-4"
                >
                    <div className="h-48 bg-cover bg-center flex items-center">
                        <img src={this.props.nftItem.url}
                             alt={this.props.nftItem.description}
                             className={classNames(
                                 "w-full", "rounded-full", "ease-in", "duration-200",
                                 {"scale-75": !this.state.hovered},
                                 {"scale-100": this.state.hovered},
                             )}
                        />
                    </div>
                    <h3 className="mt-4 text-sm text-gray-700 font-semibold">{this.props.nftItem.title}</h3>
                    <p className="mt-4 text-xs text-gray-500">{this.props.nftItem.description}</p>
                    <div className="flex flex-row max-h-6 items-center gap-1 mt-2">
                        <FontAwesomeIcon icon={faEthereum} height="80%" color="#37367b" />
                        <div className="text-lg font-medium text-gray-900">{this.props.nftItem.price}</div>
                    </div>
                </div>
                {this.props.sell && <div className={classNames(
                    "bg-sky-600", "text-white", "absolute", "bottom-0", "w-full", "text-center",
                    "ease-in", "duration-200", "transition-all", "overflow-hidden", "font-medium",
                    {"h-8": this.state.hovered},
                    {"h-0": !this.state.hovered},
                    {"invisible": !this.state.hovered},
                )}>
                    Buy Now
                </div>}
            </div>
        )
    };
}

export default NFTCard;
