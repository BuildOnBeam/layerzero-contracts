const setTrustedRemote = require("./setTrustedRemote")
const setMinDstGas = require("./setMinDstGas")
const TOKEN_CONFIG = require("../constants/tokenConfig")

module.exports = async function ({ localContract, remoteContract, targetNetwork, minGas: minDstGas, skipAdapter }, hre) {
    let minGas = minDstGas
    if (!minGas) {
        if (TOKEN_CONFIG[targetNetwork] && TOKEN_CONFIG[targetNetwork][remoteContract] && TOKEN_CONFIG[targetNetwork][remoteContract].minGas) {
            minGas = TOKEN_CONFIG[targetNetwork][remoteContract].minGas
            console.log(`\nusing configured minGas of ${minGas} for ${targetNetwork}\n`)
        } else {
            minGas = targetNetwork.startsWith("beam") ? 10000000 : 100000
            console.log(`\nusing default minGas of ${minGas} for ${targetNetwork}\n`)
        }
    } else {
        console.log(`\nusing passed minGas of ${minGas} for ${targetNetwork}\n`)
    }

    console.log("\nsetting trusted remote...\n")
    await setTrustedRemote(
        {
            localContract,
            remoteContract,
            targetNetwork,
        },
        hre
    )

    console.log(`\nsetting min gas to ${minGas}...\n`)
    await setMinDstGas(
        {
            contract: localContract,
            packetType: 0,
            targetNetwork,
            minGas,
        },
        hre
    )

    await setMinDstGas(
        {
            contract: localContract,
            packetType: 1,
            targetNetwork,
            minGas,
        },
        hre
    )

    if (!skipAdapter) {
        console.log("\nsetting custom adapter params...\n")
        await setCustomAdapterParams(
            {
                contract: localContract,
            },
            hre
        )
    } else {
        console.log("\nskipped setting custom adapter params.\n")
    }
}
