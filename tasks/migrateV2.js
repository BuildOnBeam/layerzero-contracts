const setupDVNs = require("./setupDVNs")
const setupUln301 = require("./setupUln301")

module.exports = async function ({ localContract, remoteContract, targetNetwork, dataOnly }, hre) {
    await setupUln301({ localContract, dataOnly }, hre)
    await setupDVNs({ localContract, remoteContract, targetNetwork, dataOnly }, hre)
}
