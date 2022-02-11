import { useState } from 'react'
import {Box, Avatar, Menu, MenuItem, Button, Container} from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

interface HeaderProps {
  logoUrl: string,
  profileName: string,
  menuLabel: string
}

const Header = ({logoUrl, profileName, menuLabel}: HeaderProps) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{
      borderBottom: '1px solid #9e9e9e',
      paddingBottom: '20px'
    }} >
      <Container>
        <Box sx={{
          borderBottom: '1px solid #9e9e9e',
          padding: '35px 0'
        }}>
          {logoUrl && <img className="news__logo" src={logoUrl} />}
        </Box>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '20px'
        }} className="news__header">
          <span>{menuLabel}</span>
          <Box sx={{display: 'flex'}}>
            <Avatar sx={{
              bgcolor: 'gray'
            }} />
            <Button 
              endIcon={<ArrowDropDownIcon sx={{color: 'orange'}} />}
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              sx={{
                textTransform: 'capitalize',
                fontWeight: 'bold'
              }}
            >
              <span>{profileName}</span>
            </Button>
          </Box>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleClose}>Sign out</MenuItem>
          </Menu>
        </Box>
      </Container>
    </Box>
  )
} 

export default Header