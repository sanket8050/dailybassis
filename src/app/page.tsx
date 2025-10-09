//main routing logic is here
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from './api/auth/[...nextauth]/route';
import AppLandingPage from './applandingPage/page';

export default async function HomePage() {
  // Pragmatic cast to avoid type compatibility issues with next-auth types in this workspace
  const session = await getServerSession(authOptions as any);

  if (session) {
    const role = (session as any)?.user?.role;
    if (role === 'ADMIN') {
      redirect('/admin');
    } else if (role) {
      redirect('/user');
    } else {
      redirect('/signin');
    }
  }

  // No session -> render the public landing page
  return <AppLandingPage />;
}