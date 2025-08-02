import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const URLCard = ({ data }) => {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">{data.shortcode}</Typography>
        <Typography>Original: {data.url}</Typography>
        <Typography>Created: {new Date(data.createdAt).toLocaleString()}</Typography>
        <Typography>Expires: {new Date(data.expiresAt).toLocaleString()}</Typography>
        <Typography>Clicks: {data.clicks.length}</Typography>
        <Typography variant="subtitle2" sx={{ mt: 1 }}>Click Details:</Typography>
        {data.clicks.map((click, idx) => (
          <Typography key={idx} variant="body2">
            {new Date(click.timestamp).toLocaleString()} - {click.referrer} ({click.location})
          </Typography>
        ))}
      </CardContent>
    </Card>
  );
};

export default URLCard;
