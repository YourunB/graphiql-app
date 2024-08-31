'use client';
import { useEffect } from 'react';
import i18n from '../../i18n';

const I18nInitializer = () => {
  useEffect(() => {
    i18n.init();
  }, []);

  return null;
};

export default I18nInitializer;
