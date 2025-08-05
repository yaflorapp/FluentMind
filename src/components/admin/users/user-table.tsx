
"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Shield, User, Award, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { updateUserPlan, toggleAdminStatus } from "@/app/admin/users/actions";

interface User {
  id: string;
  name?: string;
  email?: string;
  plan?: "Free" | "Pro";
  isAdmin?: boolean;
}

const UserActionsCell = ({ row }: { row: any }) => {
    const user = row.original as User;
    const { toast } = useToast();
    const [isPending, startTransition] = React.useTransition();

    const handlePlanChange = (plan: "Free" | "Pro") => {
        startTransition(async () => {
            const result = await updateUserPlan(user.id, plan);
            if (result.error) {
                toast({ variant: "destructive", title: "Error", description: result.error });
            } else {
                toast({ title: "Success", description: `${user.name || user.email}'s plan updated to ${plan}.` });
            }
        });
    };

    const handleAdminToggle = () => {
        startTransition(async () => {
            const result = await toggleAdminStatus(user.id, !!user.isAdmin);
            if (result.error) {
                toast({ variant: "destructive", title: "Error", description: result.error });
            } else {
                toast({ title: "Success", description: `Admin status for ${user.name || user.email} has been updated.` });
            }
        });
    };
    
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <MoreHorizontal className="h-4 w-4" />}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleAdminToggle} disabled={isPending}>
                    {user.isAdmin ? <User className="mr-2" /> : <Shield className="mr-2" />}
                    {user.isAdmin ? 'Remove Admin' : 'Make Admin'}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                 <DropdownMenuLabel>Change Plan</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => handlePlanChange("Pro")} disabled={isPending || user.plan === 'Pro'}>
                    <Award className="mr-2" />
                    Set to Pro
                </DropdownMenuItem>
                 <DropdownMenuItem onClick={() => handlePlanChange("Free")} disabled={isPending || user.plan !== 'Pro'}>
                    <User className="mr-2" />
                    Set to Free
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}


export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "plan",
    header: "Plan",
    cell: ({ row }) => {
      const plan = row.getValue("plan") || "Free";
      return <Badge variant={plan === "Pro" ? "default" : "secondary"}>{String(plan)}</Badge>;
    },
  },
  {
    accessorKey: "isAdmin",
    header: "Role",
    cell: ({ row }) => {
        const isAdmin = row.getValue("isAdmin");
        return isAdmin ? <Badge variant="destructive">Admin</Badge> : "User";
    },
  },
  {
    id: "actions",
    cell: UserActionsCell,
  },
];

interface DataTableProps<TData, TValue> {
  data: TData[];
}

export function UserTable<TData, TValue>({
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns: columns as ColumnDef<TData, TValue>[],
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
