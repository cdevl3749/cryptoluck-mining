import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export default function BlockStatus() {
  const [countdown, setCountdown] = useState('--:--')
  const { t } = useTranslation()

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date()
      const minutes = 9 - (now.getMinutes() % 10)
      const seconds = 59 - now.getSeconds()
      setCountdown(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`)
    }
    
    updateCountdown()
    const countInterval = setInterval(updateCountdown, 1000)
    return () => clearInterval(countInterval)
  }, [])

  return (
    <section className="my-20">
      <div className="bg-[#0a0e27]/90 border-4 border-green-400 rounded-3xl p-8 sm:p-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-green-400 mb-8 text-center">
          {t('blockStatus.title')}
        </h2>
        
        <div className="bg-gradient-to-br from-[#1a1d3f] to-[#0a0e27] p-8 sm:p-10 rounded-2xl border-2 border-cyan-400 shadow-[inset_0_0_30px_rgba(0,212,255,0.2)]">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 text-xl sm:text-2xl text-cyan-400 mb-6">
              <span className="inline-block w-5 h-5 bg-green-400 rounded-full animate-[blink_1s_infinite]" />
              <span>{t('blockStatus.systemActive')}</span>
            </div>
            
            <div className="space-y-4 text-base sm:text-lg text-gray-300">
              <div>
                <strong className="text-white">{t('blockStatus.lastBlock')}</strong> {t('blockStatus.noBlock')}
              </div>
              <div>
                <strong className="text-white">{t('blockStatus.activeParticipants')}</strong> 87
              </div>
              <div>
                <strong className="text-white">{t('blockStatus.nextDraw')}</strong> {countdown}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}