import axios from 'axios';
import { getUserToken, delUserToken, delUserInfo } from './currentUser';
// import { baseURL } from '../constants/defaults';

export const baseURL =
  // 'https://beta.7030.ir/api';
  'https://dev.70si.ir/api';
//   'https://7030.ir/api';

export const SetAuthorizationAction = () => {
  delUserInfo();
  delUserToken();
};

const faildRequest = (error, faild) => {
  if (error.response) {
    if (error.response.status === 401) {
      SetAuthorizationAction();
    }

    let errorDesc = 'Error: Network Error';
    if (error.response.data.Error !== undefined)
      errorDesc = error.response.data.Error;
    else if (error.response.data.description !== undefined)
      errorDesc = error.response.data.description;

    // NotificationManager.error(errorDesc, 'Error', 3000, null, null, '');
    console.log(error.response.data.info);
    console.log(error.response.status);
    console.log(error.response.headers);

    faild(error.response);
  } else {
    // NotificationManager.error('Error: Network Error', 'Error', 3000, null, null, '');
    faild('Error: Network Error');
  }
};

export const headers = () => {
  // const curLang = getCurrentLanguage();
  // const server = window.location.hostname;
  // let host = null;
  // switch (server) {
  //     case 'app.7030.ir':
  //         host = 'main'
  //         break;
  //     case 'app.7030x.ir':
  //         host = 'beta'
  //         break
  //     case 'pwa.70si.ir':
  //         host = 'dev'
  //         break
  //     case 'localhost':
  //         host = 'local'
  //         break
  // }
  const header = {
    'Content-Type': 'application/json',
    // 'Custom-user-agent': `pwa-308-3.2.0-${host}`,
    API_SHARED_KEY:
      'lEy45wstZvZZ0sFIk1yy9gV0dahTrdAljCY8DE9hlaCwPzydRtrfQLQEyWfnFwDo',
    // 'lang': curLang,
    // console.log(param)
    // param.clientUserAgent= 'pwa-308-3.2.0-main';
    // console.log(param)
  };

  const curUser = getUserToken();
  if (curUser) {
    header.Authorization = `${curUser.token_type} ${curUser.access_token}`;
  }
  return header;
};

export const get = (url, param, callback, faild) => {
  // console.log(baseURL)
  // const baseUrl = "https://beta.7030.ir/api"
  async function fetchData() {
    axios
      .get(`${baseURL}${url}`, {
        params: param,
        headers: headers(),
      })
      .then((res) => {
        // console.log(res.data)
        return res.data;
      })
      .then((data) => {
        callback(data);
      })
      .catch(function (error) {
        faildRequest(error, faild);
      });
  }
  fetchData();
};

export const post = (url, param, callback, faild) => {
  async function fetchData() {
    axios
      .post(`${baseURL}${url}`, param, {
        headers: headers(),
      })
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        callback(data);
      })
      .catch(function (error) {
        faildRequest(error, faild);
      });
  }
  fetchData();
};

export const put = (url, param, callback, faild) => {
  async function fetchData() {
    axios
      .put(`${baseURL}${url}`, param, {
        headers: headers(),
      })
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        callback(data);
      })
      .catch(function (error) {
        faildRequest(error, faild);
      });
  }
  fetchData();
};

export const patch = (url, param, callback, faild) => {
  async function fetchData() {
    axios
      .patch(`${baseURL}${url}`, param, {
        headers: headers(),
      })
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        callback(data);
      })
      .catch(function (error) {
        faildRequest(error, faild);
      });
  }
  fetchData();
};

export const delRequest = (url, param, callback, faild) => {
  async function fetchData() {
    axios
      .delete(`${baseURL}${url}`, {
        headers: headers(),
        data: param,
      })
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        callback(data);
      })
      .catch(function (error) {
        faildRequest(error, faild);
      });
  }
  fetchData();
};

export const uploadFile = (url, param, uploadProgress, callback, faild) => {
  async function fetchData() {
    axios
      .post(`${baseURL}${url}`, param, {
        headers: { ...headers(), 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) =>
          uploadProgress((progressEvent.loaded / progressEvent.total) * 100),
      })
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        callback(data);
      })
      .catch(function (error) {
        faildRequest(error, faild);
      });
  }
  fetchData();
};

export const putUploadFile = (url, param, uploadProgress, callback, faild) => {
  async function fetchData() {
    axios
      .put(`${baseURL}${url}`, param, {
        headers: headers(),
        onUploadProgress: (progressEvent) =>
          uploadProgress((progressEvent.loaded / progressEvent.total) * 100),
      })
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        callback(data);
      })
      .catch(function (error) {
        faildRequest(error, faild);
      });
  }
  fetchData();
};

export const getMarkup = (key, callback, faild) => {
  async function fetchData() {
    axios
      .get(`${baseURL}/services/markup/${key}`, {
        headers: headers(),
      })
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        callback(data);
      })
      .catch(function (error) {
        faildRequest(error, faild);
      });
  }
  fetchData();
};
