import { createSlice } from '@reduxjs/toolkit';

enum PlayerState {
    Loading,
    Ready,
    Playing,
    Paused,
  }
  
interface AudioPreviewState {
  playerStatus: PlayerState;
  playerVolume: number;
  brokenThumbnail: boolean;
}

const initialState: AudioPreviewState = {
  playerStatus: PlayerState.Loading,
  playerVolume: 1,
  brokenThumbnail: false,
};

const audioPreviewSlice = createSlice({
  name: 'audioPreview',
  initialState,
  reducers: {
    setPlayerStatus(state, action) {
      state.playerStatus = action.payload;
    },
    setPlayerVolume(state, action) {
      state.playerVolume = action.payload;
    },
    setBrokenThumbnail(state, action) {
      state.brokenThumbnail = action.payload;
    },
  },
});

export const { setPlayerStatus, setPlayerVolume, setBrokenThumbnail } = audioPreviewSlice.actions;
export default audioPreviewSlice.reducer;
