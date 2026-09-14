export function SourceCode({ code, language = "tsx" }: { code: string; language?: string }) {
  return (
    <pre className="yb-docs-source-code">
      <code className={`language-${language}`}>{code}</code>
    </pre>
  )
}
