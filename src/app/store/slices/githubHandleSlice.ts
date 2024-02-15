import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import ProofPayloadResponse from "../../services/next-id/nextIdProofService";

export interface GithubHandleSliceState {
  githubHandle: string | null;
  publicKey: string | null;
  githubProofPayloadResponse: ProofPayloadResponse | null;
}

const initialState: GithubHandleSliceState = {
  githubHandle: null,
  publicKey: null,
  githubProofPayloadResponse: null
}

export const githubHandleSlice = createSlice({
  name: "githubHandle",
  initialState,
  reducers: {
    githubHandle_updateGithubHandle: (state, action: PayloadAction<string | null>) => {
      state.githubHandle = action.payload
    },
    githubHandle_updatePublicKey: (state, action: PayloadAction<string | null>) => {
      state.publicKey = action.payload
    },
    githubHandle_updateGithubProofPayloadResponse: (state, action: PayloadAction<ProofPayloadResponse | null>) => {
      state.githubProofPayloadResponse = action.payload
    },
  }
});

export const {
  githubHandle_updateGithubHandle,
  githubHandle_updatePublicKey,
  githubHandle_updateGithubProofPayloadResponse,
} = githubHandleSlice.actions;

export default githubHandleSlice.reducer;