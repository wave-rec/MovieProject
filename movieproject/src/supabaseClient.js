import { createClient } from '@supabase/supabase-js';

// 환경 변수에서 Supabase URL과 API Key를 가져와 클라이언트를 생성해줌, URL이랑 KEY는 따로 .env 파일에 저장!
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY;

//supabase랑 상호작용할 수 있게 createClient 함수 생성해줌
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);


