import React from 'react'
import styled from 'styled-components'
import { Button } from '../components/Button'
import { useNavigate } from 'react-router-dom'
import { BACKEND_URL } from '../util/constans'
import Header from '../components/Header'

const Metadata = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  border: solid;
  width: 100%;
  opacity: 0;
  background: transparent;
  color: white;
`
const Wrapper = styled.div`
display: flex;
flex-direction: column;
flex: 1;
`
const StyledGrid = styled.div`
    display: grid;
    gap: 32px;
    grid-template-columns:repeat(auto-fill, minmax(200px, 1fr));
    ${'' /* background:lightgrey; */}
    flex: 1;
  `
const Tile = styled.div`
  border: solid;
  position: relative;
  &:hover {
    .meta {
      opacity: 1;
    }
  }
`
const StyledButton = styled(Button)`
width:100%;
margin-bottom: 8px;

`

export default function NFTArt() {
  const navigate = useNavigate()
  const handleClick = index => e => {
    e.stopPropagation()
    navigate(`/details/${index}`)
  }
  return (
    <Wrapper>
      <Header text='NFT Art' />
      <StyledGrid>
        {[...new Array(20)].map((item, index) => {
          return (
            <Tile key={index}>
              <img src={`${BACKEND_URL}/${Math.floor(Math.random() * 10) + 1}.png`} alt='nft' />
              <Metadata className='meta'>
                <div>Cool NFT Art</div>
                <div>Cool NFT Art</div>
                <StyledButton btnType='outline' text='kdetails' onClick={handleClick(index)} />
              </Metadata>
            </Tile>
          )
        })}
      </StyledGrid>
    </Wrapper>
  )
}
