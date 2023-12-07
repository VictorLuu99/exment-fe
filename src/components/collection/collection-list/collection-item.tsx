import { COLLECTION_STATUS } from '../../../constants/collection';
import { truncateString } from '../../../utils/string';

interface ICollectionItem {
    collectionName: string;
    image: string | null;
    status: COLLECTION_STATUS;
}

export const CollectionItem = ({ collectionName, image, status }: ICollectionItem) => {
    return (
        <div className="collection-item">
            <div className="collection-item__image">
                {image ? (
                    <img src={image} alt="default-alt" />
                ) : (
                    <img src="/images/default-image.jpeg" alt="default-alt" />
                )}
            </div>
            <div className="collection-item__name">
                {truncateString({ text: collectionName, start: 25, end: 0 })}
                {status === COLLECTION_STATUS.ACTIVE && <img src="/images/quality.png" alt="quality-alt" />}
            </div>
        </div>
    );
};

export default CollectionItem;
