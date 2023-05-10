import React from 'react';
import 'antd/dist/reset.css';
import './App.css';
import { ConfigProvider } from 'antd';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./pages/login/Login";
import Home from "./layout/Home";

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
                  <Route path="/login" element={<Login />} />
                  <Route path="/*" element={<Home />} />
              </Routes>
          </Router>
      </ConfigProvider>
  );
}

export default App;