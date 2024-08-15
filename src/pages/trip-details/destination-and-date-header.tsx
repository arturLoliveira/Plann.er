import { MapPin, Calendar, Settings2, House } from "lucide-react";
import { Button } from "../../components/button";

import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { format } from "date-fns";
import { UpdateTripModal } from "./update-trip-modal";
interface Trip {
    id: string
    destination: string
    ends_at: string
    starts_at: string
    is_confirmed: boolean
}

export function DestinationAndDateHeader() {
    const navigate = useNavigate()
    const { tripId } = useParams()
    const [trip, setTrip] = useState<Trip | undefined>()
    const [isUpdateTripModalOpen, setIsUpdateTripModalOpen] = useState(false)

    function goBack() {
        navigate(`/`)
    }

    function openUpdateTripModal() {
        setIsUpdateTripModalOpen(true)
    }
    function closeUpdateTripModal() {
        setIsUpdateTripModalOpen(false)
    }

    useEffect(() => {
        api.get(`/trips/${tripId}`).then(response => setTrip(response.data.trip))
    }, [tripId])
    
    const displayDate = trip
        ? format(trip.starts_at, "d 'de 'LLL").concat(' até ').concat(format(trip.ends_at, "d 'de 'LLL"))
        : null

    return (
        <div className="px-4 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">
            <div className="flex items-center gap-2">
                <MapPin className="size-5 text-zinc-400" />
                <span className="text-lg text-zinc-100">{trip?.destination}</span>
            </div>
            <div className="flex items-center gap-5">
                <div className="flex items-center gap-2">
                    <Calendar className="size-5 text-zinc-400" />
                    <span className="text-zinc-100">{displayDate}</span>
                </div>
                <div className='w-px h-6 bg-zinc-800' />
                <Button onClick={openUpdateTripModal} variant="secondary">
                    <Settings2 className="size-5" />
                    Alterar local/data
                </Button>
                <Button onClick={goBack} variant="secondary">
                    <House className="size-5" />
                    Página Inicial
                </Button>
            </div>
            {isUpdateTripModalOpen && (
                <UpdateTripModal 
                    closeUpdateTripModal={closeUpdateTripModal}
                   
                />

            )}
        </div>
    )
}