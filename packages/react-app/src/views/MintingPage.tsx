import React, { useContext } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import MintingPageCard from '../components/MintingPageCard'
import MintingActions from '../components/MintingActions'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { BadgeContext } from '../contexts/BadgeContext'

export default function MintingPage() {
  // @ts-ignore
  const { contractRef } = useContext(BadgeContext)

  const theme = useTheme()
  const mobile400 = useMediaQuery(theme.breakpoints.between('sm', 'md'))
  const mobile240 = useMediaQuery(theme.breakpoints.between('xs', 'sm'))
  const mobile900 = useMediaQuery('(min-width:900px)')
  const mobileResponsiveMatch = useMediaQuery('(min-width:600px)')

  return (
    <>
      <Box pt="76px" mb={20}>
        <Box mb={10} sx={{ textAlign: 'left', padding: '10px', color: '#007aa6', marginLeft: 5, marginBottom: 5 }}>
          <Typography
            textAlign={'left'}
            variant={'h3'}
            fontWeight={700}
            sx={{ marginBottom: 2 }}
            color={'#333333'}
            fontFamily={'Noah'}
          >
            Mint a Remixer
          </Typography>
          <Typography variant="inherit" fontWeight={500} mb={3} sx={{ color: '#333333' }}>
            Remix project rewards contributors, beta testers and UX research participants with NFTs deployed on
            Optimism. <br />
            For every Remix Reward you receive, you are able to mint one additional "Remixer" badge to a
            wallet account of your choice. <br />
            See below for the number of "Remixer" badge mints you have remaining on your account. <br />
            To mint a new "Remixer" badge, input a unique wallet address below.
          </Typography>
          <Typography
            variant="inherit"
            fontWeight={500}
            mb={5}
            sx={{ color: '#333333', zIndex: 999 }}
            component={'span'}
          >
            Minting each "Remixer" badge will require a very small amount of ETH (0.15 - .60 USD) on the Optimism network.{' '}
            <br /> If you do not have ETH on Optimism, you can transfer some from Mainnet using the{' '}
            <a href="https://app.optimism.io/bridge">Optimism Bridge</a> or{' '}
            <a href="https://app.hop.exchange/#/send?sourceNetwork=optimism&destNetwork=ethereum&token=ETH">
              Hop Exchange
            </a>
            {'.'}
            <br />
            Execution of this transaction will cost you approximately 253,679 gas.
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          background: 'linear-gradient(90deg, #f6e8fc, #f1e6fb, #ede5fb, #e8e4fa, #e3e2f9, #dee1f7, #d9dff6, #d4def4)',
          height: '100vh',
        }}
      >
        <Box display={'flex'} alignItems={'center'} justifyContent={'center'} flexDirection={'column'}>
          <MintingPageCard
            top={mobile900 ? -15 : mobileResponsiveMatch ? -16 : mobile400 ? -25 : mobile240 ? -14 : -15}
          />
          <MintingActions contractRef={contractRef} />
        </Box>
      </Box>
    </>
  )
}
