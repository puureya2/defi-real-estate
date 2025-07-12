import { ethers } from "hardhat";
import { expect } from "chai";
import { PropertyTokenFactory, PropertyToken } from "../typechain-types";

describe("🏗️ PropertyTokenFactory", function () {
  let factory: PropertyTokenFactory;
  let tokenAddress: string;
  let token: PropertyToken;

  const propertyId = 101;
  const name = "VillaX Token";
  const symbol = "VILLAX";
  const totalSupply = ethers.parseUnits("1000", 18);
  const pricePerToken = ethers.parseEther("0.01");

  let admin: any;
  let buyer: any;

  beforeEach(async () => {
    [admin, buyer] = await ethers.getSigners();

    // Deploy the factory
    const Factory = await ethers.getContractFactory("PropertyTokenFactory");
    factory = await Factory.deploy();
    await factory.waitForDeployment();

    // Create a property token
    const tx = await factory.createERC20Property(
      name,
      symbol,
      totalSupply,
      pricePerToken,
      propertyId
    );
    const receipt = await tx.wait();

    const event = receipt!.logs
      .map((log: any) => {
        try {
          return factory.interface.parseLog(log);
        } catch {
          return null;
        }
      })
      .find((e: any) => e?.name === "PropertyTokenCreated");

    tokenAddress = event?.args?.tokenAddress;
    token = await ethers.getContractAt("PropertyToken", tokenAddress);
  });

  it("✅ Should deploy factory and create token", async () => {
    expect(await factory.getAllTokens()).to.include(tokenAddress);
    expect(await factory.propertyToToken(propertyId)).to.equal(tokenAddress);
  });

  it("✅ Should mint total supply to admin", async () => {
    const balance = await token.balanceOf(admin.address);
    expect(balance).to.equal(totalSupply);
  });

  it("✅ Should let a user buy tokens", async () => {
    const amountToBuy = ethers.parseUnits("10", 18); // Instead of just 10
    const price = await token.pricePerToken(); // Assuming price is in wei
    const totalCost = price * 10n;

    await token.connect(buyer).buy({ value: totalCost });

    const buyerBalance = await token.balanceOf(buyer.address);

    expect(buyerBalance).to.equal(amountToBuy);
  });

  it("✅ Should allow admin to withdraw ETH", async () => {
    const cost = pricePerToken * 5n;

    // Buyer buys tokens
    await token.connect(buyer).buy({ value: cost });

    const initialAdminETH = await ethers.provider.getBalance(admin.address);

    // Withdraw
    const withdrawTx = await token.connect(admin).withdrawFunds();
    const gasUsed = (await withdrawTx.wait())?.gasUsed;
    const gasPrice = withdrawTx.gasPrice!;
    const gasCost = gasUsed! * gasPrice;

    const finalAdminETH = await ethers.provider.getBalance(admin.address);

    expect(finalAdminETH).to.be.closeTo(
      initialAdminETH + cost - gasCost,
      ethers.parseEther("0.001")
    );
  });

  it("✅ Should update price and burn unsold tokens", async () => {
    await token.connect(admin).setPricePerToken(ethers.parseEther("0.02"));
    expect(await token.pricePerToken()).to.equal(ethers.parseEther("0.02"));

    const burnAmount = ethers.parseUnits("200", 18);
    await token.connect(admin).burnUnsold(burnAmount);
    const remaining = await token.balanceOf(admin.address);

    expect(remaining).to.equal(totalSupply - burnAmount);
  });
});
