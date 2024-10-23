export interface Part {
    name: string;
    exercises: number;
}

interface Props {
    parts: Part[];
}

export default function Content({ parts }: Props) {
    return (
        <>
            {parts.map((part, i) => (
                <p key={i}>
                    {part.name} {part.exercises}
                </p>
            ))}
        </>
    );
}
