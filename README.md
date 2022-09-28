This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Setting up Development Environment

This project uses [hardhat](https://hardhat.org/), so you could start a local node for testing:

```bash
npx hardhat node
```

That will give you a set of accounts, import them to your `metamask` account (you'll need the metamask chrome plugin).
Import as many as you'll want to test (at least 2 for seller and buyer).

Now you need to deploy your contracts to the local network:

```bash
npx hardhat run scripts/deploy.ts --network localhost
```

Copy the output (contract address) to the variables defined in `contracts-config.js` file.

We are also using infura for IPFS, and to setup that you need to create an account and project [here](https://infura.io/). 
After creating that, Infura will give you a projectID and projectSecret, which you have to set in the `infura-config.js` file.

Now you can deploy the application and start using the application:

```bash
npm run dev
```

## TODO
- Test it on a remote network
- Authentication
- Search, Categorizing and Filtering functionality
- Incorporate different types of wallets
