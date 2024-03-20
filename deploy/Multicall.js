module.exports = async function ({ deployments, getNamedAccounts }) {
    const { deploy } = deployments
    const { deployer } = await getNamedAccounts()

    const gasOverrides = {
        maxFeePerGas: "15000000005", // 15 gwei
        maxPriorityFeePerGas: "10000000005", // 10 gwei
    }

    console.log(`>>> your address: ${deployer}`)

    console.log(`deploying Multicall3`)
    await deploy("Multicall3", {
        from: deployer,
        args: [],
        log: true,
        waitConfirmations: 1,
        ...gasOverrides,
    })
}

module.exports.tags = ["Multicall"]
