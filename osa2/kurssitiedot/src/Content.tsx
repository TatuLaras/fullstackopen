import { TCoursePart } from './App';
import Part from './Part';

interface TProps {
    parts: TCoursePart[];
}

export default function Content({ parts }: TProps) {
    return (
        <>
            {parts.map((part) => (
                <Part key={part.id} part={part} />
            ))}
        </>
    );
}
