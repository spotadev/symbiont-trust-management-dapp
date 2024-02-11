import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IdsItem, Platform, Proof } from "../../services/next-id/nextIdCheckAvatarService";

export interface HomeSliceState {
  idsItem: IdsItem | null;
  validProofs: Proof[];
  xProofVerified: boolean;
  githubProofVerified: boolean;
  walletEthereumVerified: boolean;
  platformsNeedToConnectTo: Platform[];
}

const initialState: HomeSliceState = {
  idsItem: null,
  validProofs: [],
  xProofVerified: false,
  githubProofVerified: false,
  walletEthereumVerified: false,
  platformsNeedToConnectTo: [],
}


export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    homeUpdateIdsItem: (state, action: PayloadAction<IdsItem | null>) => {
      state.idsItem = action.payload;
    },
    homeUpdateValidProofs: (state, action: PayloadAction<Proof[]>) => {
      state.validProofs = action.payload;
    },
    homeUpdateXProofVerified: (state, action: PayloadAction<boolean>) => {
      state.xProofVerified = action.payload;
    },
    homeUpdateGithubProofVerified: (state, action: PayloadAction<boolean>) => {
      state.githubProofVerified = action.payload;
    },
    homeUpdateWalletEthereumVerified: (state, action: PayloadAction<boolean>) => {
      state.walletEthereumVerified = action.payload;
    },
    homeUpdatePlatformsNeedToConnectTo: (state, action: PayloadAction<Platform[]>) => {
      state.platformsNeedToConnectTo = action.payload;
    }
  }
});

export const {
  homeUpdateIdsItem,
  homeUpdateValidProofs,
  homeUpdateXProofVerified,
  homeUpdateGithubProofVerified,
  homeUpdatePlatformsNeedToConnectTo
} = homeSlice.actions;

export default homeSlice.reducer;
