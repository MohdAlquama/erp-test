"use client";

import StudentLayout from "@/Layouts/StudentLayout";
import { Link } from "@inertiajs/react";
import {
    BookOpen,
    Search,
    FlaskConical,
    Book,
    Calculator,
    Languages,
    Globe,
    FileText,
    PenTool,
    Landmark,
    Wallet,
    Brain,
    Atom,
} from "lucide-react";
import { useState } from "react";

// Icons mapped to subjects
const subjectIcons = {
    Mathematics: <Calculator className="w-5 h-5 mr-1 inline" />,
    Science: <FlaskConical className="w-5 h-5 mr-1 inline" />,
    English: <Languages className="w-5 h-5 mr-1 inline" />,
    Hindi: <Book className="w-5 h-5 mr-1 inline" />,
    Geography: <Globe className="w-5 h-5 mr-1 inline" />,
    History: <Landmark className="w-5 h-5 mr-1 inline" />,
    Economics: <Wallet className="w-5 h-5 mr-1 inline" />,
    Accountancy: <FileText className="w-5 h-5 mr-1 inline" />,
    Business: <Book className="w-5 h-5 mr-1 inline" />,
    Psychology: <Brain className="w-5 h-5 mr-1 inline" />,
    Physics: <Atom className="w-5 h-5 mr-1 inline" />,
    Chemistry: <FlaskConical className="w-5 h-5 mr-1 inline" />,
    Biology: <PenTool className="w-5 h-5 mr-1 inline" />,
};

