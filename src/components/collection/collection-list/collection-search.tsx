import { SearchOutlined } from '@ant-design/icons';
import { ChangeEvent } from 'react';

export interface ICollectionSearch {
    keyword: string;
    onChangeKeyword: (value: string) => void;
}

const CollectionSearch = ({ keyword, onChangeKeyword }: ICollectionSearch) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newKeyword = e.target.value;
        onChangeKeyword(newKeyword);
    };

    return (
        <div className="collection-search__wrapper">
            <div className="collection-search__box">
                <div className="collection-search__box__icon">
                    <SearchOutlined />
                </div>
                <input
                    type="text"
                    value={keyword}
                    onChange={handleChange}
                    placeholder="Search by collection's name or category's name"
                />
            </div>
        </div>
    );
};

export default CollectionSearch;
