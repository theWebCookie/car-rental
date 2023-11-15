import Hero from './ui/hero/hero';
import styles from './page.module.css';
import MainSection from './ui/main-section/main-section';

export default function Home() {
  return (
    <main className={styles.main}>
      <Hero />
      <MainSection />
    </main>
  );
}
