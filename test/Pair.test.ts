import { deployContract } from "ethereum-waffle";
import { ethers } from "@nomiclabs/buidler";
import Pair from "../artifacts/Pair.json";
import MockToken from "../artifacts/MockToken.json"
import { expect } from "chai";
import { Contract, providers, Signer } from "ethers";


describe('Pair', () => {
  let token: Contract;
  let pair: Contract;
  let deployer: Signer;
  let user: Signer;
  let provider: providers.Provider;

  before('', async () => {
    ([deployer, user] = await ethers.getSigners());
    provider = deployer.provider!;
    token = await deployContract(deployer, MockToken);
    pair = await deployContract(deployer, Pair, [token.address]);  
  });

  it('constructs', async () => {
    expect(await pair.token()).to.eq(token.address);
  });

  it('addLiqudity fro the first time', async () => {
    await token.approve(pair.address, 2000);
    await pair.addLiquidity(2000, {value: 1000});
    expect(await provider.getBalance(pair.address)).to.eq(1000);
    expect(await token.balanceOf(pair.address)).to.eq(2000);    
  });

  xit('addLiquidity next time');

  it('calucalte the price', async () => {
    expect(await pair.calculateBuyPrice(10, 1000, 2000)).to.eq(20);
  });

  it('buy', async () => {
    await pair.connect(user).buy({value: 10});
    expect(await token.balanceOf(await user.getAddress()))
      .to.eq(20);
  });

  it('sell', async () => {
    await token.connect(user).approve(token.address, 10);
    expect(
      () => pair.connect(user).sell(10, {gasPrice: 0}))
      .to.changeBalance(user, 5);
  });

});