import React, { useState } from 'react';
import { string, object, func } from 'prop-types';
import { isMobile } from 'react-device-detect';
import Modal from '../../common/Modal/Modal';
import TextInput from '../../common/TextInput/TextInput';
import Button from '../../common/Button/Button';
import styles from './UsersModal.module.scss';
import ButtonContainer from '../../common/ButtonContainer/ButtonContainer';

const UsersModal = ({ poolId, pool, openHandler, inviteUser }) => {
  const [isInvitingUser, setIsInvitingUser] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');

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
          {pool.users.map((email, e) => (
            <div key={e} className={styles.user}>
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

UsersModal.propTypes = {
  poolId: string,
  pool: object,
  openHandler: func.isRequired,
  inviteUser: func.isRequired
};

export default UsersModal;
