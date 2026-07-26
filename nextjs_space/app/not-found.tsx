import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-gray-400 mb-8">Страница не найдена</p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-primary text-black font-bold hover:bg-accent transition-colors"
        >
          На главную
        </Link>
      </div>
    </div>
  );
}
