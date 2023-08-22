import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import getFavouriteListings from "../actions/getFavouriteListings";
import FavouritesClient from "./FavouritesClient";

const FavouritesPage = async () => {
  const favourites = await getFavouriteListings();
  const currentUser = await getCurrentUser();

  if (favourites.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No favurites exist"
          subtitle="You don't have any favourites yet!"
        />
      </ClientOnly>
    );
  }
  return (
    <ClientOnly>
      <FavouritesClient listings={favourites} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default FavouritesPage;
