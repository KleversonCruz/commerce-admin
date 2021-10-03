import type { NextPage } from 'next'
import useProduto from '@data/hooks/useProduto'
import Shell from '@components/layout/shell'
import FormModal from '@components/overlays/formModal'
import Form from '@components/forms/produtoForm'
import Table from '@components/tables/produtoTable'

const Produtos: NextPage = () => {

  const {
    produto,
    categorias,
    filtredData,
    dialogCardOpen,
    setDialogCardOpen,
    add,
    save,
    remove,
    select,
    search,
  } = useProduto()

  return (
    <>
      <Shell title="Produtos">
        <FormModal open={dialogCardOpen} setOpen={setDialogCardOpen}>
          <Form saveAction={save} cancelAction={setDialogCardOpen} produto={produto} categorias={categorias}/>
        </FormModal>
        <Table produtos={filtredData} selectAction={select} addAction={add} deleteAction={remove} searchAction={search} />
      </Shell>
    </>
  )
}

export default Produtos
