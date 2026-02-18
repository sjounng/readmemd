export default function CodeBlock({ children, title }: { children: string; title?: string }) {
  return (
    <div className="code-block">
      {title && (
        <div className="px-4 py-2 border-b border-(--border) text-xs text-(--text-muted) font-mono">
          {title}
        </div>
      )}
      <pre className="p-4 overflow-x-auto">
        <code>{children}</code>
      </pre>
    </div>
  );
}
