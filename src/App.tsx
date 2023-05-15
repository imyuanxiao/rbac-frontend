import React from 'react';
import 'antd/dist/reset.css';
import './App.css';
import { ConfigProvider } from 'antd';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from "./pages/login/Login";
import Home from "./layout/Home";
import {checkTokenExpiration} from "./utils/TokenUtil";
import NotFound from "./pages/notFound/NotFound";

// internationalizing components
import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslation from './locales/en.json';
import zhTranslation from './locales/zh.json';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: enTranslation },
            zh: { translation: zhTranslation },
        },
        fallbackLng: 'zh', // 默认语言为中文
        debug: true,
        interpolation: {
            escapeValue: false, // 不需要转义HTML标签
        },
    });

function App() {

    checkTokenExpiration();

    // 自定义主题
    const customTheme = {
        token: {
            // colorPrimary: '#041230',
            colorFillAlter: '#ececec',
            // colorFillSecondary: '#d88727',
            // colorBgElevated: '#d88727',
            colorBgTextHover: '#d88727',

        },
    };

    // 检查登录状态
    return (
      <ConfigProvider
          theme={customTheme}
      >
          <Router>
              <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/*" element={<Home />} />
                  <Route path="/404" element={<NotFound />} />
              </Routes>
          </Router>
      </ConfigProvider>
  );
}

export default App;