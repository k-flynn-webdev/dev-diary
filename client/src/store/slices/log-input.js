import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { parseTags } from '../../helpers/parse-tags'
import { post } from '../../plugins/http';

const initLog = () => {
  return {
    id: '',
    value: "",
    tags: []
  }
}

export const logValue = state => state.logInput.value
export const logTags = state => state.logInput.tags

export const create = createAsyncThunk(
  'logInput/create',
  async (arg, thunkAPI) => {
    return post('log', {
      data: logValue(thunkAPI.getState())
    })
  }
)

// todo: combine logs and log states for ease of future data

export const logInput = createSlice({
  name: 'logInput',
  initialState: initLog(),
  reducers: {
    /**
     * Reset Log Input
     *
     * @param state
     * @param action
     */
    reset: (state) => initLog(),
    update: (state, { payload }) => {
      state.value = payload
      state.tags = parseTags(payload)
    },
  }
})

// each case under reducers becomes an action
export const { reset, update } = logInput.actions

export default logInput.reducer