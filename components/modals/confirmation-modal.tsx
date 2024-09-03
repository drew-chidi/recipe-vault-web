import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import style from './LogoutModal.module.css';
import ModalContainer from './modal-container';

interface myComponentProps {
  visible?: boolean;
  onClose?: () => void;
}

const ConfirmationModal = ({ visible, onClose }: myComponentProps) => {
  return (
    <>
      <ModalContainer
        modalClass={style?.logout_modal_index_wrap}
        title='Recipe Delete Modal'
        hasCloseButton
        handleClose={onClose}
        show={visible as boolean}
      >
        <div className={style.content_wrap}>
          <p className={style?.title}>Want to delete recipe?</p>
          <p className={style.text}>
            {`Are you sure you want to delete this item? Please confirm by clicking "Yes,
            delete" or "Cancel".`}
          </p>
        </div>
        {/* content end here */}
        <div className={style.button_wrap}>
          <Button
            variant={'outline'}
            className={`border-error text-primary font-light  hover:text-primary ${style.btn_one}`}
            onClick={() => {
              onClose && onClose();
            }}
          >
            Cancel
          </Button>
          <Button
            // onClick={handleLogoutFunc}
            // loading={isLoading}
            loadingText='Yes, Delete'
            // disabled={isLoading}
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
