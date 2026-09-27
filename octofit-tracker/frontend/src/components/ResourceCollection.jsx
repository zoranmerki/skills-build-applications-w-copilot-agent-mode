import { useEffect, useState } from 'react';
import { API_BASE_URL, collectionFromResponse } from '../api.js';

function formatValue(value) {
  if (value === null || value === undefined || value === '') return '-';
  if (Array.isArray(value)) return value.map(formatValue).join(', ');
  if (typeof value === 'object') return value.name ?? value.username ?? value.title ?? value._id ?? value.id ?? '-';
  return String(value);
}

export default function ResourceCollection({ title, description, resource, columns }) {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [reload, setReload] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function loadCollection() {
      setLoading(true);
      setError('');
      try {
        const response = await fetch(`${API_BASE_URL}/${resource}/`, { signal: controller.signal });
        if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
        const payload = await response.json();
        setRecords(collectionFromResponse(payload));
      } catch (requestError) {
        if (requestError.name !== 'AbortError') {
          setError(requestError.message || 'Unable to load this collection.');
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    loadCollection();
    return () => controller.abort();
  }, [resource, reload]);

  return (
    <section className="collection-view" aria-labelledby={`${resource}-title`}>
      <div className="collection-heading">
        <div>
          <p className="eyebrow">TRACKER / {resource.toUpperCase()}</p>
          <h1 id={`${resource}-title`}>{title}</h1>
          <p className="collection-description">{description}</p>
        </div>
        <div className="collection-count" aria-live="polite">
          <strong>{loading ? '...' : records.length}</strong>
          <span>{records.length === 1 ? 'record' : 'records'}</span>
        </div>
      </div>

      <div className="collection-toolbar">
        <span>{loading ? 'Syncing latest data' : error ? 'Connection issue' : 'Latest data'}</span>
        <button
          className="btn btn-sm btn-outline-dark refresh-button"
          type="button"
          onClick={() => setReload((value) => value + 1)}
          disabled={loading}
          aria-label={`Refresh ${title.toLowerCase()}`}
          title="Refresh data"
        >
          <span aria-hidden="true">↻</span> Refresh
        </button>
      </div>

      {error ? (
        <div className="alert alert-warning collection-alert" role="alert">
          <strong>Could not load {title.toLowerCase()}.</strong> {error}
        </div>
      ) : null}

      <div className="table-responsive collection-table-wrap">
        <table className="table collection-table align-middle mb-0">
          <thead>
            <tr>
              {columns.map((column) => <th scope="col" key={column.key}>{column.label}</th>)}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td className="table-message" colSpan={columns.length}>Loading {title.toLowerCase()}...</td></tr>
            ) : records.length === 0 ? (
              <tr><td className="table-message" colSpan={columns.length}>{error ? 'Data is unavailable right now.' : `No ${title.toLowerCase()} to show yet.`}</td></tr>
            ) : records.map((record, rowIndex) => (
              <tr key={record._id ?? record.id ?? record.username ?? record.title ?? rowIndex}>
                {columns.map((column) => (
                  <td key={column.key}>
                    {column.render ? column.render(record[column.key], record) : formatValue(record[column.key])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="endpoint-note">GET {API_BASE_URL}/{resource}/</p>
    </section>
  );
}
