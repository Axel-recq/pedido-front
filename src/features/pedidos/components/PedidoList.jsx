import { PedidoTable } from './PedidoTable'
import { PedidoCard } from './PedidoCard'

export const PedidoList = ({ pedidos, onEdit, onDelete }) => {
  if (!pedidos || pedidos.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200 border-dashed">
        <p className="text-gray-500">No se encontraron pedidos registrados.</p>
      </div>
    )
  }

  return (
    <>
      {/* Vista Desktop: Tabla */}
      <div className="hidden md:block">
        <PedidoTable 
          pedidos={pedidos} 
          onEdit={onEdit} 
          onDelete={onDelete} 
        />
      </div>

      {/* Vista Mobile: Grid de Tarjetas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
        {pedidos.map((pedido) => (
          <PedidoCard
            key={pedido.id}
            pedido={pedido}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </>
  )
}