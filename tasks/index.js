// set the Oracle address for the OmniCounter
// example:
task(
    "omniCounterSetOracle",
    "set the UA (an OmniCounter contract) to use the specified oracle for the destination chain",
    require("./omniCounterSetOracle")
)
    .addParam("targetNetwork", "the target network name, ie: fuji, or mumbai, etc (from hardhat.config.js)")
    .addParam("oracle", "the Oracle address for the specified targetNetwork")

// get the Oracle for sending to the destination chain
task("ocGetOracle", "get the Oracle address being used by the OmniCounter", require("./ocGetOracle")).addParam(
    "targetNetwork",
    "the target network name, ie: fuji, or mumbai, etc (from hardhat.config.js)"
)

//
task("ocPoll", "poll the counter of the OmniCounter", require("./ocPoll"))

//
task(
    "omniCounterIncrementWithParamsV1",
    "increment the destination OmniCounter with gas amount param",
    require("./omniCounterIncrementWithParamsV1")
)
    .addParam("targetNetwork", "the target network name, ie: fuji, or mumbai, etc (from hardhat.config.js)")
    .addParam("gasAmount", "the gas amount for the destination chain")

//
task(
    "omniCounterIncrementWithParamsV2",
    "increment the destination OmniCounter with gas amount param",
    require("./omniCounterIncrementWithParamsV2")
)
    .addParam("targetNetwork", "the target network name, ie: fuji, or mumbai, etc (from hardhat.config.js)")
    .addParam("gasAmount", "the gas amount for the destination chain")
    .addParam("airDropEthQty", "the amount of eth to drop")
    .addParam("airDropAddr", "the air drop address")

task("pingPongSetTrustedRemote", "set the trusted remote", require("./pingPongSetTrustedRemote")).addParam(
    "targetNetwork",
    "the targetNetwork to set as trusted"
)

task("ping", "call ping to start the pingPong with the target network", require("./ping"))
    .addParam("targetNetwork", "the targetNetwork to commence pingponging with")
    .addOptionalParam("n", "number of pings to send", 2, types.int)

task("getSigners", "show the signers of the current mnemonic", require("./getSigners")).addOptionalParam("n", "how many to show", 3, types.int)

task("approveERC20", "approve Omnichain proxy to transfer your ERC20 tokens", require("./approveERC20"))
    .addOptionalParam("contract", "the name of the OFT contract, e.g. 'ProxyOFTV2'", "")
    .addOptionalParam("address", "address of the token you want to approve (leave empty to use tokenConfig values)", "")
    .addOptionalParam("spender", "address that should get an allowance (overrides `contract`)", "")

task("approveNFT", "approve Omnichain proxy to transfer your ERC721/1155 tokens", require("./approveNFT"))
    .addOptionalParam("contract", "the name of the OFT contract, e.g. 'ProxyONFT'", "")
    .addOptionalParam("address", "address of the token you want to approve (leave empty to use tokenConfig values)", "")
    .addOptionalParam("spender", "address that should get an allowance (overrides `contract`)", "")

//
task("checkWireUp", "check wire up", require("./checkWireUp"))
    .addParam("e", "environment testnet/mainet")
    .addParam("contract", "the contract to delete and redeploy")

//
task("checkWireUpAll", "check wire up all", require("./checkWireUpAll"))
    .addParam("e", "environment testnet/mainet")
    .addParam("contract", "name of contract")
    .addOptionalParam("proxyContract", "name of proxy contract")
    .addOptionalParam("proxyChain", "name of proxy chain")

//
task(
    "setTrustedRemote",
    "setTrustedRemote(chainId, sourceAddr) to enable inbound/outbound messages with your other contracts",
    require("./setTrustedRemote")
)
    .addParam("targetNetwork", "the target network to set as a trusted remote")
    .addOptionalParam("localContract", "Name of local contract if the names are different")
    .addOptionalParam("remoteContract", "Name of remote contract if the names are different")
    .addOptionalParam("contract", "If both contracts are the same name")

//
task("sendOFT", "send tokens to another chain", require("./sendOFT"))
    .addParam("qty", "qty of tokens to send")
    .addParam("targetNetwork", "the target network to let this instance receive messages from")
    .addOptionalParam("localContract", "Name of local contract if the names are different")
    .addOptionalParam("remoteContract", "Name of remote contract if the names are different")
    .addOptionalParam("contract", "If both contracts are the same name")
    .addOptionalParam("decimals", "decimals of contract if not 18")

//
task("onftMint", "mint() mint ONFT", require("./onftMint")).addParam("contract", "Name of contract")

//
task("ownerOf", "ownerOf(tokenId) to get the owner of a token", require("./ownerOf"))
    .addParam("contract", "Name of contract")
    .addParam("tokenId", "the tokenId of ONFT")

//
task("sendONFT721", "send an ONFT nftId from one chain to another", require("./sendONFT721"))
    .addParam("tokenId", "the tokenId of ONFT")
    .addParam("targetNetwork", "the chainId to transfer to")
    .addParam("contract", "ONFT contract name")

