import { FeedbackKind } from './Feedback';

interface Props {
    onGiveFeedback: (kind: FeedbackKind) => void;
    kind: FeedbackKind;
}

export default function Button({ onGiveFeedback, kind }: Props) {
    return <button onClick={() => onGiveFeedback(kind)}>{kind}</button>;
}
