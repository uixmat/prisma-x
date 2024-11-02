export const Footer = () => {
  return (
    <div className="container mt-auto">
      <footer className="flex justify-center items-center text-center bg-background/70 backdrop-blur-sm p-4 mt-auto left-0 right-0 w-full z-10 text-foreground">
        <span className="text-sm">
          Made with love by{" "}
          <a
            href="https://twitter.com/uixmat"
            target="_blank"
            className="font-bold hover:underline"
          >
            uixmat
          </a>
        </span>
      </footer>
    </div>
  );
};
