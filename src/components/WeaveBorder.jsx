/**
 * A slim repeating diamond band, evoking the supplementary-thread borders
 * woven into traditional Assamese handloom textiles. Purely decorative —
 * marked aria-hidden so screen readers skip it.
 */
export default function WeaveBorder() {
  return (
    <div
      aria-hidden="true"
      className="h-4 w-full shrink-0"
      style={{
        backgroundColor: "#24365C",
        backgroundImage:
          "linear-gradient(135deg, #B4432E 25%, transparent 25%), linear-gradient(225deg, #B4432E 25%, transparent 25%), linear-gradient(45deg, #E3A83B 25%, transparent 25%), linear-gradient(315deg, #E3A83B 25%, transparent 25%)",
        backgroundPosition: "8px 0, 8px 0, 0 0, 0 0",
        backgroundSize: "16px 16px",
      }}
    />
  );
}
