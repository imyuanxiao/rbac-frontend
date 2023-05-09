import React from 'react';
import 'antd/dist/reset.css';
import './App.css';
import { ConfigProvider } from 'antd';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from "./pages/LoginPage";
import DefaultLayout from "./layout/DefaultLayout";

function App() {
    return (
      <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#041230',
            },
          }}
      >
          <Router>
              <Routes>
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/" element={<DefaultLayout />} />
              </Routes>
          </Router>
      </ConfigProvider>
  );
}

export default App;