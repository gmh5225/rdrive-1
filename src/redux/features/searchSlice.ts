import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OdSearchResult } from '../../types';

interface SearchState {
    query: string;
    isLoading: boolean;
    results: OdSearchResult[];
    showResults: boolean;
  }
  
  const initialState: SearchState = {
    query: '',
    isLoading: false,
    results: [],
    showResults: false,
  };
  
  const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
      setQuery: (state, action: PayloadAction<string>) => {
        state.query = action.payload;
      },
      setLoading: (state, action: PayloadAction<boolean>) => {
        state.isLoading = action.payload;
      },
      setResults: (state, action: PayloadAction<OdSearchResult[]>) => {
        state.results = action.payload;
      },
      setShowResults: (state, action: PayloadAction<boolean>) => {
        state.showResults = action.payload;
      },
    },
  });
  
  export const { setQuery, setLoading, setResults, setShowResults } = searchSlice.actions;
  
  export default searchSlice.reducer;
  