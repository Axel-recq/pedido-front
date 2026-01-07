 
import { Edit2, Trash2, Calendar, User, DollarSign } from 'lucide-react'
import { Card, Button } from '@/shared/components/ui'
import { formatters } from '@/shared/utils'

export const PedidoCard = ({ pedido, onEdit, onDelete }) => {
  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'Completado': return 'bg-green-100 text-green-800 border-green-200';
      case 'En Proceso': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Cancelado': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="text-xs font-bold text-primary-600 bg-primary-50 px-2 py-1 rounded-md">
            {pedido.numeroPedido}
          </span>
        </div>
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${getEstadoColor(pedido.estado)}`}>
          {pedido.estado}
        </span>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex items-center text-sm text-gray-600">
          <User size={16} className="mr-2 text-gray-400" />
          <span className="font-medium text-gray-900">{pedido.cliente}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600">
          <Calendar size={16} className="mr-2 text-gray-400" />
          <span>{formatters.formatDate(pedido.fecha)}</span>
        </div>

        <div className="flex items-center text-sm text-gray-600">
          <DollarSign size={16} className="mr-2 text-gray-400" />
          <span className="font-bold text-gray-900 text-lg">
            {formatters.formatCurrency(pedido.total)}
          </span>
        </div>
      </div>

      <div className="flex gap-2 pt-4 border-t border-gray-100">
        <Button 
          variant="outline" 
          size="sm" 
          fullWidth
          onClick={() => onEdit(pedido)}
          icon={Edit2}
        >
          Editar
        </Button>
        <Button 
          variant="outline" // Cambiado a outline/danger visualmente
          className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
          size="sm" 
          fullWidth
          onClick={() => onDelete(pedido)}
          icon={Trash2}
        >
          Eliminar
        </Button>
      </div>
    </Card>
  )
}