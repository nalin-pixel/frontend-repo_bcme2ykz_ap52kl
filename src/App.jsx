import Hero from './components/Hero'
import Problem from './components/Problem'
import FlexZone from './components/FlexZone'
import SocialProof from './components/SocialProof'
import TechSexy from './components/TechSexy'
import Pricing from './components/Pricing'

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Hero />
      <Problem />
      <FlexZone />
      <SocialProof />
      <TechSexy />
      <Pricing />
      <footer className="bg-black py-10 text-center text-white/60">
        © {new Date().getFullYear()} Quantacus • QScale
      </footer>
    </div>
  )
}

export default App
