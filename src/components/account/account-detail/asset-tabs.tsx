import { Tabs } from 'antd';
import React, { useMemo } from 'react';
import { Roles } from '../../../constants/user';
import CollectionList from '../../collection/collection-list';
import NftList from '../../nfts/nft-list ';

interface IAssetTabs {
    role?: Roles;
    walletAddress?: string;
    ownerId?: number;
}

const AssetTabs: React.FC<IAssetTabs> = ({ role, walletAddress, ownerId }) => {
    const items = useMemo(() => {
        return role === Roles.seller
            ? [
                  {
                      key: '1',
                      label: `User's Collections`,
                      children: <CollectionList walletAddress={walletAddress} />,
                  },
                  {
                      key: '2',
                      label: `Sold Nfts`,
                      children: <NftList sellerId={ownerId} />,
                  },
              ]
            : [
                  //   {
                  //       key: '1',
                  //       label: `User's Collections`,
                  //       children: <CollectionList walletAddress={walletAddress} />,
                  //   },
                  {
                      key: '2',
                      label: `Bought Nfts`,
                      children: <NftList buyerId={ownerId} />,
                  },
              ];
    }, [role, walletAddress, ownerId]);

    return <Tabs destroyInactiveTabPane defaultActiveKey="1" items={items} />;
};

export default AssetTabs;
