export const getBaseUrl = ():string => {
 return (
   process.env.NEXT_PUBLIC_API_BASE_URL ||
   "office-transportation-management-system-backend.vercel.app/api/v1"
 );
}