import React from 'react';
import 'antd/dist/reset.css';
import './App.css';
import { ConfigProvider } from 'antd';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from "./pages/login/Login";
import Home from "./layout/Home";
import {checkTokenExpiration} from "./utils/TokenUtil";

function App() {

    checkTokenExpiration();

    // 检查登录状态
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
                  <Route path="/*" element={<Home />} />
                  <Route path="/login" element={<Login />} />
              </Routes>
          </Router>
      </ConfigProvider>
  );
}

export default App;