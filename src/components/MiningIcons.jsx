export default function MiningIcons() {
  const icons = ['⛏️', '💎', '🔗', '⚙️', '🚀']
  
  return (
    <div className="flex justify-around flex-wrap gap-6 sm:gap-8 my-16">
      {icons.map((icon, index) => (
        <div
          key={index}
          className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center text-5xl sm:text-6xl shadow-[0_10px_30px_rgba(255,215,0,0.4)] hover:translate-y-[-10px] hover:rotate-6 transition-transform duration-300 cursor-pointer"
        >
          {icon}
        </div>
      ))}
    </div>
  )
}