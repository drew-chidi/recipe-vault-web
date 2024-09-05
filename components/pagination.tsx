import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { Button } from './ui/button'

type Props = {
  currentPage: number
  totalPages: number
  onPageChange: (e: number) => void
}

export function CustomPagination({ currentPage, totalPages, onPageChange }: Props) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <Button variant={'outline'} disabled={currentPage < 2} onClick={() => onPageChange(currentPage - 1)} className='cursor-pointer'>
            Prev
          </Button>
        </PaginationItem>
        {Array.from({ length: totalPages }, (_, index) => (
          <PaginationItem key={index}>
            <PaginationLink isActive={currentPage === index + 1} onClick={() => onPageChange(index + 1)}>
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        {totalPages > 5 && currentPage < totalPages - 1 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        <PaginationItem>
          <Button
            variant={'outline'}
            disabled={currentPage >= totalPages}
            onClick={() => {
              onPageChange(currentPage + 1)
            }}
            className='cursor-pointer'
          >
            Next
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
