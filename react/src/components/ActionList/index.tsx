import React, { useMemo } from 'react';
import classNames from 'classnames';
import _compact from 'lodash/compact';
import _head from 'lodash/head';
import _tail from 'lodash/tail';
import { Divider, Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import styles from './index.less';

interface ActionListProps {
  actions: React.ReactNode[];
}

const defaultActions: React.ReactNode[] = [];

const OtherActionList: React.FC<ActionListProps> = ({ actions = [] }) => {
  const menu = (
    <Menu className={styles.menuWrapper}>
      {actions.map((action, index) => (
        <Menu.Item key={index}>{action}</Menu.Item>
      ))}
    </Menu>
  );

  return (
    <>
      <Divider type="vertical" />
      <Dropdown placement="bottomCenter" overlay={menu} trigger={['click']}>
        <a className={classNames('ant-dropdown-link', styles.actionLink)} href="#">
          <DownOutlined />
        </a>
      </Dropdown>
    </>
  );
};

const ActionList: React.FC<ActionListProps> = ({ actions = defaultActions }) => {
  const computedActions = _compact(actions);
  const firstAction = _head(computedActions);
  const otherActions = _tail(computedActions);

  const renderOtherActions = useMemo(() => {
    const len = otherActions.length;
    switch (len) {
      case 0:
        return null;
      case 1:
        return (
          <>
            <Divider type="vertical" />
            {otherActions[0]}
          </>
        );
      default:
        return <OtherActionList actions={otherActions} />;
    }
  }, [otherActions]);

  return (
    <>
      {firstAction}
      {renderOtherActions}
    </>
  );
};

export default ActionList;
