export default function MessagesLayout({ children }) {
  return (
    <>
      <main className="">
        <section className="min-h-screen">{children}</section>
      </main>
    </>
  );
}
