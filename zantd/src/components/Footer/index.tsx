import React from 'react';
import { useIntl } from 'umi';
import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';

export default () => {
  const intl = useIntl();
  const defaultMessage = intl.formatMessage({
    id: 'app.copyright.produced',
    defaultMessage: 'Produced by the Experience Technology Department of Ant Group',
  });

  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'Veil Research, Corp.',
          title: 'Veil Research, Corp.',
          href: 'https://www.linkedin.com/in/andrew-nieder/',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/ramonajenny',
          blankTarget: true,
        },
        {
          key: 'The PaperMasters',
          title: 'Bringing Legitimacy to the Blockchain',
          href: 'https://www.linkedin.com/in/ramonajenny/',
          blankTarget: true,
        },
      ]}
    />
  );
};
