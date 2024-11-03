export default function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto mt-[69px] py-8 flex flex-1 justify-center items-start">
      {children}
    </div>
  );
}
