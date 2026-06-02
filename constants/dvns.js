// https://metadata.layerzero-api.com/v1/metadata/deployments
const meta = require("./metadata.json")

const NIL_CONFIRMATIONS = 2 ** 64 - 1
const NIL_DVN_COUNT = 2 ** 8 - 1
const EXECUTOR_CONFIG_TYPE = 1
const ULN_CONFIG_TYPE = 2

// normalize chain names
if (meta["hyperliquid"]) meta["hyperliquid"].chainKey = "hyperevm"
if (meta["hyperliquid-mainnet"]) meta["hyperliquid-mainnet"].chainKey = "hyperevm-mainnet"
if (meta["hyperliquid-testnet"]) meta["hyperliquid-testnet"].chainKey = "hyperevm-testnet"

// init
const dvns = {}
const libs = {}
const eidV2 = {}
const chains = Object.keys(meta)

for (const chain of chains) {
    // map chain>DVN id>address for all DVNs, excluding v1 and dead addresses
    meta[chain].chainKey = meta[chain].chainKey.replace("-mainnet", "")
    const entry = meta[chain]
    dvns[entry.chainKey] = {}

    if (!entry.dvns) {
        // console.warn(`No DVNs found for chain ${chain}, skipping...`)
        continue
    }

    Object.keys(entry.dvns).forEach((address) => {
        const dvn = entry.dvns[address]

        if (dvn.version === 2 && dvn.id && !dvn.id.includes("dead") && !dvn.lzReadCompatible && !dvn.deprecated) {
            dvns[entry.chainKey][dvn.id] = address
        }
    })

    // get libs
    if (entry.deployments) {
        const deployments = entry.deployments.find((deployment) => deployment.version === 1)
        if (deployments) {
            libs[entry.chainKey] = {}
            Object.keys(deployments).forEach((lib) => {
                libs[entry.chainKey][lib] = deployments[lib].address || deployments[lib]
            })
        } else {
            // console.warn(`No V1 deployment found for chain ${chain}`)
        }

        const deploymentsV2 = entry.deployments.find((deployment) => deployment.version === 2)
        eidV2[entry.chainKey] = deploymentsV2 ? deploymentsV2.eid : undefined
    } else {
        // console.warn(`No deployments found for chain ${chain}`)
    }
}

module.exports = {
    dvns,
    libs,
    eidV2,
    NIL_CONFIRMATIONS,
    NIL_DVN_COUNT,
    EXECUTOR_CONFIG_TYPE,
    ULN_CONFIG_TYPE,
    LZ: "layerzero-labs",
    HORIZEN: "horizen-labs",
    CANARY: "canary",
    NETHERMIND: "nethermind",
    BCW: "bcw",
    TSS: "tss",
}
