import { Box, Text, ThemeIcon, Title } from '@mantine/core';
import React from 'react';

const AvantageItem = ({icon, title, text}) => {
  return (
    <Box sx={() => ({
        height: '100%',
        background: '#fafafd',
        padding: '1.5rem',
        borderRadius: '0.5rem',
        color: 'var(--color-black)',
        cursor: 'default',
        transition: 'var(--transition)',

        "& h5": {
          color: 'var(--color-black)',
          transition: 'var(--transition)',
        },
        "& p": {
          color: '#a0a0bf',
          transition: 'var(--transition)',
        },

        "&:hover": {
          background: 'var(--color-primary)',
          color: 'var(--color-white)',
        },
        "&:hover h5": {
          color: 'var(--color-white)',
        },
        "&:hover svg, &:hover p": {
          color: 'var(--color-white)'
        }
        // [theme.fn.s]
    })}>
      <ThemeIcon 
        variant='outline' 
        size={36} 
        color={'blue'} 
        sx={{
          border: 'none',
          transition: 'var(--transition)',
        }}
      >
        {icon}
      </ThemeIcon>
          <Title order={5} mt={'1rem'} mb={'0.5rem'} size={20}>
            {title}
          </Title>
          <Text component='p'>{text}</Text>
        {/* <Box>
        </Box>
        <Box>
            {text}
        </Box> */}
    </Box>
  )
}

export default AvantageItem