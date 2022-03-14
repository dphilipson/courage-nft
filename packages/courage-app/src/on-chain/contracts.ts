import { Contract, providers } from "ethers";
import { ALCHEMY_URL, CONTRACT_ADDRESS } from "../constants";
import courageJson from "../sc-generated/artifacts/contracts/Courage.sol/Courage.json";
import { Courage } from "../sc-generated/typechain";

export const courage = new Contract(
  CONTRACT_ADDRESS,
  courageJson.abi,
  new providers.JsonRpcProvider(ALCHEMY_URL),
) as Courage;
