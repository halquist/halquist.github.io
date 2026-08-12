import Navigation from './components/Navigation';
import Intro from './components/Intro';
import LinksSlider from './components/LinksSlider';

function App() {
  return (
    <>
      <a className="skipLink" href="#mainContent">
        Skip to content
      </a>
      <Navigation />
      <LinksSlider />
      <main id="mainContent">
        <Intro />
      </main>
    </>
  );
}

export default App;
