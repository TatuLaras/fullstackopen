interface Props {
    text: string;
    value: number | string;
}

export default function StatisticsLine({ text, value }: Props) {
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    );
}
