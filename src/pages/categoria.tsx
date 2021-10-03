import type { NextPage } from 'next'
import Shell from '@components/layout/shell'
import Table from '@components/tables/categoriaTable'
import useCategoria from '@data/hooks/useCategoria'
import FormModal from '@components/overlays/formModal'
import Form from '@components/forms/categoriaForm'


const Categoria: NextPage = () => {
  const {
    categoria,
    filtredData,
    dialogCardOpen,
    setDialogCardOpen,
    add,
    save,
    remove,
    select,
    search,
  } = useCategoria()

  return (
    <>
      <Shell title="Categorias">
        <FormModal open={dialogCardOpen} setOpen={setDialogCardOpen}>
          <Form saveAction={save} cancelAction={setDialogCardOpen} categoria={categoria} />
        </FormModal>
        <Table categorias={filtredData} selectAction={select} addAction={add} deleteAction={remove} searchAction={search} />
      </Shell>
    </>
  )
}

export default Categoria
