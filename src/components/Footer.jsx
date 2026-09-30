export default function Footer() {
  return (
    <footer className="py-8 border-t border-zinc-800 text-center text-sm text-zinc-500">
      <p>&copy; {new Date().getFullYear()} Iraklis Agathis. All rights reserved.</p>
      <p className="mt-1">
        Built with{' '}
        <a
          href="https://react.dev"
          className="underline underline-offset-2 hover:text-zinc-400 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          React
        </a>
        ,{' '}
        <a
          href="https://vite.dev"
          className="underline underline-offset-2 hover:text-zinc-400 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          Vite
        </a>
        , and{' '}
        <a
          href="https://tailwindcss.com"
          className="underline underline-offset-2 hover:text-zinc-400 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          Tailwind CSS
        </a>
        .
      </p>
    </footer>
  )
}
