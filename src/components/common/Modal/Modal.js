import React from 'react';
import { bool, number, func, string, node } from 'prop-types';
import Draggable from 'react-draggable';
import ReactModal from 'react-modal';
import Button from '../Button/Button';
import styles from './Modal.module.scss';
import './Modal.css';

const Modal = ({
  isOpen,
  isDraggable,
  contentHeight,
  onOpen,
  closeModal,
  headerText,
  children,
  className
}) => {
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
          <div className={styles.header}>
            <div className={styles.headerText}>{headerText}</div>
            <Button
              className={styles.closeButton}
              text={'X'}
              onClick={closeModal}
              applyTheme={false}
            />
          </div>
          <div className={styles.content} style={{ height: contentHeight || 'auto' }}>
            {children}
          </div>
        </div>
      </Draggable>
    </ReactModal>
  );
};

Modal.propTypes = {
  isOpen: bool.isRequired,
  isDraggable: bool,
  contentHeight: number,
  onOpen: func,
  closeModal: func.isRequired,
  headerText: string,
  children: node,
  className: string
};

Modal.defaultProps = {
  isDraggable: true
};

export default Modal;
