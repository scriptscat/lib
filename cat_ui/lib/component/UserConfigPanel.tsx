import React, { useEffect, useRef } from "react";
import {
  Checkbox,
  Form,
  FormInstance,
  Input,
  InputNumber,
  Modal,
  Select,
  Tabs,
} from "@arco-design/web-react";
import TabPane from "@arco-design/web-react/es/Tabs/tab-pane";

const FormItem = Form.Item;

declare type ConfigType =
  | "text"
  | "checkbox"
  | "select"
  | "mult-select"
  | "number"
  | "textarea"
  | "time";

interface Config {
  [key: string]: any;
  title: string;
  description: string;
  default?: any;
  type?: ConfigType;
  bind?: string;
  values?: any[];
  password?: boolean;
  // 文本类型时是字符串长度,数字类型时是最大值
  max?: number;
  min?: number;
  rows?: number; // textarea行数
}

type UserConfig = { [key: string]: { [key: string]: Config } };

export type UserConfigPanelProps = {
  title: string;
  userConfig: UserConfig;
  defaultValues: { [key: string]: any };
  visible: boolean;
  onOk: (values: { [key: string]: any }) => void;
  onCancel: () => void;
};

const UserConfigPanel: React.FC<UserConfigPanelProps> = ({
  title,
  userConfig,
  defaultValues,
  visible,
  onCancel,
  onOk,
}) => {
  const formRefs = useRef<{ [key: string]: FormInstance }>({});
  const [tab, setTab] = React.useState(Object.keys(userConfig)[0]);
  useEffect(() => {
    setTab(Object.keys(userConfig)[0]);
  }, [userConfig]);

  return (
    <Modal
      visible={visible}
      title={title}
      okText={"保存"}
      cancelText={"关闭"}
      onOk={() => {
        if (formRefs.current[tab]) {
          const saveValues = formRefs.current[tab].getFieldsValue();
          onOk(saveValues);
        }
      }}
      onCancel={() => {
        onCancel();
      }}
    >
      <Tabs
        activeTab={tab}
        onChange={(value) => {
          setTab(value);
        }}
      >
        {Object.keys(userConfig).map((itemKey) => {
          const value = userConfig[itemKey];
          return (
            <TabPane key={itemKey} title={itemKey}>
              <Form
                style={{
                  width: "100%",
                }}
                autoComplete="off"
                layout="vertical"
                initialValues={defaultValues}
                ref={(el: FormInstance) => {
                  formRefs.current[itemKey] = el;
                }}
              >
                {Object.keys(value).map((key) => (
                  <FormItem
                    key={key}
                    label={value[key].title}
                    field={`${itemKey}.${key}`}
                  >
                    {() => {
                      const item = value[key];
                      let { type } = item;
                      if (!type) {
                        // 根据其他值判断类型
                        if (typeof item.default === "boolean") {
                          type = "checkbox";
                        } else if (item.values) {
                          if (typeof item.values === "object") {
                            type = "mult-select";
                          } else {
                            type = "select";
                          }
                        } else if (typeof item.default === "number") {
                          type = "number";
                        } else {
                          type = "text";
                        }
                      }
                      switch (type) {
                        case "text":
                          if (item.password) {
                            return (
                              <Input.Password
                                placeholder={item.description}
                                maxLength={item.max}
                              />
                            );
                          }
                          return (
                            <Input
                              placeholder={item.description}
                              maxLength={item.max}
                              showWordLimit
                            />
                          );
                        case "number":
                          return (
                            <InputNumber
                              placeholder={item.description}
                              min={item.min}
                              max={item.max}
                              suffix={item.unit}
                            />
                          );
                        case "checkbox":
                          return (
                            <Checkbox
                              defaultChecked={
                                defaultValues[`${itemKey}.${key}`]
                              }
                            >
                              {item.description}
                            </Checkbox>
                          );
                        case "select":
                        case "mult-select":
                          // eslint-disable-next-line no-case-declarations
                          let options: any[];
                          if (item.bind) {
                            const bindKey = item.bind.substring(1);
                            if (defaultValues[bindKey]) {
                              options = defaultValues[bindKey]!;
                            } else {
                              options = [];
                            }
                          } else {
                            options = item.values!;
                          }
                          return (
                            <Select
                              mode={
                                item.type === "mult-select"
                                  ? "multiple"
                                  : undefined
                              }
                              placeholder={item.description}
                            >
                              {options!.map((option) => (
                                <Select.Option key={option} value={option}>
                                  {option}
                                </Select.Option>
                              ))}
                            </Select>
                          );
                        case "textarea":
                          return (
                            <Input.TextArea
                              placeholder={item.description}
                              maxLength={item.max}
                              rows={item.rows}
                              showWordLimit
                            />
                          );
                        default:
                          return null;
                      }
                    }}
                  </FormItem>
                ))}
              </Form>
            </TabPane>
          );
        })}
      </Tabs>
    </Modal>
  );
};

export default UserConfigPanel;
