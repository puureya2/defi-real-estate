// scripts/deploy.ts

import { ethers } from "hardhat";
import { parseUnits, parseEther, formatUnits, formatEther } from "ethers";
import * as dotenv from "dotenv";

dotenv.config();

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("👷 Deploying contracts with:", deployer.address);

  // 1️⃣ Deploy the PropertyTokenFactory
  const Factory = await ethers.getContractFactory("PropertyTokenFactory");
  const factory = await Factory.deploy();
  await factory.waitForDeployment();

  const factoryAddress = await factory.getAddress();
  console.log("🏭 PropertyTokenFactory deployed at:", factoryAddress);

  // 2️⃣ Deploy a sample PropertyToken using the factory
  const propertyName = "VillaX Token";
  const propertySymbol = "VILLAX";
  const totalSupply = parseUnits("1000", 18);
  const pricePerToken = parseEther("0.01");
  const propertyId = 101;

  console.log(`🧱 Creating property ${propertyName} (${propertySymbol})...`);

  // TS doesn't know about custom methods — cast to any
  const tx = await (factory as any).createERC20Property(
    propertyName,
    propertySymbol,
    totalSupply,
    pricePerToken,
    propertyId
  );

  const receipt = await tx.wait();

  // Parse event logs manually
  const event = receipt?.logs
    ?.map((log: any) => {
      try {
        return factory.interface.parseLog(log);
      } catch {
        return null;
      }
    })
    .find((log: any) => log?.name === "PropertyTokenCreated");

  const tokenAddress = event?.args?.tokenAddress;

  console.log(`🏠 PropertyToken deployed at: ${tokenAddress}`);
  console.log(`🎉 Property ${propertyId} initialized with ${formatUnits(totalSupply, 18)} tokens at ${formatEther(pricePerToken)} ETH each`);
}

main().catch((error) => {
  console.error("❌ Error:", error);
  process.exitCode = 1;
});
