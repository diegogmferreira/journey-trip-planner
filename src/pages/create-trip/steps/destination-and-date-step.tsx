import { format } from "date-fns";
import { ArrowRight, Calendar, MapPin, Settings2, X } from "lucide-react";
import { useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { Button } from "../../../components/button";

interface IProps {
  isGuestsInputOpen: boolean;
  openGuestsInput: () => void;
  closeGuestsInput: () => void;
  setDestination: (destination: string) => void;
  setSelectedDates: (selectedDates: DateRange | undefined) => void;
  selectedDates: DateRange | undefined;
}

export function DestinationAndDateStep({ isGuestsInputOpen, openGuestsInput, closeGuestsInput, setDestination, selectedDates, setSelectedDates }: IProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const formattedDate = selectedDates && selectedDates.from && selectedDates.to
    ? format(selectedDates.from, "d' de ' LLL").concat(' até ').concat(format(selectedDates.to, "d' de ' LLL"))
    : null
    
  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
      <div className="flex items-center gap-2 flex-1">
        <MapPin className="size-5 text-zinc-400" />
        <input
          disabled={isGuestsInputOpen}
          type="text"
          placeholder="Para onde você vai?"
          className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
          onChange={(e) => setDestination(e.target.value)}
        />
      </div>

      <button
        className="flex items-center gap-2 text-left w-[240px]"
        onClick={() => setIsDatePickerOpen(true)}
        disabled={isGuestsInputOpen}
      >
        <Calendar className="size-5 text-zinc-400" />
        <span className="bg-transparent text-lg w-40 flex-1">
          {formattedDate ?? 'Quando?'}
        </span>
      </button>

      {isDatePickerOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="font-lg font-semibold">Selecione a data</h2>
                <button>
                  <X className="size-5 text-zinc-400" onClick={() => setIsDatePickerOpen(false)} />
                </button>
              </div>
            </div>

            <DayPicker
              mode="range"
              selected={selectedDates}
              onSelect={setSelectedDates}
            />
          </div>
        </div>
      )}


      <div className="w-px h-6 bg-zinc-800" />

      {isGuestsInputOpen ? (
        <Button onClick={closeGuestsInput} variant="secondary" >
          Alterar local/data
          <Settings2 className="size-5" />
        </Button>
      ) : (
        <Button onClick={openGuestsInput}>
          Continuar
          <ArrowRight className="size-5" />
        </Button>
      )}
    </div>
  )
}