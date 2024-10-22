"use client";

import React, { useState } from 'react';
import styles from '../../styles/register.module.scss';
import { API_URL } from '../../Variables';
import Link from 'next/link';

export default function RegisterPage() {
    // State for form inputs
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    
    // State for global error and loading
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Function to handle registration
    const handleRegister = async (e: { preventDefault: () => void }) => {
        e.preventDefault();

        // Reset error and start loading
        setError('');
        setLoading(true);
    
        try {
            const response = await fetch(`${API_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    password,
                    phone,
                }),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                console.log('Zarejestrowano: ' + data);
                setLoading(false);
                // Można przekierować użytkownika lub wyczyścić formularz po sukcesie rejestracji
                setFirstName('');
                setLastName('');
                setEmail('');
                setPassword('');
                setPhone('');
                // Możesz również dodać przekierowanie na stronę logowania
            } else {
                // Wyświetl błędy zwrócone przez API
                if (data.errors) {
                    const messages = data.errors.join(', ');
                    setError(messages); // Wszystkie błędy w jednym ciągu tekstowym
                } else {
                    setError('Błąd podczas rejestracji. Spróbuj ponownie.');
                }
                setLoading(false);
            }
        } catch (err) {
            console.error('Wystąpił błąd podczas rejestracji:', err);
            setError('Wystąpił błąd podczas rejestracji. Spróbuj ponownie.');
            setLoading(false);
        }
    };

    return (
        <section className={styles.section}>
            <div className={styles.wrapper}>
                <p className={styles.title}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" fill="#050259" viewBox="0 0 640 512"><path d="M224 48a80 80 0 1 1 0 160 80 80 0 1 1 0-160zm0 208A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 96l91.4 0c65.7 0 120.1 48.7 129 112L49.3 464c8.9-63.3 63.3-112 129-112zm0-48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0zM504 312c0 13.3 10.7 24 24 24s24-10.7 24-24l0-64 64 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-64 0 0-64c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 64-64 0c-13.3 0-24 10.7-24 24s10.7 24 24 24l64 0 0 64z"/></svg>
                    Rejestracja
                </p>
                <form className={styles.form}>
                    <p className={styles['label-wrapper']}>
                        <label className={styles.label}>Imię*</label>
                        <input className={styles.input} type="text" value={firstName} required onChange={(e) => setFirstName(e.target.value)} />
                    </p>
                    <p className={styles['label-wrapper']}>
                        <label className={styles.label}>Nazwisko*</label>
                        <input className={styles.input} type="text" value={lastName} required onChange={(e) => setLastName(e.target.value)} />
                    </p>
                    <p className={styles['label-wrapper']}>
                        <label className={styles.label}>E-mail*</label>
                        <input className={styles.input} type="email" value={email} required onChange={(e) => setEmail(e.target.value)} />
                    </p>
                    <p className={styles['label-wrapper']}>
                        <label className={styles.label}>Hasło*</label>
                        <input className={styles.input} type="password" value={password} required onChange={(e) => setPassword(e.target.value)} />
                    </p>
                    <p className={styles['label-wrapper']}>
                        <label className={styles.label}>Numer telefonu (opcjonalnie)</label>
                        <input className={styles.input} type="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </p>
                    {/* Global error message */}
                    {error && (
                      <p className={styles.error}>{error}</p>
                    )}
                    <button className={styles.button} type="submit" onClick={handleRegister}>
                        {loading ? 
                            <svg className={styles.loader} xmlns="http://www.w3.org/2000/svg" width="20" fill="#ffffff" viewBox="0 0 512 512"><path d="M463.9 376c7.6 4.4 17.5 1.8 21.4-6.1c17.1-34.3 26.7-73 26.7-113.9C512 120 405.9 8.8 272 .5c-8.8-.5-16 6.7-16 15.5s7.2 15.9 16 16.6C388.2 40.8 480 137.7 480 256c0 35.1-8.1 68.3-22.5 97.9c-3.9 8-1.3 17.7 6.4 22.1z"/></svg>
                        :
                        "Zarejestruj"
                        }
                    </button>
                </form>
                <Link className={styles.link} href="/login">Przejdź do logowania</Link>
            </div>
        </section>
    );
}