import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

export const Header = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  return (
    <header className="bg-white pt-4 pb-8 sticky top-0 bg-white z-10">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="text-xl font-bold text-gray-800 hover:text-gray-600"
        >
          <div className="flex items-center gap-2">
            <div className="relative">
              <Image
                src="/logo.svg"
                alt="Logo"
                width={30}
                height={30}
                className="object-contain"
              />
            </div>
            <div className="font-inter">Result School</div>
          </div>
        </Link>
        <div className="flex items-center gap-4">
          {status === "loading" ? (
            <div className="w-20 h-8 bg-gray-200 animate-pulse rounded"></div>
          ) : status === "authenticated" ? (
            <div>
              <span className="text-gray-600 font-medium">
                {session.user?.name || session.user?.email}
              </span>
              <button
                onClick={handleSignOut}
                className="p-2 hover:bg-gray-100 rounded-full transition text-gray-600"
                title="Выйти"
              >
                ←
              </button>
              {status === "authenticated" && (
                <Link
                  href="/events/create"
                  className="bg-[#19ad55] text-white font-semibold px-4 py-2 rounded-md hover:bg-[#158c46] transition"
                >
                  Создать событие
                </Link>
              )}
            </div>
          ) : (
            <button
              onClick={() => signIn()}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition"
            >
              <span>Войти</span>
              <span>→</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
