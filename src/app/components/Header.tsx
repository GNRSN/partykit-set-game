import Link from "next/link";

export default async function Header() {
  return (
    <header className="sticky top-0 z-10 w-full border-b border-stone-300 bg-white/80 px-3 py-1 backdrop-blur md:p-4">
      <nav className="m-auto flex max-w-7xl items-center justify-between">
        <Link href="/">
          <h1 className="my-2 font-medium">Match game</h1>
        </Link>
      </nav>
    </header>
  );
}
