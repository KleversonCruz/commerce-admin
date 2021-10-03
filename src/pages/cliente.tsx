import type { NextPage } from 'next'
import Shell from '@components/layout/shell'
import Table from '@components/tables/clienteTable'
import useCliente from '@data/hooks/useCliente'
import FormModal from '@components/overlays/formModal'
import Form from '@components/forms/clienteForm'


const Cliente: NextPage = () => {
  const {
    cliente,
    clientes,
    filtredData,
    dialogCardOpen,
    setDialogCardOpen,
    add,
    save,
    remove,
    select,
    search,
  } = useCliente()

  return (
    <>
      <Shell title="Clientes">
        <FormModal open={dialogCardOpen} setOpen={setDialogCardOpen}>
          <Form saveAction={save} cancelAction={setDialogCardOpen} cliente={cliente} />
        </FormModal>
        <Table clientes={filtredData} selectAction={select} addAction={add} deleteAction={remove} searchAction={search} />
      </Shell>
    </>
  )
}

export default Cliente
