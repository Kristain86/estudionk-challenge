import type { LangType } from '@/types';
import Modal from '@/components/Modal/Modal';
import SubscribeForm from './SubscribeForm/SubscribeForm';

interface SubscribeModalProps {
  lang: LangType;
  dict: {
    title: string;
  };
}

const SubscribeModal = ({ lang, dict }: SubscribeModalProps) => {
  return (
    <Modal>
      <SubscribeForm dict={dict} lang={lang} />
    </Modal>
  );
};

export default SubscribeModal;
