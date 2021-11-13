
import FileUpload from "../components/FileUpload";
import Navbar from "../components/Navbar";

const ACCEPTED_TYPE: Array<String> = [".csv"];

export default function FileUploadPage() {

  return (
    <>
    <Navbar/>
      <div className="flex py-6  mt-4 justify-center  ">
        <div className="bg-gray-100 h-3/6
            text-white font-bold  sm:w-3/2 md:w-3/2 rounded-lg   lg:w-1/3 ">
            <div className="bg-white col-span-2 px-2  md:col-span-3">
              <FileUpload acceptType={ACCEPTED_TYPE} />
            </div>
        </div>
      </div>

    </>
  );
}

