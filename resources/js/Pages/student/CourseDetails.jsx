"use client";

import { usePage } from "@inertiajs/react";
import {
    ArrowLeft,
    BookOpenCheck,
    Users,
    CalendarClock,
    FileText,
    Timer,
    Link2,
    Sparkles,
} from "lucide-react";
import { Link } from "@inertiajs/react";

export default function CourseDetails() {
    const { props } = usePage();
    const course = props.course;

    if (!course) {
        return (
            <div className="text-center text-gray-500 dark:text-gray-400 py-10">
                Course not found.
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto mt-10 bg-white dark:bg-gray-900 shadow-md rounded-lg p-6">
            {/* Back button */}
            <Link
                href="/student/courses"
                className="inline-flex items-center text-sm text-indigo-600 hover:underline mb-4"
            >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back to Courses
            </Link>

            {/* Course Title */}
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                {course.subjectIcon && (
                    <img src={course.subjectIcon} alt="" className="w-6 h-6" />
                )}
                <BookOpenCheck className="w-6 h-6 text-indigo-500" />
                {course.name}
            </h1>

            {/* Course Details */}
            <div className="text-gray-600 dark:text-gray-300 space-y-2">
                {course.instructor && (
                    <p>
                        <Users className="inline w-4 h-4 mr-1 text-indigo-500" />
                        <strong>Instructor:</strong> {course.instructor}
                    </p>
                )}
                {course.class && (
                    <p>
                        <strong>Class:</strong> {course.class}
                    </p>
                )}
                {course.stream && (
                    <p>
                        <strong>Stream:</strong> {course.stream}
                    </p>
                )}
                {course.schedule && (
                    <p>
                        <CalendarClock className="inline w-4 h-4 mr-1 text-indigo-500" />
                        <strong>Schedule:</strong> {course.schedule}
                    </p>
                )}
                {course.duration && (
                    <p>
                        <Timer className="inline w-4 h-4 mr-1 text-indigo-500" />
                        <strong>Duration:</strong> {course.duration}
                    </p>
                )}
                {course.prerequisites && (
                    <p>
                        <Sparkles className="inline w-4 h-4 mr-1 text-indigo-500" />
                        <strong>Prerequisites:</strong> {course.prerequisites}
                    </p>
                )}
                {course.materials && (
                    <p>
                        <Link2 className="inline w-4 h-4 mr-1 text-indigo-500" />
                        <strong>Materials:</strong>{" "}
                        <a
                            href={course.materials}
                            target="_blank"
                            className="text-indigo-600 hover:underline"
                        >
                            View
                        </a>
                    </p>
                )}
            </div>

            {/* Course Description */}
            <div className="mt-6 text-gray-700 dark:text-gray-200">
                <h2 className="font-semibold text-lg mb-2 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-indigo-500" />
                    Course Description
                </h2>
                <p>{course.description || "No description provided."}</p>
            </div>
        </div>
    );
}
