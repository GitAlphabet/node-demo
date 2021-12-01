import type { CurrentUser } from '@/pages/user/Login/data';

export default function access(initialState: { currentUser?: CurrentUser | undefined }) {
  const { currentUser } = initialState || {};
  return {
    canAccess: (route: any) => {
      return currentUser && currentUser.menus?.includes(route.resourceKey);
    },
  };
}
