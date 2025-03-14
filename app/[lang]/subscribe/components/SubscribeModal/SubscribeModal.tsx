import Modal from '@/app/components/Modal/Modal';
import SubscribeForm from './SubscribeForm/SubscribeForm';

interface SubscribeModalProps {
  dict: {
    title: string;
  };
}

const SubscribeModal = ({ dict }: SubscribeModalProps) => {
  return (
    <Modal>
      <SubscribeForm dict={dict} />
    </Modal>
  );
};

export default SubscribeModal;
