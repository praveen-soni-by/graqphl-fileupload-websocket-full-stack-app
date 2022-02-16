import { gql, useSubscription } from "@apollo/client";
import { useEffect, useState } from "react";

const BASE_URL ="http://localhost:8080/notification"

export default function Form() {
  const [message, setMessage] = useState("");
  const [notifications, setNotifications] = useState([]);

  const submit = () => {
    fetch(`${BASE_URL}/${message}`)
      .then((response) => {
        setMessage("");
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // onChange
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setMessage(event.target.value);
  };

  const { data } = useSubscription(
    gql`
      subscription statusWatch {
        message {
          message
          timeStamp
        }
      }
    `,
    {}
  );

  useEffect(() => {
    console.log(data);
    if (data) {
      setNotifications([data.message, ...notifications]);
    }
  }, [data]);

  return (
    <>
      {console.log("-" + notifications)}
      <div className="flex mt-4 flex-col justify-center items-center">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="message"
            >
              Message
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="message"
              type="text"
              onChange={onChange}
              value={message}
            />
          </div>

          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={submit}
            >
              Send Notification
            </button>
          </div>
        </form>
      </div>
      {notifications?.map((msg) => {
        return (
          <div className="flex ">
            <div className="m-auto">
              <div className="bg-gray-100 rounded-lg border-gray-300 border p-3 shadow-lg">
                <div className="flex flex-row">
                  <div className="ml-2 mr-6">
                    <span className="block text-black">{msg.message}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
