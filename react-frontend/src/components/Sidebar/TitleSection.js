import React from 'react';
import { Typography, Container, Paper, useTheme } from '@mui/material';

const TitleSection = ({ title, IconComponent })=> {
const theme = useTheme();

return (
<Container maxWidth={false} disableGutters>
<Paper elevation={4} sx={{
p: theme.spacing(2),
mb: theme.spacing(2),
bgcolor: theme.palette.primary.dark,
color: theme.palette.getContrastText(theme.palette.primary.dark),
display: 'flex',
justifyContent: 'center',
alignItems: 'center'
}}>
{IconComponent && <IconComponent sx={{ mr: 2, fontSize: '2.5rem' }} />}
<Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
{title}
</Typography>
</Paper>
</Container>
);
};

export default TitleSection;