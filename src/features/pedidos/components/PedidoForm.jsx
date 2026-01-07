import { Save, X, Calculator } from 'lucide-react'
import { usePedidoForm } from '../hooks/usePedidoForm'
import { Input, Button, Card } from '@/shared/components/ui'
import { PEDIDO_ESTADOS_OPTIONS } from '@/config/constants'

export const PedidoForm = ({ pedidoInicial, onSubmit, title }) => {
  const {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    handleCancel,
    validations
  } = usePedidoForm(pedidoInicial, onSubmit)

  return (
    <Card title={title} className="max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Número de Pedido */}
          <Input
            label="Número de Pedido"
            placeholder="Ej: PED-001"
            error={errors.numeroPedido?.message}
            disabled={isSubmitting}
            {...register('numeroPedido', validations.numeroPedido)}
          />

          {/* Fecha */}
          <Input
            label="Fecha del Pedido"
            type="date"
            error={errors.fecha?.message}
            disabled={isSubmitting}
            {...register('fecha', validations.fecha)}
          />

          {/* Cliente (Full Width en mobile) */}
          <div className="md:col-span-2">
            <Input
              label="Nombre del Cliente"
              placeholder="Nombre completo o Razón Social"
              error={errors.cliente?.message}
              disabled={isSubmitting}
              {...register('cliente', validations.cliente)}
            />
          </div>

          {/* Total */}
          <Input
            label="Monto Total"
            type="number"
            step="0.01"
            placeholder="0.00"
            icon={Calculator}
            error={errors.total?.message}
            disabled={isSubmitting}
            {...register('total', validations.total)}
          />

          {/* Estado */}
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Estado
            </label>
            <select
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 bg-white
                ${errors.estado 
                  ? 'border-error-500 focus:ring-error-200' 
                  : 'border-gray-300 focus:border-primary-500 focus:ring-primary-200'}`}
              disabled={isSubmitting}
              {...register('estado', validations.estado)}
            >
              <option value="">Seleccione un estado</option>
              {PEDIDO_ESTADOS_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            {errors.estado && (
              <p className="mt-1.5 text-sm text-error-600">
                {errors.estado.message}
              </p>
            )}
          </div>
        </div>

        {/* Botones de Acción */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
          <Button
            type="button"
            variant="secondary"
            onClick={handleCancel}
            disabled={isSubmitting}
            icon={X}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            isLoading={isSubmitting}
            icon={Save}
          >
            Guardar Pedido
          </Button>
        </div>
      </form>
    </Card>
  )
}