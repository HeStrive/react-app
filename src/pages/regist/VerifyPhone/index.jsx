import React, { Component } from "react";
import { NavBar, Icon, WingBlank, InputItem, Modal, Toast } from "antd-mobile";
import { createForm } from "rc-form";
import "./index.css";
// 引入 api 接口函数
import { reqVerifyPhone } from "@api/regist";
import { reqVerifyCode } from "@api/common";
import VerifyButton from "@comps/VerifyButton";

class VerifyPhone extends Component {
  // 初始化状态,设置按钮高亮显示
  state = {
    // 为 true 就是禁用
    isDisabled: true,
  };

  componentDidMount() {
    // Modal.alert(
    //   "注册协议及隐私政策",
    //   <span className="policy-text">
    //     在您注册成为硅谷用户的过程中，您需要完成我们的注册流程并通过点击同意的形式在线签署以下协议，
    //     <strong className="policy-strong-text">
    //       请您务必仔细阅读、充分理解协议中的条款内容后再点击同意（尤其是以粗体并下划线标识的条款，因为这些条款可能会明确您应履行的义务或对您的权利有所限制）
    //     </strong>
    //     ：<span className="policy-content">《硅谷用户注册协议》</span>
    //     <span className="policy-content">《硅谷隐私政策》</span>
    //   </span>,
    //   [
    //     {
    //       text: "不同意",
    //       onPress: () => console.log("cancel"),
    //     },
    //     {
    //       text: "同意",
    //       style: { backgroundColor: "red", color: "#fff" },
    //     },
    //   ]
    // );

    // 创建 window方法验证
    window.verifyCallback = async (res) => {
      if (res.ret === 0) {
        // 验证成功,客户端成功,还需要进行二次验证,服务的验证
        await reqVerifyCode(res.randstr, res.ticket);

        // 服务端验证通过,验证手机号
        await this.verifyPhone();
      }
    };
  }

  // 当用户输入数据时就会触发
  validator = (rule, value, callback) => {
    // console.log(rule, value);   rule 是详情信息, value 是当前文本框输入的内容
    const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57]|199)[0-9]{8}$/;

    // 定义按钮状态
    let isDisabled = true;
    // console.dir(reg.test);  检测类型

    if (reg.test(value)) {
      // 包含值,就为 false,表单验证成功
      isDisabled = false;
    }

    this.setState({
      isDisabled,
    });

    // 不管是成功还是失败,都必须调用函数
    callback();
  };

  // 点击下一步调用接口
  verifyPhone = async () => {
    // 获取表单里面的某个值
    try {
      // 获取表单的某个值
      const phone = this.props.form.getFieldValue("phone");

      // 调用接口
      await reqVerifyPhone(phone);

      // 请求成功-- 说明没有账号
      console.log("success");
    } catch (error) {
      // 请求失败-- 说明存在账号
      Toast.fail(error, 3);
    }
  };

  render() {
    // 引入 getFieldProps
    const { getFieldProps } = this.props.form;
    // 获取按钮状态值
    const { isDisabled } = this.state;
    return (
      <div>
        <NavBar
          mode="light"
          icon={<Icon type="left" className="left" />}
          onLeftClick={() => console.log("onLeftClick")}
        >
          尚硅注册
        </NavBar>

        {/* 两边留空位 */}
        <WingBlank>
          <div className="verify-phone-input">
            <InputItem
              {...getFieldProps("phone", {
                // 表单验证规则
                rules: [{ validator: this.validator }],
              })}
              clear
              placeholder="请输入内容"
              ref={(el) => (this.autoFocusInst = el)}
            >
              <div className="verify-phone-prefix">
                <span>+86</span>
                <Icon type="down" />
              </div>
            </InputItem>
          </div>

          <VerifyButton
            disabled={isDisabled}
            callback={this.verifyPhone}
            btntext={"注册"}
          />
        </WingBlank>
      </div>
    );
  }
}

// createForm 是高阶组件给 VerifyPhone 传递表单 form 对象
export default createForm()(VerifyPhone);
