import { Calendar, MapPin, X } from "lucide-react";
import { Button } from "../../components/button";
import { FormEvent, useState } from "react";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { DateRange, DayPicker } from "react-day-picker";

interface closeUpdateTripModalProps {
    closeUpdateTripModal: () => void
    
}


export function UpdateTripModal({ closeUpdateTripModal }: closeUpdateTripModalProps) {
    const { tripId } = useParams()
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
    const [eventStartAndEndDates, setEventStartAndEndDates] = useState<DateRange | undefined>()



    function openDatePicker() {
        return setIsDatePickerOpen(true)
    }
    function closeDatePicker() {
        return setIsDatePickerOpen(false)
    }

    async function UpdateTrip(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if(!eventStartAndEndDates?.from || !eventStartAndEndDates?.to) {
            return
          }

        const data = new FormData(event.currentTarget)
        const destination = data.get('where')?.toString()

        await api.put(`/trips/${tripId}`, {
            destination,
            starts_at: eventStartAndEndDates.from,
            ends_at: eventStartAndEndDates.to,
        })

        window.document.location.reload()
    }
    const displayDate = eventStartAndEndDates && eventStartAndEndDates.from && eventStartAndEndDates.to
        ? format(eventStartAndEndDates.from, "d 'de 'LLL").concat(' até ').concat(format(eventStartAndEndDates.to, "d 'de 'LLL"))
        : null

    return (
        <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
            <div className='w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5'>
                <div className='space-y-2'>
                    <div className='flex items-center justify-between'>
                        <h2 className='text-lg font-semibold'>Atualizar Local/Data</h2>
                        <button type='button' onClick={closeUpdateTripModal} className=''>
                            <X className='size-5 text-zinc-400' />
                        </button>
                    </div>
                </div>

                <form onSubmit={UpdateTrip} className='space-y-3'>
                    <div className='h-14 px-4 bg-zinc-950 border border-zinc-800 roudend-lg flex items-center gap-2'>
                        <MapPin className='text-zinc-400 size-5' />
                        <input
                            name='where'
                            placeholder='Para onde você vai??'
                            className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <button onClick={openDatePicker} className='h-14 flex-1 px-4 bg-zinc-950 border border-zinc-800 roudend-lg flex items-center gap-2'>
                            <Calendar className='text-zinc-400 size-5' />
                            <span className="text-lg text-zinc-400">
                                {displayDate || 'Quando?'}
                            </span>
                        </button>
                        {isDatePickerOpen && (
                            <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
                                <div className='rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5'>
                                    <div className='space-y-2'>
                                        <div className='flex items-center justify-between'>
                                            <h2 className='text-lg font-semibold'>Selecione a data</h2>
                                            <button type='button' onClick={closeDatePicker} className=''>
                                                <X className='size-5 text-zinc-400' />
                                            </button>
                                        </div>
                                    </div>
                                    <DayPicker mode="range" selected={eventStartAndEndDates} onSelect={setEventStartAndEndDates} />
                                </div>
                            </div>
                        )}
                    </div>
                    <Button type="submit" variant="primary" size="full">
                        Atualizar viagem
                    </Button>
                </form>
            </div>
        </div>
    )
}