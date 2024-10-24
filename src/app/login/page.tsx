"use client";

import React, { useState } from 'react';
import styles from '../../styles/login.module.scss';
import { API_URL } from '../../Variables';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const router = useRouter();

    function handleSetToken(token: string) {
        document.cookie = `token=${token}; Path=/; Secure; HttpOnly; SameSite=Strict;`;
    }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                // Successful login
                console.log('Zalogowano pomyślnie');
                handleSetToken(data.token);
                router.push('/dashboard');
                setLoading(false);
            } else {
                // Check if we received validation errors from the API
                if (data.errors && Array.isArray(data.errors)) {
                    setError(data.errors.join(', ')); // Concatenate error messages
                } else {
                    setError(data.message || 'Niepoprawny email lub hasło');
                }
                setLoading(false);
            }
        } catch (err) {
            console.error('Wystąpił błąd podczas logowania:', err);
            setError('Wystąpił błąd podczas logowania');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className={styles.section}>
            <div className={styles.wrapper}>
                <p className={styles.title}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" fill="#050259" viewBox="0 0 512 512">
                        <path d="M192 365.8L302 256 192 146.2l0 53.8c0 13.3-10.7 24-24 24L48 224l0 64 120 0c13.3 0 24 10.7 24 24l0 53.8zM352 256c0 11.5-4.6 22.5-12.7 30.6L223.2 402.4c-8.7 8.7-20.5 13.6-32.8 13.6c-25.6 0-46.4-20.8-46.4-46.4l0-33.6-96 0c-26.5 0-48-21.5-48-48l0-64c0-26.5 21.5-48 48-48l96 0 0-33.6c0-25.6 20.8-46.4 46.4-46.4c12.3 0 24.1 4.9 32.8 13.6L339.3 225.4c8.1 8.1 12.7 19.1 12.7 30.6zm-8 176l80 0c22.1 0 40-17.9 40-40l0-272c0-22.1-17.9-40-40-40l-80 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l80 0c48.6 0 88 39.4 88 88l0 272c0 48.6-39.4 88-88 88l-80 0c-13.3 0-24-10.7-24-24s10.7-24 24-24z"/>
                    </svg>
                    Panel logowania
                </p>
                <form className={styles.form} onSubmit={handleLogin}>
                    <p className={styles['label-wrapper']}>
                        <label className={styles.label}>E-mail</label>
                        <input 
                            className={styles.input} 
                            type="email" 
                            value={email}  
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                    </p>
                    <p className={styles['label-wrapper']}>
                        <label className={styles.label}>Hasło</label>
                        <input 
                            className={styles.input} 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                    </p>
                    {error && (
                        <p className={styles.error}>{error}</p>
                    )}
                    <button className={styles.button} type="submit">
                        {loading ? (
                            <svg className={styles.loader} xmlns="http://www.w3.org/2000/svg" width="20" fill="#ffffff" viewBox="0 0 512 512">
                                <path d="M463.9 376c7.6 4.4 17.5 1.8 21.4-6.1c17.1-34.3 26.7-73 26.7-113.9C512 120 405.9 8.8 272 .5c-8.8-.5-16 6.7-16 15.5s7.2 15.9 16 16.6C388.2 40.8 480 137.7 480 256c0 35.1-8.1 68.3-22.5 97.9c-3.9 8-1.3 17.7 6.4 22.1z"/>
                            </svg>
                        ) : (
                            "Zaloguj się"
                        )}
                    </button>
                </form>
                <Link className={styles.link} href="/register">Przejdź do rejestracji</Link>
            </div>
        </section>
    );
}