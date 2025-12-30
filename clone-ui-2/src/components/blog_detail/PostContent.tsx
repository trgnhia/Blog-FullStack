import Container from "@/components/ui/Container";

export default function PostContent({ content }: { content: string }) {
  return (
    <Container>
      <article
        className="
          mt-10
          prose prose-lg prose-invert
          max-w-none
          text-white/80
          prose-img:mx-auto
          prose-img:block
        "
        dangerouslySetInnerHTML={{ __html: content ?? "" }}
      />
    </Container>
  );
}
