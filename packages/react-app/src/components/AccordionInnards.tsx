import AccordionDetails from '@mui/material/AccordionDetails'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import CopyToClipboard from 'react-copy-to-clipboard'
import { Reward } from '../types/rewardTypes'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import SearchIcon from '@mui/icons-material/Search'
import { Fragment } from 'react'

export interface AccordionInnardsProps {
  state: any
  handleTooltipOpen: () => void
  handleTooltipClose: () => void
  open: boolean
  setHoverActive: () => void
  etherscan: string
  event: Reward[]
}

export default function AccordionInnards(props: AccordionInnardsProps) {
  const { state, handleTooltipOpen, setHoverActive } = props
  return (
    <Fragment>
      <AccordionDetails
        sx={{
          paddingLeft: '5px',
          paddingRight: '5px',
          maxHeight: '24vh',
          overflowY: 'scroll',
          overflowX: 'hidden',
          paddingBottom: '5px !important',
          '::-webkit-scrollbar': {
            width: '0.6em',
          },
          '::-webkit-scrollbar-track': {
            background: 'inherit',
            width: '2.5em',
            borderRadius: '100vw',
            marginBlock: '0.5em',
          },
          '::-webkit-scrollbar-track:hover': {
            background: '#1976d2',
            borderRadius: '100vw',
            marginBlock: '.5em',
          },
          '::-webkit-scrollbar-thumb': {
            background: '#d7ddf0',
            borderRadius: '100vw',
            width: '3em',
          },
        }}
      >
        <List
          sx={{
            backgroundColor: 'white',
            paddingLeft: '2px',
            paddingRight: '0px',
            marginLeft: '3px',
            borderBottomLeftRadius: '15px !important',
            borderBottomRightRadius: '15px !important',
          }}
        >
          {props.event.map((x: Reward) => (
            <ListItem
              key={x.transactionHash}
              sx={{
                marginBottom: 1,
              }}
              secondaryAction={
                <Tooltip title="view transaction" placement={'top-start'}>
                  <IconButton
                    edge="end"
                    size="small"
                    href={`${props.etherscan}${x.transactionHash}`}
                    target="_blank"
                    rel="noreferrer"
                    sx={{
                      background: '#81a6f7',
                      border: '2px solid white',
                      color: '#fff',
                      ':hover': {
                        background: '#1976d2',
                        color: '#fff',
                        border: '2px solid pink',
                      },
                    }}
                  >
                    <SearchIcon />
                  </IconButton>
                </Tooltip>
              }
            >
              <CopyToClipboard text={x.to} onCopy={handleTooltipOpen}>
                <Typography
                  variant={'body2'}
                  noWrap={false}
                  fontWeight={400}
                  color={'darkblue'}
                  onMouseOver={() => setHoverActive()}
                  onMouseOut={() => setHoverActive()}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    ':hover': { cursor: 'pointer' },
                  }}
                  component={'span'}
                >
                  {x.resolvedName !== null
                    ? x.resolvedName
                    : x.to.length === 0
                    ? null
                    : x.to.length > 20
                    ? `${x.to.substring(0, 7)}...${x.to.substring(x.to.length - 7)}`
                    : state.title}
                  <ContentCopyIcon fontSize="inherit" sx={{ marginLeft: 0.5 }} />
                </Typography>
              </CopyToClipboard>
            </ListItem>
          ))}
        </List>
      </AccordionDetails>
    </Fragment>
  )
}
