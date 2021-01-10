import { App } from 'vue';
import {
  Button,
  DatePicker,
  Divider,
  Form,
  Input,
  Menu,
  message,
  Modal,
  notification,
} from 'ant-design-vue';

export function setupAntd(app: App) {
  app.use(Button);
  app.use(Form);
  app.use(Input);
  app.use(DatePicker);
  app.use(Modal);
  app.use(Menu);
  // other
  app.use(Divider);

  app.config.globalProperties.$confirm = Modal.confirm;
  app.config.globalProperties.$message = message;
  app.config.globalProperties.$notification = notification;
  app.config.globalProperties.$info = Modal.info;
  app.config.globalProperties.$success = Modal.success;
  app.config.globalProperties.$error = Modal.error;
  app.config.globalProperties.$warning = Modal.warning;
}
