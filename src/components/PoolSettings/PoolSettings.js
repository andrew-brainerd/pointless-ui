import React, { useEffect, useState } from 'react';
import { string, bool, object, func } from 'prop-types';
import { Form, Field } from 'react-final-form';
import Button from '@material-ui/core/Button';
import TextInput from '../common/MaterialTextInput/MaterialTextInput';
import styles from './PoolSettings.module.scss';
import Loading from '../common/Loading/Loading';

const PoolSettings = ({ userEmail, isNewPool, isLoadingPool, poolId, pool, loadPool, createPool, updatePool }) => {
  const [successMessage, setSuccessMessage] = useState(null);
  const [poolName, setPoolName] = useState(pool.name || '');

  useEffect(() => {
    !isNewPool && loadPool(poolId);
  }, [isNewPool, poolId, loadPool]);

  useEffect(() => {
    if (!isNewPool) {
      console.log('Pool', pool);
      setPoolName(pool.name);
    }
  }, [isNewPool, pool]);

  const onSubmit = (values, form) => {
    if (isNewPool) {
      createPool(values.name, userEmail);
    } else {
      updatePool(values).then(() => {
        setSuccessMessage('Pool settings updated');
        setTimeout(() => {
          form.initialize({});
          setTimeout(() => setSuccessMessage(null), 100);
        }, 5000);
      });
    }
  };

  const validate = () => {
    const errors = {};

    console.log('Validating', { poolName });

    if (!poolName) {
      errors.name = 'Name is required';
    }

    return errors;
  };

  return !isNewPool && isLoadingPool ? <Loading /> : (
    <div className={styles.poolSettings}>
      <Form
        onSubmit={onSubmit}
        validate={validate}
        render={({ handleSubmit, submitting, pristine }) => (
          <form onSubmit={handleSubmit}>
            <div className={styles.fieldContainer}>
              <Field name="name">
                {fieldProps => {
                  console.log('Name field props', fieldProps);
                  return (
                    <TextInput
                      label="Name"
                      value={poolName}
                      onChange={e => {
                        // console.log('Value', e.target.value);
                        console.log('Submit Disabled', { submitting, pristine, successMessage });
                        setPoolName(e.target.value);
                      }}
                      {...fieldProps}
                    />
                  );
                }}
              </Field>
            </div>
            {successMessage && (
              <div className={styles.successText}>
                {successMessage}
              </div>
            )}
            <div className={styles.fieldContainer}>
              <Field name="submit" className={styles.submit}>
                {() => (
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={submitting || !!successMessage}
                  >
                    Submit
                  </Button>
                )}
              </Field>
            </div>
          </form>
        )}
      />
    </div>
  );
};

PoolSettings.propTypes = {
  userEmail: string,
  isNewPool: bool,
  isLoadingPool: bool,
  poolId: string,
  pool: object,
  loadPool: func.isRequired,
  createPool: func.isRequired,
  updatePool: func.isRequired
};

export default PoolSettings;
