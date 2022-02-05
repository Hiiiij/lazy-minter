// import './App.css';
import { Routes, Route, Link } from 'react-router-dom'
import styled, { ThemeProvider } from 'styled-components'
import { BREAKPOINTS, QUERIES } from './util/constans'

import {
  connectWallet,
  getCurrentWalletConnected
} from './util/interact'
import { useState, useEffect } from 'react'
import { Button } from './components/Button'
import { walletNotInstalledMessage } from './components/WalletNotInstalledMessage'
import Drops from './routes/Drops'
const AppWrapper = styled.div`
  /* max-width: 80vh;
  max-height: 80vh; */
  height:100%;
  display:flex;
  flex-direction:column;
  ${'' /* justify-content: space-around; */}
  padding: 60px 100px;
  margin: 0 auto;
  text-align: left;
  width: clamp(300px, 70%, 600px);
  padding: min(32px, 5vw);
`

const Header = styled.header`
display: flex;
position:sticky;
height:3rem;
`

const Nav = styled.nav`
text-decoration:none;
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
@media ${QUERIES.tabletAndUp} {
    display: ${prop => prop.top ? 'flex' : 'none'};
    top: 0;
    left: 0;
    bottom: unset;
    justify-content: flex-start;
  }
  ${'' /* @media ${QUERIES.desktopAndUp} {
    display: ${prop => !prop.top ? 'none' : 'initial'}
  } */}

`

const ConnectButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-self: flex-end;
  flex: 1;
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
    <ThemeProvider theme={{ queries: QUERIES, breakpoints: BREAKPOINTS }}>
      <AppWrapper>
        <Header>
          <Nav top>
            <div style={{ display: 'flex', listStyle: 'none', gap: '30px' }}>
              <Link to='/'>Drops</Link>
              <Link to='/about'>About</Link>
              <Link to='/community'>Community</Link>
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
        <main style={{ flex: 1 }}>
          <Routes style={{ display: 'flex', listStyle: 'none', gap: '30px', flex: 1 }}>
            <Route
              path='/' element={
                <Drops
                  status={status}
                  onStatusChanged={setStatus}
                />
              }
            />
            <Route path='/about' element={<h1>About</h1>} />
            <Route path='/community' element={<h1>COmmunity</h1>} />
          </Routes>
        </main>
        <Nav>
          <div style={{ display: 'flex', listStyle: 'none', gap: '30px', justifyContent: 'center' }}>
            <Link to='/'>Drops</Link>
            <Link to='/about'>About</Link>
            <Link to='/community'>Community</Link>
          </div>
        </Nav>
      </AppWrapper>
    </ThemeProvider>

  )
}

export default App
