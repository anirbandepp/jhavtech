import styles from './loader.module.css';

const Loader = () => {
    return (
        <section className={styles.bodyWrapper}>

            <div className="spinner-border ms-1" role="status">
                <span className="sr-only"></span>
            </div>

            <p>Loading...</p>
        </section>
    )
}

export default Loader;