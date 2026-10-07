import { useCollection } from '../useCollection.js'

function formatValue(value) {
  if (value === null || value === undefined || value === '') {
    return '—'
  }
  if (Array.isArray(value)) {
    return value.length ? value.map(formatValue).join(', ') : '—'
  }
  if (typeof value === 'object') {
    if (value.name) return value.name
    if (value.email) return value.email
    if (value._id) return value._id
    return JSON.stringify(value)
  }
  return String(value)
}

export default function CollectionPage({ eyebrow, title, description, request, columns }) {
  const { items, total, loading, error } = useCollection(request)

  return (
    <section className="collection-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="page-description">{description}</p>
        </div>
        {!loading && !error && (
          <span className="record-count">
            {items.length === total ? `${total} records` : `${items.length} of ${total} records`}
          </span>
        )}
      </div>

      {loading && (
        <div className="state-message" role="status">
          <span className="spinner-border spinner-border-sm" aria-hidden="true" />
          <span>Loading {title.toLowerCase()}…</span>
        </div>
      )}

      {error && (
        <div className="alert alert-danger" role="alert">
          <strong>Couldn’t load {title.toLowerCase()}.</strong> {error}
        </div>
      )}

      {!loading && !error && items.length === 0 && (
        <div className="empty-state">
          <span className="empty-icon" aria-hidden="true">○</span>
          <h2>Nothing here just yet</h2>
          <p>When there’s something to show, it’ll appear here.</p>
        </div>
      )}

      {!loading && !error && items.length > 0 && (
        <div className="table-responsive collection-table-wrap">
          <table className="table collection-table">
            <thead>
              <tr>
                {columns.map(({ label }) => <th key={label} scope="col">{label}</th>)}
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={item._id ?? item.id ?? index}>
                  {columns.map(({ label, value }) => (
                    <td key={label}>{formatValue(value(item))}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
