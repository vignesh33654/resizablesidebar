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
          <h3 className="text-color-primary">
            Next.js with TailwindCSS
          </h3>
          
          <div className="color-text-tertiary text-font-size-body-16">
            Tailwind is a "utility-first" CSS framework known for its speed and flexibility in building custom user interfaces without writing custom CSS. Instead of pre-built components like other frameworks, it provides a set of low-level, single-purpose utility classes (e.g., bg-blue-500 for background, p-4 for padding) that can be mixed and matched directly in your HTML to style elements. This approach allows for rapid prototyping, consistent design systems, and responsive development tailored to a project's specific needs.
          </div>
          
          <button className="font-size-body-16 text-color-secondary bg-color-primary px-3 py-2 rounded mt-1 self-start hover:opacity-90 transition-opacity">  
          Add button
          </button>
        </div>
      </div>
    </div>
  )
}
