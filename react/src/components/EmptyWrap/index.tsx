import React from 'react';

type EmptyWrapProps = {
  value?: any;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  emptyContent?: React.ReactNode;
};

const EmptyWrap: React.FC<EmptyWrapProps> = ({ value, prefix, suffix, emptyContent = '--' }) => {
  if (value === undefined || value === null) {
    return <>{emptyContent}</>;
  }
  return (
    <>
      {prefix}
      {value}
      {suffix}
    </>
  );
};

export default React.memo(EmptyWrap);
