import React from 'react'
import { Box, Divider, Typography, useTheme } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';


export const Footer = () => {
  const theme = useTheme();
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 10, bottom: 0, width: '100%' }}>
      <Box sx={{ width: "100%", background: theme.palette.secondary.light, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Typography >Copyright 2023. All Rights Reserved</Typography>
        <a href='https://github.com/otaviovcn/tuca_lanches' target='_blank' rel="noreferrer">
          <GitHubIcon sx={{ color: theme.palette.primary.main, marginLeft: 5 }} />
        </a>
        <a href="https://www.linkedin.com/in/otavio-vinicius/" target="_blank" rel="noreferrer">
          <LinkedInIcon sx={{ color: theme.palette.primary.main, marginLeft: 5 }} />
        </a>
      </Box>
    </Box>
  );
};
