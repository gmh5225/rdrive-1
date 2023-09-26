import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface FolderGridBoxState {
  copiedState: Record<string, boolean>
}

const initialState: FolderGridBoxState = {
  copiedState: {},
}

export const folderGridBoxSlice = createSlice({
  name: 'folderGridBox',
  initialState,
  reducers: {
    setCopiedState: (state, action: PayloadAction<{ id: string; value: boolean }>) => {
      state.copiedState[action.payload.id] = action.payload.value
    },
  },
})

export const { setCopiedState } = folderGridBoxSlice.actions

export default folderGridBoxSlice.reducer
