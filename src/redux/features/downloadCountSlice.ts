import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { supabase } from '../../supabase/supabase'

interface DownloadCount {
  item_id: string
  count: number
}

interface DownloadsState {
  downloadCounts: DownloadCount[]
}

const initialState: DownloadsState = {
  downloadCounts: [],
}

export const downloadsSlice = createSlice({
  name: 'downloads',
  initialState,
  reducers: {
    setDownloadCounts: (state, action: PayloadAction<DownloadCount[]>) => {
      state.downloadCounts = action.payload
    },
    incrementDownloadCount: (state, action: PayloadAction<string>) => {
      const itemId = action.payload
      const index = state.downloadCounts.findIndex(item => item.item_id === itemId)
      if (index !== -1) {
        state.downloadCounts[index].count += 1
      } else {
        state.downloadCounts.push({ item_id: itemId, count: 1 })
      }
    },
  },
})

export const { setDownloadCounts, incrementDownloadCount } = downloadsSlice.actions

export const fetchDownloadCounts = () => async (dispatch) => {
  const { data } = await supabase.from('downloads').select()
  if (data) {
    dispatch(setDownloadCounts(data))
  }
}

export default downloadsSlice.reducer
