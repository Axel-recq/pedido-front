import { Edit2, Trash2, Eye } from 'lucide-react'
import { Table, Button } from '@/shared/components/ui'
import { formatters } from '@/shared/utils'

export const PedidoTable = ({ pedidos, onEdit, onDelete, onView }) => {
  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'Completado': return 'bg-green-100 text-green-800 border-green-200';
      case 'En Proceso': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Cancelado': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const columns = [
    {
      header: 'N° Pedido',
      accessor: 'numeroPedido',
      render: (row) => (
        <span className="font-medium text-gray-900">{row.numeroPedido}</span>
      )
    },
    {
      header: 'Cliente',
      accessor: 'cliente',
    },
    {
      header: 'Fecha',
      accessor: 'fecha',
      render: (row) => formatters.formatDate(row.fecha)
    },
    {
      header: 'Total',
      accessor: 'total',
      render: (row) => (
        <span className="font-mono font-medium">
          {formatters.formatCurrency(row.total)}
        </span>
      )
    },
    {
      header: 'Estado',
      accessor: 'estado',
      render: (row) => (
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${getEstadoColor(row.estado)}`}>
          {row.estado}
        </span>
      )
    },
    {
      header: 'Acciones',
      render: (row) => (
        <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-gray-500 hover:text-blue-600 p-1"
            onClick={() => onEdit(row)}
            title="Editar"
          >
            <Edit2 size={16} />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-gray-500 hover:text-red-600 p-1"
            onClick={() => onDelete(row)}
            title="Eliminar"
          >
            <Trash2 size={16} />
          </Button>
        </div>
      )
    }
  ]

  return (
    <Table 
      columns={columns} 
      data={pedidos} 
      emptyMessage="No se encontraron pedidos registrados."
      onRowClick={onEdit}
    />
  )
}