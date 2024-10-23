function Header({ course }: { course: string }) {
    return <h1>{course}</h1>;
}

interface Course {
    name: string;
    parts: Part[];
}

interface Part {
    name: string;
    exercises: number;
}

function Content({ parts }: { parts: Part[] }) {
    return (
        <>
            {parts.map((part, i) => (
                <Part part={part} key={i} />
            ))}
        </>
    );
}

function Part({ part }: { part: Part }) {
    return (
        <p>
            {part.name} {part.exercises}
        </p>
    );
}

function Total({ total }: { total: number }) {
    return <p>Number of exercises {total}</p>;
}

export default function App() {
    const course: Course = {
        name: 'Half Stack application development',
        parts: [
            { name: 'Fundamentals of React', exercises: 10 },
            { name: 'Using props to pass data', exercises: 7 },
            { name: 'State of a component', exercises: 14 },
        ],
    };

    const total: number = course.parts.reduce(
        (total, part) => total + part.exercises,
        0,
    );

    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total total={total} />
        </div>
    );
}
