import {
  Button,
  Col,
  Row,
  Input,
  Message,
  Upload,
  Modal,
  Form,
  Tabs,
  Spin,
} from "antd";
import {
  InfoCircleOutlined,
  InboxOutlined,
  SolutionOutlined,
  KeyOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { useState, useEffect } from "react";
import { convertBase64, getPropsUpload } from "../helper";
import { useDispatch, useSelector } from "react-redux";
import { putProvince, storeProvince } from "../redux/actions/province.action";

const { Dragger } = Upload;

const FormComponent = ({ isModal, ok, cancel, data, where }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const loadingPost = useSelector((state) => state.provinceReducer.loadingPost);

  useEffect(() => {
    console.log("edit", data);
    if (data !== undefined) {
      form.setFieldsValue({ code: data.code });
      form.setFieldsValue({ name: data.name });
    }
  }, []);

  const handleSubmit = async (e) => {
    if (fileList[0] !== undefined) {
      const img = await convertBase64(fileList[0]);
      Object.assign(e, { file: img });
    }
    if (data !== undefined) {
      dispatch(
        putProvince(e, data.id, where, () => {
          ok();
        })
      );
    } else {
      dispatch(
        storeProvince(e, where, () => {
          ok();
        })
      );
    }

    // ok();
  };
  return (
    <Modal
      centered
      title={`${data !== undefined ? "Upadte" : "Add"} Data`}
      visible={isModal}
      closable={false}
      destroyOnClose={true}
      maskClosable={false}
      footer={null}
    >
      <Spin spinning={loading}>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Row gutter={6}>
            <Col xs={24} sm={24} md={24}>
              <Row gutter={4}>
                <Col xs={24} sm={12} md={12}>
                  <Form.Item
                    hasFeedback
                    name="code"
                    label="Key"
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={12}>
                  <Form.Item
                    hasFeedback
                    name="name"
                    label="Value"
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col xs={24} sm={24} md={24}>
                  <Dragger
                    {...getPropsUpload(fileList, (file) => setFileList(file))}
                  >
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">
                      Click or drag file to this area to upload
                    </p>
                    <p className="ant-upload-hint">Type .PNG, .JPEG, .JPG</p>
                  </Dragger>
                </Col>
              </Row>
              <br />
              <br />
            </Col>
          </Row>
          <br />
          <Row gutter={12} className="mt-5">
            <Col xs={12} sm={12} md={12}>
              <Button
                onClick={() => cancel()}
                type={"dashed"}
                primary
                size={"medium"}
                style={{ width: "100%" }}
                htmlType="button"
              >
                Cancel
              </Button>
            </Col>
            <Col xs={12} sm={12} md={12}>
              <Button
                type={"primary"}
                size={"medium"}
                style={{ width: "100%" }}
                htmlType="submit"
                loading={loadingPost}
              >
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      </Spin>
    </Modal>
  );
};

export default FormComponent;
