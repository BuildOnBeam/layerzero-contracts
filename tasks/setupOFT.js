const setTrustedRemote = require("./setTrustedRemote")
const setMinDstGas = require("./setMinDstGas")
const setCustomAdapterParams = require("./setCustomAdapterParams")
const setupDVNs = require("./setupDVNs")
const setupUln301 = require("./setupUln301")
const TOKEN_CONFIG = require("../constants/tokenConfig")

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

module.exports = async function ({ localContract, remoteContract, targetNetwork, minGas: minDstGas, skipAdapter, gasOnly }, hre) {
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

    if (!gasOnly) {
        console.log("\nsetting trusted remote...\n")
        await setTrustedRemote(
            {
                localContract,
                remoteContract,
                targetNetwork,
            },
            hre
        )
        await wait(5000)
    } else {
        console.log("\nskipped setting trusted remote.\n")
    }

    console.log(`\nsetting min gas for ${targetNetwork} to ${minGas}...\n`)
    await setMinDstGas(
        {
            contract: localContract,
            packetType: 0,
            targetNetwork,
            minGas,
        },
        hre
    )
    await wait(5000)

    await setMinDstGas(
        {
            contract: localContract,
            packetType: 1,
            targetNetwork,
            minGas,
        },
        hre
    )

    if (!skipAdapter && !gasOnly) {
        await wait(5000)
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

    if (!gasOnly) {
        if (!skipAdapter) {
            await wait(3000)
            console.log("\nsetting ULN301 params...\n")
            await setupUln301(
                {
                    localContract,
                    dataOnly: false,
                },
                hre
            )
        } else {
            console.log("\nskipped setting ULN301 params.\n")
        }
        await wait(3000)
        console.log("\nsetting DVN config...\n")
        await setupDVNs(
            {
                localContract,
                remoteContract,
                targetNetwork,
                dataOnly: false,
            },
            hre
        )
    }
}
