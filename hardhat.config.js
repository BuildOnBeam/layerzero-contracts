require("dotenv").config()

require("@nomiclabs/hardhat-etherscan")
require("@nomiclabs/hardhat-waffle")
require("@openzeppelin/hardhat-upgrades")
require("@xtools-at/hardhat-sourcify")
require("hardhat-deploy")
require("hardhat-deploy-ethers")
require("solidity-coverage")
require("./tasks")
// require("hardhat-contract-sizer")
// require("hardhat-gas-reporter")

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
    const accounts = await hre.ethers.getSigners()

    for (const account of accounts) {
        console.log(account.address)
    }
})

function getMnemonic(networkName) {
    if (networkName) {
        const mnemonic = process.env["MNEMONIC_" + networkName.toUpperCase()]
        if (mnemonic && mnemonic !== "") {
            return mnemonic
        }
    }

    const mnemonic = process.env.MNEMONIC
    if (!mnemonic || mnemonic === "") {
        return "test test test test test test test test test test test junk"
    }

    return mnemonic
}

function accounts(networkName) {
    if (process.env.DEPLOYER_KEY && process.env.PROXY_OWNER_KEY) {
        return [`${process.env.DEPLOYER_KEY}`, `${process.env.PROXY_OWNER_KEY}`]
    }

    return { mnemonic: getMnemonic(networkName) }
}

// Etherscan API keys and -urls
const apiKey = {
    ethereum: process.env.ETHERSCAN_ONLY_API_KEY || "",
    goerli: process.env.ETHERSCAN_ONLY_API_KEY || "",
    sepolia: process.env.ETHERSCAN_ONLY_API_KEY || "",
    bsc: process.env.BSCSCAN_API_KEY || "",
    "bsc-testnet": process.env.BSCSCAN_API_KEY || "",
    avalanche: process.env.SNOWTRACE_API_KEY || "",
    fuji: process.env.SNOWTRACE_API_KEY || "",
    polygon: process.env.POLYGONSCAN_API_KEY || "",
    mumbai: process.env.POLYGONSCAN_API_KEY || "",
    fantom: process.env.FANTOMSCAN_API_KEY || "",
    "fantom-testnet": process.env.FANTOMSCAN_API_KEY || "",
    optimism: process.env.OPTIMISM_API_KEY || "",
    "optimism-goerli": process.env.OPTIMISM_API_KEY || "",
    "arbitrum-goerli": process.env.ARBISCAN_API_KEY || "",
    arbitrum: process.env.ARBISCAN_API_KEY || "",
    "imtbl-zkevm-testnet": "a",
    "imtbl-zkevm": "a",
    base: process.env.BASESCAN_API_KEY || "",
    "base-testnet": process.env.BASESCAN_API_KEY || "",
}

const apiUrl = {
    ethereum: "https://api.etherscan.io",
    goerli: "https://api-goerli.etherscan.io",
    sepolia: "https://api-sepolia.etherscan.io",
    bsc: "https://api.bscscan.com",
    "bsc-testnet": "https://api-testnet.bscscan.com",
    avalanche: "https://api.snowtrace.io",
    fuji: "https://api-testnet.snowtrace.io",
    polygon: "https://api.polygonscan.com",
    mumbai: "https://api-testnet.polygonscan.com",
    fantom: "https://api.ftmscan.com",
    "fantom-testnet": "https://api-testnet.ftmscan.com",
    optimism: "https://api-optimistic.etherscan.io",
    "optimism-goerli": "https://api-goerli-optimistic.etherscan.io",
    arbitrum: "https://api.arbiscan.io",
    "arbitrum-goerli": "https://api-goerli.arbiscan.io",
    "imtbl-zkevm-testnet": "https://explorer.testnet.immutable.com/api",
    "imtbl-zkevm": "https://explorer.immutable.com/api",
    base: "https://basescan.org",
    "base-testnet": "https://sepolia.basescan.org",
}

// `hardhat-deploy etherscan-verify` network config
function verifyChain(networkName) {
    return {
        etherscan: {
            apiKey: apiKey[networkName] || undefined,
            apiUrl: apiUrl[networkName] || undefined,
        },
    }
}

// `hardhat verify` network config
function customChain(networkName) {
    return {
        network: networkName,
        chainId: networks[networkName] ? networks[networkName].chainId : -1,
        urls: {
            apiURL: apiUrl[networkName] ? `${apiUrl[networkName]}/api` : undefined,
            browserURL: apiUrl[networkName] ? apiUrl[networkName].replace("api.", "").replace("api-", "") : undefined,
        },
    }
}

