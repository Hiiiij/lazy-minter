// import './App.css';
import { Routes, Route, NavLink } from 'react-router-dom'
import styled, { ThemeProvider } from 'styled-components'
import { THEME } from './util/constans'

import {
  connectWallet,
  getCurrentWalletConnected
} from './util/interact'
import { useState, useEffect } from 'react'
import { Button } from './components/Button'
import { walletNotInstalledMessage } from './components/WalletNotInstalledMessage'
import Drops from './pages/Drops'
import About from './pages/About'
import NFTArt from './pages/NFTArt'
import ArtDetails from './pages/ArtDetails'

const AppWrapper = styled.div`
  min-height:100%;
  display:flex;
  flex-direction:column;
  ${'' /* justify-content: space-around; */}
  margin: 0 auto;
  text-align: left;
  width: clamp(calc(300/16)rem, 70%, calc(1200/16)rem);
 
  padding: min(32px, 5vw);
`

const Header = styled.header`
display: flex;
position:sticky;
height:3rem;
`

const StyledLink = styled(NavLink)`
    text-decoration: none;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
    &.active {
      color:yellow;
      ${'' /* color: yellow; */}
      ${'' /* background: linear-gradient(to right, #DF25E2, #33D4DF, #413EDC);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent; */}
    }
    &:hover  {
      color: pink;
    }
`

const Nav = styled.nav`
text-decoration:none;
font-weight :${THEME.fontWeight.sofiaSemiBold};
position: sticky;
left: 0;
flex: 1;
display:flex;
width: 100%;
max-height: 3rem;
justify-self: center;
justify-content:center;
display: ${prop => prop.top ? 'none' : 'flex'};
bottom: 0;
@media ${THEME.queries.tabletAndUp} {
    display: ${prop => prop.top ? 'flex' : 'none'};
    top: 0;
    left: 0;
    bottom: unset;
    justify-content: flex-start;
    ${'' /* font-size :${THEME.fontSize.p.medium}; */}
    font-weight :${THEME.fontWeight.sofiaSemiBold};

  }
  ${'' /* @media ${QUERIES.desktopAndUp} {
    display: ${prop => !prop.top ? 'none' : 'initial'}
  } */}
`

const ConnectButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-self:  baseline;
  flex: 1;
  @media ${THEME.queries.tabletAndUp} {e
    max-width: 8rem;
  }
   @media ${THEME.queries.desktopAndUp} {
    max-width: revert;
  }
  ${'' /* flex: 1; */}

`

function App() {
  const [status, setStatus] = useState('')

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet()
    setStatus(walletResponse.status)
    setWallet(walletResponse.address)
  }

  const [walletAddress, setWallet] = useState('')
  useEffect(() => {
    async function initialiseWallet() {
      const { address, status: statusResponse } = await getCurrentWalletConnected()

      setWallet(address)
      setStatus(statusResponse)

      addWalletListener()
    }
    initialiseWallet()
  }, [])

  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0])
          // setStatus("👆🏽 Write a message in the text-field above.");
        } else {
          setWallet('')
          setStatus('🦊 Connect to Metamask using the top right button.')
        }
      })
    } else {
      setStatus(walletNotInstalledMessage)
    }
  }

  return (
    <ThemeProvider theme={THEME}>
      <AppWrapper>
        <Header>
          <Nav top>
            <div style={{ display: 'flex', listStyle: 'none', gap: '30px' }}>
              <StyledLink to='/'>Drops</StyledLink>
              <StyledLink to='/about'>About</StyledLink>
              <StyledLink to='/nft-art'>Nft Art</StyledLink>
            </div>
          </Nav>
          {/* <Routes>
            <Route path="/" element={<Home />} />
            <Route path="about" element={<About />} />
          </Routes> */}
          <ConnectButtonWrapper>
            <Button
              onClick={connectWalletPressed}
              btnType='outline'
              text={
                walletAddress.length > 0
                  ? 'Connected: ' +
                  String(walletAddress).substring(0, 6) +
                  '...' +
                  String(walletAddress).substring(38)
                  : 'Connect Wallet'
              }
            />
          </ConnectButtonWrapper>
        </Header>
        <main style={{ flex: 1, display: 'flex', height: '100%', justifyContent: 'center' }}>
          <Routes style={{ display: 'flex', listStyle: 'none', gap: '30px', flex: 1, justifyContent: 'space-between' }}>
            <Route
              path='/' element={
                <Drops
                  status={status}
                  onStatusChanged={setStatus}
                />
              }
            />
            <Route
              path='/about' element={
                <About />
              }
            />
            <Route
              path='/nft-art' element={
                <NFTArt />
              }
            />
            <Route
              path='/details/:id' element={
                <ArtDetails />
              }
            />
          </Routes>
        </main>
        <Nav>
          <div style={{ display: 'flex', listStyle: 'none', gap: '30px', justifyContent: 'center' }}>
            <StyledLink to='/'>Drops</StyledLink>
            <StyledLink to='/about'>About</StyledLink>
            <StyledLink to='/nft-art'>Nft Art</StyledLink>
          </div>
        </Nav>
      </AppWrapper>
    </ThemeProvider>

  )
}

export default App
