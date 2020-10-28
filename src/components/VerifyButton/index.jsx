import React, { Component } from "react";
import { Toast, Button } from "antd-mobile";
import { reqVerifyCode } from "@api/common";
export default class VerifyButton extends Component {
  componentDidMount() {
    window.verifyCallback = async (res) => {
      if (res.ret === 0) {
        // 验证成功,客户端成功,还需要进行二次验证,服务的验证
        await reqVerifyCode(res.randstr, res.ticket);

        // 服务端验证通过,验证手机号
        await this.props.verifyPhone();
      }
    };
  }

  render() {
    const { disabled, btntext } = this.props;
    return (
      <>
        <Button
          style={{ display: disabled ? "block" : "none" }}
          className="warning-btn"
          type="warning"
          disabled
        >
          {btntext}
        </Button>

        <Button
          style={{ display: !disabled ? "block" : "none" }}
          className="warning-btn"
          type="warning"
          id="TencentCaptcha"
          data-appid="2030765311"
          data-cbfn="verifyCallback"
        >
          {btntext}
        </Button>
      </>
    );
  }
}
