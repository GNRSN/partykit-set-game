import Cursors from "@/components/cursors/Cursors";
import CursorsProvider from "@/components/cursors/cursors-provider";

export default function HomepageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CursorsProvider>
      <Cursors />
      {children}
    </CursorsProvider>
  );
}
