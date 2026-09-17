import {
  componentCatalog,
  componentCategories,
  type ComponentCatalogEntry,
} from "../../lib/component-catalog"

type ComponentCatalogProps = {
  entries?: readonly ComponentCatalogEntry[]
}

export function ComponentCatalog({ entries = componentCatalog }: ComponentCatalogProps) {
  return (
    <div className="yb-docs-component-catalog">
      {componentCategories.map((category, index) => {
        const categoryEntries = entries.filter((entry) => entry.category === category)

        if (categoryEntries.length === 0) {
          return null
        }

        const headingId = `yb-component-catalog-category-${index}`

        return (
          <section
            aria-labelledby={headingId}
            className="yb-docs-component-catalog-section"
            key={category}
          >
            <div className="yb-docs-component-catalog-section-header">
              <h2 id={headingId}>{category}</h2>
              <span>{categoryEntries.length} 个组件</span>
            </div>
            <ul className="yb-docs-component-catalog-grid">
              {categoryEntries.map((entry) => (
                <li className="yb-docs-component-catalog-item" key={entry.name}>
                  <div className="yb-docs-component-catalog-item-header">
                    {entry.status === "documented" ? (
                      <a className="yb-docs-component-catalog-item-name" href={entry.href}>
                        {entry.name}
                      </a>
                    ) : (
                      <span className="yb-docs-component-catalog-item-name">{entry.name}</span>
                    )}
                    <span className="yb-docs-component-catalog-item-status">
                      {entry.status === "documented" ? "已完善" : "文档编写中"}
                    </span>
                  </div>
                  <p>{entry.description}</p>
                </li>
              ))}
            </ul>
          </section>
        )
      })}
    </div>
  )
}
