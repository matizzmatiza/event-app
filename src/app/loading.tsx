import styles from '../styles/loading.module.scss';

export default function Loading() {
    return (
        <>
            <section className={styles.main}>
                <div className={styles.loader}></div>
            </section>
        </>
    )
}