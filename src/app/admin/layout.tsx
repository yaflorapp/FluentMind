
import { auth } from '@/lib/firebase-admin';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { AppLayout } from '@/components/layout/app-layout';

async function checkAdminStatus() {
  const sessionCookie = cookies().get('__session')?.value;

  if (!sessionCookie) {
    return redirect('/login');
  }

  try {
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
    // In a real app, you might check a custom claim `isAdmin`
    // or look up the user in Firestore to check their role.
    // For this prototype, we'll assume the primary user is an admin.
    // A simple check could be to see if the email matches a specific admin email.
    if (decodedClaims.email !== process.env.ADMIN_EMAIL) {
       // A more robust check for production:
       // const userDoc = await db.collection('users').doc(decodedClaims.uid).get();
       // if (!userDoc.exists || !userDoc.data()?.isAdmin) {
       //   return redirect('/dashboard');
       // }
       return redirect('/dashboard');
    }
    return true;
  } catch (error) {
    console.error("Admin check failed:", error);
    return redirect('/login');
  }
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await checkAdminStatus();

  return <AppLayout>{children}</AppLayout>;
}
