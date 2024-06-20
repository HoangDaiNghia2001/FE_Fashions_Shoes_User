import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import AppRoutes from 'Routes/AppRoutes';

function App() {
  return (
    <div className="App">
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#c91f28',
            colorText: '#3a3a3a',
            fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu,Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
          }, components: {
            Pagination: {
              colorPrimaryHover: '#c91f28',
              colorPrimary: '#c91f28',
              colorPrimaryBorder: '#c91f28',
            }, Input: {
              controlHeight: '38',
            }, Select: {
              controlHeight: '38',
            }, DatePicker: {
              controlHeight: '38'
            }, Modal: {
              titleColor: '#a8020a',
              titleFontSize: '28px'
            },
          },
        }}
      >
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </ConfigProvider>

    </div >
  );
}

export default App;
