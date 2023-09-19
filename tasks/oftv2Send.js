const CHAIN_ID = require("../constants/chainIds.json")
const TOKEN_CONFIG = require("../constants/tokenConfig")

module.exports = async function (taskArgs, hre) {
    let signers = await ethers.getSigners()
    let owner = signers[0]
    let toAddress = owner.address;
    let qty = ethers.utils.parseEther(taskArgs.qty)

    let localContract, remoteContract;

    if(taskArgs.contract) {
        localContract = taskArgs.contract;
        remoteContract = taskArgs.contract;
    } else {
        localContract = taskArgs.localContract;
        remoteContract = taskArgs.remoteContract;
    }

    if(!localContract || !remoteContract) {
        console.log("Must pass in contract name OR pass in both localContract name and remoteContract name")
        return
    }

    let toAddressBytes = ethers.utils.defaultAbiCoder.encode(['address'],[toAddress])

    // get remote chain id
    const remoteChainId = CHAIN_ID[taskArgs.targetNetwork]

    // get local contract
    const localContractInstance = await ethers.getContract(localContract)

    // quote fee with default adapterParams
    let adapterParams = ethers.utils.solidityPack(["uint16", "uint256"], [1, 200000]) // default adapterParams example

    let lzFees = await localContractInstance.estimateSendFee(remoteChainId, toAddressBytes, qty, false, adapterParams)
    console.log(`lzFees[0] (wei): ${lzFees[0]} / (eth): ${ethers.utils.formatEther(lzFees[0])}`)

    let isNative = localContract.indexOf("Native") >= 0
    let withFee = localContract.indexOf("WithFee") >= 0
    if (TOKEN_CONFIG[hre.network.name] && TOKEN_CONFIG[hre.network.name][localContract]) {
        const tokenConfig = TOKEN_CONFIG[hre.network.name][localContract]
        isNative = isNative || tokenConfig.isNative
        withFee = withFee || tokenConfig.withFee
    }

    // for native tokens, we need to add them on top of the lzFees in msg.value
    let value = isNative ? lzFees[0].add(qty) : lzFees[0]

    let tx;

    if (withFee) {
        // get provider fee
        let oftFee = await localContractInstance.quoteOFTFee(remoteChainId, qty)
        let minQty = qty.sub(oftFee);
        console.log(`oftFee (wei): ${oftFee} / (eth): ${ethers.utils.formatEther(oftFee)}; minQty (eth): ${ethers.utils.formatEther(minQty)}`)

        tx = await (
            await localContractInstance.sendFrom(
                owner.address,                 // 'from' address to send tokens
                remoteChainId,                 // remote LayerZero chainId
                toAddressBytes,                // 'to' address to send tokens
                qty,                           // amount of tokens to send (in wei)
                minQty,                        // the minimum amount of tokens to receive on remote chain
                [owner.address, ethers.constants.AddressZero, adapterParams],
                { value }
            )
        ).wait()
    } else {
        tx = await (
            await localContractInstance.sendFrom(
                owner.address,                 // 'from' address to send tokens
                remoteChainId,                 // remote LayerZero chainId
                toAddressBytes,                // 'to' address to send tokens
                qty,                           // amount of tokens to send (in wei)
                [owner.address, ethers.constants.AddressZero, adapterParams],
                { value }
            )
        ).wait()
    }

    console.log(`✅ Message Sent [${hre.network.name}] sendTokens() to OFT @ LZ chainId[${remoteChainId}] token:[${toAddress}]`)
    console.log(` tx: ${tx.transactionHash}`)
    console.log(`* check your address [${owner.address}] on the destination chain, in the ERC20 transaction tab !"`)
}
