import { ethers } from "ethers";
// import dotenv from ""

// .config();

export const makeWalletAddress = () => {
    const wallet = ethers.Wallet.createRandom();
    const address = wallet.address;
    return "0xnfth" + address.slice(2);
}

// export const uploadToIPFS = () => {
//     // const token =  process.env.WEB3_STORAGE_TOKEN;
//     // console.log(token);
// }