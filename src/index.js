import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import CustomerApp from './App';
import PartnerApp from './PartnerApp';

function AppSwitcher() {
  const [appType, setAppType] = useState('customer'); // 'customer' 또는 'partner'

  return (
    <div>
      {/* 앱 전환 버튼 (개발용) */}
      <div style={{
        position: 'fixed',
        bottom: '10px',
        right: '10px',
        zIndex: 9999,
        display: 'flex',
        gap: '10px'
      }}>
        <button
          onClick={() => setAppType('customer')}
          style={{
            padding: '10px 20px',
            background: appType === 'customer' ? '#3B82F6' : '#E5E7EB',
            color: appType === 'customer' ? 'white' : 'black',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          고객 앱
        </button>
        <button
          onClick={() => setAppType('partner')}
          style={{
            padding: '10px 20px',
            background: appType === 'partner' ? '#10B981' : '#E5E7EB',
            color: appType === 'partner' ? 'white' : 'black',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          파트너 앱
        </button>
      </div>

      {/* 선택된 앱 표시 */}
      {appType === 'customer' ? <CustomerApp /> : <PartnerApp />}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AppSwitcher />);