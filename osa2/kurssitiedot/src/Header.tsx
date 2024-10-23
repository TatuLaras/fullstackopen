interface TProps {
    courseName: string;
}

export default function Header({ courseName }: TProps) {
    return <h2>{courseName}</h2>;
}
