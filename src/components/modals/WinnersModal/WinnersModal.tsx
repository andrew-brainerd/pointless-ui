import { useState } from 'react';
import { isMobile } from 'react-device-detect';
import { WinnersModalProps } from './container';
import usePoolUrl from '../../../hooks/usePoolUrl';
import useUser from '../../../hooks/useUser';
import Modal from '../../common/Modal/Modal';
import Select from '../../common/Select/Select';
import Button from '../../common/Button/Button';
import styles from './WinnersModal.module.scss';

const WinnersModal = ({ pool, completeWager, setIsModalOpen }: WinnersModalProps) => {
  const { userEmail } = useUser();
  const [winnerEmail, setWinnerEmail] = useState(userEmail);
  const { poolId, wagerId } = usePoolUrl();

  return (
    <Modal
      className={styles.modal}
      contentClassName={styles.modalContent}
      isOpen={true}
      isDraggable={false && !isMobile}
      headerText={'Choose the Winner'}
      closeModal={() => {
        setIsModalOpen(false);
      }}
    >
      <>
        <Select
          className={styles.selectUsers}
          options={(pool?.users || []).map(email => ({ value: email, label: email }))}
          onChange={selectedUser => {
            setWinnerEmail(selectedUser);
          }}
          value={(pool?.users || []).indexOf(winnerEmail)}
        />
        <div className={styles.buttonContainer}>
          <Button
            type={'primary'}
            onClick={() => {
              completeWager(poolId, wagerId, userEmail, winnerEmail);
              setIsModalOpen(false);
            }}
            text={'Complete'}
          />
          <Button
            type={'default'}
            onClick={() => {
              setIsModalOpen(false);
            }}
            text={'Close'}
          />
        </div>
      </>
    </Modal>
  );
};

export default WinnersModal;
