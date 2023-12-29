import Link from "next/link"
import Image from "next/image"
import pedro_image from "@/public/assets/pedro-uzcategui.png"
import grid_pattern from "@/public/assets/grid-pattern.svg"

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-black via-slate-950 to-gray-950 text-white">
      <div style={{ backgroundImage: `url(${grid_pattern.src})`, backgroundBlendMode: 'luminosity' }}>
        <div className="w-4/5 mx-auto">
          <nav className="p-5">
            <ul className="flex gap-5">
              <li>Home</li>
              <li>
                <Link href={'/blog'}>
                  Blog
                </Link>
              </li>
            </ul>
          </nav>
          <div className="h-[500px] flex items-center justify-between">
            <div className="p-5">
              <h1 className="text-5xl font-bold mb-4">Pedro Uzcategui</h1>
              <p>Software Engineer</p>
            </div>
            <div className="p-5">
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-r from-black to-slate-950 py-12">
        <div className="w-4/5 mx-auto flex items-center justify-between">
          <div className="p-5 flex-1">
            <h2 className="text-4xl font-semibold mb-4">Who am I</h2>
            <p className="mb-2">Latin American living in New Zealand, coding for fun and profit.</p>
          </div>
          <div className="flex-1">
            <Image className="mx-auto" width={300} src={pedro_image} alt="Pedro Uzcategui" />
          </div>
        </div>
      </div>
      <div className="w-4/5 mx-auto py-12">
        <div className="p-5">
          <h2 className="text-2xl font-semibold mb-4">Projects</h2>
          <div className="flex gap-8 mb-8">
            <div className="border-cyan-600 border-2 rounded-md p-5 flex-1 hover:bg-slate-950 cursor-pointer transition-colors">
              <div className="w-full h-[200px]"></div>
              <h2 className="text-2xl font-semibold mb-2">asesoriadevisaamericana.com</h2>
              <p className="mb-4">This is one of my businesses, I do employ 10 lawyers and we help more than 1000 families to apply for their visas in the US.</p>
              <p>Tech Stack: Next.js, Redux Toolkit, PostgreSQL, Go.</p>
            </div>
            <div className="border-cyan-600 border-2 rounded-md p-5 flex-1 hover:bg-slate-950 cursor-pointer transition-colors">
              <div className="w-full h-[200px]"></div>
              <h2 className="text-2xl font-semibold mb-2">Anubis</h2>
              <p className="mb-4">Programming language I build to learn more about programming languages. I build a videogame called Megaman X Corrupted with it.</p>
              <p>Tech Stack: Anubis, C.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-black text-center mx-auto p-8">
        <h2 className="text-2xl font-semibold mb-4">Want to hire me?</h2>
        <p>My current rate per hour is: 50.34$ or USD 100,000 per year</p>
        <button className="bg-red-600 px-5 py-2 mt-4 font-semibold">Hire Pedro</button>
      </div>
    </div >
  )
}