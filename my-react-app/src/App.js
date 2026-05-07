import { useLenis }  from './hooks/useLenis'
import Loader        from './components/Loader'
import Navbar        from './components/Navbar'
import Hero          from './sections/Hero'
import About         from './sections/About'
import Work          from './sections/Work'
import Stack         from './sections/Stack'
import Experience    from './sections/Experience'
import Contact       from './sections/Contact'

function App() {
  useLenis()

  return (
    <div className="noise">
      <Loader />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Work />
        <Stack />
        <Experience />
        <Contact />
      </main>
    </div>
  )
}

export default App
