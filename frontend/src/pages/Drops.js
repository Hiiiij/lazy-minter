import axios from 'axios'
import React, { useState } from 'react'
import styled from 'styled-components'
import { Button } from '../components/Button'
import Minter from '../components/Minter'
import { mintNFT } from '../util/interact'
import { BACKEND_URL, THEME } from '../util/constans'

const MinterWrapper = styled.div`
${'' /* border: solid 1px red; */}
  ${'' /* max-height: 75%; */}
  display: flex;
  flex-direction: column;
  color: white;
  flex: 1;
  width:100%;
  position:relative;

   ${'' /* &:after{
    content: " ";
    padding: 1rem;
    background: rgba(135, 133, 162, 0.1);
    filter: blur(8px);
    width: 100%;
    height:3rem;
    display: block;
    position: absolute;
    bottom:0;
    z-index: 1000;
    color: transparent;

  } */}

  }

`

// this here
const MintButtonWrapper = styled.div`
 width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${'' /* flex: 1; */}
  justify-content: center;

`
const MintButton = styled(Button)`
  ${'' /* width:100%; */}
  width: 100%;
  ${'' /* flex: 1; */}
  @media ${THEME.queries.tabletAndUp} {
    width: clamp(16rem, 40%, 24rem);
  }
`

const DropsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 24px;
  width: clamp(60%, 70%,90vw);
`

// const BlurWrapper = styled.div`
//   text-shadow: 0 0 5px rgba(123,200,98,0.5);
//   color: transparent;

export default function Drops({ status, onStatusChanged }) {
  const [url, setURL] = useState('')
  const [mintButtonText, setMintButtonText] = useState('Mint NFT')

  const onMintPressed = async () => {
    if (mintButtonText === 'Mint NFT') {
      onStatusChanged('getting random nft')

      const response = await axios.get(`${BACKEND_URL}/getRandomNFT`)
      console.log(response)
      const { secure_url: secureURL } = response.data

      onStatusChanged('minting NFT...')

      const { success, status: statusResponse } = await mintNFT(secureURL)
      onStatusChanged(statusResponse)
      if (success) {
        setURL(secureURL)
        setMintButtonText('Go Back')
      }
    } else {
      setMintButtonText('Mint NFT')
    }
  }

  return (
    <DropsWrapper>
      <MinterWrapper>
        <Minter url={url} isSuccess={mintButtonText === 'Go Back'} />

      </MinterWrapper>
      {status && <p style={{ 'text-align': 'center', wordWrap: 'break-word', marginBottom: '12px' }}>
        {status}
      </p>}
      <MintButtonWrapper>
        <MintButton onClick={onMintPressed} text={mintButtonText} />
      </MintButtonWrapper>

    </DropsWrapper>
  )
}
