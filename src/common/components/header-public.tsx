import Link from 'next/link';
import styles from '../../styles/header.module.scss';

export function HeaderPublic() {
    return (
        <>
            <header className={styles.header}>
                <div className={styles.wrapper}>
                    <Link className={styles.logo} href="/">EventApp</Link>
                    <ul className={styles.menu}>
                        <li className={styles['menu-item']}>
                            <Link href="/">Home</Link>
                        </li>
                        <li className={styles['menu-item']}>
                            <Link href="/">O nas</Link>
                        </li>
                        <li className={styles['menu-item']}>
                            <Link href="/login">Logowanie</Link>
                        </li>
                        <li className={styles['menu-item']}>
                            <Link href="/register">Rejestracja</Link>
                        </li>
                        <li className={styles['menu-item']}>
                            <Link href="/">Support</Link>
                        </li>
                    </ul>
                </div>
            </header>
            <div className={styles.divider}></div>
        </>
    )
}