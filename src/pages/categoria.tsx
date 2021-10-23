import type { NextPage } from 'next'
import Shell from '@components/layout/shell'
import Table from '@components/tables/categoryTable'
import useCategoria from '@data/hooks/useCategory'
import FormModal from '@components/overlays/formModal'
import Form from '@components/forms/categoryForm'


const Categoria: NextPage = () => {
  const {
    category,
    categories,
    dialogCardOpen,
    pagination,
    setDialogCardOpen,
    add,
    save,
    remove,
    select,
    search,
    paginate
  } = useCategoria()

  return (
    <>
      <Shell title="Categorias">
        <FormModal open={dialogCardOpen} setOpen={setDialogCardOpen}>
          <Form saveAction={save} cancelAction={setDialogCardOpen} category={category} />
        </FormModal>
        <Table categories={categories} selectAction={select} addAction={add} deleteAction={remove} searchAction={search} pagination={pagination} paginate={paginate} />
      </Shell>
    </>
  )
}

export default Categoria
