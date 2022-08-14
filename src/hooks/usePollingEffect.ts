import { useEffect, useState } from 'react';
import moment, { Moment } from 'moment';
import useInterval from './useInterval';

interface PollingEffect {
  isPolling: boolean
}

const usePollingEffect = (
  effectFunction: () => void,
  effectDependencies: Array<string | number>,
  pollInterval = 10000
): PollingEffect => {
  const [isPolling, setIsPolling] = useState(false);
  const [lastUpdateTime, setLastUpdateTime] = useState(moment());

  const getIsDataStale = (currentMoment: Moment) =>
    moment.duration(currentMoment.diff(lastUpdateTime)).asMilliseconds() > pollInterval;

  useEffect(() => {
    setIsPolling(false);
    effectFunction();
    setLastUpdateTime(moment()); // eslint-disable-next-line
  }, effectDependencies);

  useInterval(() => {
    if (getIsDataStale(moment())) {
      setIsPolling(true);
      effectFunction();
      setLastUpdateTime(moment());
    }
  }, pollInterval);

  return { isPolling };
};

export default usePollingEffect;
