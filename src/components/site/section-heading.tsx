export function SectionHeading({
  file,
  title,
  text,
}: {
  file: string;
  title: string;
  text?: string;
}) {
  return (
    <header className="mb-4 max-w-2xl">
      <p className="font-pixel text-xl text-amber">{file}</p>
      <h2 className="font-pixel text-4xl leading-tight text-balance text-cream sm:text-5xl">{title}</h2>
      {text ? (
        <p className="mt-2 max-w-xl font-sans text-base leading-relaxed text-pretty text-grey">{text}</p>
      ) : null}
    </header>
  );
}
