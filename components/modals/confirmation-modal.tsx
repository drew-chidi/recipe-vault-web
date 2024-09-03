import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import ModalContainer from './modal-container';

interface myComponentProps {
  visible?: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
  loading: boolean;
}

const ConfirmationModal = ({
  visible,
  onClose,
  onConfirm,
  loading,
}: myComponentProps) => {
  return (
    <>
      <ModalContainer
        modalClass={`rounded-[0.8rem] flex flex-col`}
        title='Recipe Delete Modal'
        hasCloseButton
        handleClose={onClose}
        show={visible as boolean}
      >
        <div className='px-4'>
          <p className='text-lg font-semibold'>Want to delete recipe?</p>
          <p className='text-[0.625rem]'>
            {`Are you sure you want to delete this item? Please confirm by clicking "Yes,
            delete" or "Cancel".`}
          </p>
        </div>
        {/* content end here */}
        <div className='mt-auto flex items-center justify-end gap-4 py-[0.8rem] px-6'>
          <Button
            variant={'outline'}
            onClick={() => {
              onClose && onClose();
            }}
          >
            Cancel
          </Button>
          <Button
            variant='destructive'
            onClick={onConfirm}
            loading={loading}
            loadingText='Yes, Delete'
            disabled={loading}
            className={cn('font-light')}
          >
            Yes, Delete
          </Button>
        </div>
      </ModalContainer>
    </>
  );
};

export default ConfirmationModal;
