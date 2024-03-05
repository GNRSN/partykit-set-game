import CursorsProvider from "../components/cursors/cursors-provider";
import Cursors from "../components/cursors/Cursors";

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
