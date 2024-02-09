import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { Proof } from "../../services/next-id/nextIdCheckAvatarService"

export interface HomeSliceState {
  proofs: Proof[]
}

const initialState: HomeSliceState = {
  proofs: [],
}


export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    homeUpdateProofs: (state, action: PayloadAction<Proof[]>) => {
      state.proofs = action.payload;
    }
  }
});

export const { homeUpdateProofs } = homeSlice.actions;

export default homeSlice.reducer;
