import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import Typography from '@mui/material/Typography'
import AllowedMintCount from './AllowedMintCount'
import { ethers } from 'ethers'
import { useContext, useState } from 'react'
import TextField from '@mui/material/TextField'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import { styled } from '@mui/material'
import Toast from './Toast'
import React from 'react'
import { BadgeContext } from '../contexts/BadgeContext'
import externalContracts from '../contracts/external_contracts'

const WalletAddressTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-input': {
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#2b2b2b',
  },
}))

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export default function MintingActions() {
  const [message, setMessage] = useState('')
  // @ts-ignore
  const { injectedProvider, selectedChainId } = useContext(BadgeContext)

  let contractRef: any
  // @ts-ignore
  let chain: any = externalContracts[selectedChainId]
  if (
    chain &&
    chain.contracts &&
    chain.contracts.REMIX_REWARD
  ) {
    contractRef = chain.contracts.REMIX_REWARD 
  }

  const [walletAddress, setWalletAddress] = useState('')
  const [showToast, setShowToast] = useState(false)
  const [showFormErrorToast, setShowFormErrorToast] = useState(false)

  function handleChange(e: any) {
    setWalletAddress(e.target.value)
  }

  const closeToast = () => {
    setShowToast(false)
  }

  const displayToast = () => {
    setShowToast(true)
  }
  const showFormError = () => setShowFormErrorToast(true)
  const closeFormError = () => setShowFormErrorToast(false)

  console.log('injectedProvider is now ', { injectedProvider })

  const formErrorSnackBar = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={() => {
          setShowFormErrorToast(false)
        }}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  )

  const snackBarAction = (
    <>
      <IconButton size="small" aria-label="close" color="inherit" onClick={closeToast}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  )

  /*
   * this mints a user badge from the current selected account
   * this function throws an error
   *  - if the current network selected in the injected provider (metamask) is not optimism (chain id of optimism is 10)
   *  - if the current user doesn't have anymore a slot for minting a badge
   */
  const mintBadge = async (receiverAddress: string) => {
    if (window.ethereum === undefined) {
      displayToast()
      return
    }
    // let provider = new ethers.providers.Web3Provider(window.ethereum)
    if (receiverAddress === '' || receiverAddress === undefined || receiverAddress === null) {
      // console.log('the form must have an input with a valid account hash!')
      showFormError()
      return
    }
    // if (provider === null) {
    //   setProvider(new ethers.providers.Web3Provider(window.ethereum))
    // }
    if (injectedProvider === null || injectedProvider === undefined) {
      console.log('you might not be logged in because provider is null or undefined', { injectedProvider })
      return
    }
    let contract = new ethers.Contract(contractRef.address, contractRef.abi, injectedProvider.getSigner())
    console.log({ contract })
    try {
      setMessage('Please approve the transaction and wait for the validation')
      let mintTx = await contract.publicMint(receiverAddress)
      console.log({ mintTx })
      await mintTx.wait()
      setMessage('Transaction validated')
    } catch (e: any) {
      setMessage('error while sending the transaction. ' + e.message)
    }
    setTimeout(() => setMessage(''), 10000)
    // provider = null
  }

  const ShowFormError = ({ showToast, closeToast, snackBarAction, message }: { showToast: boolean, closeToast: () => void, snackBarAction: any, message: string }) => {
    return <Toast showToast={showToast} closeToast={closeToast} snackBarAction={snackBarAction} message={message} />
  }

  const doMinting = async () => {
    await mintBadge(walletAddress)
  }

  return (
    <>
      <Toast
        showToast={showToast}
        closeToast={closeToast}
        snackBarAction={snackBarAction}
        message={'please connect to metamask first!'}
      />
      <ShowFormError
        showToast={showFormErrorToast}
        closeToast={closeFormError}
        snackBarAction={formErrorSnackBar}
        message={'The form must have an input with a valid account hash!'}
      />
      <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} mt={5}>
        <Box display={'flex'} flexDirection={'column'} sx={{ background: 'white' }} width={280} height={180}>
          <AllowedMintCount />
          <Typography variant="subtitle1" color={'#0c0c0c'} alignItems={'flex-end'} justifyContent={'flex-end'}>
            BADGES REMAINING TO <br /> MINT ON YOUR ACCOUNT
          </Typography>
        </Box>
        <Box pt={2}>
          <Typography fontWeight={600} mb={3}>
            Input a wallet address
          </Typography>
          <FormControl sx={{ width: '50vw' }} variant="outlined">
            <WalletAddressTextField label="Address or ENS name" value={walletAddress} onChange={handleChange} />
          </FormControl>
        </Box>
        <Button
          sx={{
            background: '#81a6f7',
            ':hover': { background: '#1976d2', color: '#fff' },
            marginTop: 2,
            paddingRight: 5,
            paddingLeft: 5,
          }}
          size={'large'}
          onClick={doMinting}
        >
          <Typography variant={'subtitle1'} color={'white'} fontWeight={600}>
            Mint Badge
          </Typography>
        </Button>
        {message && <Alert severity="info">{message}</Alert>}
      </Box>
    </>
  )
}
