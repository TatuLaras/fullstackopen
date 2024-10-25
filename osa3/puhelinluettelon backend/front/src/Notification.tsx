import './Notification.css';

interface Props {
    state: NotificationState;
}

export interface NotificationState {
    message: string | null;
    kind: 'error' | 'success';
}

export default function Notificaton({ state }: Props) {
    return (
        state.message && (
            <div className={`notification ${state.kind}`}>{state.message}</div>
        )
    );
}
