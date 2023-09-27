import ky from 'ky';
import { useState } from 'react';

import styles from './FavouriteToggle.module.css';

import type { Response as FavouriteToggleResponse } from '@/types/favourite-toggle';

function FavouriteToggle({
  id,
  isFavourite: isInitialFavourite,
}: {
  id: number;
  isFavourite: boolean;
}) {
  const [isFavourite, setIsFavourite] = useState(isInitialFavourite);

  const toggleFavourite = async (id: number) => {
    try {
      const { action }: FavouriteToggleResponse = await ky
        .post('/api/toggle-favourites', { json: { id } })
        .json();

      setIsFavourite(action === 'added');

      return { action };
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className={`${styles.fav} ${isFavourite ? styles.marked : ''}`}
      onClick={() => toggleFavourite(id)}>
      {isFavourite ? '❤️ Remove From Favourites' : 'Add To Favourites'}
    </div>
  );
}

export default FavouriteToggle;
