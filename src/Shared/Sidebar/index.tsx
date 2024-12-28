import { ArrowForwardIos, Close, DarkMode, LightMode, Menu } from '@mui/icons-material'
import { Button, Divider, Drawer, IconButton, List, ListItem, ListItemButton } from '@mui/material'
import { useThemeContext } from 'Context/Theme'
import React, { useEffect, useState } from 'react'

const Sidebar: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false)

  const { mode, setMode } = useThemeContext()

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  useEffect(() => {
    if (mode === 'dark') {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
  }, [mode])

  return (
    <>
      <IconButton onClick={handleOpen}>
        <Menu className="text-white lg:!text-4xl !text-3xl" />
      </IconButton>
      <Drawer
        open={open}
        onClose={handleClose}
        PaperProps={{ className: 'w-72 !h-screen relative' }}
      >
        <ListItem className="!flex h-[10vh] !w-full !items-center !justify-end">
          <IconButton onClick={handleClose}>
            <Close className="!text-3xl" />
          </IconButton>
        </ListItem>

        <List className="flex flex-col !p-4">
          <Button disableElevation variant="contained" size="large" className="!capitalize">
            Add to Home Screen
          </Button>
          <Divider className="!mt-2" />
          <ListItemButton className="!py-3 !rounded !flex !justify-between">
            Home <ArrowForwardIos />{' '}
          </ListItemButton>
          <Divider />
          <ListItemButton className="!py-3 !rounded !flex !justify-between">
            Contact Us <ArrowForwardIos />{' '}
          </ListItemButton>
          <Divider />
          <ListItemButton className="!py-3 !rounded !flex !justify-between">
            FAQ <ArrowForwardIos />{' '}
          </ListItemButton>
          <Divider />
        </List>
        <List className="!bottom-5 !w-full !p-4 !absolute">
          <ListItemButton
            className="!py-3 !rounded !flex gap-3 items-center"
            onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
          >
            {mode === 'light' ? <DarkMode /> : <LightMode />}{' '}
            {mode === 'light' ? 'Dark Mode' : 'Light Mode'}
          </ListItemButton>
        </List>
      </Drawer>
    </>
  )
}

export default Sidebar
