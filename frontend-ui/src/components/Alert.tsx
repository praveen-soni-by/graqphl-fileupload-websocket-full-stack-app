import Icon from "./svg/Icon";

export default function Alert({ message, isError }: any) {
  if (!message) return <></>;

  return (
    <div
      className={` ${isError ? "bg-red-200 border-red-500 " : "bg-green-200 border-green-500 "
        } border-l-4  rounded-sm p-2 flex h-12 max-w-xs`}
    >
      {isError ? <Icon.CircleCross /> : <Icon.CircleCheck />}

      <div className="text-gray-600 font-medium  self-center">
        {message}
      </div>
    </div>
  );
}
