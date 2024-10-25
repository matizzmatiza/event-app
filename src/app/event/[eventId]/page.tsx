'use client'

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { Dialog, Button, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import styles from '../../../styles/event.module.scss';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close'; // Ikona do usuwania zdjęć

const theme = createTheme({
  palette: {
    primary: {
      main: '#050259',
    },
  },
});

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

// Styl miniaturki i kontenera dla zdjęć
const ThumbnailContainer = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)', // Siatka 3 kolumny
  gap: '8px',
});

const Thumbnail = styled('div')({
  position: 'relative',
  width: '100%',
  paddingTop: '100%', // Kwadrat
  overflow: 'hidden',
  borderRadius: '8px',
  backgroundColor: '#f0f0f0',
});

const ThumbnailImage = styled('img')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

export default function EventPage() {
  const { eventId } = useParams();
  const [open, setOpen] = useState(false);
  const [fileCount, setFileCount] = useState(0);
  const [thumbnails, setThumbnails] = useState<string[]>([]); // Przechowuje URL-e miniatur

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Obsługuje dodanie plików i aktualizuje miniaturki
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files).slice(0, 9); // Zmiana limitu do 9 zdjęć
      setFileCount(fileArray.length);

      // Tworzy URL-e do podglądu plików
      const newThumbnails = fileArray.map(file => URL.createObjectURL(file));
      setThumbnails(newThumbnails);
    }
};

  // Usuwa miniaturkę na podstawie indeksu
  const handleRemoveThumbnail = (index: number) => {
    const updatedThumbnails = thumbnails.filter((_, i) => i !== index);
    setThumbnails(updatedThumbnails);
    setFileCount(updatedThumbnails.length);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <section className={styles.section}>
          <div className={styles['inner-section']}>
            <div className={styles.header}>
              <p className={styles.title}>Moja osiemnastka</p>
              <Button 
                variant="outlined"
                onClick={handleOpen}
                startIcon={<svg xmlns="http://www.w3.org/2000/svg" width="25" viewBox="0 0 448 512"><path d="M248 72c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 160L40 232c-13.3 0-24 10.7-24 24s10.7 24 24 24l160 0 0 160c0 13.3 10.7 24 24 24s24-10.7 24-24l0-160 160 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-160 0 0-160z"/></svg>}
              >
                Dodaj zdjęcia
              </Button>
            </div>
            {eventId}
          </div>
        </section>
        <Dialog open={open} onClose={handleClose}>
          <div className={styles.popup}>
            <form className={styles.form}>
              <TextField id="filled-basic" label="Twoje imię" variant="outlined" />
              <Button
                component="label"
                variant="outlined"
                tabIndex={-1}
                startIcon={<svg xmlns="http://www.w3.org/2000/svg" width="25" fill="#050259" viewBox="0 0 640 512"><path d="M389.8 125.2C363.7 88.1 320.7 64 272 64c-77.4 0-140.5 61-143.9 137.5c-.6 13-9 24.4-21.3 28.8C63.2 245.7 32 287.2 32 336c0 61.9 50.1 112 112 112l368 0c53 0 96-43 96-96c0-36.8-20.7-68.8-51.2-84.9c-13.4-7.1-20-22.5-15.8-37.1c2-6.9 3-14.3 3-22c0-44.2-35.8-80-80-80c-12.3 0-23.9 2.8-34.3 7.7c-14.1 6.7-30.9 2.3-39.9-10.5zM272 32c59.5 0 112.1 29.5 144 74.8C430.5 99.9 446.8 96 464 96c61.9 0 112 50.1 112 112c0 10.7-1.5 21-4.3 30.8C612.3 260.2 640 302.9 640 352c0 70.7-57.3 128-128 128l-368 0C64.5 480 0 415.5 0 336c0-62.8 40.2-116.1 96.2-135.9C100.3 106.6 177.4 32 272 32zM228.7 244.7l80-80c6.2-6.2 16.4-6.2 22.6 0l80 80c6.2 6.2 6.2 16.4 0 22.6s-16.4 6.2-22.6 0L336 214.6 336 368c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-153.4-52.7 52.7c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6z"/></svg>}
              >
                Dodaj zdjęcia z urządzenia
                <VisuallyHiddenInput
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  multiple
                />
              </Button>
              {fileCount > 0 && (
                <p className={styles.fileCount}>
                  Przesłane: {fileCount} / 9
                </p>
              )}
              {/* Wyświetlanie miniaturek w siatce */}
              <ThumbnailContainer>
                {thumbnails.map((src, index) => (
                  <Thumbnail key={index}>
                    <ThumbnailImage src={src} alt={`Thumbnail ${index + 1}`} />
                    <IconButton
                      size="small"
                      onClick={() => handleRemoveThumbnail(index)}
                      style={{
                        position: 'absolute',
                        top: 4,
                        right: 4,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        color: 'white',
                      }}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </Thumbnail>
                ))}
              </ThumbnailContainer>
              <Button variant="contained">Prześlij do galerii</Button>
              <p className={styles.info}>(Możesz przesłać do 9 zdjęc na raz)</p>
            </form>
          </div>
        </Dialog>
      </ThemeProvider>
    </>
  );
}