//
task("sendONFT1155", "send an ONFT nftId from one chain to another", require("./sendONFT1155"))
    .addParam("tokenId", "the tokenId of ONFT")
    .addParam("targetNetwork", "the chainId to transfer to")
    .addParam("contract", "ONFT contract name")
    .addOptionalParam("amount", "number of tokens", 1, types.int)

//
task("setMinDstGas", "set min gas required on the destination gas", require("./setMinDstGas"))
    .addParam("packetType", "message Packet type")
    .addParam("targetNetwork", "the chainId to transfer to")
    .addParam("contract", "contract name")
    .addParam("minGas", "min gas")

//
task("setCustomAdapterParams", "enable custom adapter params", require("./setCustomAdapterParams")).addParam("contract", "contract name")

//
task("incrementCounter", "increment the destination OmniCounter", require("./incrementCounter")).addParam(
    "targetNetwork",
    "the target network name, ie: fuji, or mumbai, etc (from hardhat.config.js)"
)

// npx hardhat deployWireCheck --e testnet --contract ExampleOFT --proxy-contract ExampleBasedOFT --proxy-chain optimism-kovan
// npx hardhat deployWireCheck --e testnet --contract ExampleUniversalONFT721
task("deployWireCheck", "", require("./deployWireCheck"))
    .addParam("e", "environment testnet/mainet")
    .addParam("contract", "")
    .addOptionalParam("proxyChain", "")
    .addOptionalParam("proxyContract", "")

//
task("getStoredPayloadEvent", "Detect and clear stored payload", require("./getStoredPayloadEvent"))
    .addParam("txStart", "provide a transaction hash in the block you want to start in")
    .addParam("srcAddress", "")
    .addParam("desAddress", "")
    .addOptionalParam("txEnd", "provide a tx hash in the block you want to end at")
    .addOptionalParam("step", "provide a tx hash in the block you want to end at", 1000, types.int)
    .addOptionalParam("nonce", "nonce to clear")

//
task("getMessageFailedEvent", "Detect and clear failed message", require("./getMessageFailedEvent"))
    .addParam("txStart", "provide a transaction hash in the block you want to start in")
    .addParam("dstUa", "address of dst UA")
    .addOptionalParam("txEnd", "provide a tx hash in the block you want to end at")
    .addOptionalParam("step", "provide a tx hash in the block you want to end at", 1000, types.int)
    .addOptionalParam("nonce", "nonce to clear")

//
task("isFailedMessage", "check if failed message", require("./isFailedMessage"))
    .addParam("srcChainId", "")
    .addParam("srcAddress", "")
    .addParam("desAddress", "")
    .addParam("nonce", "")

//
task("isStoredPayload", "check if stored payload", require("./isStoredPayload"))
    .addParam("srcChainId", "")
    .addParam("srcAddress", "")
    .addParam("desAddress", "")
    .addOptionalParam("payload", "")
    .addOptionalParam("clear", "", false, types.boolean)

task("setupOFT", "go through all steps of the base OFTV2 setup", require("./setupOFT"))
    .addParam("localContract", "name of contract on source chain")
    .addParam("remoteContract", "name of contract on destination chain")
    .addParam("targetNetwork", "destination network")
    .addOptionalParam("minGas", "gas config", 0, types.int)
    .addOptionalParam("skipAdapter", "skip setting custom adapter params", false, types.boolean)
    .addOptionalParam("gasOnly", "skip setting trusted remote and custom adapter params", false, types.boolean)

task("setupOFTData", "READONLY all steps of the base OFTV2 setup", require("./setupOFTData"))
    .addParam("localContract", "name of contract on source chain")
    .addParam("remoteContract", "name of contract on destination chain")
    .addParam("targetNetwork", "destination network")
    .addOptionalParam("minGas", "gas config", 0, types.int)

task("setupONFT712", "go through all steps of the base ONFT setup", require("./setupONFT712"))
    .addParam("localContract", "name of contract on source chain")
    .addParam("remoteContract", "name of contract on destination chain")
    .addParam("targetNetwork", "destination network")
    .addOptionalParam("minGas", "gas config", 0, types.int)

task("setupONFT1155", "go through all steps of the base ONFT setup", require("./setupONFT1155"))
    .addParam("localContract", "name of contract on source chain")
    .addParam("remoteContract", "name of contract on destination chain")
    .addParam("targetNetwork", "destination network")
    .addOptionalParam("minGas", "gas config", 0, types.int)
    .addOptionalParam("skipAdapter", "skip setting custom adapter params", false, types.boolean)

