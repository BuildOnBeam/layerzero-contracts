const { dvns, NIL_CONFIRMATIONS, NIL_DVN_COUNT, LZ, HORIZEN, NETHERMIND, CANARY } = require("./dvns")

const ULN = {
    confirmations: undefined,
    requiredDVNCount: undefined,
    optionalDVNCount: undefined,
    optionalDVNThreshold: undefined,
    requiredDVNs: [],
    optionalDVNs: [],
}

const tokens = {
    beam: {
        BeamNativeOFT: {
            name: "LayerZero Beam",
            symbol: "LZBEAM",
            withFee: true,
            isNative: true,
        },
        NativeOFTWithFeeUpgradeable: {
            name: "LayerZero Merit Circle",
            symbol: "LZMC",
            withFee: true,
            isNative: true,
        },
        ExtendedONFT721Upgradeable: {
            name: "Edenhorde",
            symbol: "EH",
            baseUri: "https://ipfs.io/ipfs/QmbHSG2Y14wy2mSF7L57fzE4evv1BhTtUWtkzUaSnUsacB/",
            royaltyBasePoints: 500,
        },
        UsdcOFT: {
            name: "USD Coin",
            symbol: "USDC",
            withFee: true,
        },
        UsdtOFT: {
            name: "Tether USD",
            symbol: "USDT",
            withFee: true,
        },
        AvaxOFT: {
            name: "Avalanche",
            symbol: "AVAX",
            withFee: true,
            minGas: 10000000,
        },
        GobOFT: {
            name: "Goons of Balatroon",
            symbol: "GOB",
            withFee: true,
        },
        DomiOFT: {
            name: "Domi",
            symbol: "DOMI",
            withFee: true,
        },
        ForgottenPlaylandOFT: {
            name: "Forgotten Playland",
            symbol: "FP",
            withFee: true,
        },
        CastleOfBlackwaterOFT: {
            name: "Castle of Blackwater",
            symbol: "COBE",
            withFee: true,
        },
        EthereumOFT: {
            name: "Ethereum",
            symbol: "ETH",
            withFee: true,
        },
        BeamcatProxyOFT: {
            address: "0xEeee2A2E650697d2A8e8BC990C2f3d04203bE06f",
            withFee: true,
        },
    },
    "beam-testnet": {
        BeamNativeOFT: {
            name: "LayerZero Beam",
            symbol: "LZBEAM",
            withFee: true,
            isNative: true,
            minGas: 10000000,
        },
        NativeOFTWithFeeUpgradeable: {
            name: "LayerZero Wrapped Merit Circle",
            symbol: "LZMC",
            withFee: true,
            isNative: true,
        },
        NativeOFTV2: {
            name: "LayerZero Merit Circle",
            symbol: "LZMC",
            isNative: true,
        },
        ExtendedONFT721: {
            name: "Snakes on a chain",
            symbol: "SNAKE",
            baseUri: "https://snake-on-a-chain-euppi.ondigitalocean.app/token/",
            royaltyBasePoints: 500,
        },
        UsdcOFT: {
            name: "USD Coin",
            symbol: "USDC",
            withFee: true,
        },
        UsdtOFT: {
            name: "Tether USD",
            symbol: "USDT",
            withFee: true,
        },
        AvaxOFT: {
            name: "Avalanche",
            symbol: "AVAX",
            withFee: true,
            sendConfig: {
                ...ULN,
                confirmations: 1,
                requiredDVNs: [LZ],
            },
        },
        BoberProxyOFT: {
            address: "0x16f001514C5953Bd6505D3007F58DE1Ca496de12",
            withFee: true,
            sendConfig: {
                ...ULN,
                confirmations: 1,
                requiredDVNs: [LZ],
            },
        },
    },
    ethereum: {
        BeamProxyOFT: {
            address: "0x62D0A8458eD7719FDAF978fe5929C6D342B0bFcE", // BEAM
            withFee: true,
        },
        ProxyOFTWithFeeUpgradeable: {
            address: "0x949D48EcA67b17269629c7194F4b727d4Ef9E5d6", // MC
            withFee: true,
        },
        ProxyONFT721Upgradeable: {
            address: "0x9eEAeCBE2884AA7e82f450E3Fc174F30Fc2a8de3", // Edenhorde Eclipse
            minGas: 100000,
        },
        UsdcProxyOFT: {
            address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48", // USDC
            withFee: true,
        },
        UsdtProxyOFT: {
            address: "0xdac17f958d2ee523a2206206994597c13d831ec7", // USDT
            withFee: true,
        },
        DomiProxyOFT: {
            address: "0x45C2F8c9B4c0bDC76200448cc26C48ab6ffef83F",
            withFee: true,
        },
        ForgottenPlaylandProxyOFT: {
            address: "0xEeee2A2E650697d2A8e8BC990C2f3d04203bE06f",
            withFee: true,
        },
        CastleOfBlackwaterProxyOFT: {
            address: "0xc61eDB127f58f42F47a8bE8aeBe83cF602A53878",
            withFee: true,
        },
        EthereumNativeOFT: {
            name: "LayerZero Ethereum",
            symbol: "LZETH",
            withFee: true,
            isNative: true,
        },
    },
    goerli: {
        UsdcProxyOFT: {
            address: "0x2724A590fe9cC7c66A83204aa11D6ec7Aa8e7C58", // USDC
            withFee: true,
        },
        UsdtProxyOFT: {
            address: "0x908C7A34a87FD8e207BC4585707E484Ed2c9E8aE", // USDT
            withFee: true,
        },
    },
    avalanche: {
        AvaxNativeOFT: {
            name: "LayerZero Avalanche",
            symbol: "LZAVAX",
            withFee: true,
            isNative: true,
        },
        BeamOFT: {
            name: "Beam",
            symbol: "BEAM",
            withFee: true,
        },
        DomiProxyOFT: {
            address: "0xFc6Da929c031162841370af240dEc19099861d3B",
            withFee: true,
        },
    },
    fuji: {
        ProxyOFTWithFeeUpgradeable: {
            address: "0x955723e26bd1b2165391BCaf39A92f77b30FFe01", // MC
            withFee: true,
        },
        ProxyONFT721: {
            address: "0x588348d84498d0689B76F89438bE58999a5434EE", // Snakes on a chain
            minGas: 100000,
        },
        AvaxNativeOFT: {
            name: "LayerZero Avalanche",
            symbol: "LZAVAX",
            withFee: true,
            isNative: true,
            sendConfig: {
                ...ULN,
                confirmations: 1,
                requiredDVNs: [LZ],
            },
        },
        BeamOFT: {
            name: "Beam",
            symbol: "BEAM",
            withFee: true,
        },
        BoberOFT: {
            name: "Bober",
            symbol: "BOB",
            withFee: true,
            sendConfig: {
                ...ULN,
                confirmations: 1,
                requiredDVNs: [LZ],
            },
        },
    },
    arbitrum: {
        GobProxyOFT: {
            address: "0xa2f9ecf83a48b86265ff5fd36cdbaaa1f349916c", // USDT
            withFee: true,
        },
    },
    bsc: {
        DomiProxyOFT: {
            address: "0xBBCA42c60b5290F2c48871A596492F93fF0Ddc82",
            withFee: true,
        },
    },
    base: {
        BeamcatOFT: {
            name: "BEAMCAT",
            symbol: "BCAT",
            withFee: true,
        },
        BeamOFT: {
            name: "Beam",
            symbol: "BEAM",
            withFee: true,
        },
    },
    hyperevm: {
        BeamOFT: {
            name: "Beam",
            symbol: "BEAM",
            withFee: true,
            sendConfig: {
                ...ULN,
                confirmations: 1,
                requiredDVNs: [LZ, HORIZEN],
                optionalDVNs: [CANARY, NETHERMIND],
            },
        },
    },
}

