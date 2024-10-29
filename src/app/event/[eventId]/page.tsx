'use client'

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { Dialog, Button, IconButton, LinearProgress, Box, Typography, TextField } from '@mui/material';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import styles from '../../../styles/event.module.scss';
import { API_URL } from '../../../Variables';
import axios from 'axios';

const theme = createTheme({
  palette: { primary: { main: '#050259' } },
});

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)', clipPath: 'inset(50%)', height: 1, overflow: 'hidden', position: 'absolute', bottom: 0, left: 0, width: 1,
});

const ThumbnailContainer = styled('div')({
  display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px',
});

const Thumbnail = styled('div')({
  position: 'relative', width: '100%', paddingTop: '100%', borderRadius: '8px', backgroundColor: '#f0f0f0',
});

const ThumbnailImage = styled('img')({
  position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover',
});

export default function EventPage() {
  const { eventId } = useParams();
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [thumbnails, setThumbnails] = useState<string[]>([]);
  const [senderName, setSenderName] = useState('');
  const [progress, setProgress] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []).slice(0, 9);
    setFiles(selectedFiles);
    setThumbnails(selectedFiles.map(file => URL.createObjectURL(file)));
  };

  const handleUpload = async () => {
    if (!eventId || !senderName || files.length === 0) {
      setErrorMessage(!senderName ? 'Proszę wpisać swoje imię.' : 'Proszę dodać co najmniej jedno zdjęcie.');
      return;
    }
    setErrorMessage('');
    setProgress(true);

    const formData = new FormData();
    formData.append('sender', senderName);
    formData.append('eventId', eventId as string);
    files.forEach((file, index) => formData.append(`file_${index}`, file));

    try {
      await axios.post(`${API_URL}/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (event) => event.total && setProgress(event.loaded < event.total),
      });
      setTimeout(() => {
        setOpen(false);
        setProgress(false);
        setFiles([]);
        setThumbnails([]);
        setSenderName('');
      }, 500);
    } catch (error) {
      console.error('Błąd podczas przesyłania plików:', error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
        <section className={styles.section}>
          <div className={styles['inner-section']}>
            <div className={styles.header}>
              <p className={styles.title}>Moja osiemnastka</p>
              <Button 
                variant="outlined"
                onClick={() => setOpen(true)}
                startIcon={<svg xmlns="http://www.w3.org/2000/svg" width="25" viewBox="0 0 448 512"><path d="M248 72c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 160L40 232c-13.3 0-24 10.7-24 24s10.7 24 24 24l160 0 0 160c0 13.3 10.7 24 24 24s24-10.7 24-24l0-160 160 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-160 0 0-160z"/></svg>}
              >
                Dodaj zdjęcia
              </Button>
            </div>
            {eventId}
          </div>
        </section>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <div className={styles.popup}>
          <form className={styles.form}>
            <TextField label="Twoje imię" variant="outlined" value={senderName} onChange={(e) => setSenderName(e.target.value)} />
            <Button component="label" variant="outlined">
              Dodaj zdjęcia z urządzenia
              <VisuallyHiddenInput type="file" accept="image/*" multiple onChange={handleFileChange} />
            </Button>
            {files.length > 0 && (
              <p className={styles.fileCount}>Przesłane: {files.length} / 9</p>
            )}
            <ThumbnailContainer>
              {thumbnails.map((src, index) => (
                <Thumbnail key={index}>
                  <ThumbnailImage src={src} alt={`Thumbnail ${index + 1}`} />
                  <IconButton size="small" onClick={() => setFiles(files.filter((_, i) => i !== index))} style={{
                    position: 'absolute', top: 4, right: 4, backgroundColor: 'rgba(0,0,0,0.5)', color: 'white',
                  }}>
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </Thumbnail>
              ))}
            </ThumbnailContainer>
            <Button variant="contained" onClick={handleUpload}>Prześlij do galerii</Button>
            {progress && (
              <Box mt={2}>
                <Typography align="center">Przesyłanie...</Typography>
                <LinearProgress />
              </Box>
            )}
            {errorMessage && <Typography color="error" variant="body2">{errorMessage}</Typography>}
          </form>
        </div>
      </Dialog>
    </ThemeProvider>
  );
}