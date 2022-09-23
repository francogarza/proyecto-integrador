import * as React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function TallerCard(){
    return (
        <Card sx={{ minWidth: 300, maxWidth: 300}} style={{margin: 30}}>
            <CardContent>
                <Typography>
                    Hello, world!
                </Typography>
            </CardContent>
        </Card>
    )
}