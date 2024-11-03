export default function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto py-8 flex flex-1 justify-center items-center">
      {children}
    </div>
  );
}
