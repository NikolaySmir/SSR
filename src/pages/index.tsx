import { EventCard } from "@/entities/event";
import { JoinEventButton } from "@/features/join-event";
import { LeaveEventButton } from "@/features/leave-event";
import { trpc } from "@/shared/api";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data, refetch } = trpc.event.findMany.useQuery();
  const { status } = useSession(); // получаем статус авторизации

  return (
    <ul style={{ overflow: "auto" }}>
      {data?.map((event) => (
        <li key={event.id} className="mb-6">
          <EventCard
            {...event}
            action={
              status === "authenticated" ? (
                event.isJoined ? (
                  <LeaveEventButton eventId={event.id} onSuccess={refetch} />
                ) : (
                  <JoinEventButton eventId={event.id} onSuccess={refetch} />
                )
              ) : (
                <div />
              )
            }
          />
        </li>
      ))}
    </ul>
  );
}
