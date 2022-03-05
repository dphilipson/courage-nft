import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";
import { BigNumber, BigNumberish, ContractTransaction } from "ethers";
import { ethers } from "hardhat";
import { Courage } from "../typechain";

chai.use(chaiAsPromised);

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
const BURN_ADDRESS = "0x0000000000000000000000000000000000000001";

describe("Courage", () => {
  let courage: Courage;
  let owner1: SignerWithAddress;
  let owner2: SignerWithAddress;
  let owner3: SignerWithAddress;

  before(async () => {
    [owner1, owner2, owner3] = await ethers.getSigners();
  });

  beforeEach(async () => {
    const Courage = await ethers.getContractFactory("Courage");
    courage = await Courage.deploy();
    await courage.deployed();
  });

  it("returns the correct name and symbol", async () => {
    expect(await courage.name()).to.equal("Courage");
    expect(await courage.symbol()).to.equal("COUR");
  });

  it("starts with tokens for everyone except the burn address", async () => {
    await expectOwnedTokens(owner1.address, [owner1.address]);
    await expectOwnedTokens(BURN_ADDRESS, []);
  });

  it("can transfer an original token", async () => {
    await transfer(owner1, owner2, owner1.address);
    await expectOwnedTokens(owner1.address, []);
    await expectOwnedTokens(owner2.address, [owner2.address, owner1.address]);
  });

  it("can transfer a nonoriginal token to the original owner", async () => {
    await transfer(owner1, owner2, owner1.address);
    await transfer(owner2, owner1, owner1.address);
    await expectOwnedTokens(owner1.address, [owner1.address]);
    await expectOwnedTokens(owner2.address, [owner2.address]);
  });

  it("can transfer a nonoriginal token to a third owner", async () => {
    await transfer(owner1, owner2, owner1.address);
    await transfer(owner2, owner3, owner1.address);
    await expectOwnedTokens(owner1.address, []);
    await expectOwnedTokens(owner2.address, [owner2.address]);
    await expectOwnedTokens(owner3.address, [owner3.address, owner1.address]);
  });

  it("can't transfer tokens you don't own", async () => {
    await transfer(owner1, owner2, owner1.address);
    await expectTransferError(
      owner1,
      owner2.address,
      owner1.address,
      "ERC721: transfer caller is not owner nor approved"
    );
  });

  it("can't transfer to the burn address", async () => {
    await expectTransferError(owner1, BURN_ADDRESS, owner1.address, "address");
  });

  it("burns an original token", async () => {
    await burn(owner1, owner1.address);
    await expectOwnedTokens(owner1.address, []);
    await expectNotExists(owner1.address);
  });

  it("burns a nonoriginal token", async () => {
    await transfer(owner1, owner2, owner1.address);
    await burn(owner2, owner1.address);
    await expectOwnedTokens(owner1.address, []);
    await expectOwnedTokens(owner2.address, [owner2.address]);
    await expectNotExists(owner1.address);
  });

  it("updates total supply when burning tokens", async () => {
    const initialTotalSupply = BigNumber.from(1).shl(160).sub(2);
    await expectTotalSupply(initialTotalSupply);
    await burn(owner1, owner1.address);
    await expectTotalSupply(initialTotalSupply.sub(1));
  });

  it("updates token indices when burning", async () => {
    const owner1Index = BigNumber.from(owner1.address).sub(2);
    await expectTokenAtIndex(owner1Index, owner1.address);
    await burn(owner1, owner1.address);
    await expectTokenAtIndex(owner1Index, BigNumber.from(1).shl(160).sub(1));
  });

  function transfer(
    from: SignerWithAddress,
    to: SignerWithAddress,
    tokenId: BigNumberish
  ): Promise<void> {
    return expect(makeTransferTx(from, to.address, tokenId))
      .to.emit(courage, "Transfer")
      .withArgs(from.address, to.address, tokenId);
  }

  function expectTransferError(
    from: SignerWithAddress,
    to: string,
    tokenId: BigNumberish,
    reason: string
  ): Promise<void> {
    return expect(makeTransferTx(from, to, tokenId)).to.be.revertedWith(reason);
  }

  function makeTransferTx(
    from: SignerWithAddress,
    to: string,
    tokenId: BigNumberish
  ): Promise<ContractTransaction> {
    return courage.connect(from).transferFrom(from.address, to, tokenId);
  }

  function expectNotExists(tokenId: BigNumberish): PromiseLike<void> {
    return expect(courage.ownerOf(tokenId)).to.be.rejectedWith("nonexistent");
  }

  function burn(
    owner: SignerWithAddress,
    tokenId: BigNumberish
  ): Promise<void> {
    return expect(makeBurnTx(owner, tokenId))
      .to.emit(courage, "Transfer")
      .withArgs(owner.address, ZERO_ADDRESS, tokenId);
  }

  function makeBurnTx(
    owner: SignerWithAddress,
    tokenId: BigNumberish
  ): Promise<ContractTransaction> {
    return courage.connect(owner).burn(tokenId);
  }

  async function expectOwnedTokens(
    address: string,
    tokens: BigNumberish[]
  ): Promise<void> {
    expect(await courage.balanceOf(address)).to.equal(tokens.length);
    for (let i = 0; i < tokens.length; i++) {
      expect(await courage.tokenOfOwnerByIndex(address, i)).to.equal(tokens[i]);
    }
  }

  async function expectTotalSupply(expected: BigNumber): Promise<void> {
    expect(await getTotalSupply()).to.equal(expected);
  }

  async function getTotalSupply(): Promise<BigNumber> {
    return BigNumber.from(await courage.totalSupply());
  }

  async function expectTokenAtIndex(
    index: BigNumberish,
    expectedTokenId: BigNumberish
  ): Promise<void> {
    const actualTokenId = await courage.tokenByIndex(index);
    expect(expectedTokenId).to.equal(actualTokenId);
  }
});
