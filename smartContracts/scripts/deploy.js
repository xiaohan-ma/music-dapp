// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

const main = async () => {
  // Grab address of contract deployer
  const [deployer] = await hre.ethers.getSigners();
  const accountBalance = await deployer.getBalance();

  console.log("Contract deployed by deployer:", deployer.address);
  console.log("Deployer account balance:", accountBalance.toString());

  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy

  // Compile contract and generate files needed under artifacts
  const otofyFactory = await hre.ethers.getContractFactory("OtofyMarketplace");
  // Hardhat creates a local Eth network for the contract
  const otofyContract = await otofyFactory.deploy();
  // Wait for deployment
  await otofyContract.deployed();
  console.log("Contract deploy to address:", otofyContract.address);
};

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
