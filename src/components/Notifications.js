import { useEffect } from "react";
import { useAppContext } from "../utils/context";

function Notification({ notification, onRemove }) {
  useEffect(() => {
    const timeout = setTimeout(() => onRemove(notification.id));

    return () => clearTimeout(timeout);
  }, []);
  return (
    <div className={`alert alert-${notification.type}`}>{notification.msg}</div>
  );
}

export default function Notifications() {
  const { notifications, setNotifications } = useAppContext();

  function removeNotification(id) {
    const _notifications = notifications.filter((n) => n.id !== id);
    setNotifications([..._notifications]);
  }

  return (
    <div className="alert-container">
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          notification={notification}
          onRemove={removeNotification}
        />
      ))}
    </div>
  );
}
