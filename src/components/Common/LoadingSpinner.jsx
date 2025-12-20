function LoadingSpinner() {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: 'var(--bg)' }}
    >
      <div className="absolute w-96 h-96 rounded-full bg-(--primary)/20 blur-[140px] animate-pulse-slow" />
      <div className="absolute w-80 h-80 rounded-full bg-(--secondary)/20 blur-[120px] animate-pulse-slow" />

      <div className="relative flex flex-col items-center gap-6 animate-fadeInUp">
        <div className="relative w-24 h-24 rounded-full border-4 border-(--border) border-t-(--primary) animate-spin" />

        <div className="absolute w-12 h-12 rounded-xl bg-(--card-bg) shadow-xl flex items-center justify-center animate-float">
          <span className="text-2xl">📖</span>
        </div>

        <div className="flex gap-2 mt-4">
          <span className="w-2 h-2 rounded-full bg-(--primary) animate-bounce" />
          <span className="w-2 h-2 rounded-full bg-(--secondary) animate-bounce [animation-delay:0.15s]" />
          <span className="w-2 h-2 rounded-full bg-(--primary) animate-bounce [animation-delay:0.3s]" />
        </div>

        <p className="text-sm tracking-wide opacity-70">
          Preparing your books...
        </p>
      </div>
    </div>
  )
}

export default LoadingSpinner
