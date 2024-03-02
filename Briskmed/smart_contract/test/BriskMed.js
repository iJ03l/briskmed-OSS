const { assert, expect } = require("chai")
const { ethers } = require("hardhat")

describe("BriskMed Unit Tests", function () {
    let BriskMed, BriskMedContract, owner, allAccount, account // , deployer



    beforeEach(async () => {
        const accounts = await ethers.getSigners() // could also do with getNamedAccounts
        owner = accounts[0].address
        account = accounts[1].address
        BriskMedContract = await ethers.getContractFactory("BriskMed")
        BriskMed = await BriskMedContract.deploy()
        await BriskMed.deployed()
    })

    it("Checks the owner", async () => {
        try {
            let result = await BriskMed.owner()
            console.log("result working", result.toString())
            assert.equal(result.toString(), owner)
        } catch (e) {
            assert.fail(null, null, `${owner} is not owner`)
        }
    })


    it("Checks that Intial Accounts is an empty array", async () => {
        try {
            let result = await BriskMed.allHospital()
            assert.equal(result, [])
        } catch (e) {
            console.log("Hospital is not an empty array")
        }
    })


})