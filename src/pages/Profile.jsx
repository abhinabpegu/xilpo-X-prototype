export default function Profile() {
  return (
    <PlaceholderPage
      title="Profile"
      detail="Artisan details, cooperative/SHG membership, and payout settings will live here."
    />
  );
}

function PlaceholderPage({ title, detail }) {
  return (
    <div className="px-6 pt-10 pb-6 flex flex-col items-center text-center gap-3">
      <h1 className="font-display font-bold text-2xl text-ink">{title}</h1>
      <p className="font-sans text-sm text-ink/60 max-w-[32ch]">{detail}</p>
    </div>
  );
}
