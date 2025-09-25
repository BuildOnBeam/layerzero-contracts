const LZ_ENDPOINTS = require("../constants/layerzeroEndpoints.json")
const TOKEN_CONFIG = require("../constants/tokenConfig")

const CONTRACT_NAME = "BeamOFT"

module.exports = async function ({ deployments, getNamedAccounts }) {
    const { deploy } = deployments
    const { deployer, proxyOwner } = await getNamedAccounts()

    let lzEndpointAddress, lzEndpoint, LZEndpointMock
    if (hre.network.name === "hardhat") {
        LZEndpointMock = await ethers.getContractFactory("LZEndpointMock")
        lzEndpoint = await LZEndpointMock.deploy(1)
        lzEndpointAddress = lzEndpoint.address
    } else {
        lzEndpointAddress = LZ_ENDPOINTS[hre.network.name]
    }

    const tokenConfig = TOKEN_CONFIG[hre.network.name][CONTRACT_NAME]
    if (!tokenConfig.name || !tokenConfig.symbol || !lzEndpointAddress) {
        console.error("No configuration found for target network:", hre.network.name)
        return
    }

    await deploy(CONTRACT_NAME, {
        from: deployer,
        log: true,
        waitConfirmations: 1,
        proxy: {
            owner: proxyOwner,
            proxyContract: "OptimizedTransparentProxy",
            execute: {
                init: {
                    methodName: "initialize",
                    args: [
                        tokenConfig.name,
                        tokenConfig.symbol,
                        tokenConfig.sharedDecimals != null ? tokenConfig.sharedDecimals : 6,
                        lzEndpointAddress,
                    ],
                },
            },
        },
    })
}

module.exports.tags = [CONTRACT_NAME]
