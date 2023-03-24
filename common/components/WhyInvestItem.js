import sanitizeDOMData from '@/utils/sanitizeDOMData';
import { Box } from '@mantine/core';
import React from 'react';

const WhyInvestItem = ({icon, title, text}) => {
  return (
    <Box sx={(theme) => ({
        padding: '1.5rem',
        // [theme.fn.s]
    })}>
        {icon}
        <Box>
            {title}
        </Box>
        <Box>
            {text}
        </Box>
    </Box>
  )
}

export default WhyInvestItem