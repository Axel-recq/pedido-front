import { AlertTriangle } from 'lucide-react'
import { Modal, Button } from '@/shared/components/ui'

export const DeletePedidoModal = ({ isOpen, onClose, onConfirm, pedido, isDeleting }) => {
  if (!pedido) return null

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Eliminar Pedido"
      size="sm"
    >
      <div className="flex flex-col items-center text-center p-2">
        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4 text-red-600">
          <AlertTriangle size={24} />
        </div>
        
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          ¿Estás seguro?
        </h3>
        
        <p className="text-gray-500 mb-6">
          Vas a eliminar el pedido <span className="font-semibold text-gray-900">{pedido.numeroPedido}</span> de 
          <span className="font-semibold"> {pedido.cliente}</span>. 
          Esta acción no se puede deshacer.
        </p>

        <div className="flex gap-3 w-full">
          <Button 
            variant="secondary" 
            onClick={onClose} 
            fullWidth
            disabled={isDeleting}
          >
            Cancelar
          </Button>
          <Button 
            variant="danger" 
            onClick={() => onConfirm(pedido.id)} 
            fullWidth
            isLoading={isDeleting}
          >
            Sí, Eliminar
          </Button>
        </div>
      </div>
    </Modal>
  )
}