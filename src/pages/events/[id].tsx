import { EventDetail } from "@/entities/event";
import { trpc } from "@/shared/api";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export default function Event() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const eventId = Number(router.query.id);

  const { data, isLoading } = trpc.event.findUnique.useQuery(
    { id: eventId },
    { enabled: !isNaN(eventId) },
  );

  if (isNaN(eventId)) {
    return "Неверный идентификатор события";
  }

  if (isLoading) {
    return "Loading...";
  }

  if (status === "unauthenticated") {
    return "Forbidden";
  }

  if (!data) {
    return "Событие не найдено";
  }

  return (
    <EventDetail id={eventId} {...data} currentUserId={session?.user?.id} />
  );
}
