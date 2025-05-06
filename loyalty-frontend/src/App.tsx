import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  AppProvider,
  Frame,
  Navigation,
  TopBar,
} from '@shopify/polaris';
import {
  HomeMajor,
  CustomersMajor,
  DiscountsMajor,
  SettingsMajor,
} from '@shopify/polaris-icons';
import '@shopify/polaris/build/esm/styles.css';
import Dashboard from './pages/Dashboard';
import Customers from './pages/Customers';
import Rewards from './pages/Rewards';
import Settings from './pages/Settings';

const App: React.FC = () => {
  const [isNavigationOpen, setIsNavigationOpen] = React.useState(false);

  const navigationMarkup = (
    <Navigation location="/">
      <Navigation.Section
        items={[
          {
            label: 'Dashboard',
            icon: HomeMajor,
            url: '/',
          },
          {
            label: 'Customers',
            icon: CustomersMajor,
            url: '/customers',
          },
          {
            label: 'Rewards',
            icon: DiscountsMajor,
            url: '/rewards',
          },
          {
            label: 'Settings',
            icon: SettingsMajor,
            url: '/settings',
          },
        ]}
      />
    </Navigation>
  );

  const topBarMarkup = (
    <TopBar
      showNavigationToggle
      onNavigationToggle={() => setIsNavigationOpen(!isNavigationOpen)}
    />
  );

  return (
    <BrowserRouter>
      <AppProvider i18n={{}}>
        <Frame
          topBar={topBarMarkup}
          navigation={navigationMarkup}
          showMobileNavigation={isNavigationOpen}
          onNavigationDismiss={() => setIsNavigationOpen(false)}
        >
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/rewards" element={<Rewards />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Frame>
      </AppProvider>
    </BrowserRouter>
  );
};

export default App; 