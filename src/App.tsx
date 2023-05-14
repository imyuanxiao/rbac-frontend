import React from 'react';
import 'antd/dist/reset.css';
import './App.css';
import { ConfigProvider } from 'antd';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from "./pages/login/Login";
import Home from "./layout/Home";
import {checkTokenExpiration} from "./utils/TokenUtil";
import NotFound from "./pages/notFound/NotFound";

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
                  <Route path="/login" element={<Login />} />
                  <Route path="/*" element={<Home />} />
                  <Route path="/404" element={<NotFound />} />
              </Routes>
          </Router>
      </ConfigProvider>
  );
}

export default App;