import { useRouter } from "next/router";

type AuthModalProps = {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
};

export const AuthModal = ({
  isOpen,
  onClose,
  message = "Для просмотра деталей необходимо авторизоваться.",
}: AuthModalProps) => {
  const router = useRouter();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md mx-4">
        <h3 className="text-lg font-semibold mb-2">Требуется авторизация</h3>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition"
          >
            Отмена
          </button>
          <button
            onClick={() => router.push("/api/auth/signin")}
            className="px-4 py-2 bg-[#19ad55] text-white rounded-md hover:bg-[#158c46] transition"
          >
            Войти
          </button>
        </div>
      </div>
    </div>
  );
};
