import Navbar from "../nav/Navbar";
import Container from "../ui/Container";

export default function HeaderShell() {
  return (
    <header className="sticky top-0 z-50">
      <div className="bg-black/30 backdrop-blur-md border-b border-white/10">
        <Container>
          <Navbar />
        </Container>
      </div>
    </header>
  );
}
