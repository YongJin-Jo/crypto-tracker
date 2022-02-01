import { Dispatch, SetStateAction, useState } from 'react';

// initialTab 값에 위치한 배열을 반환하는 hooks
export const useTab = <T>(
  initialTab: number,
  allTabs: T[]
): { currentItem: T; changeItem: Dispatch<SetStateAction<number>> } => {
  const [currentIndex, setCurrentIndex] = useState<number>(initialTab);
  return {
    currentItem: allTabs[currentIndex],
    changeItem: setCurrentIndex,
  };
};
