import React from 'react'
import styled from 'styled-components'
import { THEME } from '../util/constans'


const StyledParagraph = styled.p`
font-size: ${THEME.fontSize.p.small};
line-height: 1.5rem;
margin-bottom: 2rem;
`

export default function Paragraph({ text, className }) {
  return (
    <StyledParagraph className={className}>{text}</StyledParagraph>
  )
}
