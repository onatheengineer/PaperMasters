import { useIntl } from 'umi';
import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';

export default () => {
  const intl = useIntl();
  const defaultMessage = intl.formatMessage({
    id: 'app.copyright.produced',
    defaultMessage: '蚂蚁集团体验技术部出品',
  });

  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'Veil Research, Corp.',
          title: 'Veil Research, Corp.',
          href: 'https://pro.ant.design',
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
          href: 'https://pro.ant.design',
          blankTarget: true,
        },
      ]}
    />
  );
};
