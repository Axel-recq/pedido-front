
/**
 * Componente Table
 * Tabla reutilizable con estilos consistentes
 */

import PropTypes from 'prop-types'

export const Table = ({
  columns,
  data,
  onRowClick,
  emptyMessage = 'No hay datos disponibles',
  className = '',
}) => {
  if (!data || data.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-gray-500">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="min-w-full divide-y divide-gray-200">
        {/* Header */}
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>

        {/* Body */}
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              onClick={() => onRowClick && onRowClick(row)}
              className={onRowClick ? 'hover:bg-gray-50 cursor-pointer transition-colors' : ''}
            >
              {columns.map((column, colIndex) => (
                <td
                  key={colIndex}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                >
                  {column.render ? column.render(row) : row[column.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

Table.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      header: PropTypes.string.isRequired,
      accessor: PropTypes.string,
      render: PropTypes.func,
    })
  ).isRequired,
  data: PropTypes.array.isRequired,
  onRowClick: PropTypes.func,
  emptyMessage: PropTypes.string,
  className: PropTypes.string,
}

export default Table
