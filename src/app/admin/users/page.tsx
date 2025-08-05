
import { db } from '@/lib/firebase-admin';
import { Separator } from '@/components/ui/separator';
import { UserTable } from '@/components/admin/users/user-table';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

async function getUsers() {
    try {
        const usersSnapshot = await db.collection('users').get();
        if (usersSnapshot.empty) {
            return [];
        }
        const users = usersSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
        // This is not safe for production as it exposes sensitive data.
        // In a real app, you would carefully select the fields to return.
        return JSON.parse(JSON.stringify(users));
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