// Dummy school course data with class names
const courseData = [
    // Class 1
    {
        id: 1,
        name: "Mathematics",
        className: "Class 1",
        instructor: "Ms. Kaur",
        credits: 2,
    },
    {
        id: 2,
        name: "English",
        className: "Class 1",
        instructor: "Mrs. Lata",
        credits: 2,
    },
    {
        id: 3,
        name: "EVS",
        className: "Class 1",
        instructor: "Mr. Rathi",
        credits: 1,
    },

    // Class 2
    {
        id: 4,
        name: "Mathematics",
        className: "Class 2",
        instructor: "Mr. Roy",
        credits: 2,
    },
    {
        id: 5,
        name: "English",
        className: "Class 2",
        instructor: "Mrs. Das",
        credits: 2,
    },
    {
        id: 6,
        name: "EVS",
        className: "Class 2",
        instructor: "Ms. Kiran",
        credits: 1,
    },

    // Class 3
    {
        id: 7,
        name: "Mathematics",
        className: "Class 3",
        instructor: "Ms. Desai",
        credits: 3,
    },
    {
        id: 8,
        name: "English",
        className: "Class 3",
        instructor: "Mr. Gill",
        credits: 2,
    },
    {
        id: 9,
        name: "Science",
        className: "Class 3",
        instructor: "Mrs. Fernandes",
        credits: 2,
    },

    // Class 4
    {
        id: 10,
        name: "Mathematics",
        className: "Class 4",
        instructor: "Ms. Thomas",
        credits: 3,
    },
    {
        id: 11,
        name: "English",
        className: "Class 4",
        instructor: "Mr. Iqbal",
        credits: 2,
    },
    {
        id: 12,
        name: "Science",
        className: "Class 4",
        instructor: "Ms. Patel",
        credits: 2,
    },

    // Class 5
    {
        id: 13,
        name: "Mathematics",
        className: "Class 5",
        instructor: "Mr. Abraham",
        credits: 3,
    },
    {
        id: 14,
        name: "English",
        className: "Class 5",
        instructor: "Mrs. Pillai",
        credits: 2,
    },
    {
        id: 15,
        name: "Science",
        className: "Class 5",
        instructor: "Ms. Jain",
        credits: 2,
    },

    // Class 6
    {
        id: 16,
        name: "Mathematics",
        className: "Class 6",
        instructor: "Mrs. Sharma",
        credits: 4,
    },
    {
        id: 17,
        name: "Science",
        className: "Class 6",
        instructor: "Mr. Verma",
        credits: 3,
    },
    {
        id: 18,
        name: "English",
        className: "Class 6",
        instructor: "Ms. Rao",
        credits: 2,
    },

    // Class 7
    {
        id: 19,
        name: "Mathematics",
        className: "Class 7",
        instructor: "Mrs. Kapoor",
        credits: 4,
    },
    {
        id: 20,
        name: "Science",
        className: "Class 7",
        instructor: "Mr. Rana",
        credits: 3,
    },
    {
        id: 21,
        name: "English",
        className: "Class 7",
        instructor: "Ms. Iyer",
        credits: 2,
    },

    // Class 8
    {
        id: 22,
        name: "Mathematics",
        className: "Class 8",
        instructor: "Mrs. Mehta",
        credits: 4,
    },
    {
        id: 23,
        name: "Science",
        className: "Class 8",
        instructor: "Mr. Singh",
        credits: 3,
    },
    {
        id: 24,
        name: "English",
        className: "Class 8",
        instructor: "Ms. Gupta",
        credits: 2,
    },

    // Class 9
    {
        id: 25,
        name: "Mathematics",
        className: "Class 9",
        instructor: "Mr. Bhatt",
        credits: 4,
    },
    {
        id: 26,
        name: "Science",
        className: "Class 9",
        instructor: "Ms. Bose",
        credits: 4,
    },
    {
        id: 27,
        name: "Social Science",
        className: "Class 9",
        instructor: "Mr. Pandey",
        credits: 3,
    },

    // Class 10
    {
        id: 28,
        name: "Mathematics",
        className: "Class 10",
        instructor: "Ms. Tyagi",
        credits: 4,
    },
    {
        id: 29,
        name: "Science",
        className: "Class 10",
        instructor: "Mr. Saxena",
        credits: 4,
    },
    {
        id: 30,
        name: "Social Science",
        className: "Class 10",
        instructor: "Mrs. Rani",
        credits: 3,
    },

    // Class 11
    {
        id: 31,
        name: "Mathematics",
        className: "Class 11",
        instructor: "Dr. Ahuja",
        credits: 5,
    },
    {
        id: 32,
        name: "Physics",
        className: "Class 11",
        instructor: "Mr. Nair",
        credits: 4,
    },
    {
        id: 33,
        name: "Chemistry",
        className: "Class 11",
        instructor: "Ms. Paul",
        credits: 4,
    },

    // Class 12
    {
        id: 34,
        name: "Mathematics",
        className: "Class 12",
        instructor: "Mr. Dutta",
        credits: 5,
    },
    {
        id: 35,
        name: "Physics",
        className: "Class 12",
        instructor: "Mrs. Menon",
        credits: 4,
    },
    {
        id: 36,
        name: "Chemistry",
        className: "Class 12",
        instructor: "Mr. Chakraborty",
        credits: 4,
    },
    {
        id: 37,
        name: "Economics",
        className: "Class 11",
        stream: "Commerce",
        instructor: "Ms. Singh",
        credits: 4,
    },
    {
        id: 38,
        name: "Accountancy",
        className: "Class 11",
        stream: "Commerce",
        instructor: "Mr. Patel",
        credits: 4,
    },
    {
        id: 39,
        name: "Business",
        className: "Class 11",
        stream: "Commerce",
        instructor: "Mrs. Ghosh",
        credits: 4,
    },
    {
        id: 40,
        name: "Psychology",
        className: "Class 11",
        stream: "Arts",
        instructor: "Mr. Raza",
        credits: 4,
    },
    {
        id: 41,
        name: "History",
        className: "Class 11",
        stream: "Arts",
        instructor: "Ms. Malik",
        credits: 4,
    },
    {
        id: 42,
        name: "Geography",
        className: "Class 11",
        stream: "Arts",
        instructor: "Dr. Nath",
        credits: 4,
    },
];

// Class tabs and optional stream filters
const classTabs = Array.from({ length: 12 }, (_, i) => `Class ${i + 1}`);
const streamOptions = ["Science", "Commerce", "Arts"];

