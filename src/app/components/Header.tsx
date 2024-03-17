import Link from "next/link";

export default async function Header() {
  return (
    <header className="z-10 p-4 sm:p-4 w-full border-b border-stone-300 sticky top-0 bg-white/80 backdrop-blur">
      <nav className="max-w-7xl m-auto flex justify-between items-center">
        <Link href="/">
          <h1 className="font-medium my-2">Match game</h1>
        </Link>
      </nav>
    </header>
  );
}
