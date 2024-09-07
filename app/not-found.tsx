import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

const NotFoundPage = () => {
  return (
    <div className='h-screen w-full mx-auto text-center py-10'>
      <h2 className='mx-auto text-center text-sm mb-2'>Not Found</h2>
      <p className='mx-auto text-center text-xs mb-4'>Could not find requested resource</p>
      <Link href='/' className='text-xs flex items-center gap-1.5 justify-center hover:text-primary'>
        Return Home <ArrowUpRight className='h-4 w-4' />
      </Link>
    </div>
  )
}

export default NotFoundPage
