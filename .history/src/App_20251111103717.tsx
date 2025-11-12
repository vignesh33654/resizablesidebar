const imgAvatar = "http://localhost:3845/assets/33bd599f3caa820c5ba115be2d1ef7b018f59693.svg";

export default function App() {
  return (
    <div className="min-h-screen bg-Bg-1 flex items-center justify-center p-8">
      <div className="bg-Bg-0 border border-border-Primary rounded-lg p-3 flex gap-3 max-w-[620px] shadow-sm">
        {/* Avatar */}
        <div className="shrink-0 w-10 h-10">
          <img 
            alt="Avatar" 
            className="w-full h-full rounded-full object-cover" 
            src={imgAvatar} 
          />
        </div>
        
        {/* Content */}
        <div className="flex flex-col gap-1">
          <h3 className="text-text-Tertiary">
            Next.js with TailwindCSS is working
          </h3>
          <h1 className="text-text-primary "> India is my country all india are my brothers and sisters
          </h1>

        <div className="bg-color-primary border border-border-primary rounder">
        </div>
      </div>
    </div>
  )
}
