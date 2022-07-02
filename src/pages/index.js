import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  InboxOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
// import Pagination from "react-js-pagination";
import {
  Modal,
  Popconfirm,
  Col,
  Tooltip,
  Row,
  Tag,
  Upload,
  Input,
  Card,
  List,
  Button,
  Form,
  Select,
  Skeleton,
  Empty,
  Space,
  Avatar,
  // Pagination,
} from "antd";
import { Pagination } from "react-laravel-paginex";
import "antd/dist/antd.css";
import { getPropsUpload } from "../helper";
import { deleteProvince, getProvince } from "../redux/actions/province.action";
import FormComponent from "./form";

const Search = Input.Search;
const { Option } = Select;
const { Dragger } = Upload;
const { Meta } = Card;

const dummyData = ["a", "a", "a", "a"];
const msgInput = "Tidak Boleh Kosong";
const Index = () => {
  const [showForm, setShowForm] = useState(false);
  const [idx, setIdx] = useState(undefined);
  const [page, setPage] = useState(4);
  const [name, setName] = useState("");

  const dispatch = useDispatch();

  const resData = useSelector((state) => state.provinceReducer.data);
  const resLoading = useSelector((state) => state.provinceReducer.loadingGet);
  const resPagination = useSelector(
    (state) => state.provinceReducer.pagination
  );

  useEffect(() => {
    dispatch(getProvince(`?page=1&perpage=${page}`));
    console.log("pagin", resPagination);
  }, []);

  const handleConfirm = async (id) => {
    dispatch(deleteProvince(id, `?page=1&perpage=${page}${name}`));
  };
  return (
    <Card>
      <Row gutter={4}>
        <Col xs={24} sm={12} md={24}>
          <Row>
            <Col xs={24} sm={24} md={8}>
              <Form.Item name="any" label="">
                <Search
                  placeholder="Tulis sesuatu disini ..."
                  enterButton
                  onSearch={(e) => {
                    setName(`&name=${e}`);
                    dispatch(getProvince(`?page=${page}&name=${e}`));
                  }}
                />
              </Form.Item>
            </Col>
            <Col md={4}>
              <Button type="primary" onClick={() => setShowForm(true)}>
                Add
              </Button>
            </Col>
          </Row>
          <Row gutter={16}>
            {!resLoading ? (
              resData.length > 0 ? (
                resData.map((val, key) => {
                  return (
                    <Col
                      key={key}
                      xs={24}
                      sm={12}
                      md={6}
                      style={{ marginBottom: "5px" }}
                    >
                      <Card
                        style={{
                          border: "1px solid #EEEEEE",
                          padding: "1px",
                          borderRadius: "10px",
                        }}
                        cover={
                          <img
                            alt="example"
                            src={
                              val.file === ""
                                ? "https://klubpompi.pom.go.id/assets/public/img/no-image.png"
                                : `http://localhost:8000/storage/images/${val.file}`
                            }
                          />
                        }
                        actions={[
                          <Popconfirm
                            title={`Anda yakin akan menghapus data ini ?`}
                            onConfirm={(e) => handleConfirm(val.id)}
                            onCancel={(e) => {}}
                            okText="Oke"
                            cancelText="Cancel"
                          >
                            <Button
                              type={"primary"}
                              size={"small"}
                              key="list-delete"
                            >
                              <DeleteOutlined key="delete" /> Delete
                            </Button>
                          </Popconfirm>,
                          <Button
                            onClick={() => {
                              setIdx(key);
                              setShowForm(true);
                            }}
                            type={"primary"}
                            size={"small"}
                            key="list-delete"
                          >
                            <EditOutlined key="edit" /> Edit
                          </Button>,
                        ]}
                      >
                        <Meta title={val.code} description={val.name} />
                      </Card>
                    </Col>
                  );
                })
              ) : (
                <Empty />
              )
            ) : (
              dummyData.map((val, key) => <Skeleton key={key} />)
            )}
            <Col md={24} sm={24} xs={24}>
              <Button
                type="dashed"
                style={{ float: "right", width: "100%", marginTop: "10px" }}
                disabled={resPagination.total < page}
                onClick={() => {
                  let p = page + 4;
                  setPage(p);
                  setTimeout(
                    () => dispatch(getProvince("?page=1&perpage=" + p)),
                    300
                  );
                }}
              >
                Load More
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      {showForm && (
        <FormComponent
          isModal={showForm}
          ok={() => {
            // dispatch(getProvince(`?page=${page}${name}`));
            setIdx(undefined);
            setShowForm(false);
            // handleUser(true);
          }}
          cancel={() => {
            setIdx(undefined);
            setShowForm(false);
          }}
          data={idx !== undefined ? resData[idx] : undefined}
          where={`?page=1&perpage=${page}${name}`}
        />
      )}
    </Card>
  );
};

export default Index;
