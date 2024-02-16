import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import ProofPayloadResponse from "../../services/next-id/nextIdProofService";

export interface GithubHandleSliceState {
  githubHandle: string | null;
  publicKey: string | null;
  githubProofPayloadResponse: ProofPayloadResponse | null;
  gistFileContent: string | null;
  gistFileName: string | null;
  gistId: string | null;
}

const initialState: GithubHandleSliceState = {
  githubHandle: null,
  publicKey: null,
  githubProofPayloadResponse: null,
  gistFileContent: null,
  gistFileName: null,
  gistId: null
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
    githubHandle_updateGistFileContent: (state, action: PayloadAction<string | null>) => {
      state.gistFileContent = action.payload
    },
    githubHandle_updateGistFileName: (state, action: PayloadAction<string | null>) => {
      state.gistFileName = action.payload
    },
    githubHandle_updateGistId: (state, action: PayloadAction<string | null>) => {
      state.gistId = action.payload
    },
  }
});

export const {
  githubHandle_updateGithubHandle,
  githubHandle_updatePublicKey,
  githubHandle_updateGithubProofPayloadResponse,
  githubHandle_updateGistFileContent,
  githubHandle_updateGistFileName,
  githubHandle_updateGistId
} = githubHandleSlice.actions;

export default githubHandleSlice.reducer;