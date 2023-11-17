import Hero from './ui/main/hero/hero';
import styles from './page.module.css';
import MainSection from './ui/main/main-section/main-section';
import CarSection from './ui/main/car-section/car-section';

export default function Home() {
  return (
    <main className={styles.main}>
      <Hero />
      <MainSection />
      <CarSection />
    </main>
  );
}
