
import { db } from '@/lib/firebase-admin';
import { Separator } from '@/components/ui/separator';
import { CourseTable } from '@/components/admin/courses/course-table';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import type { Lesson } from '@/lib/types';

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

async function getCourses(): Promise<Lesson[]> {
    try {
        const coursesSnapshot = await db.collection('lessons').get();
        if (coursesSnapshot.empty) {
            return [];
        }
        // Properly serialize the data to ensure it's client-component safe
        const courses = coursesSnapshot.docs.map(doc => serializeData(doc) as Lesson);
        return courses;
    } catch (error) {
        console.error("Failed to fetch courses:", error);
        return [];
    }
}

export default async function AdminCoursesPage() {
    const courses = await getCourses();

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Course Management</h1>
                <p className="text-muted-foreground">
                    Create, view, and manage all courses in the system.
                </p>
            </div>
            <Separator />
            <Card>
                <CardHeader>
                    <CardTitle>All Courses</CardTitle>
                    <CardDescription>A list of all available courses.</CardDescription>
                </CardHeader>
                <CardContent>
                    <CourseTable data={courses} />
                </CardContent>
            </Card>
        </div>
    );
}
