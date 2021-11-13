
import { NotificationProps } from '../interface/NotificationProps';

interface NotificationList {
    data: NotificationProps[]
}

const Notification = ({ data }: NotificationList) => {
    return (

        <div id="notification-scroll" className={`w-full max-h-52  overflow-auto border-b border-gray-200 ${data.length === 0 ? 'h-12' : 'h-auto'}`}>
            {

                data.length === 0 ? <div className="no-data-found"> No Notifcation found</div> :
                    data?.map(notification => (
                        <div key={notification.id}
                            onClick={() => alert(JSON.stringify(notification))} className="alert-text">
                            {notification.msg}
                            <div className="flex flex-col">
                                <div className="alert-text-thin ">
                                    {notification.timestamp}</div>
                                <div className="alert-text-small ">
                                    {notification.fileName}</div>
                            </div>
                        </div>


                    ))}
            {data.length !== 0 && <div className="text-sm font-medium cursor-pointer  border 
                         align-middle
                         text-center
                         bg-gray-200
                         py-1
                        text-black">See all notifications</div>
            }

        </div>

    )
}

export default Notification;