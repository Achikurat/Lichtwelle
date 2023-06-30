import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { ReactNode, useMemo, useState } from "react";
import React from "react";

type Props = {
  items: {
    label: string;
    onClick: () => void;
  }[];
  children?: ReactNode;
};

export default function ContextMenuWrapper({ items, children }: Props) {
  const [menuPosition, setMenuPosition] = useState<[number, number]>([0, 0]);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const menuItems = useMemo(() => {
    return items.map((item, idx) => {
      return (
        <MenuItem key={idx} onClick={item.onClick}>
          {item.label}
        </MenuItem>
      );
    });
  }, [items]);

  return (
    <Box
      w="100%"
      h="100%"
      onContextMenu={(e) => {
        setIsMenuOpen(true);
        setMenuPosition([e.pageX, e.pageY]);
      }}
      onClick={() => setIsMenuOpen(false)}
    >
      <Menu isOpen={isMenuOpen}>
        <MenuList
          position="absolute"
          left={menuPosition[0]}
          top={menuPosition[1]}
          onClick={() => setIsMenuOpen(false)}
        >
          {menuItems}
        </MenuList>
      </Menu>
      {children}
    </Box>
  );
}
