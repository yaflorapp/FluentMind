
import { redirect } from 'next/navigation';

export default function AdminPage() {
  // Redirect to the first page in the admin section
  redirect('/admin/users');
}
