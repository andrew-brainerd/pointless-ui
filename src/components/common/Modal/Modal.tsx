import React from 'react';
import Draggable from 'react-draggable';
import ReactModal from 'react-modal';
import Button from '../Button/Button';
import styles from './Modal.module.scss';
import './Modal.css';

interface Props {
  className?: string,
  contentClassName?: string,
  isOpen: boolean,
  isDraggable?: boolean,
  showHeader?: boolean,
  contentHeight?: number,
  onOpen?: () => void,
  closeModal: () => void,
  headerText?: string,
  children: React.ReactNode
}

const Modal = ({
  className,
  contentClassName,
  isOpen,
  isDraggable,
  showHeader = true,
  contentHeight,
  onOpen,
  closeModal,
  headerText,
  children
}: Props) => {
  return (
    <ReactModal
      className={[styles.modal, className].join(' ')}
      overlayClassName={styles.overlay}
      isOpen={isOpen}
      onAfterOpen={onOpen}
      onRequestClose={closeModal}
      contentLabel={'Pod Preview'}
      closeTimeoutMS={200}
    >
      <Draggable disabled={!isDraggable}>
        <div className={styles.draggable}>
          {showHeader && (
            <div className={styles.header}>
              <div className={styles.headerText}>{headerText}</div>
              <Button
                className={styles.closeButton}
                text={'X'}
                onClick={closeModal}
              />
            </div>
          )}
          <div
            className={[
              styles.content,
              contentClassName || ''
            ].join(' ')}
            style={{ height: contentHeight || 'auto' }}>
            {children}
          </div>
        </div>
      </Draggable>
    </ReactModal>
  );
};

Modal.defaultProps = {
  isDraggable: true
};

export default Modal;
