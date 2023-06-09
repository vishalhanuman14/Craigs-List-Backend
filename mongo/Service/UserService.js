//TODO: Validations https://www.mongodb.com/developer/languages/javascript/getting-started-with-mongodb-and-mongoose/

import User from "../Entity/UserModel.js";
import { makeWalletAddress } from '../../utils.js'
import _ from "lodash";

export const createNewUser = async(body) => {
    
    const { firstName, lastName, address, phone, email, tokenId } = body;
    if(email!=null){
        let user = await User.findOne({email:email})
        console.log("🚀 ~ file: UserService.js:12 ~ createNewUser ~ user:", user)
        if(user!=undefined|| user!=null){
            console.log("exists")
            return user.nfthingId
        }
    }
    const user = new User({
        nfthingId: makeWalletAddress(),
        firstName: firstName, 
        lastName: lastName,
        address: address,
        email: email,
    })

    await user.save();
    console.log(user.nfthingId)
    return user.nfthingId
}

export const updateUserById = async(body) => {
    const { updateObj, updateUserId } = body;
    console.log(body)
    try{
        let user = await User.exists({nfthingId: updateUserId});
        if(user === null){
            throw new Error("User not found")
        } 
        await User.updateOne({nfthingId: updateUserId}, 
            { $set: updateObj });
    }
    catch(e){
        console.log(e.message);
        throw e; 
    }
}

export const deleteUserById = async(id) => {

}

export const getUserById = async(id) => {
    const user = await User.findOne({nfthingId: id}, "nfthingId firstName lastName address phone tokenId").exec();
    return user;
}

export const getMetadataByTokenId = async(tokenId) => {
    const metadata = await User.findOne({tokenId: tokenId});
    return metadata;

}