export default function Courses() {
    const [search, setSearch] = useState("");
    const [selectedClass, setSelectedClass] = useState("Class 6");
    const [selectedStream, setSelectedStream] = useState("Science");
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 6;

    const isSeniorClass =
        selectedClass === "Class 11" || selectedClass === "Class 12";

    const filtered = courseData.filter((course) => {
        const matchesSearch = course.name
            .toLowerCase()
            .includes(search.toLowerCase());
        const matchesClass = course.className === selectedClass;
        const matchesStream =
            !isSeniorClass || course.stream === selectedStream;
        return matchesSearch && matchesClass && matchesStream;
    });

    const pageCount = Math.ceil(filtered.length / pageSize);
    const paginated = filtered.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    const handlePageChange = (page) => {
        if (page >= 1 && page <= pageCount) setCurrentPage(page);
    };

    return (
        <StudentLayout>
            <div className="mb-6 flex items-center gap-2 mt-12">
                <BookOpen className="w-6 h-6 text-indigo-600" />
                <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
                    School Courses
                </h1>
            </div>

            <div className="mb-4 flex flex-wrap gap-2">
                {classTabs.map((cls) => (
                    <button
                        key={cls}
                        onClick={() => {
                            setSelectedClass(cls);
                            setCurrentPage(1);
                        }}
                        className={`px-4 py-1 rounded-full text-sm border ${
                            selectedClass === cls
                                ? "bg-indigo-600 text-white"
                                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-white border-gray-300 dark:border-gray-600"
                        }`}
                    >
                        {cls}
                    </button>
                ))}
            </div>

            {isSeniorClass && (
                <div className="mb-4 flex gap-2">
                    {streamOptions.map((stream) => (
                        <button
                            key={stream}
                            onClick={() => setSelectedStream(stream)}
                            className={`px-4 py-1 rounded-full text-sm border ${
                                selectedStream === stream
                                    ? "bg-indigo-600 text-white"
                                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-white border-gray-300 dark:border-gray-600"
                            }`}
                        >
                            {stream}
                        </button>
                    ))}
                </div>
            )}

            <div className="mb-4 flex items-center gap-2 w-full md:w-1/2">
                <Search className="w-4 h-4 text-gray-500" />
                <input
                    type="text"
                    placeholder="Search by course name..."
                    className="px-4 py-2 w-full border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-700"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setCurrentPage(1);
                    }}
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginated.map((course) => (
                    <div
                        key={course.id}
                        className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-xl p-5 shadow-sm flex flex-col justify-between"
                    >
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                                {subjectIcons[course.name] || null}
                                {course.name}
                            </h2>
                            <p className="text-gray-500 dark:text-gray-400 mt-1">
                                <strong>Instructor:</strong> {course.instructor}
                            </p>
                            <p className="text-gray-500 dark:text-gray-400">
                                <strong>Class:</strong> {course.className}
                            </p>
                            <p className="text-gray-500 dark:text-gray-400">
                                <strong>Credits:</strong> {course.credits}
                            </p>
                        </div>
                        <div className="mt-4">
                            <Link
                                href={`/student/courses/${course.id}`}
                                className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm"
                            >
                                View Details
                            </Link>
                        </div>
                    </div>
                ))}
                {paginated.length === 0 && (
                    <p className="text-gray-500 dark:text-gray-400 col-span-full text-center mt-4">
                        No courses found.
                    </p>
                )}
            </div>

            <div className="flex justify-center mt-6 space-x-2">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 text-sm rounded-md border border-gray-300 dark:border-gray-600 dark:text-white"
                >
                    Prev
                </button>
                {Array.from({ length: pageCount }, (_, i) => (
                    <button
                        key={i + 1}
                        onClick={() => handlePageChange(i + 1)}
                        className={`px-3 py-1 text-sm rounded-md ${
                            currentPage === i + 1
                                ? "bg-indigo-600 text-white"
                                : "border border-gray-300 dark:border-gray-600 dark:text-white"
                        }`}
                    >
                        {i + 1}
                    </button>
                ))}
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === pageCount}
                    className="px-3 py-1 text-sm rounded-md border border-gray-300 dark:border-gray-600 dark:text-white"
                >
                    Next
                </button>
            </div>
        </StudentLayout>
    );
}
