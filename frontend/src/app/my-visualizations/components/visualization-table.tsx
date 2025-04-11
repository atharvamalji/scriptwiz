import { useEffect, useState } from "react";
import { Visualization } from "@/interfaces/visualization"; // Import the Visualization interface
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import axios from "axios";
import Link from "next/link";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

const VisualizationTable = () => {
    const [visualizations, setVisualizations] = useState<Visualization[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const columns: ColumnDef<Visualization, any>[] = [
        {
            header: "ID",
            accessorKey: "id",
        },
        {
            header: "User",
            accessorKey: "user",
        },
        {
            header: "Language",
            accessorKey: "language",
        },
        {
            header: "Library",
            accessorKey: "library",
        },
        {
            header: "HTML Path",
            accessorKey: "html_path",
        },
        {
            header: "PNG Path",
            accessorKey: "png_path",
        },
        {
            header: "Timestamp",
            accessorKey: "timestamp",
        },
    ];

    useEffect(() => {
        // Make the API call inside useEffect
        const fetchVisualizations = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:5000/get_visualizations?user=atharva" // Your API endpoint
                );
                setVisualizations(response.data.visualizations); // Update state with data
            } catch (err) {
                setError("Failed to fetch data.");
            } finally {
                setLoading(false); // Set loading to false once data is fetched or error occurs
            }
        };

        fetchVisualizations();
    }, []); // Empty dependency array ensures it only runs once on component mount

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="visualizations-table">
            {visualizations.length === 0 ? (
                <div>No visualizations available</div>
            ) : (
                <table className="border w-full table-auto">
                    <thead>
                        <tr className="bg-blue-600 text-white">
                            <th className="p-2 text-start">id</th>
                            <th className="p-2 text-start">
                                language
                            </th>
                            <th className="p-2 text-start">
                                library
                            </th>
                            <th className="p-2"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {visualizations.map((row, idx) => {
                            return (
                                <tr
                                    key={idx}
                                    className={`${
                                        idx % 2 === 0
                                            ? "bg-gray-100"
                                            : "bg-white"
                                    }`}
                                >
                                    <td className="p-2 border-y">{row.id}</td>
                                    <td className="p-2 border-y">
                                        {row.language}
                                    </td>
                                    <td className="p-2 border-y">
                                        {row.library}
                                    </td>

                                    <td className="p-2 border-y">
                                        {row.html_path && (
                                            <Link
                                                href={`${
                                                    row.png_path.split(".")[0]
                                                }?type=${
                                                    row.png_path.split(".")[1]
                                                }`}
                                                className="bg-blue-600 text-white p-1 px-2 rounded"
                                            >
                                                open
                                            </Link>
                                        )}
                                        {row.png_path && (
                                            <Link
                                                href={`${
                                                    row.png_path.split(".")[0]
                                                }?type=${
                                                    row.png_path.split(".")[1]
                                                }`}
                                                className="bg-blue-600 text-white p-1 px-2 rounded"
                                            >
                                                open
                                            </Link>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="rounded-md border">
            {/* <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
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
                                <TableCell key={cell.id}>
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </TableCell>
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
            </Table> */}
        </div>
    );
}

export default VisualizationTable;
