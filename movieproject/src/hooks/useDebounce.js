import { useState, useEffect } from 'react';

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value); // 지연된 값을 관리하는 상태 변수

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value); // delay 시간이 지나면 debouncedValue 값을 업데이트 시킴
    }, delay);

    return () => {
      clearTimeout(handler); // 다음 값이 들어올 때 기존의 타이머를 삭제하여 중복으로 요청이 되는 것을 방지함
    };
  }, [value, delay]); // value나 delay가 변경될 때마다 이 useEffect 실행해줌

  return debouncedValue; // 지연된 값을 반환해줌!
}

export default useDebounce;