// check and complete ULN config for all tokens
Object.keys(tokens).forEach((chain) => {
    Object.keys(tokens[chain]).forEach((token) => {
        const tokenConfig = tokens[chain][token]
        const uln = tokenConfig.sendConfig
        if (uln) {
            if (!uln.requiredDVNs || !uln.requiredDVNs.length) {
                throw new Error(`Token ${token} on chain ${chain} has an ulnConfig but no requiredDVNs`)
            }
            if (!uln.optionalDVNs || (uln.optionalDVNThreshold > 0 && !uln.optionalDVNs.length)) {
                throw new Error(`Token ${token} on chain ${chain} has an ulnConfig but no optionalDVNs`)
            }

            if (uln.requiredDVNs.filter((dvn) => !dvn).length > 0 || uln.optionalDVNs.filter((dvn) => !dvn).length > 0) {
                throw new Error(`Token ${token} on chain ${chain} has an ulnConfig with non-existing requiredDVNs or optionalDVNs`)
            }

            if (uln.confirmations === undefined || uln.confirmations < 0) {
                throw new Error(`Token ${token} on chain ${chain} has an ulnConfig with invalid confirmations`)
            }

            const resolveDvn = (dvn) => {
                if (!dvns[chain] || !dvns[chain][dvn]) {
                    throw new Error(`Token ${token} on chain ${chain} has an ulnConfig with non-existing dvn ${dvn}`)
                }
            }

            uln.requiredDVNs.forEach(resolveDvn)
            uln.optionalDVNs.forEach(resolveDvn)

            tokens[chain][token].sendConfig.optionalDVNThreshold =
                uln.optionalDVNThreshold != null ? uln.optionalDVNThreshold : uln.optionalDVNs.length ? 1 : 0
            tokens[chain][token].sendConfig.requiredDVNCount = uln.requiredDVNs.length
            tokens[chain][token].sendConfig.optionalDVNCount = uln.optionalDVNs.length /*|| NIL_DVN_COUNT*/
        }
    })
})

module.exports = tokens
