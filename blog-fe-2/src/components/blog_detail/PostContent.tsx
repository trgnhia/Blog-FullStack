import Container from "@/components/ui/Container";

export default function PostContent({ content }: { content: string }) {
  return (
    <Container>
      <article
        className="
          mt-10
          prose prose-lg dark:prose-invert
          max-w-none
          text-[#1a1a1a] dark:text-white/80
          prose-img:mx-auto
          prose-img:block
          transition-colors
        "
        dangerouslySetInnerHTML={{ __html: content ?? "" }}
      />
    </Container>
  );
}
