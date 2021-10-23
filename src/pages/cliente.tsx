import type { NextPage } from 'next'
import Shell from '@components/layout/shell'
import Table from '@components/tables/customerTable'
import useCustomer from '@data/hooks/useCustomer'
import FormModal from '@components/overlays/formModal'
import Form from '@components/forms/customerForm'


const Cliente: NextPage = () => {
  const {
    customer,
    customers,
    dialogCardOpen,
    pagination,
    setDialogCardOpen,
    add,
    save,
    remove,
    select,
    search,
    paginate
  } = useCustomer()

  return (
    <>
      <Shell title="Clientes">
        <FormModal open={dialogCardOpen} setOpen={setDialogCardOpen}>
          <Form saveAction={save} cancelAction={setDialogCardOpen} customer={customer} />
        </FormModal>
        <Table customers={customers} selectAction={select} addAction={add} deleteAction={remove} searchAction={search} pagination={pagination} paginate={paginate} />
      </Shell>
    </>
  )
}

export default Cliente
