import { PROVINCE, AUTH } from "../type";
import axios from "axios";

import { Message, notification } from "antd";
export const setData = (data) => {
  return {
    type: PROVINCE.GET,
    data,
  };
};
export const setPagination = (data) => {
  return {
    type: PROVINCE.PAGINATION,
    data,
  };
};

export const setLoadingGet = (load) => {
  return {
    type: PROVINCE.GET_LOADING,
    load,
  };
};
export const setLoadingPost = (load) => {
  return {
    type: PROVINCE.POST_LOADING,
    load,
  };
};

export const getProvince = (where = "") => {
  return (dispatch) => {
    dispatch(setLoadingGet(true));
    axios
      .get(AUTH.URL + "province" + where)
      .then(function (response) {
        const data = response.data;
        dispatch(setData(data));
        dispatch(setPagination(data));
        dispatch(setLoadingGet(false));
      })
      .catch(function (err) {
        dispatch(setLoadingGet(false));
        let msg = "Terjadi Kesalahan Jaringan";
        const key = `open${Date.now()}`;
        notification.error({
          message: "Terjadi Kesalahan",
          description: msg,
          key,
          onClose: () => {},
        });

        // handle error
      });
  };
};

export const storeProvince = (data, where, callback) => {
  return (dispatch) => {
    dispatch(setLoadingPost(true));
    axios
      .post(AUTH.URL + "province", data)
      .then(function (response) {
        dispatch(getProvince(where));
        dispatch(setLoadingPost(false));
        callback();
      })
      .catch(function (err) {
        dispatch(setLoadingPost(false));
        let msg = "Terjadi Kesalahan Jaringan";
        const key = `open${Date.now()}`;
        notification.error({
          message: "Terjadi Kesalahan",
          description: msg,
          key,
          onClose: () => {},
        });

        // handle error
      });
  };
};

export const putProvince = (data, id, where, callback) => {
  return (dispatch) => {
    dispatch(setLoadingPost(true));
    axios
      .put(AUTH.URL + "province/" + id, data)
      .then(function (response) {
        dispatch(getProvince(where));
        dispatch(setLoadingPost(false));
        callback();
      })
      .catch(function (err) {
        dispatch(setLoadingPost(false));
        let msg = "Terjadi Kesalahan Jaringan";
        const key = `open${Date.now()}`;
        notification.error({
          message: "Terjadi Kesalahan",
          description: msg,
          key,
          onClose: () => {},
        });

        // handle error
      });
  };
};

export const deleteProvince = (id, where) => {
  return (dispatch) => {
    axios
      .delete(AUTH.URL + "province/" + id)
      .then(function (response) {
        dispatch(getProvince(where));
      })
      .catch(function (err) {
        let msg = "Terjadi Kesalahan Jaringan";
        const key = `open${Date.now()}`;
        notification.error({
          message: "Terjadi Kesalahan",
          description: msg,
          key,
          onClose: () => {},
        });

        // handle error
      });
  };
};
