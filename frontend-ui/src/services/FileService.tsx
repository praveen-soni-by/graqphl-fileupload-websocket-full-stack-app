import { gql } from "@apollo/client";

const downloadFileLocalPath = (fileName: String) => {
  fetch(`/template/${fileName}.csv`)
    .then(response => {
      response.blob().then(blob => {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.href = url;
        a.download = `${fileName}.csv`;
        a.click();
      });
    });
}


const uploadFileGQL = gql`
  mutation uploadFile($input: Upload!) {
    uploadFile(file: $input)
  }
`;

const FileService = { downloadFileLocalPath, uploadFileGQL }



export default FileService;
