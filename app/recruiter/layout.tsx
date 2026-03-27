export default function RecruiterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-full">
      {children}
    </div>
  );
}
