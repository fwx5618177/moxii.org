import { MutableRefObject, useEffect } from "react";

const useAutoScroll = (
  ref: MutableRefObject<any>,
  currentTitle: string,
  selectName: string
) => {
  useEffect(() => {
    console.log({
      currentTitle,
      selectName,
    });

    const activeElement = ref.current?.querySelector(selectName);
    console.log({
      currentTitle,
      selectName,
      status: !!(activeElement && ref.current),
    });
    if (activeElement && ref.current) {
      const elementPosition = activeElement.offsetTop;
      ref.current.scrollTo({
        top: elementPosition - ref.current.clientHeight / 2,
        behavior: "smooth",
      });
    }
  }, [currentTitle, ref, selectName]);
};

export default useAutoScroll;
