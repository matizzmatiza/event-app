"use client";

import Link from 'next/link';
import styles from '../../styles/header.module.scss';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export function HeaderPrivate() {
    const [menuOpen, setMenuOpen] = useState(false);
    const router = useRouter();

    const openMenu = () => {
        setMenuOpen(true)
    }

    const closeMenu = () => {
        setMenuOpen(false)
    }

    const handleLogout = () => {
        document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'; 
        localStorage.removeItem('token');
        router.push('/login');
    }

    return (
        <>
            <header className={styles.header}>
                <div className={styles.wrapper}>
                    <Link className={styles.logo} href="/" onClick={closeMenu}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" fill="#050259" viewBox="0 0 448 512"><path d="M128 0c13.3 0 24 10.7 24 24l0 40 144 0 0-40c0-13.3 10.7-24 24-24s24 10.7 24 24l0 40 40 0c35.3 0 64 28.7 64 64l0 16 0 48 0 256c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 192l0-48 0-16C0 92.7 28.7 64 64 64l40 0 0-40c0-13.3 10.7-24 24-24zM400 192L48 192l0 256c0 8.8 7.2 16 16 16l320 0c8.8 0 16-7.2 16-16l0-256zM233.3 242.9l23.6 47.8 52.7 7.7c8.5 1.2 11.9 11.7 5.8 17.7l-38.2 37.2 9 52.5c1.5 8.5-7.5 15-15.1 11L224 392l-47.2 24.8c-7.6 4-16.5-2.5-15.1-11l9-52.5-38.2-37.2c-6.2-6-2.8-16.5 5.8-17.7l52.7-7.7 23.6-47.8c3.8-7.7 14.8-7.7 18.7 0z"/></svg>
                    Baluj z Nami
                    </Link>
                    <ul className={`${styles.menu} ${menuOpen ? styles.active : ''}`}>
                        <li className={styles['menu-item-button']}>
                            <button className={styles['menu-button']} onClick={closeMenu}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" fill="#ffffff" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
                            </button>
                        </li>
                        <li className={styles['menu-item']}>
                            <Link href="/dashboard" onClick={closeMenu}>Panel użytkownika</Link>
                        </li>
                        <li className={styles['menu-item']}>
                            <button className={styles['logout-button']} onClick={handleLogout}>Wyloguj się</button>
                        </li>
                    </ul>
                    <button className={styles['menu-button']} onClick={openMenu}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 448 512"><path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l256 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM192 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l128 0c17.7 0 32 14.3 32 32z"/></svg>
                    </button>
                </div>
            </header>
            <div className={styles.divider}></div>
        </>
    )
}