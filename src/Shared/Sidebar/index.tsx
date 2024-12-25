import { ArrowForwardIos, Close, Menu } from "@mui/icons-material";
import {
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
} from "@mui/material";
import React, { useState } from "react";

const Sidebar: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <IconButton onClick={handleOpen}>
        <Menu className="text-white lg:!text-4xl !text-3xl" />
      </IconButton>
      <Drawer
        open={open}
        onClose={handleClose}
        PaperProps={{ className: "w-72" }}
      >
        <ListItem className="!flex h-[10vh] !w-full !items-center !justify-end">
          <IconButton onClick={handleClose}>
            <Close className="!text-3xl" />
          </IconButton>
        </ListItem>

        <List className="flex flex-col !p-4">
          <Button
            disableElevation
            variant="contained"
            size="large"
            className="!capitalize"
          >
            Add to Home Screen
          </Button>
          <Divider className="!mt-2" />
          <ListItemButton className="!py-3 !rounded !flex !justify-between">
            Home <ArrowForwardIos />{" "}
          </ListItemButton>
          <Divider />
          <ListItemButton className="!py-3 !rounded !flex !justify-between">
            Contact Us <ArrowForwardIos />{" "}
          </ListItemButton>
          <Divider />
          <ListItemButton className="!py-3 !rounded !flex !justify-between">
            FAQ <ArrowForwardIos />{" "}
          </ListItemButton>
          <Divider />
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;
