import { useAppContext } from "../context";

export default function useToastManager() {
    const {notifications, setNotifications} = useAppContext();

    function addNotification(id, type, msg) {
        setNotifications([
            ...notifications,
            {
                id, type, msg
            }
        ])
    }

    return {
        onError(msg) {
            addNotification(Date.now(), "error", msg);
        },
        onWarning(msg) {
            addNotification(Date.now(), "warning", msg);
        },
        onInfo(msg) {
            addNotification(Date.now(), "info", msg);
        },
        onSuccess(msg) {
            addNotification(Date.now(), "success", msg);
        },
    };
}