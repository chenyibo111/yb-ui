export type ApiProp = {
  name: string
  type: string
  defaultValue: string
  description: string
}

export function ApiTable({ rows }: { rows: ApiProp[] }) {
  return (
    <div className="yb-docs-api-table-wrapper">
      <table className="yb-docs-api-table">
        <thead>
          <tr>
            <th scope="col">属性</th>
            <th scope="col">类型</th>
            <th scope="col">默认值</th>
            <th scope="col">说明</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name}>
              <td>
                <code>{row.name}</code>
              </td>
              <td>
                <code>{row.type}</code>
              </td>
              <td>
                <code>{row.defaultValue}</code>
              </td>
              <td>{row.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
