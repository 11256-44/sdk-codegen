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

import React, { useEffect, useState } from 'react'
import {
  InputText,
  CopyToClipboard,
  Space,
  SpaceVertical,
  Button,
  Span,
  Section,
  ButtonOutline,
  ToggleSwitch,
} from '@looker/components'
import { Link } from '@styled-icons/material-outlined'
import { EmbedUrl } from '@looker/embed-services'
import { SelectTheme } from '..'
import { useThemesStoreState } from '../Theme'

interface QuickEmbedProps {
  onClose: () => void
}

export const QuickEmbed = ({ onClose }: QuickEmbedProps) => {
  const service = new EmbedUrl()
  const [toggleValue, setToggle] = useState(true)
  const [embedUrl, setEmbedUrl] = useState<string>(service.embedUrl(true))
  const { selectedTheme } = useThemesStoreState()

  const handleToggle = () => {
    setToggle(!toggleValue)
  }

  useEffect(() => {
    const newUrl = service.embedUrl(toggleValue, { theme: selectedTheme.name })
    setEmbedUrl(newUrl)
  }, [toggleValue, selectedTheme])

  return (
    <Section padding="large">
      <Span fontWeight="medium" fontSize="large">
        Get embed url
      </Span>

      <SpaceVertical pt="medium" pb="medium" gap="xxsmall">
        {service.isThemable && (
          <>
            <Span fontWeight="normal" fontSize="xsmall">
              Apply theme to {service.contentType.toLocaleLowerCase()} URL
            </Span>
            <SelectTheme />
          </>
        )}
        <Span pt="large" fontWeight="normal" fontSize="xsmall">
          Embed URL
        </Span>
        <InputText iconBefore={<Link />} readOnly value={embedUrl} />
      </SpaceVertical>

      <Space gap="xxsmall" fontWeight="normal" fontSize="small">
        <ToggleSwitch onChange={handleToggle} on={toggleValue} />
        Include current params in URL
      </Space>

      <Space mt="large" between>
        <CopyToClipboard content={embedUrl}>
          <ButtonOutline iconBefore={<Link />}>Copy Link</ButtonOutline>
        </CopyToClipboard>
        <Button onClick={onClose}>Cancel</Button>
      </Space>
    </Section>
  )
}
