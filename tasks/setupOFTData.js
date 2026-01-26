const TOKEN_CONFIG = require("../constants/tokenConfig")
const CHAIN_ID = require("../constants/chainIds.json")
const { getDeploymentAddresses } = require("../utils/readStatic")

module.exports = async function ({ localContract, remoteContract, targetNetwork, minGas: minDstGas }, hre) {
    let minGas = minDstGas
    if (!minGas) {
        if (TOKEN_CONFIG[targetNetwork] && TOKEN_CONFIG[targetNetwork][remoteContract] && TOKEN_CONFIG[targetNetwork][remoteContract].minGas) {
            minGas = TOKEN_CONFIG[targetNetwork][remoteContract].minGas
            console.log(`\nusing configured minGas of ${minGas} for ${targetNetwork}\n`)
        } else {
            minGas = targetNetwork.startsWith("beam") ? 10000000 : 200000
            console.log(`\nusing default minGas of ${minGas} for ${targetNetwork}\n`)
        }
    } else {
        console.log(`\nusing passed minGas of ${minGas} for ${targetNetwork}\n`)
    }

    const localContractInstance = await ethers.getContract(localContract)
    const remoteChainId = CHAIN_ID[targetNetwork]
    const remoteAddress = getDeploymentAddresses(targetNetwork)[remoteContract]
    const remoteAndLocal = hre.ethers.utils.solidityPack(["address", "address"], [remoteAddress, localContractInstance.address])

    console.log("Bridge contract address:", hre.network.name, localContractInstance.address)
    console.log("setTrustedRemote:", remoteChainId, remoteAndLocal)
    console.log("setMinDstGas:", remoteChainId, 0, minGas)
    console.log("setMinDstGas:", remoteChainId, 1, minGas)
}