task("transfer", "Fetches all ERC-20 Transfer events from a list of transaction IDs").setAction(async (taskArgs, hre) => {
    const txIds = [
        "0xff076be87f4bf6158d625118d8e9e2001c7dbd1a7e72a3d014f7771bdfa6dc0d",
        "0xf9bc7db7114b18ec9151592d923d53664652d7cd2e1f16494f2212c9d4e917d7",
        "0x03426bc297ecc8103b090a6f0d8f4cc6fdcf94090eec5ffea6c1588def50f664",
        "0x73cd758cd38ee909fe14d264bb9e21ee1a26cd1ca7ed021783d0852520c0bd3f",
        "0x7662be66a804a6475c0da317a653447282cdcbfa07bfa8aa9fd258c4ca3bbee8",
        "0x77490617306b8deaadef49c55b4d61685cff8e11b0e309e970d063559daedab9",
        "0xfcf22c950928cf0f646b5d6b9f668c31360a253f8a240f60eec2ed81fb0ee149",
        "0x306938dbf9920eb22d5880a3f361829136dbca42e77a20656c911eefaf358c61",
        "0x8cdb02dad0a311cbb1b77d89a2171234c7cba312a5e5939fbb18416100802af4",
        "0xd510256a732147e51231f1282904f78782f5ce5e5c71e592b2c4a802a269bee8",
        "0x23a0e754283878f8c099769d8e86d9901c56c32f3e46449f91733e9c4604d0f5",
        "0xbddf80f6fb0466f44e4f082cb60431c838b4d5199013e4efa2468f57a53efe26",
        "0xa2325f26dd0238433d0b5ede3b1d0b1d3bc13f8a8f682c6e19110988b315fe36",
        "0xdab2ecc354a39a51c711026e65a18a3924bb91dddc37cd1dc681f0dbec79fc15",
        "0x20372ec32b4a649fd38b9a55d7daa6ac77dfae7ed0c2d216c0b3624476f29170",
        "0x5189b0076294c52281e0ce809aeb95b172b0aeeadaf5f92d353654c20d79cd50",
        "0x0f21c9ab4e99fa67c5261d823a055c322b94ba0784d6ecf8f4f9052e2a3427ad",
        "0x690d57da370ac0198054e49a3759e94e26172422a60d1e28d42f3e81ae860351",
        "0x5499f54ec7adf86a2359df873f3bc87b8d103dfb1ae09c9ce7c9c09b673fb38d",
        "0x287590ce7c870488d9f9a73745ab9929cf57656fa2d590c46906a2b6e89598e9",
        "0xd4af9a078aac03ba59274e31e237a2eed3e6ee4223b9c69d594db785d82cf369",
        "0x666bc8685638235130850dcdc3d720c9eb188204e3613092c9b52f598a878c1a",
        "0x1f21ed54a942dab2293bd48fc17360a324f82851c0c9ac46fc1b982e624f8e77",
        "0x3be37f31d6dd58e1786a55b021a7236323268280734899245183fd4c657fae9c",
        "0x5969f1bd63e6c405678429b318139aca6053ae4ff7e1e91b77d77db1e0f1d68c",
        "0xa883712abe2da91be9bdc54890dfe2d2e131e6569eadd40927b97fa2503f0515",
        "0x84b1d071b41b97eb21e9e24d05aba5cde62b78b84cbe8e024b638c901e7f32eb",
        "0x25f016aa91e530f64649f0566a1835041a75ffc23fb3ad54286460584440c604",
        "0x901eed4557cd5d1180d23701c78e60fc62ed818b3884030565207a3d5d0c4810",
        "0x532d41585eaedc9c6f322049429dab497b28eebd5aae4302c075a07e8416a32c",
        "0xcdbec87b7e9854f4080e3e3ee722b07355577cb1141e171153e6e7b274c6b236",
        "0x0343b9f15e5bc0b73232153039bebabab6d7e876e5dfea8a91af3b14a537e186",
        "0x4337383481e64a1af4c5d87e8a758fb5b30372e33c9d538c4102485926d9e237",
        "0x87ccf669cdb36c32e8c4714b05647b714d445258f9d6fbfdc4fd026db9f48b94",
    ]

    const data = []
    for (const txId of txIds) {
        try {
            const txReceipt = await hre.ethers.provider.getTransactionReceipt(txId.trim())
            if (!txReceipt) {
                console.log(`Transaction receipt not found for txId: ${txId}`)
                continue
            }

            //console.log(`\nProcessing txId ${txId}:`, JSON.stringify(txReceipt, null, 2))

            for (const log of txReceipt.logs) {
                try {
                    const iface = new ethers.utils.Interface(["event Transfer(address indexed from, address indexed to, uint256 value)"])

                    const parsedLog = iface.parseLog(log)
                    if (parsedLog.name === "Transfer") {
                        console.log(`Transfer Event: 
                To: ${parsedLog.args.to}, 
                Value: ${parsedLog.args.value.toString()}
                Token: ${log.address}`)

                        data.push(`${log.address}, ${parsedLog.args.to}, ${parsedLog.args.value.toString()}`)
                    }
                } catch (error) {
                    // Ignore logs that cannot be parsed as Transfer events
                }
            }
        } catch (error) {
            console.error(`Error processing txId ${txId}:`, error.message)
        }
    }

    console.log(JSON.stringify(data, null, 2))
})
