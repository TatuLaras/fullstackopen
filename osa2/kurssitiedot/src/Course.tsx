import { TCourse } from './App';
import Content from './Content';
import Header from './Header';
import Total from './Total';

interface TProps {
    course: TCourse;
}

export default function Course({ course }: TProps) {
    const total: number = course.parts.reduce(
        (total, part) => total + part.exercises,
        0,
    );

    return (
        <div>
            <Header courseName={course.name} />
            <Content parts={course.parts} />
            <Total total={total} />
        </div>
    );
}
