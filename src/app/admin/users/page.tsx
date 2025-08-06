
import { db } from '@/lib/firebase-admin';
import { Separator } from '@/components/ui/separator';
import { UserTable } from '@/components/admin/users/user-table';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

// Helper to convert Firestore Timestamps to strings
function serializeData(doc: any) {
    const data = doc.data();
    for (const key in data) {
        if (data[key] && typeof data[key] === 'object' && data[key].toDate) { // Check for Timestamp
            data[key] = data[key].toDate().toISOString();
        }
    }
    return { id: doc.id, ...data };
}

async function getUsers() {
    try {
        const usersSnapshot = await db.collection('users').get();
        if (usersSnapshot.empty) {
            return [];
        }
        // Properly serialize the data to ensure it's client-component safe
        const users = usersSnapshot.docs.map(serializeData);
        // This is not safe for production as it exposes sensitive data.
        // In a real app, you would carefully select the fields to return.
        return users;
    } catch (error) {
        console.error("Failed to fetch users:", error);
        return [];
    }
}

export default async function AdminUsersPage() {
    const users = await getUsers();

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">User Management</h1>
                <p className="text-muted-foreground">
                    View and manage all users in the system.
                </p>
            </div>
            <Separator />
            <Card>
                <CardHeader>
                    <CardTitle>All Users</CardTitle>
                    <CardDescription>A list of all registered users.</CardDescription>
                </CardHeader>
                <CardContent>
                    <UserTable data={users} />
                </CardContent>
            </Card>
        </div>
    );
}
