import { Meteors } from "./ components/meteors";
import Months from "./clientside";


export default function Hero() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-black via-black to-blue-950 flex flex-col items-center justify-center text-center px-4 pt-24">
<Meteors number={30} />
      <div className="max-w-4xl mx-auto space-y-6">

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight">
            O Tempo Não Para{" "}
          <span className="block">
            Mas Você{" "}
            <span className="bg-gradient-to-r from-[#0EA5E9] to-[#22D3EE] bg-clip-text text-transparent">
            Pode Acompanhar.
            </span>
          </span>
        </h1>

        <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto">
        Uma nova maneira de medir o tempo. Cada quadrado é um  <span className="text-cyan-400">mes</span> vivido.{" "}
        <br />
        80 anos equivale a  <span className="text-cyan-400">960</span> meses{" "}

        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
        </div>
      </div>
      <Months/>
    </section>
  )
}
