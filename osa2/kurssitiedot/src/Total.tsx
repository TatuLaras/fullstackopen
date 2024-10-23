interface TProps {
    total: number;
}

export default function Total({ total }: TProps) {
    return (
        <p>
            <strong>Number of exercises {total}</strong>
        </p>
    );
}
