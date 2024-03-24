import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full px-4 py-4 sm:px-6">
      <div className="m-auto flex max-w-7xl flex-row items-center justify-between pt-4 text-sm text-stone-400">
        <div className="flex flex-col justify-start gap-1">
          <p>
            Built with{" "}
            <Link
              href="https://nextjs.org"
              className="underline"
            >
              Next.js
            </Link>{" "}
            and{" "}
            <Link
              href="https://partykit.io"
              className="underline"
            >
              PartyKit
            </Link>
          </p>
        </div>
        <div className="flex flex-col justify-end">
          <Link
            href="https://github.com/GNRSN/partykit-set-game"
            className="whitespace-nowrap rounded bg-stone-200 p-2 text-stone-600 hover:bg-stone-300"
          >
            View on GitHub
          </Link>
        </div>
      </div>
    </footer>
  );
}
