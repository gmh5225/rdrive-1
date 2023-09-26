import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { supabase } from '../../supabase/supabase'

interface HeartCount {
  item_id: string
  count: number
}

interface HeartsState {
  heartCounts: HeartCount[]
}

const initialState: HeartsState = {
  heartCounts: [],
}

export const heartsSlice = createSlice({
  name: 'hearts',
  initialState,
  reducers: {
    setHeartCounts: (state, action: PayloadAction<HeartCount[]>) => {
      state.heartCounts = action.payload
    },
    incrementHeartCount: (state, action: PayloadAction<string>) => {
      const itemId = action.payload
      const index = state.heartCounts.findIndex(item => item.item_id === itemId)
      if (index !== -1) {
        state.heartCounts[index].count += 1
      } else {
        state.heartCounts.push({ item_id: itemId, count: 1 })
      }
    },
  },
})

export const { setHeartCounts, incrementHeartCount } = heartsSlice.actions

export const fetchHeartCounts = () => async (dispatch) => {
  const { data } = await supabase.from('hearts').select()
  if (data) {
    dispatch(setHeartCounts(data))
  }
}

export default heartsSlice.reducer
