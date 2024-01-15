import { Stack } from '@mui/material';
import { memo } from 'react';
import { hideScrollbarY } from '../../../../lib/utils/cssStyles';
import { NavListProps, NavSectionProps } from '../types';
import NavList from './NavList';

function NavSectionHorizontal({ data, sx, ...other }: NavSectionProps) {
  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{
        mx: 'auto',
        ...hideScrollbarY,
        ...sx,
      }}
      {...other}
    >
      {data.map((group) => (
        <Items key={group.subheader} items={group.items} />
      ))}
    </Stack>
  );
}

export default memo(NavSectionHorizontal);

type ItemsProps = {
  items: NavListProps[];
};

function Items({ items }: ItemsProps) {
  return (
    <>
      {items.map((list) => (
        <NavList
          key={list.title + list.path}
          data={list}
          depth={1}
          hasChild={!!list.children}
        />
      ))}
    </>
  );
}
