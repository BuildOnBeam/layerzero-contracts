const LZ_ENDPOINTS = require("../constants/layerzeroEndpoints.json")
const ABI = require("../constants/endpoint_abi.json")

module.exports = async function (taskArgs, hre) {
    console.log(`\n=== Setting up ULN301 on ${hre.network.name} OFT contract ===`)

    const lzEndpointAddress = LZ_ENDPOINTS[hre.network.name]
    console.log("V1 Endpoint: ", lzEndpointAddress)
    const endpoint = await hre.ethers.getContractAt(ABI, lzEndpointAddress)

    const latestVersion = await endpoint.latestVersion()
    const receiveUln301Version = latestVersion
    const sendUln301Version = latestVersion - 1

    const localContractInstance = await hre.ethers.getContract(taskArgs.localContract)
    console.log("\nOFT contract name: ", taskArgs.localContract)
    console.log("OFT contract address: ", localContractInstance.address)

    const currentSend = await endpoint.getSendVersion(localContractInstance.address)
    console.log("\nCurrent send version: ", currentSend.toString())
    const currentReceive = await endpoint.getReceiveVersion(localContractInstance.address)
    console.log("Current receive version: ", currentReceive.toString())
    const currentSendLib = await endpoint.getSendLibraryAddress(localContractInstance.address)
    console.log("Current send library: ", currentSendLib)
    const currentReceiveLib = await endpoint.getReceiveLibraryAddress(localContractInstance.address)
    console.log("Current receive library: ", currentReceiveLib)

    console.log("\nOFT.setSendVersion:", sendUln301Version.toString())
    console.log("OFT.setReceiveVersion: ", receiveUln301Version.toString())

    if (taskArgs.dataOnly) {
        console.log("\nData only mode, skipping transactions. Disable with '--data-only false'")
        return
    }

    const txSend = await (await localContractInstance.setSendVersion(sendUln301Version)).wait()
    console.log("setSendVersion success, tx hash: ", txSend.transactionHash)
    const txReceive = await (await localContractInstance.setReceiveVersion(receiveUln301Version)).wait()
    console.log("setReceiveVersion success, tx hash: ", txReceive.transactionHash)
}
