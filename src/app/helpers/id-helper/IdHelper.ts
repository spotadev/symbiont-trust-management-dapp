import { ethers } from "ethers"

let getId = (assetIdentifier: string) => {
  // The reason we are creating ether addresses is they are required for endorsements on the
  // chain.
  return ethers
    .id(assetIdentifier)
    .slice(0, 40 + 2)
    .toLowerCase()
}

export const idHelper = {
  getId,
};