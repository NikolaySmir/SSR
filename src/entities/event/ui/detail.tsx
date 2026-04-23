import { useState } from "react";
import { trpc, RouterOutput } from "@/shared/api";
import { useRouter } from "next/router";

type EventDetailProps = NonNullable<RouterOutput["event"]["findUnique"]>;

export const EventDetail = ({
  id,
  title: initialTitle,
  description: initialDescription,
  date: initialDate,
  participations,
  authorId,
  currentUserId,
}: EventDetailProps & { id: number; currentUserId?: number }) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription || "");
  const [date, setDate] = useState(initialDate.toISOString().split("T")[0]);

  const isAuthor = currentUserId !== undefined && authorId === currentUserId;

  const updateMutation = trpc.event.update.useMutation({
    onSuccess: () => {
      setIsEditing(false);
      router.push(router.asPath);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate({
      id,
      title,
      description: description || undefined,
      date: new Date(date),
    });
  };

  if (isEditing) {
    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h2 className="text-xl font-medium text-gray-600 mb-4">Событие</h2>
        </div>

        <div className="max-w-[66%]">
          <label className="block text-sm font-medium text-gray-700">
            Название
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Описание
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          <p className="mt-4 text-sm text-gray-500">
            Напишите несколько предложений о предстоящем мероприятии
          </p>
        </div>

        <div className="w-auto inline-block">
          <label className="block text-sm font-medium text-gray-700">
            Дата проведения
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 block w-auto rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div className="flex gap-3 justify-end">
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            Отмена
          </button>
          <button
            type="submit"
            disabled={updateMutation.isLoading}
            className="rounded-md bg-[#2b6cec] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#1e5ad4] disabled:opacity-50 transition"
          >
            {updateMutation.isLoading ? "Обновление..." : "Обновить"}
          </button>
        </div>
      </form>
    );
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "10px",
        }}
      >
        <div className="px-4 sm:px-0">
          <h3 className="text-base font-semibold leading-7 text-gray-900">
            Информация о событии
          </h3>
        </div>
        {isAuthor && (
          <div className="mb-4 flex justify-end">
            <button
              onClick={() => setIsEditing(true)}
              className="rounded-md bg-[#2b6cec] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#1e5ad4] transition"
            >
              Редактировать событие
            </button>
          </div>
        )}
      </div>

      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Название
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {title}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Описание
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {description || "—"}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Дата проведения
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {initialDate.toLocaleDateString()}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Участники
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {participations.map(({ user }) => user.name).join(", ")}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};
