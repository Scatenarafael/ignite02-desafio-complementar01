import { useEffect, useState } from 'react';
import { MainContextProvider, useMainContext } from './contexts/MainContext';
import { SideBar } from './components/SideBar';
import { Content } from './components/Content';

import './styles/global.scss';

export function App() {

  return (
    <MainContextProvider>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <SideBar />
        <Content />
      </div>
    </MainContextProvider>
  )
}