import AvatarStatusResponse, { IdsItem, Platform, Proof } from "../../services/next-id/nextIdCheckAvatarService";


const hasHandle = (avatarStatusResponse: AvatarStatusResponse, handle: string, platform: string) => {
  const idsItems = avatarStatusResponse.ids;

  for (let idsItem of idsItems) {
    const proofs = idsItem.proofs;

    for (let proof of proofs) {

      // the call for showing proof passes a handle in the request but returns handles whicn 
      // partially match e.g if request handle 'cat' then it will also return 'category'
      if (proof.platform === platform && proof.identity === handle) {
        return true;
      }
    }
  }

  return false;
}

// returns all proofs in this IdsItem which are valid
const getValidProofs = (foundIdsItem: IdsItem) => {
  let proofs: Proof[] = foundIdsItem.proofs;
  let validProofs = [];

  for (let proof of proofs) {
    if (proof.is_valid) {
      validProofs.push(proof);
    }
  }

  return validProofs;
}

const hasValidEthereumProof = (validProofs: Proof[], address: string) => {
  let validEthereumProof = false;

  for (let proof of validProofs) {

    if (proof.platform === 'ethereum' && proof.identity === address.toLowerCase()) {
      validEthereumProof = true;
      break;
    }
  }

  return validEthereumProof;
}

const getPlatformsNeedToConnectTo =
  (idsItem: IdsItem | null, supportedPlatforms: string[]): Platform[] => {
    let proofs: Proof[] = []

    if (idsItem) {
      proofs = idsItem?.proofs;
    }

    const platforms: Platform[] = [];

    for (let supportedPlatform of supportedPlatforms) {

      let found = false;

      for (let proof of proofs) {
        if (supportedPlatform === proof.platform) {
          found = true;
        }
      }

      if (!found) {
        platforms.push({
          name: supportedPlatform, url: `/link/platform/${supportedPlatform}`
        });
      }
    }

    return platforms;
  }

export const avatarStatusResponseHelper = {
  hasHandle,
  getValidProofs,
  hasValidEthereumProof,
  getPlatformsNeedToConnectTo
}
