import React, { useState } from 'react';
import { TextField, Button, Grid, Typography } from '@mui/material';
import LoggerMiddleware from './LoggerMiddleware';
import { isValidURL, isValidShortcode, isValidValidity } from '../utils/validators';

function generateShortcode() {
  return Math.random().toString(36).substring(2, 8);
}

const URLForm = ({ onShorten }) => {
  const [inputs, setInputs] = useState(
    Array(5).fill({ url: '', validity: '', shortcode: '', error: '' })
  );

  const handleChange = (index, field, value) => {
    const updated = [...inputs];
    updated[index][field] = value;
    setInputs(updated);
  };

  const handleShorten = () => {
    const updated = [...inputs];
    let valid = true;
    const results = [];

    updated.forEach((item, index) => {
      const { url, validity, shortcode } = item;
      if (!url) return;

      if (!isValidURL(url)) {
        updated[index].error = 'Invalid URL';
        valid = false;
        return;
      }

      if (shortcode && !isValidShortcode(shortcode)) {
        updated[index].error = 'Shortcode invalid (3-15 alphanumeric)';
        valid = false;
        return;
      }

      if (validity && !isValidValidity(validity)) {
        updated[index].error = 'Invalid validity (in minutes)';
        valid = false;
        return;
      }

      updated[index].error = '';
      const finalShortcode = shortcode || generateShortcode();
      const now = new Date();
      const validMinutes = validity ? parseInt(validity) : 30;
      const expiry = new Date(now.getTime() + validMinutes * 60000);

      const result = {
        url,
        shortcode: finalShortcode,
        createdAt: now.toISOString(),
        expiresAt: expiry.toISOString(),
        clicks: [],
      };

      LoggerMiddleware.log('Shortened URL', result);
      results.push(result);
    });

    setInputs(updated);
    if (valid) onShorten(results);
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>Shorten up to 5 URLs</Typography>
      <Grid container spacing={2}>
        {inputs.map((item, index) => (
          <Grid item xs={12} key={index}>
            <TextField fullWidth label="Original URL" value={item.url}
              onChange={(e) => handleChange(index, 'url', e.target.value)} margin="dense" />
            <TextField fullWidth label="Shortcode (optional)" value={item.shortcode}
              onChange={(e) => handleChange(index, 'shortcode', e.target.value)} margin="dense" />
            <TextField fullWidth label="Validity in minutes (optional)" value={item.validity}
              onChange={(e) => handleChange(index, 'validity', e.target.value)} margin="dense" />
            {item.error && <Typography color="error">{item.error}</Typography>}
          </Grid>
        ))}
      </Grid>
      <Button variant="contained" onClick={handleShorten} sx={{ mt: 2 }}>Shorten URLs</Button>
    </div>
  );
};

export default URLForm;
