/*

 MIT License

 Copyright (c) 2023 Looker Data Sciences, Inc.

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.

 */
import { createSliceHooks } from '@looker/redux'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { ValidationMessages } from '@looker/components'
import type { MessageBarData, OAuthFormState } from '../types'

export const SLICE_NAME = 'OauthConfigForm'

export const defaultOAuthFormState: OAuthFormState = {
  apiServerUrlValue: '',
  fetchedUrl: '',
  webUrlValue: '',
  messageBar: {
    text: '',
    intent: 'positive',
  } as MessageBarData,
  validationMessages: {} as ValidationMessages,
  savedConfig: { base_url: '', looker_url: '' },
}

interface HandleUrlChangePayload {
  apiServerUrlValue: string
  webUrlValue: string
  validationMessages: ValidationMessages
}

interface ConfigPayload {
  base_url: string
  looker_url: string
  client_id: string
  redirect_uri: string
}

export const OAuthFormSlice = createSlice({
  name: SLICE_NAME,
  initialState: defaultOAuthFormState,
  reducers: {
    clearForm(_state) {
      return { ...defaultOAuthFormState }
    },
    saveNewConfig(state, action: PayloadAction<ConfigPayload>) {
      state.savedConfig = {
        base_url: action.payload.base_url,
        looker_url: action.payload.looker_url,
      }
      state.messageBar = {
        intent: 'positive',
        text: `Saved ${action.payload.looker_url} as OAuth server`,
      }
    },
    setApiServerUrl(state, action: PayloadAction<string>) {
      state.apiServerUrlValue = action.payload
    },
    setFetchedUrl(state, action: PayloadAction<string>) {
      state.fetchedUrl = action.payload
    },
    setWebUrlValue(state, action: PayloadAction<string>) {
      state.webUrlValue = action.payload
    },
    updateApiServerUrl(state, action: PayloadAction<HandleUrlChangePayload>) {
      state.apiServerUrlValue = action.payload.apiServerUrlValue
      state.webUrlValue = action.payload.webUrlValue
      state.validationMessages = action.payload.validationMessages
    },
    updateMessageBar(state, action: PayloadAction<MessageBarData>) {
      state.messageBar = action.payload
    },
    verifyError(state, action: PayloadAction<string>) {
      state.messageBar = { intent: 'critical', text: action.payload }
      state.webUrlValue = ''
    },
  },
})

export const oauthConfigFormActions = OAuthFormSlice.actions
export const {
  useActions: useOAuthFormActions,
  useStoreState: useOAuthFormState,
} = createSliceHooks(OAuthFormSlice)
