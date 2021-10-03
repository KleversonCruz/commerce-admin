import type { NextPage } from 'next'
import Shell from '@components/layout/shell'
import CardsGrid from '@components/grids/cardsGrid'


const Admin: NextPage = () => {
  return (
    <>
      <Shell title="Início">
        <CardsGrid/>
      </Shell>
    </>
  )
}

export default Admin
