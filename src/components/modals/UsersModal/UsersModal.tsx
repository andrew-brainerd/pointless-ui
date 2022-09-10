import { useState } from 'react';
import { isMobile } from 'react-device-detect';
import usePoolUrl from '../../../hooks/usePoolUrl';
import { UsersModalProps } from './container';
import Modal from '../../common/Modal/Modal';
import TextInput from '../../common/TextInput/TextInput';
import ButtonContainer from '../../common/ButtonContainer/ButtonContainer';
import Button from '../../common/Button/Button';
import styles from './UsersModal.module.scss';

const UsersModal = ({ pool, openHandler, inviteUser }: UsersModalProps) => {
  const [isInvitingUser, setIsInvitingUser] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const { poolId } = usePoolUrl();

  return (
    <Modal
      className={styles.usersModal}
      contentClassName={styles.usersModalContent}
      isOpen={true}
      isDraggable={false && !isMobile}
      headerText={'Users in Pool'}
      contentHeight={250}
      closeModal={() => openHandler(false)}
    >
      {isInvitingUser ? (
        <div>
          <TextInput
            value={inviteEmail}
            onChange={setInviteEmail}
            autofocus
          />
        </div>
      ) : (
        <div className={styles.currentUsers}>
          {(pool?.users || []).map(email => (
            <div key={email} className={styles.user}>
              {email}
            </div>
          ))}
        </div>
      )}
      <ButtonContainer className={styles.buttons}>
        <Button
          type={isInvitingUser ? 'hazard' : 'primary'}
          onClick={() => {
            setIsInvitingUser(!isInvitingUser);
          }}
          text={isInvitingUser ? 'Cancel' : 'Invite User'}
        />
        <Button
          type={isInvitingUser ? 'primary' : 'default'}
          onClick={() => {
            if (isInvitingUser) {
              inviteUser(poolId, inviteEmail);
            } else {
              openHandler(false);
            }
            setIsInvitingUser(false);
          }}
          text={isInvitingUser ? 'Invite' : 'Close'}
          disabled={isInvitingUser ? inviteEmail === '' : false}
        />
      </ButtonContainer>
    </Modal>
  );
};

export default UsersModal;
