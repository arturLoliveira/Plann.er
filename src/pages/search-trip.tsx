import { ArrowRight, Search } from "lucide-react";
import { Button } from "../components/button";

interface IdToSearchProps {
  setSearchTripId: (searchTripId: string) => void
  searchTripSubmit: () => void
} 

export function SearchTrip({ setSearchTripId, searchTripSubmit }: IdToSearchProps) {


  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
      <div className='flex items-center gap-2 flex-1'>
        <Search className='size-5 text-zinc-400' />
        <input
          type="text"
          placeholder="Procure sua viagem pelo id"
          className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
          onChange={event => setSearchTripId(event.target.value)}
        />
      </div>

      <div className='w-px h-6 bg-zinc-800' />
      <Button onClick={searchTripSubmit} variant="primary">
        Continuar
        <ArrowRight className='size-5' />
      </Button>
    </div>
  )
}