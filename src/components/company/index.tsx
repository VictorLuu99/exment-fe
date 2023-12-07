import { Row } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import abiExmToken from '../../abi/exmentToken.json';
import contractAddress from '../../constants/contract-address';
import { useContract } from '../../hooks';

import { useTranslation } from 'react-i18next';
import data from '../../data.json';
import LoaderSpin from '../../elements/loader/spin';
import { RootState } from '../../stores';
import { convertWeiToEther } from '../../utils/web3';
import style from './style.module.scss';

const Company = () => {
    const { t } = useTranslation();
    const [listHolder, setListHolder] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const { user } = useSelector((state: RootState) => state.auth);
    const exmContract = useContract(contractAddress.exmToken, abiExmToken);

    useEffect(() => {
        (async () => {
            try {
                if (!exmContract || !user) return;
                setLoading(true);
                if (data && data.length > 0) {
                    let list = [];
                    for (const e of data) {
                        const balance = await convertWeiToEther(await exmContract.balanceOf(e.address));
                        list.push({
                            wallet: e.address,
                            quality: parseFloat(balance),
                            name: e.name,
                            email: e.mail,
                        });
                    }
                    list.sort((a, b) => {
                        return b.quality - a.quality;
                    });
                    setListHolder(list);
                }
            } finally {
                setLoading(false);
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, exmContract]);

    const renderEmpty = () => {
        return (
            <div className={style.empty}>
                <img src="/images/icon-empty.svg" alt="" />
                <div className={style.noItem}>{t('home.noItem')}</div>
            </div>
        );
    };

    const renderListHolder = () => {
        return (
            <table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Company's name</th>
                        <th>Mail Address</th>
                        <th>Wallet</th>
                        <th>EXM Quantity</th>
                    </tr>
                </thead>
                <tbody className={style.cTBody}>
                    {listHolder.map((item, index) => {
                        return (
                            <tr key={`bed-level-up-${index}`}>
                                <td className="text-center">{index + 1}</td>
                                <td className="text-center">{item.name}</td>
                                <td className="text-center">{item.email}</td>
                                <td className="text-center">{item.wallet}</td>
                                <td className="text-center">{item.quality}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        );
    };

    return (
        <div className={style.mintWrapper}>
            <div className={style.mintBedContainer}>
                {listHolder.length > 0 ? (
                    <>
                        <div className={style.mintbedTitle}>{t('home.title')}</div>
                        <div className={style.scroll}>{renderListHolder()}</div>
                    </>
                ) : (
                    <>{!loading && renderEmpty()}</>
                )}
                {loading && (
                    <div className={style.loader}>
                        <Row justify="center" align="middle">
                            <LoaderSpin className={listHolder.length === 0 ? style.loader : ''} />
                        </Row>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Company;
