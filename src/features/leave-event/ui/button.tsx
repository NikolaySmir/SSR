import { trpc } from "@/shared/api";

type LeaveEventButtonProps = {
  eventId: number;
  onSuccess?: () => void;
};

export const LeaveEventButton = ({
  eventId,
  onSuccess,
}: LeaveEventButtonProps) => {
  const { mutate } = trpc.event.leave.useMutation({ onSuccess });

  const handleClick = () => {
    mutate({ id: eventId });
  };

  return (
    <button
      className="h-10 px-6 font-semibold rounded-md bg-[#ed5250] text-white hover:bg-[#d43f3d] transition"
      onClick={handleClick}
    >
      Покинуть
    </button>
  );
};
