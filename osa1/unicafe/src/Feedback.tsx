import Button from './Button';

export type FeedbackKind = 'good' | 'neutral' | 'bad';
export const feedbackKinds: FeedbackKind[] = ['good', 'neutral', 'bad'];

export interface FeedbackState {
    good: number;
    neutral: number;
    bad: number;
}

interface Props {
    onGiveFeedback: (kind: FeedbackKind) => void;
}

export default function Feedback({ onGiveFeedback }: Props) {
    return (
        <>
            <h1>Give feedback</h1>
            <div>
                {feedbackKinds.map((kind, i) => (
                    <Button
                        key={i}
                        kind={kind}
                        onGiveFeedback={onGiveFeedback}
                    />
                ))}
            </div>
        </>
    );
}
