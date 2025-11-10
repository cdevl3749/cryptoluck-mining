import { useState } from 'react'
import Header from './components/Header'
import JackpotDisplay from './components/JackpotDisplay'
import ExplanationBox from './components/ExplanationBox'
import LotteryBanner from './components/LotteryBanner'
import Timeline from './components/Timeline'
import MiningIcons from './components/MiningIcons'
import SubscriptionCard from './components/SubscriptionCard'
import BlockStatus from './components/BlockStatus'
import Footer from './components/Footer'
import CookieBanner from './components/CookieBanner'
import MentionsLegales from './components/modals/MentionsLegales'
import Conditions from './components/modals/Conditions'
import Confidentialite from './components/modals/Confidentialite'
import Contact from './components/modals/Contact'

function App() {
  const [activeModal, setActiveModal] = useState(null)

  const openModal = (modalName) => {
    setActiveModal(modalName)
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setActiveModal(null)
    document.body.style.overflow = 'auto'
  }

  return (
    <div className="min-h-screen">
      <CookieBanner />
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <JackpotDisplay />
        <ExplanationBox />
        <LotteryBanner />
        <MiningIcons />
        <Timeline />
        <SubscriptionCard />
        <BlockStatus />
      </main>

      <Footer openModal={openModal} />

      {/* Modals */}
      {activeModal === 'mentionsLegales' && <MentionsLegales closeModal={closeModal} />}
      {activeModal === 'conditions' && <Conditions closeModal={closeModal} />}
      {activeModal === 'confidentialite' && <Confidentialite closeModal={closeModal} />}
      {activeModal === 'contact' && <Contact closeModal={closeModal} />}
    </div>
  )
}

export default App