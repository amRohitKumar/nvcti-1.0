import { useEffect } from "react";

const useTitle = (title) => {
  useEffect(() => {
    document.title = title + " | NVCTI";
  }, []);
};

export default useTitle;
