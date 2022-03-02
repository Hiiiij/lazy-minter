import React from 'react'
import styled from 'styled-components'

const EmphasizedH2 = styled.h2`
  font-size: calc(32/16)rem;
  background: ${prop => prop.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: ${({ theme }) => theme.fontWeight.sofiaSemiBold};
  text-align: center;
`

const DefaultH2 = styled.h2`
  font-size: calc(40/16)rem;
  color: white;
`

const EmphasizedH3 = styled.h3`
  font-size: calc(32/16)rem;
  background: ${prop => prop.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: ${({ theme }) => theme.fontWeight.sofiaSemiBold};
  text-align: center;
`

const DefaultH3 = styled.h3`
  font-size: calc(40/16)rem;
  color: white;
`

export default function Subheader({ text, mode, className, size = 'big', gradient = 'linear-gradient(to right, #DF25E2, #33D4DF, #413EDC)' }) {
  if (mode === 'emphasized') {
    if (size === 'big') {
      return <EmphasizedH2 gradient={gradient} className={className}>  {text}</EmphasizedH2>
    } else {
      return <EmphasizedH3 gradient={gradient} className={className}>  {text}</EmphasizedH3>
    }
  } else {
    if (size === 'big') {
      return <DefaultH2 className={className}>  {text}</DefaultH2>
    } else {
      return <DefaultH3 className={className}>  {text}</DefaultH3>
    }
  }
}
