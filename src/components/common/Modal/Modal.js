import React from 'react';
import { bool, number, func, string, node } from 'prop-types';
import Draggable from 'react-draggable';
import ReactModal from 'react-modal';
import Button from '../Button/Button';
import styles from './Modal.module.scss';
import './Modal.css';

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
          {showHeader && (
            <div className={styles.header}>
              <div className={styles.headerText}>{headerText}</div>
              <Button
                className={styles.closeButton}
                text={'X'}
                onClick={closeModal}
                applyTheme={false}
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

Modal.propTypes = {
  className: string,
  contentClassName: string,
  isOpen: bool.isRequired,
  isDraggable: bool,
  showHeader: bool,
  contentHeight: number,
  onOpen: func,
  closeModal: func.isRequired,
  headerText: string,
  children: node
};

Modal.defaultProps = {
  isDraggable: true
};

export default Modal;
