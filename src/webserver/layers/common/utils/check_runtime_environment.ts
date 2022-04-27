
export const isBrowser :()=> boolean =  () => {
  if (typeof window !== 'undefined') return true;
  return false;
}

export const  isNode:()=> boolean =  () => {
  if (typeof window === 'undefined') return true;
  return false;
}