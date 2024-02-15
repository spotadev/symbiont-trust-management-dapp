import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IdsItem, Platform, Proof } from "../../services/next-id/nextIdCheckAvatarService";

export interface NextIdManagetmentSliceState {
  idsItem: IdsItem | null;
  validProofs: Proof[];
  xProofVerified: boolean;
  githubProofVerified: boolean;
  walletEthereumVerified: boolean;
  platformsNeedToConnectTo: Platform[];
}

const initialState: NextIdManagetmentSliceState = {
  idsItem: null,
  validProofs: [],
  xProofVerified: false,
  githubProofVerified: false,
  walletEthereumVerified: false,
  platformsNeedToConnectTo: [],
}


export const nextIdManagementSlice = createSlice({
  name: "nextIdManagement",
  initialState,
  reducers: {
    nextIdManagement_updateIdsItem: (state, action: PayloadAction<IdsItem | null>) => {
      state.idsItem = action.payload;
    },
    nextIdManagement_updateValidProofs: (state, action: PayloadAction<Proof[]>) => {
      state.validProofs = action.payload;
    },
    nextIdManagement_updateXProofVerified: (state, action: PayloadAction<boolean>) => {
      state.xProofVerified = action.payload;
    },
    nextIdManagement_updateGithubProofVerified: (state, action: PayloadAction<boolean>) => {
      state.githubProofVerified = action.payload;
    },
    nextIdManagement_updateWalletEthereumVerified: (state, action: PayloadAction<boolean>) => {
      state.walletEthereumVerified = action.payload;
    },
    nextIdManagement_updatePlatformsNeedToConnectTo: (state, action: PayloadAction<Platform[]>) => {
      state.platformsNeedToConnectTo = action.payload;
    }
  }
});

export const {
  nextIdManagement_updateIdsItem,
  nextIdManagement_updateValidProofs,
  nextIdManagement_updateXProofVerified,
  nextIdManagement_updateGithubProofVerified,
  nextIdManagement_updateWalletEthereumVerified,
  nextIdManagement_updatePlatformsNeedToConnectTo
} = nextIdManagementSlice.actions;

export default nextIdManagementSlice.reducer;