const networks = {
    // mainnets
    ethereum: {
        url: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161", // public infura endpoint
        chainId: 1,
        accounts: accounts(),
        verify: verifyChain("ethereum"),
    },
    bsc: {
        url: "https://bsc-dataseed1.binance.org",
        chainId: 56,
        accounts: accounts(),
        verify: verifyChain("bsc"),
    },
    avalanche: {
        url: "https://api.avax.network/ext/bc/C/rpc",
        chainId: 43114,
        accounts: accounts(),
        verify: verifyChain("avalanche"),
    },
    polygon: {
        url: "https://rpc-mainnet.maticvigil.com",
        chainId: 137,
        accounts: accounts(),
        verify: verifyChain("polygon"),
    },
    arbitrum: {
        url: "https://arb1.arbitrum.io/rpc",
        chainId: 42161,
        accounts: accounts(),
        verify: verifyChain("arbitrum"),
    },
    optimism: {
        url: "https://mainnet.optimism.io",
        chainId: 10,
        accounts: accounts(),
        verify: verifyChain("optimism"),
    },
    fantom: {
        url: "https://rpcapi.fantom.network",
        chainId: 250,
        accounts: accounts(),
        verify: verifyChain("fantom"),
    },
    metis: {
        url: "https://andromeda.metis.io/?owner=1088",
        chainId: 1088,
        accounts: accounts(),
    },
    beam: {
        url: "https://subnets.avax.network/beam/mainnet/rpc",
        chainId: 4337,
        accounts: accounts(),
    },
    "imtbl-zkevm": {
        url: "https://rpc.immutable.com",
        chainId: 13371,
        accounts: accounts(),
    },
    base: {
        url: "https://mainnet.base.org",
        chainId: 8453,
        accounts: accounts(),
        verify: verifyChain("base"),
    },

    // testnets
    goerli: {
        url: "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161", // public infura endpoint
        chainId: 5,
        accounts: accounts(),
        verify: verifyChain("goerli"),
    },
    sepolia: {
        url: "https://ethereum-sepolia.publicnode.com",
        chainId: 11155111,
        accounts: accounts(),
        verify: verifyChain("sepolia"),
    },
    "bsc-testnet": {
        url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
        chainId: 97,
        accounts: accounts(),
        verify: verifyChain("bsc-testnet"),
    },
    fuji: {
        url: "https://api.avax-test.network/ext/bc/C/rpc",
        chainId: 43113,
        accounts: accounts(),
        verify: verifyChain("fuji"),
    },
    mumbai: {
        url: "https://rpc-mumbai.maticvigil.com/",
        chainId: 80001,
        accounts: accounts(),
        verify: verifyChain("mumbai"),
    },
    "arbitrum-goerli": {
        url: "https://goerli-rollup.arbitrum.io/rpc/",
        chainId: 421613,
        accounts: accounts(),
        verify: verifyChain("arbitrum-goerli"),
    },
    "optimism-goerli": {
        url: "https://goerli.optimism.io/",
        chainId: 420,
        accounts: accounts(),
        verify: verifyChain("optimism-goerli"),
    },
    "fantom-testnet": {
        url: "https://rpc.ankr.com/fantom_testnet",
        chainId: 4002,
        accounts: accounts(),
        verify: verifyChain("fantom-testnet"),
    },
    "beam-testnet": {
        url: "https://subnets.avax.network/beam/testnet/rpc",
        chainId: 13337,
        accounts: accounts(),
    },
    "imtbl-zkevm-testnet": {
        url: "https://rpc.testnet.immutable.com",
        chainId: 13473,
        accounts: accounts(),
    },
    "base-testnet": {
        url: "https://sepolia.base.org",
        chainId: 84532,
        accounts: accounts(),
        verify: verifyChain("base-testnet"),
    },
}

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import("hardhat/config").HardhatUserConfig
 */
module.exports = {
    solidity: {
        compilers: [
            {
                version: "0.8.4",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200,
                    },
                },
            },
            {
                version: "0.7.6",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200,
                    },
                },
            },
            {
                version: "0.8.12",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200,
                    },
                },
            },
            {
                version: "0.8.18",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200,
                    },
                },
            },
        ],
    },

    contractSizer: {
        alphaSort: false,
        runOnCompile: true,
        disambiguatePaths: false,
    },

    namedAccounts: {
        deployer: {
            default: 0, // wallet address 0, of the mnemonic in .env
        },
        proxyOwner: {
            default: process.env.PROXY_OWNER_ADDRESS || 1,
        },
    },

    mocha: {
        timeout: 100000000,
    },

    networks,

    //`hardhat verify` config
    etherscan: {
        apiKey,
        customChains: Object.keys(apiUrl).map((networkName) => customChain(networkName)),
    },
}
