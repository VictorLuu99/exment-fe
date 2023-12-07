import { useWeb3React } from '@web3-react/core';
import { Button, Col, Drawer, Row, Tooltip } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import classNames from 'classnames';
import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Roles } from '../../constants/user';
import useCopyClipboard from '../../hooks/use-copy-clipboard';
import useWindowSize from '../../hooks/use-window-size';
import routeNames from '../../routes/names';
// import serviceUser from '../../services/user';
import { RootState } from '../../stores';
import { signOut } from '../../stores/auth/slice';
import { truncateString } from '../../utils/string';
import ButtonConnectWallet from './button-connect-wallet';
import style from './style.module.scss';

const widthToShowHamburgerMenu = 768;

const Header: FC<{}> = () => {
    const windowSize = useWindowSize();
    const windowWidth = windowSize.width ?? 0;
    const isVisibleHamburgerMenu = windowWidth <= widthToShowHamburgerMenu;

    const { user } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();

    const [isVisibleDrawer, setVisibleDrawer] = useState<boolean>(false);
    const [showModalOverview, setShowModalOverview] = useState<boolean>(false);
    const [, setIsCopied] = useCopyClipboard();

    const { deactivate } = useWeb3React();

    const handleDisconnect = () => {
        deactivate();
        handleCloseModalOverview();
        dispatch(signOut());
    };

    const handleShowModalOverview = () => {
        setShowModalOverview(true);
    };

    const handleCloseModalOverview = () => {
        setShowModalOverview(false);
    };

    const navigate = useNavigate();
    // const location = useLocation();

    const handleToggleDrawer = () => {
        setVisibleDrawer(prevVisible => !prevVisible);
    };

    const classHeader = classNames([style.headerPage, isVisibleHamburgerMenu && style.headerPageMobile]);

    const handleGoToAdminPage = () => {
        navigate(routeNames.adminDashboard);
    };

    const handleClickCopy = () => {
        setIsCopied(user?.walletAddress ?? '');
    };

    const { t } = useTranslation();
    // const { Option } = Select;
    // const currentLanguage = serviceUser.getLanguage();

    // const handleChangeLanguage = (value: string) => {
    //     i18n.changeLanguage(value);
    //     serviceUser.storeLanguage(value);
    // };

    useEffect(() => {
        if (!user?.walletAddress) {
            handleCloseModalOverview();
        }
    }, [user?.walletAddress]);

    const handleViewBlockExplorer = () => {
        window.open(`${process.env.REACT_APP_BLOCK_EXPLORER_URL}/address/${user?.walletAddress}`);
    };

    return (
        <header className={classHeader}>
            <Row align="middle" justify="space-between">
                {isVisibleHamburgerMenu && (
                    <div onClick={handleToggleDrawer}>
                        <img src="/images/icon-menu.svg" alt="" />
                    </div>
                )}
                <Col>
                    <img
                        width={300}
                        height={80}
                        src="/images/logo.png"
                        alt=""
                        onClick={() => navigate(routeNames.home)}
                        className={style.logo}
                    />
                </Col>
                <Row align="middle">
                    {!isVisibleHamburgerMenu && <ButtonConnectWallet onShowModalOverview={handleShowModalOverview} />}
                    {/* {!isVisibleHamburgerMenu && (
                        <div className={style.selectAfter}>
                            <Select defaultValue={currentLanguage} onChange={handleChangeLanguage}>
                                <Option value="en">EngLish</Option>
                                <Option value="ja">日本語</Option>
                            </Select>
                        </div>
                    )} */}
                </Row>
            </Row>
            {isVisibleHamburgerMenu && (
                <Drawer
                    placement="left"
                    closable={false}
                    onClose={handleToggleDrawer}
                    open={isVisibleDrawer}
                    className={style.drawerMenuMobile}
                >
                    <ButtonConnectWallet onShowModalOverview={handleShowModalOverview} />
                </Drawer>
            )}

            <Modal
                className={style.modalConnect}
                footer={null}
                open={showModalOverview}
                centered={true}
                onCancel={handleCloseModalOverview}
                closeIcon={<img src="/images/icon-close.svg" alt=""></img>}
            >
                <div>
                    <div className={style.modalConnectTitle}>{t('header.wallet')}</div>
                    <div className={style.modalConnectText}>{t('header.connectMetaMask')}</div>
                    <div className={style.inputCopy}>
                        {truncateString({ text: user?.walletAddress ?? '', start: 19, end: 3 })}
                        <Tooltip title="copy">
                            <Button
                                icon={<img src="/images/icon-copy.svg" alt="" />}
                                className={style.buttonCoppy}
                                onClick={handleClickCopy}
                            />
                        </Tooltip>
                    </div>
                    <div className={style.buttonContainer}>
                        <div>
                            <div>
                                <img src="/images/icon-view.svg" alt="" />
                                <span className={style.viewBtn} onClick={handleViewBlockExplorer}>
                                    {t('header.viewButton')}
                                </span>
                            </div>
                            {user?.role === Roles.admin ? (
                                <div className={style.gotoAdminGroup}>
                                    <img src="/images/go-to-admin.svg" className={style.gotoAdminIcon} alt="" />
                                    <span className={style.viewBtn} onClick={handleGoToAdminPage}>
                                        {t('header.goToAdminPage')}
                                    </span>
                                </div>
                            ) : (
                                <div className={style.gotoAdminGroup}>
                                    <img src="/images/user-icon.png" className={style.gotoProfileIcon} alt="" />
                                    <Link to={`/account/${user?.walletAddress}`} className={style.viewBtn}>
                                        {t('header.goToProfilePage')}
                                    </Link>
                                </div>
                            )}
                        </div>

                        <span className={style.disconnectBtn} onClick={handleDisconnect}>
                            {t('header.disconnectButton')}
                        </span>
                    </div>
                </div>
            </Modal>
        </header>
    );
};

export default Header;
