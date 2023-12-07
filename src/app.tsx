import { Web3Provider } from '@ethersproject/providers';
import { Web3ReactProvider } from '@web3-react/core';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import ContainerWrapper from './components/layout/container-wrapper';
import Routes from './routes';
import store, { persistor } from './stores';
import './styles/global.scss';
import { ConfigProvider } from 'antd';
import { theme } from './styles/theme';

function getLibrary(provider: any): Web3Provider {
    const library = new Web3Provider(provider);
    library.pollingInterval = 12000;
    return library;
}

function App() {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <ConfigProvider theme={theme}>
                    <PersistGate loading={null} persistor={persistor}>
                        <Web3ReactProvider getLibrary={getLibrary}>
                            <ContainerWrapper>
                                <Routes />
                            </ContainerWrapper>
                        </Web3ReactProvider>
                    </PersistGate>
                </ConfigProvider>
            </Provider>
        </BrowserRouter>
    );
}

export default App;
