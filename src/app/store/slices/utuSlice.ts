import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IdsItem } from "../../services/next-id/nextIdCheckAvatarService"

export interface UtuSliceState {
  findPlatform: string,
  findHandle: string,
  findIdsItems: IdsItem[],
  selectedIdsItem: IdsItem | null,
  utuToken: string | null
}

const initialState: UtuSliceState = {
  findPlatform: '',
  findHandle: '',
  findIdsItems: [],
  selectedIdsItem: null,
  utuToken: null
}

export const utuSlice = createSlice({
  name: "utu",
  initialState,
  reducers: {
    utu_updateFindPlatform: (state, action: PayloadAction<string>) => {
      state.findPlatform = action.payload;
    },
    utu_updateFindHandle: (state, action: PayloadAction<string>) => {
      state.findHandle = action.payload;
    },
    utu_updateFindIdsItems: (state, action: PayloadAction<IdsItem[]>) => {
      state.findIdsItems = action.payload;
    },
    utu_updateSelectedIdsItem: (state, action: PayloadAction<IdsItem | null>) => {
      state.selectedIdsItem = action.payload;
    },
    utu_updateUtuToken: (state, action: PayloadAction<string | null>) => {
      state.utuToken = action.payload;
    },
  }
});

export const {
  utu_updateFindPlatform,
  utu_updateFindHandle,
  utu_updateFindIdsItems,
  utu_updateSelectedIdsItem,
  utu_updateUtuToken
} = utuSlice.actions;

export default utuSlice.reducer;

