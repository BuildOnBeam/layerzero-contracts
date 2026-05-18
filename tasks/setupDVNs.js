const TOKEN_CONFIG = require("../constants/tokenConfig")
const LZ_ENDPOINTS = require("../constants/layerzeroEndpoints.json")
const CHAIN_ID = require("../constants/chainIds.json")
const ABI = require("../constants/endpoint_abi.json")
const { dvns } = require("../constants/dvns")

const ULN_CONFIG_TYPE = 2

// Encode the UlnConfig struct
function encodeUlnConfig(config) {
    return ethers.utils.defaultAbiCoder.encode(
        [
            "tuple(uint64 confirmations, uint8 requiredDVNCount, uint8 optionalDVNCount, uint8 optionalDVNThreshold, address[] requiredDVNs, address[] optionalDVNs)",
        ],
        [
            [
                config.confirmations,
                config.requiredDVNs.length,
                config.optionalDVNs.length,
                config.optionalDVNThreshold,
                config.requiredDVNs || [],
                config.optionalDVNs || [],
            ],
        ]
    )
}

module.exports = async function ({ localContract, remoteContract, targetNetwork, dataOnly }, hre) {
    // Basic config checks
    const localNetwork = hre.network.name
    if (!dvns[targetNetwork]) {
        throw new Error(`No DVNs found for target network ${targetNetwork}`)
    }

    if (!dvns[localNetwork]) {
        throw new Error(`No DVNs found for local network ${localNetwork}`)
    }

    if (
        !TOKEN_CONFIG[targetNetwork] ||
        !TOKEN_CONFIG[targetNetwork][remoteContract] ||
        !TOKEN_CONFIG[targetNetwork][remoteContract].sendConfig
    ) {
        throw new Error(`No configuration found for remote contract ${remoteContract} on network ${targetNetwork}`)
    }

    if (!TOKEN_CONFIG[localNetwork] || !TOKEN_CONFIG[localNetwork][localContract] || !TOKEN_CONFIG[localNetwork][localContract].sendConfig) {
        throw new Error(`No configuration found for local contract ${localContract} on network ${localNetwork}`)
    }

    if (
        !TOKEN_CONFIG[targetNetwork] ||
        !TOKEN_CONFIG[targetNetwork][remoteContract] ||
        !TOKEN_CONFIG[targetNetwork][remoteContract].sendConfig
    ) {
        throw new Error(`No configuration found for target contract ${remoteContract} on network ${targetNetwork}`)
    }

    // Gather and prepare necessary data
    const remoteEid = CHAIN_ID[targetNetwork]
    console.log("\nNetwork: ", hre.network.name)
    console.log(`Remote chain: ${targetNetwork} (${remoteEid})`)

    const localContractInstance = await ethers.getContract(localContract)
    console.log("\nOFT contract name: ", localContract)
    console.log("OFT contract address: ", localContractInstance.address)

    const sendConfig = TOKEN_CONFIG[localNetwork][localContract].sendConfig
    const receiveConfig = TOKEN_CONFIG[targetNetwork][remoteContract].sendConfig

    // Build final DVN lists for send and receive configs
    sendConfig.requiredDVNs = sendConfig.requiredDVNs.map((dvnId) => dvns[localNetwork][dvnId])
    receiveConfig.requiredDVNs = receiveConfig.requiredDVNs.map((dvnId) => dvns[localNetwork][dvnId])

    receiveConfig.optionalDVNs = receiveConfig.optionalDVNs.map((dvnId) => dvns[localNetwork][dvnId])
    sendConfig.optionalDVNs = sendConfig.optionalDVNs.map((dvnId) => dvns[localNetwork][dvnId])

    receiveConfig.requiredDVNs = receiveConfig.requiredDVNs.sort()
    sendConfig.requiredDVNs = sendConfig.requiredDVNs.sort()
    receiveConfig.optionalDVNs = receiveConfig.optionalDVNs.sort()
    sendConfig.optionalDVNs = sendConfig.optionalDVNs.sort()

    if (sendConfig.requiredDVNs.filter((dvn) => !dvn).length > 0 || sendConfig.optionalDVNs.filter((dvn) => !dvn).length > 0) {
        throw new Error("Some DVNs are missing in the send configuration")
    }

    if (receiveConfig.requiredDVNs.filter((dvn) => !dvn).length > 0 || receiveConfig.optionalDVNs.filter((dvn) => !dvn).length > 0) {
        throw new Error("Some DVNs are missing in the receive configuration")
    }

    // Encode UlnConfig
    const encodedSendConfig = encodeUlnConfig(sendConfig)
    const encodedReceiveConfig = encodeUlnConfig(receiveConfig)

    // Get endpoint and current config versions
    const lzEndpointAddress = LZ_ENDPOINTS[hre.network.name]
    console.log("\nV1 Endpoint: ", lzEndpointAddress)
    const endpoint = await hre.ethers.getContractAt(ABI, lzEndpointAddress)

    const currentSend = await endpoint.getSendVersion(localContractInstance.address)
    console.log("Current send version: ", currentSend.toString())
    const currentReceive = await endpoint.getReceiveVersion(localContractInstance.address)
    console.log("Current receive version: ", currentReceive.toString())

    // Set config or generate data for Safe transactions
    if (!dataOnly) {
        const txSend = await (await localContractInstance.setConfig(currentSend, remoteEid, ULN_CONFIG_TYPE, encodedSendConfig)).wait()
        const txReceive = await (await localContractInstance.setConfig(currentReceive, remoteEid, ULN_CONFIG_TYPE, encodedReceiveConfig)).wait()
    } else {
        console.log(`\n\nSend: OFT.setConfig(${currentSend}, ${remoteEid}, ${ULN_CONFIG_TYPE}, ${encodedSendConfig})`)
        console.log(`-- raw sendConfig: ${JSON.stringify(sendConfig, null, 2)}`)
        console.log(`\n\nReceive: OFT.setConfig(${currentReceive}, ${remoteEid}, ${ULN_CONFIG_TYPE}, ${encodedReceiveConfig})`)
        console.log(`-- raw receiveConfig: ${JSON.stringify(receiveConfig, null, 2)}`)

        console.log("\n\nData only mode, skipping transactions. Disable with '--dataOnly false'")
    }
}
