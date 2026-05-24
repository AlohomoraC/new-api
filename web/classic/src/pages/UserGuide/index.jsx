/*
Copyright (C) 2025 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/

import React from 'react';
import { Typography } from '@douyinfe/semi-ui';
import { useTranslation } from 'react-i18next';
import MarkdownRenderer from '../../components/common/markdown/MarkdownRenderer';
import userGuideContent from '../../../../../USER_GUIDE.md?raw';

const { Title, Text } = Typography;

const UserGuide = () => {
  const { t } = useTranslation();

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:px-8'>
        <div className='bg-white rounded-xl shadow-sm border border-semi-color-border p-6 sm:p-8'>
          <div className='mb-8 text-center'>
            <Title heading={2}>{t('用户指南')}</Title>
            <Text type='secondary'>
              {t('查看接入说明、环境变量配置与模型切换示例')}
            </Text>
          </div>
          <div className='prose prose-lg max-w-none'>
            <MarkdownRenderer content={userGuideContent} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserGuide;
