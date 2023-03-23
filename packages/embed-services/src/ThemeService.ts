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
import type { ITheme } from '@looker/sdk'
import type { IAPIMethods } from '@looker/sdk-rtl'
import { all_themes, default_theme } from '@looker/sdk'

export class ThemeService {
  private sdk: IAPIMethods
  public defaultTheme?: ITheme
  public themes?: ITheme[]

  constructor(sdk: IAPIMethods) {
    this.sdk = sdk
  }

  clear() {
    this.defaultTheme = undefined
    this.themes = undefined
  }

  async getDefaultTheme(ts?: Date) {
    if (!this.defaultTheme) {
      try {
        this.defaultTheme = await this.sdk.ok(default_theme(this.sdk, ts))
      } catch (error: unknown) {
        console.error()
        throw error
      }
    }
    return this.defaultTheme
  }

  async getAllThemes(fields?: string) {
    if (!this.themes) {
      try {
        this.themes = await this.sdk.ok(all_themes(this.sdk, fields))
      } catch (error: unknown) {
        console.error()
        throw error
      }
    }
    return this.themes
  }

  async getAllThemesAsMap(fields?: string) {
    const themesMap: Record<string, ITheme> = {}
    const themes = await this.getAllThemes(fields)
    themes.forEach((theme) => {
      if (theme.id) {
        themes[theme.id] = theme
      }
    })
    return themesMap
  }

  async loadThemeData(ts?: Date, fields?: string) {
    return Promise.all([this.getDefaultTheme(ts), this.getAllThemes(fields)])
  }
}
