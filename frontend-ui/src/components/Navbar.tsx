import {
    gql, useSubscription
} from '@apollo/client';
import { useEffect, useState, useRef } from "react";
import { NotificationProps } from '../interface/NotificationProps';
import Notification from './Notification';

export default function Navbar() {
    const [notifications, setNotifications] = useState<NotificationProps[]>([]);
    const [showNotification, setShowNotification] = useState(false);
    const [unseenNotificationCount, setUnseenNotificationCount] = useState(0);
    // const [showAlert, setAlert] = useState(false);
    const ref = useRef(null);

    const handleClickOutside = (event: any) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setShowNotification(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    });


    const { data } = useSubscription(gql`
    subscription statusWatch {
        status {
            message
            id
            fileName
            timeStamp
        }
    }
`, {});



    useEffect(() => {
        if (data) {
            // setAlert(true);

            setNotifications([{
                "id": data?.status?.id,
                "timestamp": data?.status?.timeStamp,
                "fileName": data?.status?.fileName,
                "msg": data?.status?.message
            }, ...notifications.slice(0, 4),])
            setUnseenNotificationCount(unseenNotificationCount + 1)
        }

    }, [data])

    const showNotificationWindow = () => {
        setShowNotification(!showNotification)
        setUnseenNotificationCount(0)
    }

    return (
        <>
            <nav className="bg-white shadow ">
                <div className="flex justify-end items-center h-14">
                    <div className="flex items-end">
                        <div className=" md:block">
                            <button className="flex  items-end mr-5" onClick={showNotificationWindow}>
                                <div className="inline-flex absolute items-center px-1 py-0.5  border-white rounded-full text-xs font-semibold leading-3 bg-blue-500 text-white">
                                    {unseenNotificationCount}
                                </div>
                                <svg className="h-7 w-7 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                            </button>


                        </div>
                    </div>
                </div>
            </nav>
            {showNotification &&
                <div ref={ref} className="  shadow-lg flex w-72 absolute top-14 right-2 ">
                    <Notification data={notifications} />
                </div>
            }
        </>
    )
}

