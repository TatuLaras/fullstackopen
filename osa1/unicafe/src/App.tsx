import { useState } from 'react';
import Feedback, { FeedbackKind, FeedbackState } from './Feedback';
import Statistics from './Statistics';

function App() {
    const [feedback, setFeedback] = useState<FeedbackState>({
        good: 0,
        neutral: 0,
        bad: 0,
    });

    return (
        <>
            <Feedback
                onGiveFeedback={(kind: FeedbackKind) =>
                    setFeedback((old) => {
                        const copy = { ...old };
                        switch (kind) {
                            case 'good':
                                copy.good += 1;
                                break;
                            case 'neutral':
                                copy.neutral += 1;
                                break;
                            case 'bad':
                                copy.bad += 1;
                                break;
                        }
                        return copy;
                    })
                }
            />
            <Statistics feedbackState={feedback} />
        </>
    );
}

export default App;
