interface Props {
    course: string;
}

export default function Header({ course }: Props) {
    return <h1>{course}</h1>;
}
