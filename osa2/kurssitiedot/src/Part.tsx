import { TCoursePart } from './App';

interface TProps {
    part: TCoursePart;
}

export default function Part({ part }: TProps) {
    return (
        <p>
            {part.name} {part.exercises}
        </p>
    );
}
