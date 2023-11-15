import './main-section.css';

export default function MainSection() {
  return (
    <section className='main-section'>
      <div className='main-heading'>
        <h2>Jak to działa?</h2>
        <p>Rezerwacja samochodu online</p>
      </div>
      <div className='box-wrapper'>
        <div className='box'>
          <div className='icon-box'>
            <i className='fa-solid fa-car'></i>
          </div>
          <div className='main-text'>
            <span>01</span>
            <span>Wybierz miejsce oraz termin najmu</span>
          </div>
        </div>
        <div className='box'>
          <div className='icon-box'>
            <i className='fa-solid fa-sliders'></i>
          </div>
          <div className='main-text'>
            <span>02</span>
            <span>Wybierz model samochodu</span>
          </div>
        </div>
        <div className='box'>
          <div className='icon-box'>
            <i className='fa-solid fa-plus'></i>
          </div>
          <div className='main-text'>
            <span>03</span>
            <span>Wybierz dodatkowe usługi</span>
          </div>
        </div>
        <div className='box'>
          <div className='icon-box'>
            <i className='fa-regular fa-user'></i>
          </div>
          <div className='main-text'>
            <span>04</span>
            <span>Podaj dane osobowe</span>
          </div>
        </div>
        <div className='box'>
          <div className='icon-box'>
            <i className='fa-solid fa-credit-card'></i>
          </div>
          <div className='main-text'>
            <span>05</span>
            <span>Opłac wynajem online</span>
          </div>
        </div>
      </div>
    </section>
  );
}
