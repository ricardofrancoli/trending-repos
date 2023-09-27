import ky from 'ky';
import { useState } from 'react';

import type { Response as FavouriteToggleResponse } from '@/types/favourite-toggle';

function FavouriteToggle({ id }: { id: number }) {
  const [isFavourite, setIsFavourite] = useState(false);

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
    <div onClick={() => toggleFavourite(id)}>{isFavourite ? '❤️' : ':('}</div>
  );
}

export default FavouriteToggle;
