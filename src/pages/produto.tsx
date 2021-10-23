import type { NextPage } from 'next'
import useProduct from '@data/hooks/useProduct'
import Shell from '@components/layout/shell'
import FormModal from '@components/overlays/formModal'
import Form from '@components/forms/productForm'
import Table from '@components/tables/productTable'
import useCategoria from '@data/hooks/useCategory'

const Produtos: NextPage = () => {

  const {
    product,
    products,
    dialogCardOpen,
    pagination,
    setDialogCardOpen,
    add,
    save,
    remove,
    select,
    search,
    paginate
  } = useProduct()

  const {
    categories
  } = useCategoria()

  return (
    <>
      <Shell title="Produtos">
        <FormModal open={dialogCardOpen} setOpen={setDialogCardOpen}>
          <Form saveAction={save} cancelAction={setDialogCardOpen} product={product} categories={categories} />
        </FormModal>
        <Table products={products} selectAction={select} addAction={add} deleteAction={remove} searchAction={search} pagination={pagination} paginate={paginate} />
      </Shell>
    </>
  )
}

export default Produtos
