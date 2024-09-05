import { Loader2 } from 'lucide-react'
import React from 'react'

type Props = {}

const PageLoader = (props: Props) => {
  return (
    <div className='min-h-screen w-full flex items-center justify-center'>
      <Loader2 className='animate-spin w-20 h-20 text-primary' />
    </div>
  )
}

export default PageLoader
