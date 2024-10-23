import { feedbackKinds, FeedbackState } from './Feedback';
import StatisticsLine from './StatisticsLine';

interface Props {
    feedbackState: FeedbackState;
}

export default function Statistics({ feedbackState }: Props) {
    const score = feedbackState.good + feedbackState.bad * -1;

    const totalCount = feedbackKinds.reduce(
        (acc, kind) => acc + feedbackState[kind],
        0,
    );
    const average = score / totalCount;
    const goodPercentage = feedbackState.good / totalCount;

    return (
        <>
            <h1>Statistics</h1>
            {totalCount > 0 && (
                <>
                    <table>
                        <tbody>
                            {feedbackKinds.map((kind, i) => (
                                <StatisticsLine
                                    key={i}
                                    text={kind}
                                    value={feedbackState[kind]}
                                />
                            ))}
                            <StatisticsLine text="all" value={totalCount} />
                            <StatisticsLine text="average" value={average} />
                            <StatisticsLine
                                text="positive"
                                value={(goodPercentage * 100).toFixed(1) + ' %'}
                            />
                        </tbody>
                    </table>
                </>
            )}
            {totalCount == 0 && <p>No feedback given.</p>}
        </>
    );
}
