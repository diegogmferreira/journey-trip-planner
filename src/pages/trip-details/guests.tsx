import { CheckCircle2, CircleDashed, UserCog } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../../components/button";
import { api } from "../../lib/axios";

interface Participants {
  id: string
  name?: string
  email?: string
  is_confirmed: boolean
}

export function Guests() {
  const { tripId } = useParams()
  const [participants, setParticipants] = useState<Participants[]>([])

  useEffect(() => {
    api.get(`trips/${tripId}/participants`).then(response => setParticipants(response.data.participants))
  }, [tripId])

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Convidados</h2>

      <div className="space-y-5">
        {participants.map((participant, index) => (
          <div key={participant.id} className="flex items-center justify-between gap-4">
            <div className="space-y-1.5 flex-1">
              <span className="block text-zinc-100 font-medium">{participant.name || `Convidado ${index}`}</span>
              <span className="block text-sm text-zinc-400 truncate">{participant.email}</span>
            </div>
            {participant.is_confirmed
              ? <CheckCircle2 className="size-5 text-green-400" />
              : <CircleDashed className="size-5 text-zinc-400" />
            }
          </div>
        ))}
      </div>

      <Button variant="secondary" size="full" >
        <UserCog className="size-5" />
        Gerenciar convidados
      </Button>
    </div>
  )
}