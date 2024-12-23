import Course from './Course';

export interface TCourse {
    id: number;
    name: string;
    parts: TCoursePart[];
}

export interface TCoursePart {
    id: number;
    name: string;
    exercises: number;
}

export default function App() {
    const courses: TCourse[] = [
        {
            name: 'Half Stack application development',
            id: 1,
            parts: [
                {
                    name: 'Fundamentals of React',
                    exercises: 10,
                    id: 1,
                },
                {
                    name: 'Using props to pass data',
                    exercises: 7,
                    id: 2,
                },
                {
                    name: 'State of a component',
                    exercises: 14,
                    id: 3,
                },
                {
                    name: 'Redux',
                    exercises: 11,
                    id: 4,
                },
            ],
        },
        {
            name: 'Node.js',
            id: 2,
            parts: [
                {
                    name: 'Routing',
                    exercises: 3,
                    id: 1,
                },
                {
                    name: 'Middlewares',
                    exercises: 7,
                    id: 2,
                },
            ],
        },
    ];

    return (
        <>
            <h1>Web developement curriculum</h1>
            {courses.map((course) => (
                <Course key={course.id} course={course} />
            ))}
        </>
    );
}
