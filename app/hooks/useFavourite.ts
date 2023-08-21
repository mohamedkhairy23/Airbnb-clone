import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import { toast } from "react-toastify";
import useLoginModal from "./useLoginModal";
import { safeUser } from "@/app/types";

interface IUseFavourite {
  listingId: string;
  currentUser?: safeUser | null;
}

const useFavourite = ({ listingId, currentUser }: IUseFavourite) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const hasFavourited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavourite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        return loginModal.onOpen();
      }

      try {
        let request;

        if (hasFavourited) {
          request = () => axios.delete(`/api/favourites/${listingId}`);
          toast.success("Deleted from favourites");
        } else {
          request = () => axios.post(`/api/favourites/${listingId}`);
          toast.success("Added to favourites");
        }

        await request();
        router.refresh();
      } catch (error) {
        console.log(error);

        toast.error("Something went wrong");
      }
    },
    [currentUser, hasFavourited, listingId, loginModal, router]
  );

  return {
    hasFavourited,
    toggleFavourite,
  };
};

export default useFavourite;
