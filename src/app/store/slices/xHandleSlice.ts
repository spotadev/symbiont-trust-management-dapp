import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import ProofPayloadResponse from "../../services/next-id/nextIdProofService";

export interface XHandleSliceState {
  xHandle: string | null;
  publicKey: string | null;
  xProofPayloadResponse: ProofPayloadResponse | null;
}

const initialState: XHandleSliceState = {
  xHandle: null,
  publicKey: null,
  xProofPayloadResponse: null
}

export const xHandleSlice = createSlice({
  name: "xHandle",
  initialState,
  reducers: {
    xHandle_updateXHandle: (state, action: PayloadAction<string | null>) => {
      state.xHandle = action.payload
    },
    xHandle_updatePublicKey: (state, action: PayloadAction<string | null>) => {
      state.publicKey = action.payload
    },
    xHandle_updateGithubProofPayloadResponse: (state, action: PayloadAction<ProofPayloadResponse | null>) => {
      state.xProofPayloadResponse = action.payload
    },
  }
});

export const {
  xHandle_updateXHandle,
  xHandle_updatePublicKey,
  xHandle_updateGithubProofPayloadResponse
} = xHandleSlice.actions;

export default xHandleSlice.reducer;